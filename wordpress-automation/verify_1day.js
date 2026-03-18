const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setViewport({ width: 375, height: 812 });
    await page.goto('https://mirii-sewing.online/1day-lesson/', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: '/Users/ayumi/.gemini/antigravity/brain/b3195448-d29e-4066-a535-3f07e06d8a74/1day_lesson_current_verify.png', fullPage: true });
    await browser.close();
})();
