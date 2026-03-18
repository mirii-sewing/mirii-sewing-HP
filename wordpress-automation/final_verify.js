const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    try {
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(180000);
        const brain = '/Users/ayumi/.gemini/antigravity/brain/b3195448-d29e-4066-a535-3f07e06d8a74/';

        const capture = async (url, name) => {
            console.log(`Capturing ${name}...`);
            // Desktop
            await page.setViewport({ width: 1440, height: 900 });
            await page.goto(url, { waitUntil: 'networkidle2' });
            await page.screenshot({ path: \`\${brain}final_\${name}_desktop.png\`, fullPage: true });
            // Mobile
            await page.setViewport({ width: 375, height: 812, isMobile: true });
            await page.goto(url, { waitUntil: 'networkidle2' });
            await page.screenshot({ path: \`\${brain}final_\${name}_mobile.png\`, fullPage: true });
        };

        await capture('https://mirii-sewing.online/home-new/', 'home');
        await capture('https://mirii-sewing.online/1day-lesson/', '1day');
        await capture('https://mirii-sewing.online/welcome/', 'welcome');

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
        process.exit(0);
    }
})();
