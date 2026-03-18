const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    try {
        const page = await browser.newPage();
        await page.goto('https://mirii-sewing.online/wp-login.php');
        await page.type('#user_login', 'antigravity-ai@gmail.com');
        await page.type('#user_pass', 'hE6AnSDQNzN0FJ&lX&ITOU(o');
        await Promise.all([page.waitForNavigation({ waitUntil: 'load' }), page.click('#wp-submit')]);

        await page.goto('https://mirii-sewing.online/wp-admin/post.php?post=24&action=edit');

        const templates = await page.evaluate(() => {
            const select = document.querySelector('#post_template, .editor-page-attributes__template select');
            if (!select) return "Select not found";
            return Array.from(select.options).map(o => ({ text: o.text, value: o.value }));
        });

        console.log(JSON.stringify(templates, null, 2));

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
        process.exit(0);
    }
})();
