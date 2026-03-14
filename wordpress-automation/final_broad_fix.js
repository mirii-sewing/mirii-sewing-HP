const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--window-size=1280,1024'] });
    try {
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(60000);

        await page.goto('https://mirii-sewing.online/wp-login.php', { waitUntil: 'networkidle2' });
        await page.type('#user_login', 'antigravity-ai@gmail.com');
        await page.type('#user_pass', 'hE6AnSDQNzN0FJ&lX&ITOU(o');
        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle2' }),
            page.click('#wp-submit')
        ]);

        console.log("Updating CSS broadly...");
        await page.goto('https://mirii-sewing.online/wp-admin/theme-editor.php?file=style.css&theme=cocoon-child-master', { waitUntil: 'networkidle2' });
        await page.evaluate(() => {
            const cm = document.querySelector('.CodeMirror').CodeMirror;
            let val = cm.getValue();

            // Add a global rule for all fixed pages
            const globalRule = `
/* --------------------------------------------------
 * 固定ページ全体：ブログ要素の非表示
 * -------------------------------------------------- */
.page .entry-title, 
.page .post-meta, 
.page .sns-share, 
.page .sns-follow, 
.page .author-info, 
.page .post-date, 
.page .post-update,
.page .toc,
.page #sidebar {
    display: none !important;
}

.page #main {
    width: 100% !important;
    max-width: 100% !important;
    padding: 0 !important;
}

.page .article {
    border: none !important;
    background: transparent !important;
}
`;
            if (!val.includes('.page .entry-title')) {
                cm.setValue(val + globalRule);
            }
        });
        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle2' }),
            page.click('#submit')
        ]);

        console.log("Setting header menu location...");
        await page.goto('https://mirii-sewing.online/wp-admin/nav-menus.php?action=locations', { waitUntil: 'networkidle2' });
        await page.evaluate(() => {
            const select = document.querySelector('select[name="menu-locations[header-menu]"]');
            if (select && select.options.length > 1) {
                select.selectedIndex = 1; // Assign the first available menu
            }
        });
        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle2' }),
            page.click('#submit')
        ]);

        console.log("Final layout check sync...");

    } catch (e) {
        console.error("Final fix error:", e);
    } finally {
        await browser.close();
    }
})();
