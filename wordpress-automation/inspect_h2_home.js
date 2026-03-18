const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    try {
        const page = await browser.newPage();
        await page.goto('https://mirii-sewing.online/home-new/', { waitUntil: 'networkidle2' });

        const h2Info = await page.evaluate(() => {
            const h2s = Array.from(document.querySelectorAll('h2'));
            return h2s.map(h => ({
                text: h.innerText,
                className: h.className,
                style: h.getAttribute('style'),
                before: window.getComputedStyle(h, '::before').content,
                after: window.getComputedStyle(h, '::after').content,
                parent: h.parentElement.className
            }));
        });

        console.log(JSON.stringify(h2Info, null, 2));

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
        process.exit(0);
    }
})();
