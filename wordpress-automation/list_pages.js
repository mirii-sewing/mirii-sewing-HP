
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    try {
        const page = await browser.newPage();
        await page.goto('https://mirii-sewing.online/wp-admin/', { waitUntil: 'networkidle2' });
        await page.type('#user_login', 'antigravity-ai@gmail.com');
        await page.type('#user_pass', 'hE6AnSDQNzN0FJ&lX&ITOU(o');
        await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle2' }), page.click('#wp-submit')]);

        const pages = await page.evaluate(async () => {
            const response = await fetch('/wp-json/wp/v2/pages');
            const data = await response.json();
            return data.map(p => ({ id: p.id, title: p.title.rendered, slug: p.slug }));
        });

        console.log(JSON.stringify(pages, null, 2));

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
})();
