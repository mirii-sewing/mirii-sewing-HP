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
        { name: 'IMG_8524.JPG', path: '/Users/ayumi/Desktop/HP素材/お洋服/IMG_8524.JPG' },
        { name: 'IMG_5640.JPG', path: '/Users/ayumi/Desktop/HP素材/お洋服/IMG_5640.JPG' },
        { name: 'IMG_9330.JPG', path: '/Users/ayumi/Desktop/HP素材/お洋服/IMG_9330.JPG' },
        { name: 'IMG_7105.JPG', path: '/Users/ayumi/Desktop/HP素材/お洋服/IMG_7105.JPG' },
        { name: 'IMG_8313.JPG', path: '/Users/ayumi/Desktop/HP素材/お洋服/IMG_8313.JPG' },
        { name: 'IMG_9345.PNG', path: '/Users/ayumi/Desktop/HP素材/お洋服/IMG_9345.PNG' },
        { name: 'IMG_9961.JPG', path: '/Users/ayumi/Desktop/HP素材/お洋服/IMG_9961.JPG' },
        { name: 'IMG_5667.JPG', path: '/Users/ayumi/Desktop/HP素材/お洋服/IMG_5667.JPG' },
        { name: 'IMG_7086.JPG', path: '/Users/ayumi/Desktop/HP素材/お洋服/IMG_7086.JPG' }
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

    // append to previous records
    let oldResults = {};
    if (fs.existsSync('uploaded_top_images.json')) {
        try {
            oldResults = JSON.parse(fs.readFileSync('uploaded_top_images.json'));
        } catch (e) { }
    }
    const finalResults = { ...oldResults, ...results };
    fs.writeFileSync('uploaded_top_images.json', JSON.stringify(finalResults, null, 2));
    console.log("Done. Results in uploaded_top_images.json");
    await browser.close();
})();
