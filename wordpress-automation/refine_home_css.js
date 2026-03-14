const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--window-size=1280,1024'] });
    try {
        const page = await browser.newPage();

        await page.goto('https://mirii-sewing.online/wp-login.php', { waitUntil: 'networkidle2' });
        await page.type('#user_login', 'antigravity-ai@gmail.com');
        await page.type('#user_pass', 'hE6AnSDQNzN0FJ&lX&ITOU(o');
        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle2' }),
            page.click('#wp-submit')
        ]);

        const result = await page.evaluate(async () => {
            const nonce = window.wpApiSettings ? window.wpApiSettings.nonce : null;
            if (!nonce) return { error: 'No nonce' };

            // テーマエディターからCSSを更新するのは確実なので、
            // カスタマイザーAPIを使ってCSSを注入する
            const cssRes = await fetch(window.wpApiSettings.root + 'wp/v2/custom_css?status=publish', {
                headers: { 'X-WP-Nonce': nonce }
            });
            const cssList = await cssRes.json();
            if (cssList && cssList.length > 0) {
                const target = cssList.find(c => c.slug === 'cocoon-master' || c.slug === 'cocoon-child-master') || cssList[0];
                let existingCss = target.content.raw || '';

                const styleCSS = `
/* --- トップページ デザイン改善 (仮画像、ボタン、余白) --- */
/* ボタン共通 */
.custom-btn .wp-block-button__link {
    border-radius: 50px !important;
    padding: 15px 35px !important;
    font-weight: bold !important;
    transition: all 0.3s ease !important;
    display: inline-block !important;
}

/* メインCTAボタン（濃いめのピンク系・目立たせる） */
.main-cta-btn .wp-block-button__link {
    background-color: #c55c70 !important;
    color: #fff !important;
    box-shadow: 0 4px 15px rgba(197, 92, 112, 0.3) !important;
    font-size: 1.1rem !important;
}
.main-cta-btn .wp-block-button__link:hover {
    transform: translateY(-3px) !important;
    box-shadow: 0 6px 20px rgba(197, 92, 112, 0.4) !important;
}

/* アウトラインボタン（枠線のみ・控えめ） */
.outline-btn .wp-block-button__link {
    background-color: transparent !important;
    color: #c55c70 !important;
    border: 1px solid #c55c70 !important;
}
.outline-btn .wp-block-button__link:hover {
    background-color: #fdf2f4 !important;
    transform: translateY(-2px) !important;
}

/* 背景ブロックの色微調整 */
.has-luminous-vivid-amber-background-color {
    background-color: #faf5ed !important; /* より上品な薄いベージュに上書き */
}
.has-pale-pink-background-color {
    background-color: #fdf6f7 !important; /* より上品な薄いピンクに上書き */
}

/* プレースホルダー画像 (上品な水玉と色味) */
.placeholder-img {
    background-color: #f9ecef;
    background-image: radial-gradient(rgba(197, 92, 112, 0.1) 1px, transparent 1px);
    background-size: 15px 15px;
    position: relative;
    border: 1px solid rgba(197, 92, 112, 0.1);
    box-shadow: 0 4px 10px rgba(0,0,0,0.02) inset;
    width: 100%;
}
.placeholder-img::after {
    content: "PHOTO";
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    color: rgba(197, 92, 112, 0.4);
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 0.9em;
}
/* 形ごとのプレースホルダー */
.rect-img {
    aspect-ratio: 4/3;
    border-radius: 8px;
    margin-bottom: 20px;
}
.square-img {
    aspect-ratio: 1/1;
    border-radius: 8px;
}
.circle-img {
    aspect-ratio: 1/1;
    border-radius: 50%;
}
.profile-img {
    aspect-ratio: 1/1;
    border-radius: 50%;
    max-width: 250px;
    margin: 0 auto;
}

/* ファーストビューのカバー */
.first-view-cover {
    border-radius: 0 0 20px 20px;
    margin-bottom: 40px;
}

/* カード要素 (教室の特徴、生徒の声) */
.feature-box, .voice-box {
    background: #fff !important;
    border: 1px solid #f0f0f0 !important;
    box-shadow: 0 5px 20px rgba(0,0,0,0.03) !important;
    border-radius: 12px;
    padding: 30px !important;
    height: 100%;
}
.feature-title {
    font-size: 1.15em;
    border-bottom: 2px dotted #f0f0f0;
    padding-bottom: 10px;
    margin-bottom: 15px;
    color: #4a4a4a;
}
/* --- トップページ デザイン改善終了 --- */
`;
                // 古い追加CSSを取り除いて綺麗にする
                existingCss = existingCss.replace(/\/\* --- トップページ デザイン改善[\s\S]*?--- トップページ デザイン改善終了 ---\s*\*\//g, '');

                await fetch(window.wpApiSettings.root + 'wp/v2/custom_css/' + target.id, {
                    method: 'POST',
                    headers: {
                        'X-WP-Nonce': nonce,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ content: existingCss + '\\n' + styleCSS })
                });
            }
            return { status: 'success' };
        });

        console.log("Result:", result);

    } catch (e) {
        console.error("Error:", e);
    } finally {
        await browser.close();
    }
})();
