const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setViewport({ width: 375, height: 812 }); // Mobile size

    // Screenshot 1Day
    await page.goto('https://mirii-sewing.online/1day-lesson/', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: '/Users/ayumi/.gemini/antigravity/brain/b3195448-d29e-4066-a535-3f07e06d8a74/mirii_mobile_preview_1day_updated.png', fullPage: true });

    // Screenshot Welcome
    await page.goto('https://mirii-sewing.online/welcome/', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: '/Users/ayumi/.gemini/antigravity/brain/b3195448-d29e-4066-a535-3f07e06d8a74/mirii_mobile_preview_welcome.png', fullPage: true });

    await browser.close();
})();
