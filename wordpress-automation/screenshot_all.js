const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    try {
        const page = await browser.newPage();

        const urls = [
            { name: 'top', url: 'https://mirii-sewing.online/' },
            { name: '1day', url: 'https://mirii-sewing.online/1day-lesson/' },
            { name: 'welcome', url: 'https://mirii-sewing.online/%e3%81%af%e3%81%98%e3%82%81%e3%81%a6%e3%81%ae%e6%96%b9%e3%81%b8/' }
        ];

        for (const target of urls) {
            console.log(`Capturing ${target.name}...`);
            // Desktop
            await page.setViewport({ width: 1280, height: 3500 });
            await page.goto(target.url, { waitUntil: 'networkidle2' });
            await new Promise(resolve => setTimeout(resolve, 3000));
            await page.screenshot({ path: `/Users/ayumi/.gemini/antigravity/brain/b3195448-d29e-4066-a535-3f07e06d8a74/step4_all_${target.name}_desktop.png`, fullPage: true });

            // Mobile
            await page.setViewport({ width: 375, height: 4000, isMobile: true, hasTouch: true });
            await page.goto(target.url, { waitUntil: 'networkidle2' });
            await new Promise(resolve => setTimeout(resolve, 3000));
            await page.screenshot({ path: `/Users/ayumi/.gemini/antigravity/brain/b3195448-d29e-4066-a535-3f07e06d8a74/step4_all_${target.name}_mobile.png`, fullPage: true });
        }

        console.log("All Screenshots captured");
    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
})();
