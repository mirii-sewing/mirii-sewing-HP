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

        await page.waitForSelector('#accordion-section-custom_css');
        await page.click('#accordion-section-custom_css');

        await page.evaluate(() => {
            const editor = document.querySelector('.CodeMirror').CodeMirror;
            const current = editor.getValue();
            const additional = '\n/* Remove Heading Numbers */\nh2::before, h3::before, .entry-content h2::before, .entry-content h3::before { content: none !important; }';
            editor.setValue(current + additional);
        });

        await page.click('#save');
        await new Promise(r => setTimeout(r, 5000));
        console.log("Polished.");

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
        process.exit(0);
    }
})();
