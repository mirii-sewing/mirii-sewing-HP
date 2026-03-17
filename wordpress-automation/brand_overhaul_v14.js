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

        const updatePage = async (id, html) => {
            console.log("Updating Page ID " + id + "...");
            await page.evaluate(async (pid, content) => {
                const nonce = window.wpApiSettings.nonce;
                await fetch(window.wpApiSettings.root + 'wp/v2/pages/' + pid, {
                    method: 'POST',
                    headers: { 'X-WP-Nonce': nonce, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content: content })
                });
            }, id, html);
        };

        const images = {
            fv_welcome: 'https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_3017_0.jpg'
        };

        // WELCOME (25) - Role: Anxiety removal, Definition of target, Self-sufficiency value
        const html_welcome = '<!-- wp:cover {"url":"' + images.fv_welcome + '","dimRatio":20,"overlayColor":"black","align":"full"} -->' +
            '<div class="wp-block-cover alignfull" style="min-height:60vh;"><span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim-20 has-background-dim"></span><img class="wp-block-cover__image-background" src="' + images.fv_welcome + '" data-object-fit="cover"/><div class="wp-block-cover__inner-container"><!-- wp:group {"layout":{"type":"constrained","contentSize":"850px"}} -->' +
            '<div class="wp-block-group">' +
            '<p class="has-text-align-center" style="font-size: 1.1rem; color:#fff; text-shadow:0 2px 5px rgba(0,0,0,0.4); margin-bottom:20px;">家庭科以来、ミシンに触っていないママへ。<br>一歩ずつ、「私にもできる」を形にする場所。</p>' +
            '<h1 class="has-text-align-center" style="font-size: clamp(2rem, 6vw, 3.5rem); color:#fff; text-shadow:0 2px 5px rgba(0,0,0,0.4); margin:0;">はじめての方へ</h1>' +
            '</div>' +
            '<!-- /wp:group --></div></div>' +
            '<!-- /wp:cover -->' +
            '<div class="brand-section">' +
            '<div style="max-width:800px; margin:0 auto;">' +
            '<h2 class="brand-title">ミシンが苦手でも、大丈夫です。</h2>' +
            '<div style="font-size:1.1rem; line-height:2.2;">' +
            '<p>「真っ直ぐ縫えるか不安」「糸の通し方がわからない」<br>実は、当教室に来られる方の多くが、そんな不安を抱えてスタートされます。</p>' +
            '<p>ここでは、難しい専門用語は使いません。お子さんのために何か作ってあげたいという、そのお気持ちを大切に、一人ひとりの歩幅に合わせて丁寧に見守ります。</p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="section-bg-beige brand-section">' +
            '  <div style="max-width:800px; margin:0 auto;">' +
            '    <h2 class="has-text-align-center brand-title" style="margin-bottom:80px;">mirii sewing が大切にしていること</h2>' +
            '    ' +
            '    <div style="margin-bottom:70px;">' +
            '      <h3 style="border-left:5px solid var(--mirii-pink-dark); padding-left:25px; margin-bottom:25px; font-size:1.6rem;">「完成」させることより、「お家でも作れる」ように</h3>' +
            '      <p style="font-size:1.05rem;">教室で綺麗に出来上がるのは、当たり前。私たちが一番大切にしているのは、お家に帰ってからも、ママがお一人で形にできるような技術を身につけていただくことです。</p>' +
            '    </div>' +
            '    ' +
            '    <div>' +
            '      <h3 style="border-left:5px solid var(--mirii-pink-dark); padding-left:25px; margin-bottom:25px; font-size:1.6rem;">「不器用だから」と諦める前に</h3>' +
            '      <p style="font-size:1.05rem;">「自分には向いていない」と思っていたことが、できるようになる。その喜びは、育児に忙しいママにとって大きな自信になります。お子さんに「これ、ママが作ったの？」と喜んでもらえる、そんな時間を一緒に作りましょう。</p>' +
            '    </div>' +
            '  </div>' +
            '</div>' +
            '<div class="section-bg-pink brand-section">' +
            '  <div style="max-width:800px; margin:0 auto; text-align:center;">' +
            '    <h3 style="margin-bottom:40px; font-size:1.8rem;">まずは3時間の体験から、<br>始めてみませんか？</h3>' +
            '    <a href="/1day-lesson/" class="btn-mirii-primary">体験レッスンの詳細はこちら</a>' +
            '  </div>' +
            '</div>';

        // Update Welcome Page
        await updatePage(25, html_welcome);

        console.log("Welcome Page Polish Complete.");

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
        process.exit(0);
    }
})();
