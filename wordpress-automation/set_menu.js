const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--window-size=1280,1024'] });
    try {
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(60000);

        console.log("Logging in...");
        await page.goto('https://mirii-sewing.online/wp-login.php', { waitUntil: 'networkidle2' });
        await page.type('#user_login', 'antigravity-ai@gmail.com');
        await page.type('#user_pass', 'hE6AnSDQNzN0FJ&lX&ITOU(o');
        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle2' }),
            page.click('#wp-submit')
        ]);

        console.log("Navigating to Menus...");
        await page.goto('https://mirii-sewing.online/wp-admin/nav-menus.php', { waitUntil: 'networkidle2' });

        const menuCount = await page.evaluate(() => document.querySelectorAll('#select-menu-to-edit option').length);

        if (menuCount <= 1) { // Only 'Select a menu' or none
            console.log("No menu found, creating 'Main Menu'...");
            await page.waitForSelector('#menu-name');
            await page.type('#menu-name', 'メインメニュー');
            await Promise.all([
                page.waitForNavigation({ waitUntil: 'networkidle2' }),
                page.click('#save_menu_header')
            ]);
        }

        console.log("Adding pages to menu...");
        // Check all major pages
        await page.evaluate(() => {
            const desired = ['はじめての方へ', '教室の特徴', '1Day体験レッスン', '4ヶ月少人数継続コース', '生徒さんの声', '講師プロフィール', 'よくある質問'];
            const labels = Array.from(document.querySelectorAll('#pages-all label, #page-checklist label'));
            labels.forEach(l => {
                if (desired.some(d => l.innerText.includes(d))) {
                    const cb = l.querySelector('input');
                    if (cb) cb.checked = true;
                }
            });
        });

        await page.click('#submit-posttype-page');
        await new Promise(r => setTimeout(r, 3000));

        console.log("Setting location and saving...");
        await page.evaluate(() => {
            const loc = document.querySelector('input[value="header-menu"]');
            if (loc) loc.checked = true;
        });

        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle2' }),
            page.click('#save_menu_footer') // Sometimes header/footer buttons work better
        ]);

        console.log("Menu sync complete.");

    } catch (e) {
        console.error("Menu script error:", e);
    } finally {
        await browser.close();
    }
})();
