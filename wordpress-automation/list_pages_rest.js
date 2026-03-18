const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    try {
        const page = await browser.newPage();
        await page.goto('https://mirii-sewing.online/wp-login.php');
        await page.type('#user_login', 'antigravity-ai@gmail.com');
        await page.type('#user_pass', 'hE6AnSDQNzN0FJ&lX&ITOU(o');
        await Promise.all([page.waitForNavigation({ waitUntil: 'load' }), page.click('#wp-submit')]);

        const pages = await page.evaluate(async () => {
            const res = await fetch(window.wpApiSettings.root + 'wp/v2/pages?per_page=100');
            return await res.json();
        });

        pages.forEach(p => console.log(`${p.id}: ${p.title.rendered} (${p.slug})`));

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
        process.exit(0);
    }
})();
