const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,800'] });
    try {
        const page = await browser.newPage();

        // 1. Login
        await page.goto('https://mirii-sewing.online/wp-login.php', { waitUntil: 'networkidle2' });
        await page.type('#user_login', 'antigravity-ai@gmail.com');
        await page.type('#user_pass', 'hE6AnSDQNzN0FJ&lX&ITOU(o');

        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle2' }),
            page.click('#wp-submit')
        ]);

        console.log("Logged in.");

        // 2. Fix placeholders in Page 18
        // We'll navigate to edit page so we are in WP context with all APIs
        await page.goto('https://mirii-sewing.online/wp-admin/post.php?post=18&action=edit', { waitUntil: 'networkidle2' });

        const pageUpdateResult = await page.evaluate(async () => {
            const nonce = window.wpApiSettings ? window.wpApiSettings.nonce : null;
            if (!nonce) return 'No nonce';

            const pageRes = await fetch(window.wpApiSettings.root + 'wp/v2/pages/18?context=edit', {
                headers: { 'X-WP-Nonce': nonce }
            });
            const pageData = await pageRes.json();
            let content = pageData.content ? pageData.content.raw : '';

            // Replace the text profile placeholder
            content = content.replace(
                /<!-- wp:paragraph -->\s*<p>（ここに講師画像を配置）<\/p>\s*<!-- \/wp:paragraph -->/g,
                `<!-- wp:group {"className":"placeholder-profile","layout":{"type":"constrained"}} -->\n<div class="wp-block-group placeholder-profile"></div>\n<!-- /wp:group -->`
            );

            // Replace cover dim to be light pink without "photo here" feel
            content = content.replace(
                /<span aria-hidden="true" class="wp-block-cover__background [^"]*"><\/span>/g,
                `<span aria-hidden="true" class="wp-block-cover__background has-pale-pink-background-color has-background-dim" style="opacity:0.3"></span>`
            );

            // Update post and cocoon meta options
            await fetch(window.wpApiSettings.root + 'wp/v2/pages/18', {
                method: 'POST',
                headers: {
                    'X-WP-Nonce': nonce,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: content
                })
            });

            // To update Cocoon meta (like page_type), typically they are saved in a standard way, but we don't have the exact key.
            // Luckily, we can inject CSS to do the same thing universally, which user prefers anyway as it's transparent.
            return 'Page updated';
        });

        console.log("Page Update:", pageUpdateResult);

        // 3. Update Custom CSS via Customizer
        await page.goto('https://mirii-sewing.online/wp-admin/customize.php?autofocus[section]=custom_css', { waitUntil: 'load' });

        // Wait till wp.customize is ready
        await page.evaluate(() => {
            return new Promise(resolve => {
                if (window.wp && wp.customize) {
                    wp.customize.bind('ready', resolve);
                    // if it's already ready
                    if (wp.customize.get) resolve();
                } else {
                    setTimeout(resolve, 3000);
                }
            });
        });

        const cssUpdateResult = await page.evaluate(async () => {
            if (!window.wp || !wp.customize) return 'wp.customize not found';

            const newCSS = `

/* =======================================
   トップページ (HOME) のブログ要素非表示
======================================= */
/* 記事タイトル（HOME）非表示 */
.home .entry-title, .home .page-title, .home .post-title,
.home h1.entry-title {
    display: none !important;
}

/* 記事メタ情報（投稿日、更新日、著者）非表示 */
.home .post-meta, .home .post-date, .home .post-update, 
.home .author-info, .home .entry-meta, .home .post-author {
    display: none !important;
}

/* シェアボタン、フォローボタン類非表示 */
.home .sns-share, .home .sns-follow, .home .sns-buttons,
.home .share-button, .home .follow-button {
    display: none !important;
}

/* 目次非表示 */
.home .toc, .home #toc {
    display: none !important;
}

/* サイドバー、ウィジェット類非表示 */
.home #sidebar, .home .sidebar, .home .widget,
.home .widget_search, .home .widget_recent_entries, 
.home .widget_recent_comments, .home .widget_archive, 
.home .widget_categories {
    display: none !important;
}

/* ヘッダー・フッターの不要な記事パーツ非表示 */
.home .article-header, .home .article-footer,
.home .entry-header, .home .entry-footer {
    display: none !important;
}

/* =======================================
   トップページ 1カラムフルワイド調整
======================================= */
.home #main, .home .main, .home .content {
    width: 100% !important;
    max-width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
}
.home .article, .home .entry-content {
    border: none !important;
    background: transparent !important;
    padding: 0 !important;
}
.home #content {
    padding-top: 0 !important;
}

/* =======================================
   画像プレースホルダーの上品なスタイル
======================================= */
.placeholder-profile {
    background-color: #fce4ec !important; /* 薄いピンク */
    background-image: radial-gradient(rgba(248,187,208, 0.4) 1px, transparent 1px) !important;
    background-size: 15px 15px !important;
    border-radius: 50% !important; /* プロフィールなので丸く */
    height: 150px !important;
    width: 150px !important;
    margin: 0 auto !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05) !important;
}

body {
    color: #4a4a4a;
    line-height: 1.8;
}
p {
    margin-bottom: 24px;
}
h2 {
    margin-top: 60px;
    margin-bottom: 30px;
}
.wp-block-button__link {
    border-radius: 8px !important;
    transition: all 0.3s ease;
    font-weight: bold;
}
.wp-block-button__link:hover {
    opacity: 0.8;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0,0,0,0.1) !important;
}
.blank-box {
    border: 1px solid #eaeaea !important;
    box-shadow: 0 4px 15px rgba(0,0,0,0.03) !important;
    border-radius: 8px;
    padding: 30px;
    background-color: #ffffff;
}
.font-mincho {
    font-family: "Noto Serif JP", "Hiragino Mincho ProN", serif !important;
}

`;

            // Identify custom css control/setting
            let cssSettingObj = null;
            wp.customize.control.each(function (control) {
                if (control.id.indexOf('custom_css') > -1) {
                    cssSettingObj = wp.customize(control.id);
                }
            });

            if (!cssSettingObj) return 'No custom CSS setting found';

            let currentVal = cssSettingObj.get() || '';
            // Only add if not already there to prevent duplication
            if (!currentVal.includes('.home .entry-title')) {
                cssSettingObj.set(currentVal + "\\n" + newCSS);

                // Save and publish
                return new Promise(resolve => {
                    wp.customize.previewer.bind('saved', function () {
                        resolve('CSS Saved!');
                    });
                    wp.customize.previewer.save();
                });
            } else {
                return 'CSS already added';
            }
        });

        console.log("CSS Update:", cssUpdateResult);

    } catch (e) {
        console.error("Error:", e);
    } finally {
        await browser.close();
    }
})();
