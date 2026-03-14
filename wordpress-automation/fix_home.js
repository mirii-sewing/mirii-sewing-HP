const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    try {
        const page = await browser.newPage();
        await page.goto('https://mirii-sewing.online/wp-login.php', { waitUntil: 'networkidle2' });
        await page.type('#user_login', 'antigravity-ai@gmail.com');
        await page.type('#user_pass', 'hE6AnSDQNzN0FJ&lX&ITOU(o');
        await page.click('#wp-submit');
        await page.waitForNavigation({ waitUntil: 'networkidle2' });

        await page.goto('https://mirii-sewing.online/wp-admin/', { waitUntil: 'networkidle2' });

        const result = await page.evaluate(async () => {
            const nonce = window.wpApiSettings ? window.wpApiSettings.nonce : null;
            if (!nonce) return { error: 'No nonce' };

            // 1. Get settings
            const settingsRes = await fetch(window.wpApiSettings.root + 'wp/v2/settings', {
                headers: { 'X-WP-Nonce': nonce }
            });
            const settings = await settingsRes.json();
            const pageId = settings.page_on_front;
            if (!pageId) return { error: 'No front page set' };

            // 2. Get current page content with context=edit
            const pageRes = await fetch(window.wpApiSettings.root + 'wp/v2/pages/' + pageId + '?context=edit', {
                headers: { 'X-WP-Nonce': nonce }
            });
            const pageData = await pageRes.json();
            let content = pageData.content ? pageData.content.raw : '';
            if (!content) return { error: 'No content found' };

            // 3. Update content (replace placeholders)
            // Replace the text profile placeholder
            content = content.replace(
                /<!-- wp:paragraph -->\s*<p>（ここに講師画像を配置）<\/p>\s*<!-- \/wp:paragraph -->/g,
                `<!-- wp:group {"className":"placeholder-profile","layout":{"type":"constrained"}} --><div class="wp-block-group placeholder-profile"></div><!-- /wp:group -->`
            );

            // Make the cover block elegant if it doesn't have an image
            content = content.replace(
                /<span aria-hidden="true" class="wp-block-cover__background has-base-background-color has-background-dim"><\/span>/g,
                `<span aria-hidden="true" class="wp-block-cover__background has-pale-pink-background-color has-background-dim" style="opacity: 0.2;"></span>`
            );

            // Update cocoon meta options to hide elements on page if possible (it's safe to just send an array of meta to test)
            const metaUpdate = {
                page_type: 'column1_wide',
                hide_sns_buttons: true,
                hide_page_title: true
            };

            await fetch(window.wpApiSettings.root + 'wp/v2/pages/' + pageId, {
                method: 'POST',
                headers: {
                    'X-WP-Nonce': nonce,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: content
                })
            });

            // 5. Update CSS
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
    background-color: #fce4ec; /* 薄いピンク */
    background-image: radial-gradient(#f8bbd0 1px, transparent 1px);
    background-size: 20px 20px;
    border-radius: 50% !important; /* プロフィールなので丸く */
    height: 250px;
    width: 250px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}

.wp-block-cover.is-light {
    background-color: #fdf2f4 !important; /* ファーストビュー全体の背景も柔らかく */
}
`;

            const cssRes = await fetch(window.wpApiSettings.root + 'wp/v2/custom_css?status=publish', {
                headers: { 'X-WP-Nonce': nonce }
            });
            const cssList = await cssRes.json();
            let cssUpdateResult = "failed";

            // In WordPress, modifying the custom CSS
            if (cssList && cssList.length > 0) {
                const target = cssList.find(c => c.slug === 'cocoon-master' || c.slug === 'cocoon-child-master') || cssList[0];
                let existingCss = target.content.raw || '';

                // Regex clear out previously added blocks if present
                if (!existingCss.includes('.home .entry-title')) {
                    existingCss += "\\n" + newCSS;
                }

                await fetch(window.wpApiSettings.root + 'wp/v2/custom_css/' + target.id, {
                    method: 'POST',
                    headers: {
                        'X-WP-Nonce': nonce,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ content: existingCss })
                });
                cssUpdateResult = "updated " + target.slug;
            }

            return { status: 'success', pageId, cssUpdateResult };
        });

        console.log("Success:", JSON.stringify(result));
    } catch (e) {
        console.error("Error:", e);
    } finally {
        await browser.close();
    }
})();
