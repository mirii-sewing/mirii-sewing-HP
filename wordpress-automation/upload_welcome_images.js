const puppeteer = require('puppeteer');
const fs = require('fs');

const WP_URL = 'https://mirii-sewing.online';
const WP_USER = 'antigravity-ai@gmail.com';
const WP_PASS = 'hE6AnSDQNzN0FJ&lX&ITOU(o';

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(180000);

    console.log("Logging in...");
    await page.goto(`${WP_URL}/wp-admin/`, { waitUntil: 'networkidle2' });
    await page.type('#user_login', WP_USER);
    await page.type('#user_pass', WP_PASS);
    await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle2' }), page.click('#wp-submit')]);

    const images = [
        { name: 'IMG_7875.JPG', path: '/Users/ayumi/Desktop/HP素材/お洋服/IMG_7875.JPG' }, // 準備された綺麗なテーブル
        { name: 'IMG_8314.JPG', path: '/Users/ayumi/Desktop/HP素材/お洋服/IMG_8314.JPG' }, // 嬉しそうに走るお子さん
        { name: 'IMG_9684.JPG', path: '/Users/ayumi/Desktop/HP素材/お洋服/IMG_9684.JPG' }, // 手元のサポート
        { name: 'IMG_8910.JPG', path: '/Users/ayumi/Desktop/HP素材/お洋服/IMG_8910.JPG' }  // 色とりどりの生地や糸
    ];

    const results = {};

    for (const img of images) {
        console.log(`Uploading ${img.name}...`);
        try {
            if (!fs.existsSync(img.path)) {
                console.log(`File missing: ${img.path}`);
                continue;
            }
            const fileData = fs.readFileSync(img.path);
            const base64Data = fileData.toString('base64');
            const mimeType = img.name.endsWith('.PNG') || img.name.endsWith('.png') ? 'image/png' : 'image/jpeg';

            const url = await page.evaluate(async (name, base64, mime) => {
                const response = await fetch('/wp-json/wp/v2/media', {
                    method: 'POST',
                    headers: {
                        'Content-Type': mime,
                        'Content-Disposition': `attachment; filename="${name}"`,
                        'X-WP-Nonce': window.wpApiSettings.nonce
                    },
                    body: Uint8Array.from(atob(base64), c => c.charCodeAt(0))
                });
                const data = await response.json();
                return data.source_url;
            }, img.name, base64Data, mimeType);

            if (url) {
                results[img.name] = url;
                console.log(`Success: ${img.name} -> ${url}`);
            } else {
                console.log(`Failed to get URL for ${img.name}`);
            }
        } catch (e) {
            console.error(`Error uploading ${img.name}:`, e.message);
        }
    }

    fs.writeFileSync('uploaded_welcome_images.json', JSON.stringify(results, null, 2));
    console.log("Done. Results in uploaded_welcome_images.json");
    await browser.close();
})();
