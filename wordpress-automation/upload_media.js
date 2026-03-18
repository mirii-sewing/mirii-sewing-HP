const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const filesToUpload = [
        '/Users/ayumi/Pictures/動画素材/IMG_8469.JPG',
        '/Users/ayumi/Pictures/動画素材/IMG_8313.JPG',
        '/Users/ayumi/Pictures/動画素材/IMG_8379.JPG',
        '/Users/ayumi/Pictures/動画素材/69261.jpg',
        '/Users/ayumi/Pictures/動画素材/69262.jpg',
        '/Users/ayumi/Pictures/動画素材/3894_724909648.JPG'
    ];

    try {
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(180000);

        console.log("Logging in...");
        await page.goto('https://mirii-sewing.online/wp-admin/');
        await page.type('#user_login', 'antigravity-ai@gmail.com');
        await page.type('#user_pass', 'hE6AnSDQNzN0FJ&lX&ITOU(o');
        await Promise.all([page.waitForNavigation({ waitUntil: 'load' }), page.click('#wp-submit')]);

        console.log("Uploading files...");
        for (const file of filesToUpload) {
            console.log(`Uploading ${path.basename(file)}...`);
            await page.goto('https://mirii-sewing.online/wp-admin/media-new.php');
            const input = await page.$('input[type="file"]');
            await input.uploadFile(file);
            await page.waitForSelector('.bar', { hidden: true, timeout: 120000 }); // Wait for progress bar to finish
            console.log(`Finished ${path.basename(file)}`);
        }

        console.log("Grabbing URLs...");
        await page.goto('https://mirii-sewing.online/wp-admin/upload.php?mode=list');
        const urls = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.column-title .media-icon img')).map(img => {
                const url = img.src.replace(/-[0-9]+x[0-9]+\.(jpg|png|jpeg)$/, '.$1').replace('/thumbnails', '');
                // Actually easier to just get the parent link or something, but let's try this logic
                // Or find the text link
                return Array.from(document.querySelectorAll('.column-title .row-title')).map(a => a.href);
            });
        });

        // Let's just list the last 10 media items to be sure
        await page.goto('https://mirii-sewing.online/wp-admin/upload.php?mode=list');
        const mediaList = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('tr.attachment')).slice(0, 10).map(tr => {
                return {
                    title: tr.querySelector('.row-title').innerText,
                    url: tr.querySelector('.column-title a').href // This goes to attachment page, we need direct URL
                };
            });
        });

        // Better way to get direct URLs via the UI is hard, let's use the REST API for media
        const mediaUrls = await page.evaluate(async () => {
            const res = await fetch(window.wpApiSettings.root + 'wp/v2/media?per_page=10');
            const data = await res.json();
            return data.map(m => ({ title: m.title.rendered, url: m.source_url }));
        });

        console.log("Uploaded Media URLs:");
        console.log(JSON.stringify(mediaUrls, null, 2));

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
        process.exit(0);
    }
})();
