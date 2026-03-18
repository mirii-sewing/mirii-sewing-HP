
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const WP_URL = 'https://mirii-sewing.online';
const WP_USER = 'antigravity-ai@gmail.com';
const WP_PASS = 'hE6AnSDQNzN0FJ&lX&ITOU(o';

async function uploadImages() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    console.log('Logging in...');
    await page.goto(`${WP_URL}/wp-login.php`, { waitUntil: 'networkidle2' });
    await page.type('#user_login', WP_USER);
    await page.type('#user_pass', WP_PASS);
    await page.click('#wp-submit');
    await page.waitForNavigation();

    const imagesToUpload = [
        '/Users/ayumi/Desktop/HP素材/お洋服/IMG_3166.jpeg',
        '/Users/ayumi/Desktop/HP素材/お洋服/IMG_2991.JPG',
        '/Users/ayumi/Desktop/HP素材/お洋服/IMG_0121.JPG',
        '/Users/ayumi/Desktop/HP素材/お洋服/IMG_7104.JPG',
        '/Users/ayumi/Desktop/HP素材/お洋服/IMG_9363.JPG'
    ];

    const results = {};

    for (const imgPath of imagesToUpload) {
        console.log(`Uploading ${imgPath}...`);
        await page.goto(`${WP_URL}/wp-admin/media-new.php`, { waitUntil: 'networkidle2' });

        const inputUpload = await page.$('input[name="async-upload"]');
        if (!inputUpload) {
            // Might be the plupload UI, try to click "browser" or similar
            // Or just use the simple uploader
            await page.goto(`${WP_URL}/wp-admin/media-new.php?browser-uploader`, { waitUntil: 'networkidle2' });
            const browserInput = await page.$('input[name="async-upload"]');
            await browserInput.uploadFile(imgPath);
            await page.click('input[name="html-upload"]');
            await page.waitForNavigation({ waitUntil: 'networkidle2' });
        } else {
            await inputUpload.uploadFile(imgPath);
            // Wait for upload to complete (spinner disappears)
        }

        // After upload, go to library to get the URL
        await page.goto(`${WP_URL}/wp-admin/upload.php`, { waitUntil: 'networkidle2' });
        await page.waitForSelector('.attachment-preview', { timeout: 10000 });
        await page.click('.attachment-preview:first-child');
        await page.waitForSelector('.attachment-details-copy-link', { timeout: 10000 });
        const url = await page.$eval('.attachment-details-copy-link', el => el.value);

        const fileName = path.basename(imgPath);
        results[fileName] = url;
        console.log(`Uploaded ${fileName}: ${url}`);
    }

    fs.writeFileSync('uploaded_images.json', JSON.stringify(results, null, 2));
    console.log('Upload complete. Results saved to uploaded_images.json');

    await browser.close();
}

uploadImages().catch(err => {
    console.error(err);
    process.exit(1);
});
