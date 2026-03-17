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

        console.log("Injecting Global CSS v12 (Visual Perfection)...");
        await page.goto('https://mirii-sewing.online/wp-admin/customize.php', { waitUntil: 'networkidle2' });
        await page.waitForSelector('#accordion-section-custom_css');
        await page.click('#accordion-section-custom_css');

        const css = '/* --- Mirii Sewing Brand Guidelines v12 --- */' +
            ':root {' +
            '  --mirii-pink-soft: #F4DFE3;' +
            '  --mirii-pink-dark: #D8AEB7;' +
            '  --mirii-green: #7FAE9B;' +
            '  --mirii-green-dark: #6E9F8C;' +
            '  --mirii-text: #4A4A4A;' +
            '  --mirii-heading: #333333;' +
            '  --mirii-bg-main: #FAFAFA;' +
            '  --mirii-bg-beige: #F8F5F2;' +
            '  --mirii-bg-pink: #FCF7F8;' +
            '  --mirii-border: #E9E6E4;' +
            '}' +
            'body { color: var(--mirii-text) !important; background-color: var(--mirii-bg-main) !important; font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif; line-height: 1.8; }' +
            'h1, h2, h3, h4, h5, h6 { color: var(--mirii-heading) !important; font-family: "Noto Serif JP", serif !important; font-weight: 600 !important; }' +
            '/* Aggressive Hide */' +
            '.page-id-18 .article-header, .page-id-18 .article-footer, .page-id-18 .sidebar, .page-id-18 .breadcrumb, .page-id-18 .entry-title, ' +
            '.page-id-24 .article-header, .page-id-24 .article-footer, .page-id-24 .sidebar, .page-id-24 .breadcrumb, .page-id-24 .entry-title, ' +
            '.page-id-25 .article-header, .page-id-25 .article-footer, .page-id-25 .sidebar, .page-id-25 .breadcrumb, .page-id-25 .entry-title, ' +
            '.page-id-27 .article-header, .page-id-27 .article-footer, .page-id-27 .sidebar, .page-id-27 .breadcrumb, .page-id-27 .entry-title, ' +
            '.page-id-29 .article-header, .page-id-29 .article-footer, .page-id-29 .sidebar, .page-id-29 .breadcrumb, .page-id-29 .entry-title, ' +
            '.page-id-31 .article-header, .page-id-31 .article-footer, .page-id-31 .sidebar, .page-id-31 .breadcrumb, .page-id-31 .entry-title, ' +
            '.page-id-32 .article-header, .page-id-32 .article-footer, .page-id-32 .sidebar, .page-id-32 .breadcrumb, .page-id-32 .entry-title, ' +
            '.page-id-35 .article-header, .page-id-35 .article-footer, .page-id-35 .sidebar, .page-id-35 .breadcrumb, .page-id-35 .entry-title, ' +
            '.page-id-36 .article-header, .page-id-36 .article-footer, .page-id-36 .sidebar, .page-id-36 .breadcrumb, .page-id-36 .entry-title, ' +
            '.sns-share, .sns-follow, .author-info, .copy-info, .toc, .post-meta, .footer-meta, .footer-bottom-logo, .sns-copy-message, .tagcloud, .widget_recent_entries, .widget_recent_comments, .widget_archive, .widget_categories, .widget_search, .widget_text, .widget_media_gallery, .widget_media_image, .mobile-footer-menu-buttons { display: none !important; }' +
            '/* Layout */' +
            '.container { max-width: none !important; width: 100% !important; padding: 0 !important; }' +
            '#content { margin-top: 0 !important; }' +
            '#main { width: 100% !important; max-width: 100% !important; padding: 0 !important; margin: 0 !important; }' +
            '/* Button Hierarchy */' +
            '.btn-mirii-primary { background: var(--mirii-pink-dark) !important; color: #fff !important; border-radius: 50px !important; padding: 18px 50px !important; font-weight: bold; text-decoration: none; display: inline-block; text-align: center; box-shadow: 0 4px 15px rgba(216, 174, 183, 0.4); transition: all 0.3s; border: none !important; font-size: 1.1rem; border-bottom: none !important; }' +
            '.btn-mirii-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(216, 174, 183, 0.5); opacity: 0.95; color: #fff !important; }' +
            '.btn-mirii-secondary { background: var(--mirii-green) !important; color: #fff !important; border-radius: 50px !important; padding: 16px 45px !important; font-weight: bold; text-decoration: none; display: inline-block; text-align: center; box-shadow: 0 4px 12px rgba(127, 174, 155, 0.3); transition: all 0.3s; border: none !important; border-bottom: none !important; }' +
            '.btn-mirii-secondary:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(127, 174, 155, 0.4); opacity: 0.95; color: #fff !important; }' +
            '.btn-mirii-tertiary { background: #fff !important; color: var(--mirii-text) !important; border: 1px solid var(--mirii-border) !important; border-radius: 50px !important; padding: 14px 40px !important; font-weight: bold; text-decoration: none; display: inline-block; text-align: center; transition: all 0.3s; font-size: 0.95rem; border-bottom: none !important; }' +
            '.btn-mirii-tertiary:hover { background: var(--mirii-bg-beige) !important; color: var(--mirii-text) !important; }' +
            '/* Brand Style Override */' +
            '.brand-section { padding: 90px 24px; }' +
            '.brand-title { margin-bottom: 45px; line-height: 1.6; font-size: clamp(1.6rem, 5vw, 2rem) !important; display: block; text-align: center !important; }' +
            '.brand-title::after { content: ""; display: block; width: 40px; height: 1px; background: var(--mirii-pink-dark); margin: 25px auto 0; opacity: 0.5; }' +
            'h1.has-text-align-center, h2.has-text-align-center { text-align: center !important; }' +
            '/* Kill Heading Counters DEFINITIVELY */' +
            'h2::before, h2::after, h3::before, h3::after, h2 span::before, h2 span::after, h3 span::before, h3 span::after { content: none !important; display: none !important; }' +
            '.entry-content h2::before, .entry-content h3::before { content: none !important; }' +
            '/* Image Consistency */' +
            '.brand-img { border-radius: 12px; width: 100%; height: auto; object-fit: cover; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }' +
            '.img-square { aspect-ratio: 1/1 !important; }' +
            '.img-landscape { aspect-ratio: 16/10 !important; }' +
            '.img-portrait { aspect-ratio: 3/4 !important; }' +
            '/* Badges */' +
            '.badge-mirii { background: var(--mirii-pink-soft) !important; border: 1px solid var(--mirii-pink-dark) !important; color: var(--mirii-pink-dark) !important; padding: 6px 18px; border-radius: 30px; font-size: 0.8rem; font-weight: bold; margin: 4px; display: inline-block; }';

        await page.evaluate((newCss) => {
            const editor = document.querySelector('.CodeMirror').CodeMirror;
            editor.setValue(newCss);
        }, css);

        await page.click('#save');
        console.log("Saving CSS v12...");
        await new Promise(r => setTimeout(r, 8000));
        console.log("Global CSS Fixed.");

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
        process.exit(0);
    }
})();
