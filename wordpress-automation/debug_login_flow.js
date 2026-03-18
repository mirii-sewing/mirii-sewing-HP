const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    try {
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 1024 });

        console.log("1. Navigating to login...");
        await page.goto('https://mirii-sewing.online/wp-login.php', { waitUntil: 'networkidle2' });
        await page.screenshot({ path: '/Users/ayumi/.gemini/antigravity/brain/b3195448-d29e-4066-a535-3f07e06d8a74/debug_login_1.png' });

        console.log("2. Typing credentials...");
        await page.type('#user_login', 'antigravity-ai@gmail.com');
        await page.type('#user_pass', 'hE6AnSDQNzN0FJ&lX&ITOU(o');
        await page.screenshot({ path: '/Users/ayumi/.gemini/antigravity/brain/b3195448-d29e-4066-a535-3f07e06d8a74/debug_login_2.png' });

        console.log("3. Submitting...");
        await page.click('#wp-submit');

        await new Promise(r => setTimeout(r, 15000));
        await page.screenshot({ path: '/Users/ayumi/.gemini/antigravity/brain/b3195448-d29e-4066-a535-3f07e06d8a74/debug_login_3.png' });

        console.log("Debug screenshots taken.");
    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
        process.exit(0);
    }
})();
