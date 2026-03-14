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

        console.log("Navigating to theme editor...");
        const editorRes = await page.goto('https://mirii-sewing.online/wp-admin/theme-editor.php?file=style.css&theme=cocoon-child-master', { waitUntil: 'networkidle2' });

        if (editorRes.status() === 200) {
            const injected = await page.evaluate(() => {
                const cmElement = document.querySelector('.CodeMirror');
                if (!cmElement) return false;
                const cm = cmElement.CodeMirror;
                if (!cm) return false;
                let currentVal = cm.getValue();

                // Add page-id-24 to styles
                if (currentVal.includes('body.home .entry-title') && !currentVal.includes('body.page-id-24 .entry-title')) {
                    const newVal = currentVal.replace(/body\.home /g, 'body.home , body.page-id-24 ');
                    cm.setValue(newVal);
                    return true;
                }
                return 'already updated or not found';
            });

            console.log("Theme Editor Injection:", injected);

            if (injected === true) {
                await Promise.all([
                    page.waitForNavigation({ waitUntil: 'networkidle2' }),
                    page.click('#submit')
                ]);
                console.log("Saved style.css successfully");
            }
        }
    } catch (e) {
        console.error("Error:", e);
    } finally {
        await browser.close();
    }
})();
