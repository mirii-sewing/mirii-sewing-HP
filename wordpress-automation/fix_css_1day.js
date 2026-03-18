const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    try {
        const page = await browser.newPage();
        await page.goto('https://mirii-sewing.online/wp-login.php', { waitUntil: 'networkidle2' });
        await page.type('#user_login', 'antigravity-ai@gmail.com');
        await page.type('#user_pass', 'hE6AnSDQNzN0FJ&lX&ITOU(o');
        await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle2' }), page.click('#wp-submit')]);

        await page.goto('https://mirii-sewing.online/wp-admin/theme-editor.php?file=style.css&theme=cocoon-child-master', { waitUntil: 'networkidle2' });
        const css = `
/* 1Day Lesson Page (ID: 24) Explicit Clean Up */
body.page-id-24 .entry-title,
body.page-id-24 .post-meta,
body.page-id-24 .sns-share,
body.page-id-24 .sns-follow,
body.page-id-24 .author-info,
body.page-id-24 .post-date,
body.page-id-24 .post-update,
body.page-id-24 .toc,
body.page-id-24 .article-header,
body.page-id-24 .article-footer,
body.page-id-24 #sidebar {
    display: none !important;
}
body.page-id-24 #main {
    width: 100% !important;
    max-width: 100% !important;
    padding: 0 !important;
}
body.page-id-24 .article {
    border: none !important;
    background: transparent !important;
}
`;
        await page.evaluate((css) => {
            const cm = document.querySelector('.CodeMirror').CodeMirror;
            const val = cm.getValue();
            if (!val.includes('body.page-id-24 .entry-title')) {
                cm.setValue(val + css);
            }
        }, css);
        await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle2' }), page.click('#submit')]);
        console.log("CSS Updated");
    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
})();
