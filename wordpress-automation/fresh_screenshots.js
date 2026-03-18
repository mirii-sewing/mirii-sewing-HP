const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    try {
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(180000);

        console.log("Taking screenshots...");
        // Home
        await page.goto('https://mirii-sewing.online/home-new/', { waitUntil: 'load' });
        await page.screenshot({ path: '/Users/ayumi/.gemini/antigravity/brain/b3195448-d29e-4066-a535-3f07e06d8a74/verify_v3_home.png', fullPage: true });
        // 1Day
        await page.goto('https://mirii-sewing.online/1day-lesson/', { waitUntil: 'load' });
        await page.screenshot({ path: '/Users/ayumi/.gemini/antigravity/brain/b3195448-d29e-4066-a535-3f07e06d8a74/verify_v3_1day.png', fullPage: true });
        // Welcome
        await page.goto('https://mirii-sewing.online/welcome/', { waitUntil: 'load' });
        await page.screenshot({ path: '/Users/ayumi/.gemini/antigravity/brain/b3195448-d29e-4066-a535-3f07e06d8a74/verify_v3_welcome.png', fullPage: true });

        console.log("Done.");
    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
        process.exit(0);
    }
})();
