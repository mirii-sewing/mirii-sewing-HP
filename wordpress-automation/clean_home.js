const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--window-size=1280,1024'] });
    try {
        const page = await browser.newPage();

        // 1. ログイン
        await page.goto('https://mirii-sewing.online/wp-login.php', { waitUntil: 'networkidle2' });
        await page.type('#user_login', 'antigravity-ai@gmail.com');
        await page.type('#user_pass', 'hE6AnSDQNzN0FJ&lX&ITOU(o');
        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle2' }),
            page.click('#wp-submit')
        ]);
        console.log("Logged in");

        // 2. テーマエディターを開いてstyle.cssに追記
        console.log("Navigating to theme editor...");
        const editorRes = await page.goto('https://mirii-sewing.online/wp-admin/theme-editor.php?file=style.css&theme=cocoon-child-master', { waitUntil: 'networkidle2' });

        if (editorRes.status() === 200) {
            const cssCode = `\n
/* --- AI BOT GENERATED: トップページ用クリーン設定 --- */
body.home .entry-title,
body.home .page-title,
body.home h1.entry-title,
body.home #breadcrumbs,
body.home .breadcrumb,
body.home .post-meta,
body.home .post-date,
body.home .post-update,
body.home .author-info,
body.home .sns-share,
body.home .sns-follow,
body.home .toc,
body.home #toc,
body.home .article-header,
body.home .article-footer,
body.home .date-tags,
body.home #sidebar,
body.home .sidebar,
body.home .widget-area,
body.home .widget,
body.home .entry-categories,
body.home .copy-container {
    display: none !important;
}

body.home #main,
body.home .main {
    width: 100% !important;
    max-width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
    border: none !important;
}
body.home .article {
    border: none !important;
    background: transparent !important;
    padding: 0 !important;
}
body.home #content {
    margin: 0 !important;
    max-width: 100% !important;
    padding-top: 0 !important;
}
/* --- AI BOT GENERATED END --- */
`;

            const injected = await page.evaluate((css) => {
                const cmElement = document.querySelector('.CodeMirror');
                if (!cmElement) return false;
                const cm = cmElement.CodeMirror;
                if (!cm) return false;
                let currentVal = cm.getValue();
                if (!currentVal.includes('AI BOT GENERATED: トップページ用クリーン設定')) {
                    cm.setValue(currentVal + css);
                    return true;
                }
                return 'already updated';
            }, cssCode);

            console.log("Theme Editor Injection:", injected);

            if (injected === true) {
                await Promise.all([
                    page.waitForNavigation({ waitUntil: 'networkidle2' }),
                    page.click('#submit')
                ]);
                console.log("Saved style.css successfully");
            }
        } else {
            console.log("Could not access theme editor normally. Skipping style.css edit.");
        }

        // 3. Cocoonの固定ページ設定（メタボックス）の更新
        console.log("Navigating to Edit Page (post ID 18)...");
        await page.goto('https://mirii-sewing.online/wp-admin/post.php?post=18&action=edit', { waitUntil: 'networkidle2' });

        // ブロックエディタのマウントを待つ
        await page.waitForFunction(() => typeof wp !== 'undefined' && wp.data && wp.data.select('core/editor') !== null, { timeout: 15000 });
        // メタボックス領域が表示されるまで待機（必要に応じて）
        await new Promise(r => setTimeout(r, 3000));

        const metaUpdated = await page.evaluate(() => {
            let updated = false;

            // 1カラム（広い）に設定
            const pageTypeCheck = document.querySelector('input[name="cocoon_page_type"][value="1column_wide"]');
            if (pageTypeCheck && !pageTypeCheck.checked) {
                pageTypeCheck.click();
                updated = true;
            }

            // 各種非表示設定
            const checkboxNames = [
                'cocoon_hide_page_title',
                'cocoon_hide_sns_share_buttons',
                'cocoon_hide_sns_follow_buttons',
                'cocoon_hide_author_info',
                'cocoon_hide_date_info',
                'cocoon_hide_update_info'
            ];

            checkboxNames.forEach(name => {
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

        // 4. Cocoon設定でサイト全体の不要なものを念の為オフにしておく (任意)
        // 今回はトップページに絞るためCSS等で対応済。

    } catch (e) {
        console.error("Error:", e);
    } finally {
        await browser.close();
    }
})();
