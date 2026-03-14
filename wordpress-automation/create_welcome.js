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
        console.log("Logged in");

        const newPageResult = await page.evaluate(async () => {
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
<p class="has-text-align-center font-mincho" style="font-size: clamp(1.2rem, 3vw, 2.0rem); font-weight: bold; line-height: 1.5; margin-bottom: 20px;">当教室の想い</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"textAlign":"center","level":1,"className":"font-mincho"} -->
<h1 class="wp-block-heading has-text-align-center font-mincho" style="font-size: clamp(2.0rem, 6vw, 3.5rem); margin-top:0; margin-bottom: 20px; color:#4a4a4a;">はじめての方へ</h1>
<!-- /wp:heading -->
</div>
<!-- /wp:group -->
</div></div>
<!-- /wp:cover -->

<!-- wp:group {"layout":{"type":"constrained","contentSize":"700px"}} -->
<div class="wp-block-group">

<!-- wp:paragraph {"align":"left"} -->
<p class="has-text-align-left" style="margin-bottom:40px; font-size:1.1em; line-height:1.8;">「子どものために、可愛い服を作ってあげたい」<br>そのあたたかいお気持ちだけで、ミシンを始める理由は十分です。</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"align":"left"} -->
<p class="has-text-align-left">でも、現実は本や動画を見ても「専門用語がわからない」「生地がずれる」「うまく縫えなくてイライラする」の連続。<br>「私には向いていないのかもしれない」と、いつしかミシンが箱に眠ったままになっていませんか？</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"align":"left"} -->
<p class="has-text-align-left">実は、ミシンで綺麗に縫えない理由は、あなたが「不器用だから」ではありません。<br>単に、独学では「正しい縫い方の手順」や「縫う前の重要な下準備」を知る機会がないだけなのです。</p>
<!-- /wp:paragraph -->

<!-- wp:spacer {"height":"60px"} -->
<div style="height:60px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:heading {"className":"font-mincho"} -->
<h2 class="wp-block-heading font-mincho" style="color:#c55c70; font-size:1.5rem; margin-bottom:30px; border-bottom:1px solid #eaeaea; padding-bottom:15px;">不器用さんを「ひとりで縫える」に変える</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"left"} -->
<p class="has-text-align-left">これまでに、独学で止まってしまった多くの初心者さんが当教室にお越しになりました。<br>そして、ほぼ全員が「こんなに綺麗に作れるなんて！」とご自身の作品に感動して帰られます。</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"align":"left"} -->
<p class="has-text-align-left">当教室では、元警察官の講師が「感覚」に頼らず、「論理的で迷わせないステップ」でお伝えします。<br>水通し、地直し、アイロンのかけ方といった土台の部分から丁寧に行うことで、誰でも驚くほど綺麗に仕上げることができるようになります。</p>
<!-- /wp:paragraph -->

<!-- wp:spacer {"height":"60px"} -->
<div style="height:60px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:heading {"className":"font-mincho"} -->
<h2 class="wp-block-heading font-mincho" style="color:#c55c70; font-size:1.5rem; margin-bottom:30px; border-bottom:1px solid #eaeaea; padding-bottom:15px;">ママ自身の「ご機嫌な時間」のために</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"left"} -->
<p class="has-text-align-left">育児や家事に追われる毎日のなかで、何気なくスマホを見て終わってしまう時間はもったいない。<br>無心になってミシンに向かい、形ができていく工程は、ママに大きな達成感をもたらしてくれます。</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"align":"left"} -->
<p class="has-text-align-left">そして、完成した服を子どもが「ママが作ったの！」と自慢げに着てくれる喜び。<br>「手作り」は、あなたの毎日をご機嫌にし、家族を笑顔にしてくれる最高のスキルです。</p>
<!-- /wp:paragraph -->

