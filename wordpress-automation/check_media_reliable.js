const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    try {
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(120000);
        await page.goto('https://mirii-sewing.online/wp-admin/');
        await page.type('#user_login', 'antigravity-ai@gmail.com');
        await page.type('#user_pass', 'hE6AnSDQNzN0FJ&lX&ITOU(o');
        await Promise.all([page.waitForNavigation({ waitUntil: 'load' }), page.click('#wp-submit')]);

        const media = await page.evaluate(async () => {
            const res = await fetch(window.wpApiSettings.root + 'wp/v2/media?per_page=50');
            return await res.json();
        });

        console.log("MEDIA_START");
        media.forEach(m => console.log(`${m.title.rendered}|${m.source_url}`));
        console.log("MEDIA_END");

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
        process.exit(0);
    }
})();
