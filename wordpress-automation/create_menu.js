const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--window-size=1280,1024'] });
    try {
        const page = await browser.newPage();

        await page.goto('https://mirii-sewing.online/wp-login.php', { waitUntil: 'networkidle2' });
        await page.type('#user_login', 'antigravity-ai@gmail.com');
        await page.type('#user_pass', 'hE6AnSDQNzN0FJ&lX&ITOU(o');
        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle2' }),
            page.click('#wp-submit')
        ]);

        console.log("Creating menu via admin UI...");
        await page.goto('https://mirii-sewing.online/wp-admin/nav-menus.php', { waitUntil: 'networkidle2' });

        // Check if menu exists, if not create one
        const menuExists = await page.evaluate(() => {
            return document.querySelector('#menu-name') === null && document.querySelector('.menu-edit') !== null;
        });

        if (!menuExists) {
            await page.type('#menu-name', 'メインナビゲーション');
            await Promise.all([
                page.waitForNavigation({ waitUntil: 'networkidle2' }),
                page.click('#save_menu_header')
            ]);
        }

        // Add pages to menu
        // We'll just check all pages and add them
        await page.click('#show-all-pages-all');
        await page.evaluate(() => {
            const labels = ['はじめての方へ', '教室の特徴', '1Day体験レッスン', '4ヶ月少人数継続コース', '生徒さんの声', '講師プロフィール', 'よくある質問'];
            document.querySelectorAll('#pages-all .menu-item-checkbox').forEach(cb => {
                const label = cb.closest('label').innerText.trim();
                if (labels.some(l => label.includes(l))) {
                    cb.checked = true;
                }
            });
        });

        await page.click('#submit-posttype-page');
        await new Promise(r => setTimeout(r, 4000));

        // Set as Header Menu
        await page.evaluate(() => {
            const cb = document.querySelector('input[value="header-menu"]');
            if (cb) cb.checked = true;
        });

        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle2' }),
            page.click('#save_menu_header')
        ]);
        console.log("Menu created and saved.");

    } catch (e) {
        console.error("Error:", e);
    } finally {
        await browser.close();
    }
})();
