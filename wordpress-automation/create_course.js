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
<p class="has-text-align-center font-mincho" style="font-size: clamp(1.1rem, 3vw, 1.8rem); font-weight: bold; line-height: 1.5; margin-bottom: 20px;">基礎から着実に、自立を目指す。</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"textAlign":"center","level":1,"className":"font-mincho"} -->
<h1 class="wp-block-heading has-text-align-center font-mincho" style="font-size: clamp(2.2rem, 7vw, 4.0rem); margin-top:0; margin-bottom: 20px; color:#4a4a4a;">4ヶ月少人数継続コース</h1>
<!-- /wp:heading -->
</div>
<!-- /wp:group -->
</div></div>
<!-- /wp:cover -->

<!-- wp:group {"layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group">
<!-- wp:heading {"textAlign":"center","className":"font-mincho"} -->
<h2 class="wp-block-heading has-text-align-center font-mincho">4ヶ月後には「先生がいなくても、<br>一人で服が作れる」あなたへ。</h2>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"left"} -->
<p class="has-text-align-left" style="margin-top:40px;">「体験レッスンで1着作れたけれど、家に戻るとやっぱり不安…」<br>そんな方のために、全8回のレッスンを通して、生地選びから裁断、複雑な縫製のテクニックまでを網羅的に学習する継続コースです。<br><br>目の前の1着を作るだけでなく、どんな服にも応用できる「基礎の基礎」を叩き込むことで、一生モノの技術を身につけます。</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"100px"} -->
<div style="height:100px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {"layout":{"type":"constrained","contentSize":"900px"}} -->
<div class="wp-block-group">
<!-- wp:heading {"className":"font-mincho"} -->
<h2 class="wp-block-heading font-mincho" style="border-bottom: 2px solid #eaeaea; padding-bottom: 15px; margin-bottom: 40px;">カリキュラム（全8回）</h2>
<!-- /wp:heading -->

<!-- wp:columns -->
<div class="wp-block-columns">
<!-- wp:column -->
<div class="wp-block-column" style="background:#fff; border:1px solid #f0f0f0; border-radius:12px; padding:30px; margin-bottom:20px;">
<h4 style="color:#c55c70; margin-top:0;">1〜2回目：基礎と小物</h4>
<p style="font-size:0.9em;">生地の扱い方、水通し、裁断の基本を学び、まずは巾着やランチマットなどでミシンの扱いに慣れます。</p>
</div>
<!-- /wp:column -->
<!-- wp:column -->
<div class="wp-block-column" style="background:#fff; border:1px solid #f0f0f0; border-radius:12px; padding:30px; margin-bottom:20px;">
<h4 style="color:#c55c70; margin-top:0;">3〜4回目：ボトムスの製作</h4>
<p style="font-size:0.9em;">ウエストゴムの処理、股繰りの縫い方など、実用的なパンツの作り方をマスターします。</p>
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->

<!-- wp:columns -->
<div class="wp-block-columns" style="margin-top:20px;">
<!-- wp:column -->
<div class="wp-block-column" style="background:#fff; border:1px solid #f0f0f0; border-radius:12px; padding:30px; margin-bottom:20px;">
<h4 style="color:#c55c70; margin-top:0;">5〜6回目：トップス・裏地</h4>
<p style="font-size:0.9em;">衿ぐりの処理、ボタンホールの開け方、裏地の付け方など、ステップアップした技術を学びます。</p>
</div>
<!-- /wp:column -->
<!-- wp:column -->
<div class="wp-block-column" style="background:#fff; border:1px solid #f0f0f0; border-radius:12px; padding:30px; margin-bottom:20px;">
<h4 style="color:#c55c70; margin-top:0;">7〜8回目：卒業制作</h4>
<p style="font-size:0.9em;">お好みのデザインで、一通りの工程をご自身で管理しながら一着を仕上げます。</p>
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
</div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"100px"} -->
<div style="height:100px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {"backgroundColor":"luminous-vivid-amber","layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group has-luminous-vivid-amber-background-color has-background" style="background-color:#faf5ed !important; padding:50px 40px; border-radius:12px;">
<h2 class="font-mincho" style="text-align:center;">募集について</h2>
<p style="margin-top:20px;">現在、継続コースは大変ご好評をいただいており、募集開始とともに満席となる状況が続いております。<br><br>次回の募集時期やクラスの空き状況は、公式LINEにて優先的にご案内しております。受講をご検討の方は、まずはLINEへご登録ください。</p>
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons" style="margin-top:30px;">
<!-- wp:button {"className":"custom-btn line-btn"} -->
<div class="wp-block-button custom-btn line-btn"><a class="wp-block-button__link wp-element-button" style="background-color:#06C755; color:#fff; padding:12px 40px; border-radius:50px; text-decoration:none;" href="https://lin.ee/xyz">公式LINEで最新情報を受け取る</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"120px"} -->
<div style="height:120px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->
`;

            const createRes = await fetch(window.wpApiSettings.root + 'wp/v2/pages', {
                method: 'POST',
                headers: {
                    'X-WP-Nonce': nonce,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: '4ヶ月少人数継続コース',
                    content: content,
                    status: 'publish',
                    slug: 'course-4months',
                    meta: {
                        cocoon_page_type: '1column_wide'
                    }
                })
            });
            const data = await createRes.json();
            return { status: 'success', pageId: data.id };
        });

        console.log("Result Course Page:", result);

        if (result && result.pageId) {
            const pageId = result.pageId;
            console.log("Cleaning up Page " + pageId);
            await page.goto('https://mirii-sewing.online/wp-admin/post.php?post=' + pageId + '&action=edit', { waitUntil: 'networkidle2' });
            await page.waitForFunction(() => typeof wp !== 'undefined' && wp.data && wp.data.select('core/editor') !== null, { timeout: 15000 });
            await new Promise(r => setTimeout(r, 4000));
            await page.evaluate(() => {
                const pageTypeCheck = document.querySelector('input[name="cocoon_page_type"][value="1column_wide"]');
                if (pageTypeCheck && !pageTypeCheck.checked) pageTypeCheck.click();
                ['cocoon_hide_page_title', 'cocoon_hide_sns_share_buttons', 'cocoon_hide_sns_follow_buttons', 'cocoon_hide_author_info', 'cocoon_hide_date_info', 'cocoon_hide_update_info']
                    .forEach(name => {
                        const cb = document.querySelector('input[name="' + name + '"]');
                        if (cb && !cb.checked) cb.click();
                    });
                wp.data.dispatch('core/editor').savePost();
            });
            await new Promise(r => setTimeout(r, 5000));

            // Update style.css to include this ID
            console.log("Updating style.css for ID " + pageId);
            await page.goto('https://mirii-sewing.online/wp-admin/theme-editor.php?file=style.css&theme=cocoon-child-master', { waitUntil: 'networkidle2' });
            await page.evaluate((pid) => {
                const cm = document.querySelector('.CodeMirror').CodeMirror;
                let currentVal = cm.getValue();
                if (currentVal.includes('body.page-id-27 ')) {
                    const newVal = currentVal.replace(/body\.page-id-27 /g, 'body.page-id-27 , body.page-id-' + pid + ' ');
                    cm.setValue(newVal);
                }
            }, pageId);
            await Promise.all([
                page.waitForNavigation({ waitUntil: 'networkidle2' }),
                page.click('#submit')
            ]);
        }

    } catch (e) {
        console.error("Error:", e);
    } finally {
        await browser.close();
    }
})();
