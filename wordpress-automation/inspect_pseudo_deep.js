const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    try {
        const page = await browser.newPage();
        await page.goto('https://mirii-sewing.online/home-new/', { waitUntil: 'networkidle2' });

        const details = await page.evaluate(() => {
            const results = [];
            const h2s = Array.from(document.querySelectorAll('h2'));
            h2s.forEach(h => {
                const hBefore = window.getComputedStyle(h, '::before').content;
                const hAfter = window.getComputedStyle(h, '::after').content;

                const children = Array.from(h.querySelectorAll('*'));
                const childDetails = children.map(c => ({
                    tag: c.tagName,
                    before: window.getComputedStyle(c, '::before').content,
                    after: window.getComputedStyle(c, '::after').content
                }));

                results.push({
                    text: h.innerText,
                    hBefore, hAfter,
                    childDetails
                });
            });
            return results;
        });

        console.log(JSON.stringify(details, null, 2));

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
        process.exit(0);
    }
})();
