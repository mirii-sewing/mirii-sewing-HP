const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 1024 });

    // Home
    await page.goto('https://mirii-sewing.online/', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: '/Users/ayumi/.gemini/antigravity/brain/b3195448-d29e-4066-a535-3f07e06d8a74/final_desktop_check.png', fullPage: false });

    // Mobile check
    await page.setViewport({ width: 375, height: 812 });
    await page.goto('https://mirii-sewing.online/', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: '/Users/ayumi/.gemini/antigravity/brain/b3195448-d29e-4066-a535-3f07e06d8a74/final_mobile_check.png', fullPage: false });

    await browser.close();
})();