<!-- wp:spacer {"height":"60px"} -->
<div style="height:60px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {"backgroundColor":"luminous-vivid-amber","layout":{"type":"constrained","contentSize":"700px"}} -->
<div class="wp-block-group has-luminous-vivid-amber-background-color has-background" style="background-color:#faf5ed !important; padding:40px; border-radius:12px;">
<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center" style="font-weight:bold; margin-bottom:20px;">「私にもできるかな？」と迷われている方へ</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">まずは、たった1回で達成感が味わえる「1Day体験レッスン」で、ミシンの楽しさを思い出してみませんか？</p>
<!-- /wp:paragraph -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons" style="margin-top:20px;">
<!-- wp:button {"className":"custom-btn main-cta-btn"} -->
<div class="wp-block-button custom-btn main-cta-btn"><a class="wp-block-button__link wp-element-button" style="background-color:#c55c70; color:#fff; padding:15px 35px; border-radius:50px; font-weight:bold; box-shadow:0 4px 15px rgba(197,92,112,0.3); text-decoration:none; display:inline-block;" href="https://mirii-sewing.online/1day-lesson/">1Day体験レッスンの詳細を見る</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->

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
                    title: 'はじめての方へ',
                    content: content,
                    status: 'publish',
                    slug: 'welcome',
                    meta: {
                        cocoon_page_type: '1column_wide'
                    }
                })
            });
            const textResponse = await createRes.text();
            try {
                const createData = JSON.parse(textResponse);
                return { status: 'success', pageId: createData.id, raw: content };
            } catch (e) {
                return { status: 'error', data: textResponse.substring(0, 200) };
            }
        });

        console.log("Result Welcome Page:", newPageResult.status);

        if (newPageResult && newPageResult.pageId) {
            const pageId = newPageResult.pageId;
            console.log("Navigating to Edit Page for clean up (ID: " + pageId + ")...");
            await page.goto('https://mirii-sewing.online/wp-admin/post.php?post=' + pageId + '&action=edit', { waitUntil: 'networkidle2' });

            // Wait for Block editor to load
            await page.waitForFunction(() => typeof wp !== 'undefined' && wp.data && wp.data.select('core/editor') !== null, { timeout: 15000 });
            // Wait for Meta boxes slightly
            await new Promise(r => setTimeout(r, 4000));

            const metaUpdated = await page.evaluate(() => {
                let updated = false;

                // Page type -> 1 Column Wide
                const pageTypeCheck = document.querySelector('input[name="cocoon_page_type"][value="1column_wide"]');
                if (pageTypeCheck && !pageTypeCheck.checked) {
                    pageTypeCheck.click();
                    updated = true;
                }

                // Hide everything that looks like a blog
                const hideList = [
                    'cocoon_hide_page_title',
                    'cocoon_hide_sns_share_buttons',
                    'cocoon_hide_sns_follow_buttons',
                    'cocoon_hide_author_info',
                    'cocoon_hide_date_info',
                    'cocoon_hide_update_info'
                ];

                hideList.forEach(name => {
                    const cb = document.querySelector('input[name="' + name + '"]');
                    if (cb && !cb.checked) {
                        cb.click();
                        updated = true;
                    }
                });

                return updated;
            });

            console.log("Meta boxes updated:", metaUpdated);

            if (metaUpdated) {
                await page.evaluate(() => {
                    wp.data.dispatch('core/editor').savePost();
                });
                console.log("Saving post...");
                await new Promise(r => setTimeout(r, 5000));
                console.log("Post saved.");
            }

            // We need to apply CSS rules universally or specifically for this page ID
            console.log("Adding CSS exception for ID " + pageId);
            await page.goto('https://mirii-sewing.online/wp-admin/theme-editor.php?file=style.css&theme=cocoon-child-master', { waitUntil: 'networkidle2' });
            const injected = await page.evaluate((pid) => {
                const cmElement = document.querySelector('.CodeMirror');
                if (!cmElement) return false;
                const cm = cmElement.CodeMirror;
                if (!cm) return false;
                let currentVal = cm.getValue();
                if (!currentVal.includes('body.page-id-' + pid + ' .entry-title')) {
                    const newVal = currentVal.replace(/body\.home , body\.page-id-24 /g, 'body.home , body.page-id-24 , body.page-id-' + pid + ' ');
                    cm.setValue(newVal);
                    return true;
                }
                return 'already updated';
            }, pageId);

            console.log("CSS Injected:", injected);

            if (injected === true) {
                await Promise.all([
                    page.waitForNavigation({ waitUntil: 'networkidle2' }),
                    page.click('#submit')
                ]);
                console.log("CSS saved.");
            }
        }

    } catch (e) {
        console.error("Error:", e);
    } finally {
        await browser.close();
    }
})();
