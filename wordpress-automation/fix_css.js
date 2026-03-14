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

            const cssRes = await fetch(window.wpApiSettings.root + 'wp/v2/custom_css?status=publish', {
                headers: { 'X-WP-Nonce': nonce }
            });
            const cssList = await cssRes.json();

            let targetId = null;
            let existingCss = '';

            if (cssList && cssList.length > 0) {
                const target = cssList.find(c => c.slug === 'cocoon-master' || c.slug === 'cocoon-child-master') || cssList[0];
                targetId = target.id;
                existingCss = target.content.raw || '';
            } else {
                return { error: 'No custom css found ' + JSON.stringify(cssList) };
            }

            const newCSS = `\n
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
    background-image: radial-gradient(#f8bbd0 1px, transparent 1px) !important;
    background-size: 20px 20px !important;
    border-radius: 50% !important; /* プロフィールなので丸く */
    height: 250px !important;
    width: 250px !important;
    margin: 0 auto !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05) !important;
}
.pattern-layer {
    background-color: #fdf2f4 !important;
    opacity: 0.8 !important;
}
`;

            if (!existingCss.includes('.home .entry-title')) {
                existingCss += newCSS;
            }

            const r = await fetch(window.wpApiSettings.root + 'wp/v2/custom_css/' + targetId, {
                method: 'POST',
                headers: {
                    'X-WP-Nonce': nonce,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: existingCss })
            });

            return { status: 'success', update: await r.json() };
        });

        console.log("CSS Update:", JSON.stringify(result));
    } catch (e) {
        console.error("Error:", e);
    } finally {
        await browser.close();
    }
})();
