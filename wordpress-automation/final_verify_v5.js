const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    try {
        const page = await browser.newPage();
        const brain = '/Users/ayumi/.gemini/antigravity/brain/b3195448-d29e-4066-a535-3f07e06d8a74/';

        const check = async (url, name) => {
            console.log("Checking " + name + "...");
            await page.goto(url, { waitUntil: 'networkidle2' });

            // Check visibility
            const visibility = await page.evaluate(() => {
                const isHidden = (sel) => {
                    const el = document.querySelector(sel);
                    if (!el) return "not_present";
                    const style = window.getComputedStyle(el);
                    return style.display === 'none' ? "hidden" : "visible";
                };
                return {
                    sidebar: isHidden('#sidebar'),
                    entryTitle: isHidden('.entry-title'),
                    share: isHidden('.sns-share'),
                    author: isHidden('.author-info'),
                    toc: isHidden('.toc'),
                    breadcrumb: isHidden('.breadcrumb')
                };
            });
            console.log(name + " visibility:", JSON.stringify(visibility, null, 2));

            // Desktop Screenshot
            await page.setViewport({ width: 1440, height: 900 });
            await page.screenshot({ path: brain + 'v5_final_' + name + '_desktop.png', fullPage: true });
            // Mobile Screenshot
            await page.setViewport({ width: 375, height: 812, isMobile: true });
            await page.screenshot({ path: brain + 'v5_final_' + name + '_mobile.png', fullPage: true });
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
