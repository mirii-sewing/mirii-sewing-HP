const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    try {
        const page = await browser.newPage();
        const brain = '/Users/ayumi/.gemini/antigravity/brain/b3195448-d29e-4066-a535-3f07e06d8a74/';

        const check = async (url, name) => {
            console.log("Capturing " + name + "...");
            await page.setViewport({ width: 1440, height: 900 });
            await page.goto(url, { waitUntil: 'networkidle2' });
            await page.screenshot({ path: brain + 'v8_final_' + name + '_desktop.png', fullPage: true });
        };

        await check('https://mirii-sewing.online/home-new/', 'home');
        await check('https://mirii-sewing.online/1day-lesson/', '1day');
        await check('https://mirii-sewing.online/welcome/', 'welcome');

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
        process.exit(0);
    }
})();
