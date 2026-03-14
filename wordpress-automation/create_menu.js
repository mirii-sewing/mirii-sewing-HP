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

        // Wait for potential redirect or loading
        await new Promise(r => setTimeout(r, 2000));

        // Let's use a simpler approach: check if we are on "create a new menu" or "edit existing"
        const isEditing = await page.evaluate(() => {
            return !!document.querySelector('#menu-name');
        });

        if (!isEditing) {
            console.log("No menu selected, creating a new one...");
            const createLink = await page.$('a[href*="action=edit&menu=0"]');
            if (createLink) await createLink.click();
            await page.waitForSelector('#menu-name');
            await page.type('#menu-name', 'メインナビゲーション');
            await Promise.all([
                page.waitForNavigation({ waitUntil: 'networkidle2' }),
                page.click('#save_menu_header')
            ]);
        }

        console.log("Selecting 'View All' tab for pages...");
        const viewAllTab = await page.waitForSelector('#pages-all-pop-at-top', { visible: true, timeout: 5000 }).catch(() => null);
        if (viewAllTab) {
            await viewAllTab.click();
        } else {
            console.log("View All tab not found directly, trying selector #show-all-pages-all");
            await page.click('#show-all-pages-all').catch(e => console.log("Click failed, might be already active"));
        }

        await new Promise(r => setTimeout(r, 1000));

        console.log("Checking page checkboxes...");
        await page.evaluate(() => {
            const labelsMatch = ['はじめての方へ', '教室の特徴', '1Day体験レッスン', '4ヶ月少人数継続コース', '生徒さんの声', '講師プロフィール', 'よくある質問'];
            const checkboxes = document.querySelectorAll('#pages-all .menu-item-checkbox, #page-checklist .menu-item-checkbox');
            checkboxes.forEach(cb => {
                const labelText = cb.closest('label').innerText.trim();
                if (labelsMatch.some(l => labelText.includes(l))) {
                    cb.checked = true;
                }
            });
        });

        console.log("Adding to menu...");
        await page.click('#submit-posttype-page');
        await new Promise(r => setTimeout(r, 5000));

        // Set as Header Menu (Cocoon uses header-menu)
        console.log("Setting menu location...");
        await page.evaluate(() => {
            const headerMenuCb = document.querySelector('input[value="header-menu"]');
            if (headerMenuCb) headerMenuCb.checked = true;
        });

        console.log("Saving menu...");
        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle2' }),
            page.click('#save_menu_header')
        ]);
        console.log("Menu created and saved successfully.");

    } catch (e) {
        console.error("Error creating menu:", e);
    } finally {
        await browser.close();
    }
})();
