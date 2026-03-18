const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    try {
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(180000);

        await page.goto('https://mirii-sewing.online/wp-admin/customize.php');
        await page.type('#user_login', 'antigravity-ai@gmail.com');
        await page.type('#user_pass', 'hE6AnSDQNzN0FJ&lX&ITOU(o');
        await Promise.all([page.waitForNavigation({ waitUntil: 'load' }), page.click('#wp-submit')]);

        console.log("Waiting for Customizer...");
        await page.waitForSelector('#accordion-section-custom_css');
        await page.click('#accordion-section-custom_css');

        console.log("Injecting CSS...");
        const css = ':root {' +
            '  --mirii-pink-soft: #F4DFE3;' +
            '  --mirii-pink-dark: #D8AEB7;' +
            '  --mirii-green-line: #7FAE9B;' +
            '  --mirii-text: #4A4A4A;' +
            '  --mirii-heading: #333333;' +
            '  --mirii-bg-main: #FAFAFA;' +
            '  --mirii-bg-alt: #F8F5F2;' +
            '  --mirii-border: #E9E6E4;' +
            '}' +
            'body { color: var(--mirii-text) !important; background-color: var(--mirii-bg-main) !important; }' +
            'h1, h2, h3, h4, h5, h6 { color: var(--mirii-heading) !important; }' +
            '.font-mincho { font-family: "Noto Serif JP", serif !important; }' +
            '.page-id-18 .entry-title, .page-id-18 .post-meta, .page-id-24 .entry-title, .page-id-24 .post-meta, .page-id-25 .entry-title, .page-id-25 .post-meta, #sidebar, .sns-share, .sns-follow, .author-info, .post-date, .post-update, .toc, .article-header, .article-footer, .breadcrumb { display: none !important; }' +
            '.page-id-18 #main, .page-id-24 #main, .page-id-25 #main { width: 100% !important; max-width: 100% !important; padding: 0 !important; }' +
            '.btn-mirii-pink { background: var(--mirii-pink-dark) !important; color: #fff !important; border-radius: 50px !important; padding: 16px 40px !important; font-weight: bold; text-decoration: none; display: inline-block; text-align: center; }' +
            '.btn-mirii-green { background: var(--mirii-green-line) !important; color: #fff !important; border-radius: 50px !important; padding: 16px 40px !important; font-weight: bold; text-decoration: none; display: inline-block; text-align: center; }' +
            '.btn-mirii-outline { background: #fff !important; color: var(--mirii-text) !important; border: 1px solid var(--mirii-border) !important; border-radius: 50px !important; padding: 14px 38px !important; font-weight: bold; text-decoration: none; display: inline-block; text-align: center; }' +
            '.badge-mirii { background: var(--mirii-pink-soft) !important; color: var(--mirii-pink-dark) !important; padding: 6px 16px; border-radius: 20px; font-size: 0.85rem; font-weight: bold; margin: 4px; display: inline-block; }' +
            '.section-bg-pink { background: #FCF7F8 !important; border-radius: 12px; }' +
            '.section-bg-beige { background: #F8F5F2 !important; border-radius: 12px; }' +
            '.entry-content { padding: 0 !important; margin: 0 !important; }' +
            '.entry-content > * { max-width: 1000px; margin-left: auto; margin-right: auto; }' +
            '.entry-content > .alignfull { max-width: none; }';

        await page.evaluate((newCss) => {
            const editor = document.querySelector('.CodeMirror').CodeMirror;
            editor.setValue(newCss);
        }, css);

        await page.click('#save');
        console.log("Saving...");
        await new Promise(r => setTimeout(r, 5000));
        console.log("CSS Published.");

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
        process.exit(0);
    }
})();
