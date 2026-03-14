const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setViewport({ width: 375, height: 812 }); // Mobile size
    await page.goto('https://mirii-sewing.online/');
    await page.screenshot({ path: '/Users/ayumi/.gemini/antigravity/brain/b3195448-d29e-4066-a535-3f07e06d8a74/mirii_mobile_preview_2.png', fullPage: true });
    await browser.close();
})();
