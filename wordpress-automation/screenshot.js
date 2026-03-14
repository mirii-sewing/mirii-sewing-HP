const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setViewport({ width: 375, height: 812 }); // Mobile size
    await page.goto('https://mirii-sewing.online/');
    await page.screenshot({ path: '/Users/ayumi/.gemini/antigravity/scratch/wp_bot/mobile_screenshot.png', fullPage: true });
    await browser.close();
})();
