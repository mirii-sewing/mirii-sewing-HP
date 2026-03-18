const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    try {
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(180000);

        console.log("Logging in...");
        await page.goto('https://mirii-sewing.online/wp-admin/', { waitUntil: 'networkidle2' });
        await page.type('#user_login', 'antigravity-ai@gmail.com');
        await page.type('#user_pass', 'hE6AnSDQNzN0FJ&lX&ITOU(o');
        await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle2' }), page.click('#wp-submit')]);

        const content = await page.evaluate(async () => {
            const resp = await fetch('/wp-json/wp/v2/pages/18');
            const data = await resp.json();
            return data.content.rendered;
        });

        console.log("Page 18 Content:\n", content);

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
        process.exit(0);
    }
})();
