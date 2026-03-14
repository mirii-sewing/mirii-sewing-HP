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

        console.log("Navigating to Edit Page 24...");
        await page.goto('https://mirii-sewing.online/wp-admin/post.php?post=24&action=edit', { waitUntil: 'networkidle2' });

        // Wait for Block editor to load
        await page.waitForFunction(() => typeof wp !== 'undefined' && wp.data && wp.data.select('core/editor') !== null, { timeout: 15000 });
        // Wait for Meta boxes slightly
        await new Promise(r => setTimeout(r, 4000));

        const metaUpdated = await page.evaluate(() => {
            let updated = false;

            // Page type -> 1 Column Wide
            const pageTypeCheck = document.querySelector('input[name="cocoon_page_type"][value="1column_wide"]');
            if (pageTypeCheck && !pageTypeCheck.checked) {
                pageTypeCheck.click();
                updated = true;
            }

            // Hide everything that looks like a blog
            const hideList = [
                'cocoon_hide_page_title',
                'cocoon_hide_sns_share_buttons',
                'cocoon_hide_sns_follow_buttons',
                'cocoon_hide_author_info',
                'cocoon_hide_date_info',
                'cocoon_hide_update_info'
            ];

            hideList.forEach(name => {
                const cb = document.querySelector('input[name="' + name + '"]');
                if (cb && !cb.checked) {
                    cb.click();
                    updated = true;
                }
            });

            return updated;
        });

        console.log("Meta boxes updated:", metaUpdated);

        if (metaUpdated) {
            await page.evaluate(() => {
                wp.data.dispatch('core/editor').savePost();
            });
            console.log("Saving post...");
            await new Promise(r => setTimeout(r, 5000));
            console.log("Post saved.");
        }

    } catch (e) {
        console.error("Error:", e);
    } finally {
        await browser.close();
    }
})();
