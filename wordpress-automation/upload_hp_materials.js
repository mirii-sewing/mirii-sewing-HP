const puppeteer = require('puppeteer');
const fs = require('fs');

const WP_URL = 'https://mirii-sewing.online';
const WP_USER = 'antigravity-ai@gmail.com';
const WP_PASS = 'hE6AnSDQNzN0FJ&lX&ITOU(o';

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(300000); // 5分

    console.log("Logging in...");
    await page.goto(`${WP_URL}/wp-admin/`, { waitUntil: 'load' });
    await page.type('#user_login', WP_USER);
    await page.type('#user_pass', WP_PASS);
    await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle2' }), page.click('#wp-submit')]);

    // HP素材直下の画像をざっくり20枚リストアップ
    const images = [
        { name: '001D7F6E-CBC9-4CF3-B2DA-9A9C5AAA1CB4-11064-00000698E96B2607.JPG', path: '/Users/ayumi/Desktop/HP素材/001D7F6E-CBC9-4CF3-B2DA-9A9C5AAA1CB4-11064-00000698E96B2607.JPG' },
        { name: '034DBCFE-5BAB-420A-8801-FE7848598F06-11064-00000698D5D1E139.JPG', path: '/Users/ayumi/Desktop/HP素材/034DBCFE-5BAB-420A-8801-FE7848598F06-11064-00000698D5D1E139.JPG' },
        { name: '3224AE36-550C-4158-A124-B287CD812561-11064-00000698F12CB829.JPG', path: '/Users/ayumi/Desktop/HP素材/3224AE36-550C-4158-A124-B287CD812561-11064-00000698F12CB829.JPG' },
        { name: '4017D5D8-1CF6-4C12-9C3D-9D42E6807741-11064-00000698C60B498F.JPG', path: '/Users/ayumi/Desktop/HP素材/4017D5D8-1CF6-4C12-9C3D-9D42E6807741-11064-00000698C60B498F.JPG' },
        { name: 'IMG_0519.JPG', path: '/Users/ayumi/Desktop/HP素材/IMG_0519.JPG' },
        { name: 'IMG_0899.JPG', path: '/Users/ayumi/Desktop/HP素材/IMG_0899.JPG' },
        { name: 'IMG_1337.JPG', path: '/Users/ayumi/Desktop/HP素材/IMG_1337.JPG' },
        { name: 'IMG_1574.jpg', path: '/Users/ayumi/Desktop/HP素材/IMG_1574.jpg' },
        { name: 'IMG_2713.jpg', path: '/Users/ayumi/Desktop/HP素材/IMG_2713.jpg' },
        { name: 'IMG_2781.JPG', path: '/Users/ayumi/Desktop/HP素材/IMG_2781.JPG' },
        { name: 'IMG_3124.JPG', path: '/Users/ayumi/Desktop/HP素材/IMG_3124.JPG' },
        { name: 'IMG_3679.JPG', path: '/Users/ayumi/Desktop/HP素材/IMG_3679.JPG' },
        { name: 'IMG_4742.JPG', path: '/Users/ayumi/Desktop/HP素材/IMG_4742.JPG' },
        { name: 'IMG_4814.JPG', path: '/Users/ayumi/Desktop/HP素材/IMG_4814.JPG' },
        { name: 'IMG_4843.JPG', path: '/Users/ayumi/Desktop/HP素材/IMG_4843.JPG' },
        { name: 'IMG_5278.JPG', path: '/Users/ayumi/Desktop/HP素材/IMG_5278.JPG' },
        { name: 'IMG_5641.JPG', path: '/Users/ayumi/Desktop/HP素材/IMG_5641.JPG' },
        { name: 'IMG_6824.JPG', path: '/Users/ayumi/Desktop/HP素材/IMG_6824.JPG' },
        { name: 'IMG_7086.JPG', path: '/Users/ayumi/Desktop/HP素材/IMG_7086.JPG' },
        { name: 'IMG_7363.JPG', path: '/Users/ayumi/Desktop/HP素材/IMG_7363.JPG' },
        { name: 'IMG_8313.JPG', path: '/Users/ayumi/Desktop/HP素材/IMG_8313.JPG' },
        { name: 'IMG_8663.jpg', path: '/Users/ayumi/Desktop/HP素材/IMG_8663.jpg' },
        { name: 'IMG_8835.JPG', path: '/Users/ayumi/Desktop/HP素材/IMG_8835.JPG' },
        { name: 'IMG_9230.JPG', path: '/Users/ayumi/Desktop/HP素材/IMG_9230.JPG' },
        { name: 'IMG_9364.JPG', path: '/Users/ayumi/Desktop/HP素材/IMG_9364.JPG' }
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

    fs.writeFileSync('uploaded_hp_materials.json', JSON.stringify(results, null, 2));
    console.log("Done. Results in uploaded_hp_materials.json");
    await browser.close();
})();
