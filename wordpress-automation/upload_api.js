
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

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
        { name: 'IMG_3166.jpeg', path: '/Users/ayumi/Desktop/HP素材/お洋服/IMG_3166.jpeg' },
        { name: 'IMG_2991.JPG', path: '/Users/ayumi/Desktop/HP素材/お洋服/IMG_2991.JPG' },
        { name: 'IMG_0121.JPG', path: '/Users/ayumi/Desktop/HP素材/お洋服/IMG_0121.JPG' },
        { name: 'IMG_7104.JPG', path: '/Users/ayumi/Desktop/HP素材/お洋服/IMG_7104.JPG' },
        { name: 'IMG_9363.JPG', path: '/Users/ayumi/Desktop/HP素材/お洋服/IMG_9363.JPG' }
    ];

    const results = {};

    for (const img of images) {
        console.log(`Uploading ${img.name}...`);
        try {
            const fileData = fs.readFileSync(img.path);
            const base64Data = fileData.toString('base64');

            const url = await page.evaluate(async (name, base64) => {
                const response = await fetch('/wp-json/wp/v2/media', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'image/jpeg', // approximate
                        'Content-Disposition': `attachment; filename="${name}"`,
                        'X-WP-Nonce': window.wpApiSettings.nonce
                    },
                    body: Uint8Array.from(atob(base64), c => c.charCodeAt(0))
                });
                const data = await response.json();
                return data.source_url;
            }, img.name, base64Data);

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

    fs.writeFileSync('uploaded_images.json', JSON.stringify(results, null, 2));
    console.log("Done. Results in uploaded_images.json");
    await browser.close();
})();
