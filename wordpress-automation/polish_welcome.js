const puppeteer = require('puppeteer');

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

        const result = await page.evaluate(async () => {
            const nonce = window.wpApiSettings ? window.wpApiSettings.nonce : null;
            if (!nonce) return { error: 'No nonce' };

            const content = `
<!-- wp:cover {"dimRatio":40,"overlayColor":"pale-pink","isDark":false,"align":"full","className":"first-view-cover"} -->
<div class="wp-block-cover alignfull is-light first-view-cover" style="min-height:50vh; border-radius: 0 0 20px 20px; margin-bottom: 60px;">
<span aria-hidden="true" class="wp-block-cover__background has-pale-pink-background-color has-background-dim-40 has-background-dim"></span>
<div class="wp-block-cover__inner-container">
<!-- wp:group {"layout":{"type":"constrained","wideSize":"800px","contentSize":"800px"}} -->
<div class="wp-block-group">
<!-- wp:paragraph {"align":"center","className":"font-mincho"} -->
<p class="has-text-align-center font-mincho" style="font-size: clamp(1.1rem, 3vw, 1.8rem); font-weight: bold; line-height: 1.5; margin-bottom: 15px;">「可愛い服を、自分の手で作ってあげたい」</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"textAlign":"center","level":1,"className":"font-mincho"} -->
<h1 class="wp-block-heading has-text-align-center font-mincho" style="font-size: clamp(2.2rem, 7vw, 4.0rem); margin-top:0; margin-bottom: 20px; color:#4a4a4a;">はじめての方へ</h1>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center" style="font-size: 1.1rem;">当教室の想いと、大切にしていること</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
</div></div>
<!-- /wp:cover -->

<!-- wp:group {"layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group">
<!-- wp:heading {"textAlign":"center","className":"font-mincho"} -->
<h2 class="wp-block-heading has-text-align-center font-mincho" style="font-size:1.8rem; line-height:1.5;">そのあたたかいお気持ちだけで、<br>ミシンを始める理由は十分です。</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"left"} -->
<p class="has-text-align-left" style="font-size:1.1rem; line-height:1.8; margin-top:40px;">「子どもの服を手作りしたい。」<br>そう思ってミシンを買ったものの、本や動画を見ても用語がわからなかったり、生地がずれてしまったり…。<br>「やっぱり私には無理なのかな」と、いつの間にかミシンを箱にしまったままになっていませんか？</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"align":"left"} -->
<p class="has-text-align-left" style="margin-top:20px;">実は、ミシンがうまくいかない理由は、あなたが「不器用だから」ではありません。<br>単に、独学では気づけない「正しい縫い方の手順」や「縫う前の重要な下準備」を知る機会がないだけなのです。</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"100px"} -->
<div style="height:100px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {"backgroundColor":"luminous-vivid-amber","layout":{"type":"constrained","contentSize":"900px"}} -->
<div class="wp-block-group has-luminous-vivid-amber-background-color has-background" style="background-color:#faf5ed !important; padding:60px 40px; border-radius:12px;">
<!-- wp:columns {"verticalAlignment":"center"} -->
<div class="wp-block-columns are-vertically-aligned-center">
<!-- wp:column {"verticalAlignment":"center","width":"40%"} -->
<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:40%">
<!-- wp:html -->
<div class="placeholder-img rect-img" style="aspect-ratio: 4/5;"></div>
<!-- /wp:html -->
</div>
<!-- /wp:column -->
<!-- wp:column {"verticalAlignment":"center","width":"60%"} -->
<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:60%">
<!-- wp:heading {"className":"font-mincho"} -->
<h2 class="wp-block-heading font-mincho" style="color:#c55c70; font-size:1.6rem; margin-top:0;">不器用さんを<br>「ひとりで縫える」に変える</h2>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"left"} -->
<p class="has-text-align-left">これまでに、独学で止まってしまった多くのママたちが当教室にお越しになりました。そして、ほぼ全員が「こんなに綺麗に作れるなんて！」とご自身の作品に感動して帰られます。<br><br>当教室では、元警察官の講師が「感覚」に頼らず、「論理的で迷わせないステップ」でお伝えします。水通しやアイロンの当て方といった土台から丁寧に行うことで、誰でも驚くほど綺麗に仕上げることができるようになります。</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
</div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"100px"} -->
<div style="height:100px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {"layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group">
<!-- wp:columns {"verticalAlignment":"center","isStackedOnMobile":true} -->
<div class="wp-block-columns are-vertically-aligned-center">
<!-- wp:column {"verticalAlignment":"center","width":"100%"} -->
<div class="wp-block-column is-vertically-aligned-center">
<!-- wp:heading {"textAlign":"center","className":"font-mincho"} -->
<h2 class="wp-block-heading has-text-align-center font-mincho" style="color:#c55c70; font-size:1.6rem;">ママ自身の「ご機謙な時間」のために</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"left"} -->
<p class="has-text-align-left" style="margin-top:30px;">育児や家事に追われる毎日のなかで、何気なくスマホを見て終わってしまう時間はもったいない。無心になってミシンに向かい、形ができていく工程は、ママに大きな達成感をもたらしてくれます。<br><br>そして、完成した服を子どもが「ママが作ったの！」と自慢げに着てくれる喜び。「手作り」は、あなたの毎日をご機嫌にし、家族を笑顔にしてくれる最高のギフトです。</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->

<!-- wp:spacer {"height":"40px"} -->
<div style="height:40px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:html -->
<div class="placeholder-img circle-img" style="max-width:300px; margin: 0 auto;"></div>
<!-- /wp:html -->
</div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"100px"} -->
<div style="height:100px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {"backgroundColor":"pale-pink","layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group has-pale-pink-background-color has-background" style="background-color:#fdf6f7 !important; padding:60px 40px; border-radius:12px; text-align:center;">
<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center" style="font-weight:bold; margin-bottom:20px; font-size:1.15rem;">「本当に私にもできるかな？」と迷われている方へ</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center" style="margin-bottom:30px;">まずは、たった3時間で「たしかな自信」が手に入る体験レッスンから始めてみませんか？</p>
<!-- /wp:paragraph -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons">
<!-- wp:button {"className":"custom-btn main-cta-btn"} -->
<div class="wp-block-button custom-btn main-cta-btn"><a class="wp-block-button__link wp-element-button" style="background-color:#c55c70 !important; color:#fff !important; padding:15px 40px !important; border-radius:50px !important; font-weight:bold !important; text-decoration:none;" href="https://mirii-sewing.online/1day-lesson/">1Day体験レッスンの詳細を見る</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"120px"} -->
<div style="height:120px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->
`;

            await fetch(window.wpApiSettings.root + 'wp/v2/pages/25', {
                method: 'POST',
                headers: {
                    'X-WP-Nonce': nonce,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: content
                })
            });

            return { status: 'success' };
        });

        console.log("Result Polished Welcome Update:", result);

        // Screenshot to verify
        const screenshotPage = await browser.newPage();
        await screenshotPage.setViewport({ width: 375, height: 812 });
        await screenshotPage.goto('https://mirii-sewing.online/welcome/', { waitUntil: 'networkidle2' });
        await screenshotPage.screenshot({ path: '/Users/ayumi/.gemini/antigravity/brain/b3195448-d29e-4066-a535-3f07e06d8a74/mirii_mobile_preview_welcome_polished.png', fullPage: true });

    } catch (e) {
        console.error("Error:", e);
    } finally {
        await browser.close();
    }
})();
