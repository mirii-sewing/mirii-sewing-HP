
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    try {
        console.log("Navigating to login...");
        await page.goto('https://mirii-sewing.online/wp-admin/', { waitUntil: 'load' });

        console.log("Entering credentials...");
        await page.type('#user_login', 'antigravity-ai@gmail.com');
        await page.type('#user_pass', 'hE6AnSDQNzN0FJ&lX&ITOU(o');

        console.log("Submitting...");
        await page.click('#wp-submit');

        console.log("Waiting for dashboard...");
        await page.waitForSelector('#wpadminbar', { timeout: 30000 });

        const title = await page.title();
        console.log("Logged in! Dashboard Title:", title);

        await page.screenshot({ path: 'login_verify.png' });
    } catch (e) {
        console.error("Login Failed:", e.message);
        await page.screenshot({ path: 'login_failed_error.png' });
    } finally {
        await browser.close();
    }
})();
