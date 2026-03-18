const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    try {
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(120000);

        console.log("Logging in...");
        await page.goto('https://mirii-sewing.online/wp-admin/');
        await page.type('#user_login', 'antigravity-ai@gmail.com');
        await page.type('#user_pass', 'hE6AnSDQNzN0FJ&lX&ITOU(o');
        await Promise.all([page.waitForNavigation({ waitUntil: 'load' }), page.click('#wp-submit')]);

        console.log("Ensuring we are on an admin page to get nonce...");
        await page.goto('https://mirii-sewing.online/wp-admin/edit.php?post_type=page');

        console.log("Updating Welcome page (ID 25)...");
        const result = await page.evaluate(async () => {
            const nonce = window.wpApiSettings.nonce;
            const css = '<style>.page-id-25 .entry-title, .page-id-25 .post-meta, .page-id-25 .sns-share, .page-id-25 .sns-follow, .page-id-25 .author-info, .page-id-25 .post-date, .page-id-25 .post-update, .page-id-25 .toc, .page-id-25 .article-header, .page-id-25 .article-footer, .page-id-25 #sidebar, .page-id-25 .breadcrumb { display: none !important; } .page-id-25 #main { width: 100% !important; max-width: 100% !important; padding: 0 !important; margin: 0 !important;} .page-id-25 .article { border: none !important; background: transparent !important; padding: 0 !important; } .entry-content { margin-top: 0 !important; }</style>';

            const rawHtml = `<!-- wp:cover {"dimRatio":40,"overlayColor":"pale-pink","isDark":false,"align":"full","className":"first-view-cover"} -->
<div class="wp-block-cover alignfull is-light first-view-cover" style="min-height:50vh; border-radius: 0 0 20px 20px; margin-bottom: 60px;"><span aria-hidden="true" class="wp-block-cover__background has-pale-pink-background-color has-background-dim-40 has-background-dim"></span><div class="wp-block-cover__inner-container"><!-- wp:group {"layout":{"type":"constrained","wideSize":"800px","contentSize":"800px"}} -->
<div class="wp-block-group"><!-- wp:paragraph {"align":"center","className":"font-mincho"} -->
<p class="has-text-align-center font-mincho" style="font-size: clamp(1.2rem, 3vw, 1.8rem); font-weight: bold; line-height: 1.5; margin-bottom: 15px;">ミシンは, ママの毎日を<br>もっと自由に, もっと楽しくする魔法。</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"textAlign":"center","level":1, "className":"font-mincho"} -->
<h1 class="wp-block-heading has-text-align-center font-mincho" style="font-size: clamp(2.2rem, 7vw, 4.0rem); margin-top:0; margin-bottom: 20px; color:#4a4a4a;">はじめての方へ</h1>
<!-- /wp:heading --></div>
<!-- /wp:group --></div></div>
<!-- /wp:cover -->

<!-- wp:group {"layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group"><!-- wp:heading {"textAlign":"left","className":"font-mincho"} -->
<h2 class="wp-block-heading font-mincho">「私には無理」と思っていませんか？</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p style="margin-top:30px;">「子供のために何か作りたいけど、家庭科の時間は苦手だった」<br>「ミシンの糸通しだけで挫折しそう」<br>「不器用な私が服なんて作れるはずがない」</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>当教室に来られる方の多くが、最初はそう仰います。SNSで見かける素敵なハンドメイド作品を見ては、「私には一生縁のない世界」と感じてしまう。そんなママたちの不安に、私たちは心から寄り添いたいと考えています。</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>でも、大丈夫です。ミシンは特別な才能が必要なツールではありません。正しい「手順」と、少しの「コツ」さえ分かれば、誰でも自分の手で魔法を生み出すことができるようになります。</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"80px"} -->
<div style="height:80px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {"backgroundColor":"pale-pink","layout":{"type":"constrained","contentSize":"800px"},"style":{"spacing":{"padding":{"top":"60px","bottom":"60px"}}}} -->
<div class="wp-block-group has-pale-pink-background-color has-background" style="background-color:#fdf6f7 !important; border-radius:12px; padding:60px;"><!-- wp:heading {"textAlign":"center","className":"font-mincho"} -->
<h2 class="wp-block-heading has-text-align-center font-mincho" style="color:#c55c70;">mirii sewing が大切にしていること</h2>
<!-- /wp:heading -->

<!-- wp:group {"layout":{"type":"constrained","contentSize":"600px"},"style":{"spacing":{"margin":{"top":"40px"}}}} -->
<div class="wp-block-group" style="margin-top:40px"><!-- wp:heading {"level":3,"className":"font-mincho"} -->
<h3 class="wp-block-heading font-mincho" style="font-size:1.4rem; border-left:4px solid #c55c70; padding-left:15px; margin-bottom:20px;">1. 「完成すること」より「習得すること」</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>ただ指示通りに縫って形にするだけなら、独学でもできるかもしれません。私たちが教えたいのは、その「裏側にある理由」です。なぜここを縫い代1cmにするのか？なぜこの向きにアイロンをかけるのか？理屈が分かれば、教室を出た後もお一人で応用ができるようになります。</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3,"className":"font-mincho","style":{"spacing":{"margin":{"top":"40px"}}}} -->
<h3 class="wp-block-heading font-mincho" style="font-size:1.4rem; border-left:4px solid #c55c70; padding-left:15px; margin-bottom:20px; margin-top:40px;">2. 「依存」ではなく「自立」へ</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>「先生がいないと何もできない」状態にはさせません。最終的には、型紙を見て自分で判断し、自分の好きな生地で、自由に子供服を作れるようになる。その自立した喜びこそが、洋裁の本当の楽しさだと信じているからです。</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"80px"} -->
<div style="height:80px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {"layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group"><!-- wp:heading {"textAlign":"left","className":"font-mincho"} -->
<h2 class="wp-block-heading font-mincho">一歩踏み出した先の、新しい景色</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p style="margin-top:30px;">子供が自分が作った服を着て, 笑顔で走り回る姿。それを見たとき, 「私にもできた！」という静かな自信が湧いてきます。それは単なるスキルの習得ではなく, 日々の育児の中に「自分だけの時間」と「誇り」を取り戻す体験でもあります。</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>mirii sewingは, そんなママたちのチャレンジを全力で応援します。不器用でも, 時間がなくても構いません。あなたの「作ってみたい」という気持ちを, 一番大切にします。</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"80px"} -->
<div style="height:80px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {"backgroundColor":"pale-pink","layout":{"type":"constrained","contentSize":"800px"},"style":{"spacing":{"padding":{"top":"60px","bottom":"60px"}}}} -->
<div class="wp-block-group has-pale-pink-background-color has-background" style="background-color:#fdf6f7 !important; border-radius:12px; padding:60px; text-align:center;"><h3 class="font-mincho" style="margin-bottom:20px;">まずは, ここから始めてみませんか？</h3><p style="margin-bottom:35px;">いきなりコースに入るのは勇気が入るもの。<br>まずは, 和やかな雰囲気を感じていただける「1Day体験レッスン」で, ミシンと仲良くなることから始めてみてください。</p><!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"className":"custom-btn main-cta-btn"} -->
<div class="wp-block-button custom-btn main-cta-btn"><a class="wp-block-button__link wp-element-button" style="background-color:#c55c70; color:#fff; padding:15px 40px; border-radius:50px; font-weight:bold; text-decoration:none;" href="/1day-lesson/">1Day体験レッスンを見る</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --><p style="margin-top:20px; font-size:0.85em; color:#888;">あるいは公式LINEにて, 最新の募集案内を配信しています。</p></div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"120px"} -->
<div style="height:120px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->`;

            const res = await fetch(window.wpApiSettings.root + 'wp/v2/pages/25', {
                method: 'POST',
                headers: { 'X-WP-Nonce': nonce, 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: css + rawHtml })
            });
            return await res.json();
        });

        console.log("Success ID:", result.id);

        // Final screenshot
        await page.goto('https://mirii-sewing.online/welcome/', { waitUntil: 'load' });
        await page.screenshot({ path: '/Users/ayumi/.gemini/antigravity/brain/b3195448-d29e-4066-a535-3f07e06d8a74/welcome_page_final.png', fullPage: true });

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
        process.exit(0);
    }
})();
