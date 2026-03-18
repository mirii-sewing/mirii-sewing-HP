const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const filesToUpload = [
        '/Users/ayumi/Pictures/動画素材/Capture001.png',
        '/Users/ayumi/Pictures/動画素材/64D9D67A-4638-4A57-A15C-79560E941E9B-71066-000016B28B41CE60.jpeg',
        '/Users/ayumi/Pictures/動画素材/IMG_3016_0.jpg',
        '/Users/ayumi/Pictures/動画素材/IMG_3017_0.jpg'
    ];

    try {
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(180000);

        await page.goto('https://mirii-sewing.online/wp-login.php');
        await page.type('#user_login', 'antigravity-ai@gmail.com');
        await page.type('#user_pass', 'hE6AnSDQNzN0FJ&lX&ITOU(o');
        await Promise.all([page.waitForNavigation({ waitUntil: 'load' }), page.click('#wp-submit')]);

        for (const file of filesToUpload) {
            console.log(`Uploading ${path.basename(file)}...`);
            await page.goto('https://mirii-sewing.online/wp-admin/media-new.php');
            const input = await page.$('input[type="file"]');
            await input.uploadFile(file);
            await page.waitForSelector('.bar', { hidden: true, timeout: 120000 });
        }

        const media = await page.evaluate(async () => {
            const res = await fetch(window.wpApiSettings.root + 'wp/v2/media?per_page=10');
            return await res.json();
        });

        media.forEach(m => console.log(`${m.title.rendered}|${m.source_url}`));

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
        process.exit(0);
    }
})();
