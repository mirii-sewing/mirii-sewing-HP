const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    try {
        const page = await browser.newPage();
        await page.goto('https://mirii-sewing.online/wp-login.php', { waitUntil: 'networkidle2' });
        await page.type('#user_login', 'antigravity-ai@gmail.com');
        await page.type('#user_pass', 'hE6AnSDQNzN0FJ&lX&ITOU(o');
        await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle2' }), page.click('#wp-submit')]);

        await page.goto('https://mirii-sewing.online/wp-admin/edit.php?post_type=page', { waitUntil: 'networkidle2' });
        const pages = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.row-title')).map(a => {
                const row = a.closest('tr');
                const id = row.id.split('-')[1];
                return { title: a.innerText, id: id };
            });
        });
        console.log(JSON.stringify(pages, null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
})();
