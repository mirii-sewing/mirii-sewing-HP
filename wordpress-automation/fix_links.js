const puppeteer = require('puppeteer');

const TARGET_SLUG = 'features';
const FEATURES_ID = 27;

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

        const diagnostic = await page.evaluate(async (targetSlug, featuresId) => {
            const nonce = window.wpApiSettings ? window.wpApiSettings.nonce : null;
            if (!nonce) return { error: 'No nonce' };

            // Reset slug of ID 27 to exactly targetSlug
            const updateRes = await fetch(window.wpApiSettings.root + 'wp/v2/pages/' + featuresId, {
                method: 'POST',
                headers: {
                    'X-WP-Nonce': nonce,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    slug: targetSlug
                })
            });
            const updateData = await updateRes.json();

            // Refresh permalinks might be needed but usually setting slug is enough.
            return {
                id: updateData.id,
                slug: updateData.slug,
                link: updateData.link
            };
        }, TARGET_SLUG, FEATURES_ID);

        console.log("Diagnostic result:", JSON.stringify(diagnostic, null, 2));

        // Correct links in top pages
        const homeIds = [8, 18];
        const correctLink = diagnostic.link;
        if (correctLink) {
            for (const hid of homeIds) {
                console.log(`Checking/Correcting links in page ID ${hid}...`);
                await page.evaluate(async (homeId, clink) => {
                    const nonce = window.wpApiSettings.nonce;
                    const res = await fetch(window.wpApiSettings.root + 'wp/v2/pages/' + homeId);
                    const home = await res.json();
                    
                    if (home.content && home.content.rendered) {
                        let content = home.content.rendered;
                        // Replace any features link with trailing space or weird chars
                        // We look for 'features' string and replace the whole <a> tag href if it looks broken
                        // Or just replace standard patterns
                        let newContent = content.replace(/href="[^"]*features[^"]*"/g, `href="${clink}"`);
                        
                        if (content !== newContent) {
                            await fetch(window.wpApiSettings.root + 'wp/v2/pages/' + homeId, {
                                method: 'POST',
                                headers: {
                                    'X-WP-Nonce': nonce,
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ content: newContent })
                            });
                        }
                    }
                }, hid, correctLink);
            }
        }

        console.log("Verification of link reflection:");
        await page.goto(correctLink, { waitUntil: 'networkidle2' });
        console.log("Live URL: " + page.url());

    } catch (e) {
        console.error("Error:", e);
    } finally {
        await browser.close();
    }
})();
