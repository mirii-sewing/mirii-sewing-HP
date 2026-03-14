const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--window-size=1200,900'] });
    try {
        const page = await browser.newPage();

        await page.goto('https://mirii-sewing.online/wp-login.php', { waitUntil: 'networkidle2' });
        await page.type('#user_login', 'antigravity-ai@gmail.com');
        await page.type('#user_pass', 'hE6AnSDQNzN0FJ&lX&ITOU(o');

        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle2' }),
            page.click('#wp-submit')
        ]);

        console.log("Logged in");

        await page.goto('https://mirii-sewing.online/wp-admin/customize.php?autofocus[control]=custom_css', { waitUntil: 'networkidle2' });

        // Wait for CodeMirror to load
        await page.waitForFunction(() => {
            return document.querySelector('.CodeMirror') && document.querySelector('.CodeMirror').CodeMirror;
        }, { timeout: 15000 });

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
    background-color: #ffffff !important;
}
.font-mincho {
    font-family: "Noto Serif JP", "Hiragino Mincho ProN", serif !important;
}
`;

        const result = await page.evaluate((css) => {
            const cm = document.querySelector('.CodeMirror').CodeMirror;
            const currentVal = cm.getValue();
            if (currentVal.indexOf('.home .entry-title') === -1) {
                cm.setValue(currentVal + css);
                return "Injected CSS via CodeMirror";
            }
            return "CSS already present";
        }, newCSS);

        console.log(result);

        if (result === "Injected CSS via CodeMirror") {
            // Wait for save button to be enabled and click it
            await page.waitForSelector('#save:not(:disabled)', { timeout: 10000 });
            await page.click('#save');

            // Wait for it to switch to "Saved" (disabled again)
            await page.waitForSelector('#save:disabled', { timeout: 10000 });
            console.log("Saved successfully!");
        }

    } catch (e) {
        console.error("Error:", e);
    } finally {
        await browser.close();
    }
})();
