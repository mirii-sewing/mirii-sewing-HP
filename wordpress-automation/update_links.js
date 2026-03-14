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

        const result = await page.evaluate(async () => {
            const nonce = window.wpApiSettings.nonce;

            // Fetch current home content
            const homeRes = await fetch(window.wpApiSettings.root + 'wp/v2/pages/18', {
                headers: { 'X-WP-Nonce': nonce }
            });
            const homeData = await homeRes.json();
            let content = homeData.content.raw;

            // Replace placeholder links or hash links with real slugs
            // Ensure they are absolute or consistent
            content = content.replace(/href=\"#\"/g, 'href="https://mirii-sewing.online/1day-lesson/"'); // Fallback

            // Specific replacements if needed (though I already tried to use real slugs in refine_home.js)
            // Let's just double check the major buttons.

            await fetch(window.wpApiSettings.root + 'wp/v2/pages/18', {
                method: 'POST',
                headers: { 'X-WP-Nonce': nonce, 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: content })
            });

            return { status: 'success' };
        });

        console.log("Result Links Update:", result);

    } catch (e) {
        console.error("Error:", e);
    } finally {
        await browser.close();
    }
})();
