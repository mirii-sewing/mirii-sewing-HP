const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    try {
        const page = await browser.newPage();
        await page.goto('https://mirii-sewing.online/1day-lesson/', { waitUntil: 'networkidle2' });

        const data = await page.evaluate(() => {
            const getInfo = (selector) => {
                const el = document.querySelector(selector);
                return el ? { exists: true, classes: el.className, id: el.id } : { exists: false };
            };

            return {
                bodyClasses: document.body.className,
                sidebar: getInfo('#sidebar'),
                share: getInfo('.sns-share'),
                follow: getInfo('.sns-follow'),
                author: getInfo('.author-info'),
                title: getInfo('.entry-title'),
                meta: getInfo('.post-meta'),
                toc: getInfo('.toc'),
                breadcrumb: getInfo('.breadcrumb'),
                header: getInfo('.article-header'),
                footer: getInfo('.article-footer'),
                main: getInfo('#main'),
                container: getInfo('#container'),
                content: getInfo('.entry-content')
            };
        });

        console.log(JSON.stringify(data, null, 2));

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
        process.exit(0);
    }
})();
