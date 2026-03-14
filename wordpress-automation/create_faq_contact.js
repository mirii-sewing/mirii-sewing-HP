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

        async function createPage(title, slug, content) {
            return await page.evaluate(async (title, slug, content) => {
                const nonce = window.wpApiSettings.nonce;
                const res = await fetch(window.wpApiSettings.root + 'wp/v2/pages', {
                    method: 'POST',
                    headers: { 'X-WP-Nonce': nonce, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title, slug, content, status: 'publish', meta: { cocoon_page_type: '1column_wide' } })
                });
                const data = await res.json();
                return data.id;
            }, title, slug, content);
        }

        async function cleanPage(pid) {
            console.log("Cleaning up Page " + pid);
            await page.goto('https://mirii-sewing.online/wp-admin/post.php?post=' + pid + '&action=edit', { waitUntil: 'networkidle2' });
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
            await new Promise(r => setTimeout(r, 4000));
        }

        const faqContent = `
<!-- wp:cover {"dimRatio":40,"overlayColor":"pale-pink","isDark":false,"align":"full","className":"first-view-cover"} -->
<div class="wp-block-cover alignfull is-light first-view-cover" style="min-height:30vh; border-radius: 0 0 20px 20px; margin-bottom: 60px;">
<span aria-hidden="true" class="wp-block-cover__background has-pale-pink-background-color has-background-dim-40 has-background-dim"></span>
<div class="wp-block-cover__inner-container">
<h1 class="wp-block-heading has-text-align-center font-mincho" style="font-size: 3rem; color:#4a4a4a;">よくある質問</h1>
</div></div>
<!-- /wp:cover -->

<!-- wp:group {"layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group">
<div class="qa-box" style="margin-bottom:30px;">
    <div style="font-weight:bold; color:#c55c70; font-size:1.1em; margin-bottom:10px;">Q. まったくの初心者ですがついていけますか？</div>
    <p style="padding-left:20px; font-size:0.95em;">はい、もちろんです。当教室に来られる方の多くが、ミシンの糸のかけ方すら不安な初心者さんです。水通しや裁断などの難しい準備を省いたキット形式から始めますので、安心してご参加ください。</p>
</div>
<div class="qa-box" style="margin-bottom:30px;">
    <div style="font-weight:bold; color:#c55c70; font-size:1.1em; margin-bottom:10px;">Q. 自分のミシンを持っていく必要はありますか？</div>
    <p style="padding-left:20px; font-size:0.95em;">いいえ、教室内にある高性能なミシンをお使いいただけますので、手ぶらでお越しいただけます。もしご自身のミシンでの使い方を詳しく知りたい場合は、お持ち込みいただくことも可能です。</p>
</div>
<div class="qa-box" style="margin-bottom:30px;">
    <div style="font-weight:bold; color:#c55c70; font-size:1.1em; margin-bottom:10px;">Q. 駐車場はありますか？</div>
    <p style="padding-left:20px; font-size:0.95em;">はい、1台分ご用意がございます。お車で来られる際は、事前にその旨をお伝えいただけますとスムーズです。</p>
</div>
<div class="qa-box" style="margin-bottom:30px;">
    <div style="font-weight:bold; color:#c55c70; font-size:1.1em; margin-bottom:10px;">Q. レッスンのキャンセル料はいつから発生しますか？</div>
    <p style="padding-left:20px; font-size:0.95em;">材料等の手配の都合上、レッスンの3日前からキャンセル料を頂戴しております。詳細は体験レッスンお申し込み時にご案内いたします。</p>
</div>
</div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"120px"} -->
<div style="height:120px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->
`;

        const contactContent = `
<!-- wp:cover {"dimRatio":40,"overlayColor":"pale-pink","isDark":false,"align":"full","className":"first-view-cover"} -->
<div class="wp-block-cover alignfull is-light first-view-cover" style="min-height:30vh; border-radius: 0 0 20px 20px; margin-bottom: 60px;">
<span aria-hidden="true" class="wp-block-cover__background has-pale-pink-background-color has-background-dim-40 has-background-dim"></span>
<div class="wp-block-cover__inner-container">
<h1 class="wp-block-heading has-text-align-center font-mincho" style="font-size: 3rem; color:#4a4a4a;">お問い合わせ</h1>
</div></div>
<!-- /wp:cover -->

<!-- wp:group {"layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group">
<p class="has-text-align-center">現在、レッスンに関するお問い合わせや日程のご相談は、<br><strong>公式LINE</strong>にてスムーズに承っております。</p>

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons" style="margin-top:40px;">
<!-- wp:button {"className":"custom-btn line-btn"} -->
<div class="wp-block-button custom-btn line-btn"><a class="wp-block-button__link wp-element-button" style="background-color:#06C755; color:#fff; padding:15px 50px; border-radius:50px; font-size:1.2rem; font-weight:bold; text-decoration:none;" href="https://lin.ee/xyz">公式LINEでお問い合わせする</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->

<p class="has-text-align-center" style="margin-top:60px; font-size:0.9em; color:#888;">※LINEをお使いでない方は、お電話または以下の窓口までご連絡ください。<br>（通常3営業日以内にご返信いたします）</p>

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center" style="margin-top:20px;">[ メールでのお問い合わせは準備中です ]</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"120px"} -->
<div style="height:120px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->
`;

        const faqId = await createPage('よくある質問', 'faq', faqContent);
        const contactId = await createPage('お問い合わせ', 'contact', contactContent);

        await cleanPage(faqId);
        await cleanPage(contactId);

        // Update style.css
        await page.goto('https://mirii-sewing.online/wp-admin/theme-editor.php?file=style.css&theme=cocoon-child-master', { waitUntil: 'networkidle2' });
        await page.evaluate((pid1, pid2) => {
            const cm = document.querySelector('.CodeMirror').CodeMirror;
            let currentVal = cm.getValue();
            if (currentVal.includes('body.page-id-32 ')) {
                const newVal = currentVal.replace(/body\.page-id-32 /g, 'body.page-id-32 , body.page-id-' + pid1 + ' , body.page-id-' + pid2 + ' ');
                cm.setValue(newVal);
            }
        }, faqId, contactId);
        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle2' }),
            page.click('#submit')
        ]);

    } catch (e) {
        console.error("Error:", e);
    } finally {
        await browser.close();
    }
})();
