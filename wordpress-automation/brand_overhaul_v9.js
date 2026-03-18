const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    try {
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(180000);

        console.log("Logging in...");
        await page.goto('https://mirii-sewing.online/wp-admin/', { waitUntil: 'networkidle2' });
        await page.type('#user_login', 'antigravity-ai@gmail.com');
        await page.type('#user_pass', 'hE6AnSDQNzN0FJ&lX&ITOU(o');
        await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle2' }), page.click('#wp-submit')]);

        console.log("Injecting Global CSS v9 (Death to Heading Counters)...");
        await page.goto('https://mirii-sewing.online/wp-admin/customize.php', { waitUntil: 'networkidle2' });
        await page.waitForSelector('#accordion-section-custom_css');
        await page.click('#accordion-section-custom_css');

        const css = '/* --- Mirii Sewing Brand Guidelines v9 --- */' +
            ':root {' +
            '  --mirii-pink-soft: #F4DFE3;' +
            '  --mirii-pink-dark: #D8AEB7;' +
            '  --mirii-green: #7FAE9B;' +
            '  --mirii-text: #4A4A4A;' +
            '  --mirii-heading: #333333;' +
            '  --mirii-bg-main: #FAFAFA;' +
            '  --mirii-bg-beige: #F8F5F2;' +
            '  --mirii-bg-pink: #FCF7F8;' +
            '  --mirii-border: #E9E6E4;' +
            '}' +
            'body { color: var(--mirii-text) !important; background-color: var(--mirii-bg-main) !important; font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif; line-height: 1.8; }' +
            'h1, h2, h3, h4, h5, h6 { color: var(--mirii-heading) !important; font-family: "Noto Serif JP", serif !important; font-weight: 600 !important; }' +
            '/* Aggressive Hide for All Major Pages */' +
            '.page-id-18 .article-header, .page-id-18 .article-footer, .page-id-18 .sidebar, .page-id-18 .breadcrumb, .page-id-18 .entry-title, ' +
            '.page-id-24 .article-header, .page-id-24 .article-footer, .page-id-24 .sidebar, .page-id-24 .breadcrumb, .page-id-24 .entry-title, ' +
            '.page-id-25 .article-header, .page-id-25 .article-footer, .page-id-25 .sidebar, .page-id-25 .breadcrumb, .page-id-25 .entry-title, ' +
            '.page-id-27 .article-header, .page-id-27 .article-footer, .page-id-27 .sidebar, .page-id-27 .breadcrumb, .page-id-27 .entry-title, ' +
            '.page-id-29 .article-header, .page-id-29 .article-footer, .page-id-29 .sidebar, .page-id-29 .breadcrumb, .page-id-29 .entry-title, ' +
            '.page-id-31 .article-header, .page-id-31 .article-footer, .page-id-31 .sidebar, .page-id-31 .breadcrumb, .page-id-31 .entry-title, ' +
            '.page-id-32 .article-header, .page-id-32 .article-footer, .page-id-32 .sidebar, .page-id-32 .breadcrumb, .page-id-32 .entry-title, ' +
            '.page-id-35 .article-header, .page-id-35 .article-footer, .page-id-35 .sidebar, .page-id-35 .breadcrumb, .page-id-35 .entry-title, ' +
            '.page-id-36 .article-header, .page-id-36 .article-footer, .page-id-36 .sidebar, .page-id-36 .breadcrumb, .page-id-36 .entry-title, ' +
            '.sns-share, .sns-follow, .author-info, .copy-info, .toc, .post-meta, .footer-meta, .footer-bottom-logo, .sns-copy-message, .tagcloud, .widget_recent_entries, .widget_recent_comments, .widget_archive, .widget_categories, .widget_search, .widget_text, .widget_media_gallery, .widget_media_image { display: none !important; }' +
            '/* Full Width Layout for Major Pages */' +
            '.page-id-18 #main, .page-id-24 #main, .page-id-25 #main, .page-id-27 #main, .page-id-29 #main, .page-id-31 #main, .page-id-32 #main, .page-id-35 #main, .page-id-36 #main { width: 100% !important; max-width: 100% !important; padding: 0 !important; margin: 0 !important; }' +
            '.container { max-width: none !important; width: 100% !important; padding: 0 !important; }' +
            '#content { margin-top: 0 !important; }' +
            '/* PREMIUM UI ELEMENTS */' +
            '.btn-mirii-pink { background: var(--mirii-pink-dark) !important; color: #fff !important; border-radius: 50px !important; padding: 18px 45px !important; font-weight: bold; text-decoration: none; display: inline-block; text-align: center; box-shadow: 0 4px 15px rgba(216, 174, 183, 0.3); transition: all 0.3s; border: none !important; }' +
            '.btn-mirii-pink:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(216, 174, 183, 0.4); opacity: 0.9; }' +
            '.btn-mirii-green { background: var(--mirii-green) !important; color: #fff !important; border-radius: 50px !important; padding: 18px 45px !important; font-weight: bold; text-decoration: none; display: inline-block; text-align: center; box-shadow: 0 4px 15px rgba(127, 174, 155, 0.3); transition: all 0.3s; border: none !important; }' +
            '.btn-mirii-outline { background: #fff !important; color: var(--mirii-text) !important; border: 1px solid var(--mirii-border) !important; border-radius: 50px !important; padding: 16px 43px !important; font-weight: bold; text-decoration: none; display: inline-block; text-align: center; transition: all 0.3s; }' +
            '.badge-mirii { background: var(--mirii-pink-soft) !important; color: var(--mirii-pink-dark) !important; padding: 8px 20px; border-radius: 30px; font-size: 0.9rem; font-weight: bold; margin: 6px; display: inline-block; }' +
            '.section-bg-pink { background: var(--mirii-bg-pink) !important; }' +
            '.section-bg-beige { background: var(--mirii-bg-beige) !important; }' +
            '.brand-section { padding: 100px 20px; }' +
            '.brand-title { margin-bottom: 50px; line-height: 1.6; font-size: 2.2rem; }' +
            '/* AGGRESSIVE HEADING NUMBER REMOVAL */' +
            'h2::before, h2::after, h3::before, h3::after, h2 span::before, h2 span::after, h3 span::before, h3 span::after { content: none !important; display: none !important; }' +
            '.entry-content h2::before, .entry-content h3::before { content: none !important; }' +
            '.brand-img { border-radius: 15px; width: 100%; height: auto; object-fit: cover; }' +
            '.entry-content { padding: 0 !important; margin: 0 !important; }';

        await page.evaluate((newCss) => {
            const editor = document.querySelector('.CodeMirror').CodeMirror;
            editor.setValue(newCss);
        }, css);

        await page.click('#save');
        console.log("Saving CSS v9...");
        await new Promise(r => setTimeout(r, 8000));
        console.log("Global CSS Fixed.");

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
        process.exit(0);
    }
})();
