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
<p class="has-text-align-center font-mincho" style="font-size: clamp(1.1rem, 3vw, 1.8rem); font-weight: bold; line-height: 1.5; margin-bottom: 20px;">ただ作るだけじゃない、一生の技術を。</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"textAlign":"center","level":1,"className":"font-mincho"} -->
<h1 class="wp-block-heading has-text-align-center font-mincho" style="font-size: clamp(2.2rem, 7vw, 4.0rem); margin-top:0; margin-bottom: 20px; color:#4a4a4a;">教室の特徴</h1>
<!-- /wp:heading -->
</div>
<!-- /wp:group -->
</div></div>
<!-- /wp:cover -->

<!-- wp:group {"layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group">
<!-- wp:heading {"textAlign":"center","className":"font-mincho"} -->
<h2 class="wp-block-heading has-text-align-center font-mincho">なぜ、当教室の生徒さんは<br>初心者からでも「ひとりで」作れるようになるのか。</h2>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"left"} -->
<p class="has-text-align-left" style="margin-top:40px;">多くの裁縫本や動画は、「ある程度できる人」を前提に説明が進みます。しかし、本当の初心者さんが知りたいのは、その手前の「生地の向き」や「アイロンの当て方」、そして「なぜそうするのか」という理由です。<br><br>mirii sewingでは、警察官時代の指導経験を活かした独自のメソッドで、あなたの「わからない」を根本から解決します。</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"80px"} -->
<div style="height:80px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {"layout":{"type":"constrained","contentSize":"1000px"}} -->
<div class="wp-block-group">
<!-- wp:columns {"isStackedOnMobile":true} -->
<div class="wp-block-columns">
<!-- wp:column -->
<div class="wp-block-column blank-box" style="background:#fff; border:1px solid #f0f0f0; border-radius:12px; padding:40px; box-shadow:0 5px 20px rgba(0,0,0,0.03);">
<!-- wp:heading {"level":3,"className":"font-mincho"} -->
<h3 class="wp-block-heading font-mincho" style="color:#c55c70; border-bottom:2px dotted #f0f0f0; padding-bottom:15px; margin-bottom:20px;">1. 警察官時代の経験を活かした<br>「迷わせない」ロジカルな指導</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>約15年間の警察官勤務で培った、防犯講話などの「誰にでも伝わる伝え方」をレッスンに応用しています。感覚ではなく論理的に教えるため、初心者の方でも「何をどうすればいいか」の道筋が明確になります。</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column blank-box" style="background:#fff; border:1px solid #f0f0f0; border-radius:12px; padding:40px; box-shadow:0 5px 20px rgba(0,0,0,0.03);">
<!-- wp:heading {"level":3,"className":"font-mincho"} -->
<h3 class="wp-block-heading font-mincho" style="color:#c55c70; border-bottom:2px dotted #f0f0f0; padding-bottom:15px; margin-bottom:20px;">2. 「縫うため」ではなく<br>「綺麗に仕上げるため」の準備を重視</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>服作りの完成度の8割は、縫う前の「裁断」と「アイロン（地直し）」で決まります。当教室では、キットを縫い合わせるだけではなく、一生使える「生地の扱い方の基礎」から徹底してお伝えします。</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->

<!-- wp:columns {"isStackedOnMobile":true,"style":{"spacing":{"margin":{"top":"30px"}}}} -->
<div class="wp-block-columns" style="margin-top:30px">
<!-- wp:column -->
<div class="wp-block-column blank-box" style="background:#fff; border:1px solid #f0f0f0; border-radius:12px; padding:40px; box-shadow:0 5px 20px rgba(0,0,0,0.03);">
<!-- wp:heading {"level":3,"className":"font-mincho"} -->
<h3 class="wp-block-heading font-mincho" style="color:#c55c70; border-bottom:2px dotted #f0f0f0; padding-bottom:15px; margin-bottom:20px;">3. 「先生がいなくてもできる」<br>自立を促す復習サポート</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>教室で完成させることは簡単ですが、大切なのは「自宅でも同じように作れること」です。レッスン後も迷わないよう、ご自身のペースで無理なく復習できる環境とアドバイスを大切にしています。</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column blank-box" style="background:#fff; border:1px solid #f0f0f0; border-radius:12px; padding:40px; box-shadow:0 5px 20px rgba(0,0,0,0.03);">
<!-- wp:heading {"level":3,"className":"font-mincho"} -->
<h3 class="wp-block-heading font-mincho" style="color:#c55c70; border-bottom:2px dotted #f0f0f0; padding-bottom:15px; margin-bottom:20px;">4. 少人数制で<br>お子様連れでも安心の環境</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>最大2〜3名の少人数制なので、講師がつきっきりでサポートできます。お子様連れの場合も、ママが集中できるよう、そしてお子様も安心して過ごせる温かい雰囲気づくりを心がけています。</p>
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

<!-- wp:group {"backgroundColor":"pale-pink","layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group has-pale-pink-background-color has-background" style="background-color:#fdf6f7 !important; padding:60px 40px; border-radius:12px; text-align:center;">
<!-- wp:heading {"className":"font-mincho"} -->
<h2 class="wp-block-heading font-mincho">まずは3時間の「たしかな自信」から。</h2>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center" style="margin-top:20px;">当教室のこだわりを詰め込んだレッスンを、まずは体験してみませんか？</p>
<!-- /wp:paragraph -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons" style="margin-top:30px;">
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

            const createRes = await fetch(window.wpApiSettings.root + 'wp/v2/pages', {
                method: 'POST',
                headers: {
                    'X-WP-Nonce': nonce,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: '教室の特徴',
                    content: content,
                    status: 'publish',
                    slug: 'features',
                    meta: {
                        cocoon_page_type: '1column_wide'
                    }
                })
            });
            const data = await createRes.json();
            return { status: 'success', pageId: data.id };
        });

        console.log("Result Features Page:", result);

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
                if (currentVal.includes('body.page-id-25 ')) {
                    const newVal = currentVal.replace(/body\.page-id-25 /g, 'body.page-id-25 , body.page-id-' + pid + ' ');
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
