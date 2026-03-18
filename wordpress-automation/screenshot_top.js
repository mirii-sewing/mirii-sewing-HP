const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    try {
        const page = await browser.newPage();

        // Desktop
        await page.setViewport({ width: 1280, height: 3500 });
        await page.goto('https://mirii-sewing.online/', { waitUntil: 'networkidle2' });
        await new Promise(resolve => setTimeout(resolve, 3000));
        await page.screenshot({ path: '/Users/ayumi/.gemini/antigravity/brain/b3195448-d29e-4066-a535-3f07e06d8a74/step1_top_desktop.png', fullPage: true });

        // Mobile
        await page.setViewport({ width: 375, height: 4000, isMobile: true, hasTouch: true });
        await page.goto('https://mirii-sewing.online/', { waitUntil: 'networkidle2' });
        await new Promise(resolve => setTimeout(resolve, 3000));
        await page.screenshot({ path: '/Users/ayumi/.gemini/antigravity/brain/b3195448-d29e-4066-a535-3f07e06d8a74/step1_top_mobile.png', fullPage: true });

        console.log("Screenshots captured");
    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
})();
