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

        // Profile Content
        const profileContent = `
<!-- wp:cover {"dimRatio":40,"overlayColor":"pale-pink","isDark":false,"align":"full","className":"first-view-cover"} -->
<div class="wp-block-cover alignfull is-light first-view-cover" style="min-height:40vh; border-radius: 0 0 20px 20px; margin-bottom: 60px;">
<span aria-hidden="true" class="wp-block-cover__background has-pale-pink-background-color has-background-dim-40 has-background-dim"></span>
<div class="wp-block-cover__inner-container">
<h1 class="wp-block-heading has-text-align-center font-mincho" style="font-size: 3rem; color:#4a4a4a;">講師プロフィール</h1>
</div></div>
<!-- /wp:cover -->

<!-- wp:group {"layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group">
<div class="placeholder-img circle-img" style="max-width:250px; margin: 0 auto 30px;"></div>
<h2 class="has-text-align-center font-mincho" style="margin-bottom:10px;">加瀬 あゆみ</h2>
<p class="has-text-align-center" style="color:#888; margin-bottom:40px;">ミシン初心者専門・子ども服ミシン教室講師</p>

<h3 class="font-mincho" style="color:#c55c70; border-bottom:1px solid #eaeaea; padding-bottom:10px;">警察官から、ミシン教室の講師へ。</h3>
<p style="margin-top:20px;">私は以前、約15年間警察官として勤務していました。規律の厳しい世界で、多くの方の前でお話しする防犯講話などを通じ、「どうすれば大切な情報を確実にお伝えできるか」を常に考え、行動してきました。<br><br>そんな私がミシンに出会ったのは、長年の不妊治療を経て第一子を出産した後のことでした。</p>

<h3 class="font-mincho" style="color:#c55c70; border-bottom:1px solid #eaeaea; padding-bottom:10px; margin-top:50px;">「この子のために作りたい」が変えた私の世界</h3>
<p style="margin-top:20px;">「この子のために、何か可愛いものを作ってあげたい」<br>そう思って通い始めたミシン教室。最初は私も、生地の表裏さえ怪しい初心者でした。でも、一枚の服が形になり、それを娘が喜んで着てくれたとき、心の底から湧き上がる感動がありました。<br><br>「私にも、こんなに素敵な服が作れるんだ」<br>家事や育児に追われ、自分のことを後回しにしがちだった日々のなかで、その達成感は私自身の自己肯定感を大きく引き上げてくれました。</p>

<h3 class="font-mincho" style="color:#c55c70; border-bottom:1px solid #eaeaea; padding-bottom:10px; margin-top:50px;">ママたちの「ご機嫌な時間」を応援したい</h3>
<p style="margin-top:20px;">子どもと一緒に過ごせる時間は、長いようでいて、実はあっという間に過ぎ去ってしまいます。<br>「今だからこその価値」を形に残せる手作り服の世界を、もっと多くのママに知ってほしい。<br><br>警察官時代に培った「迷わせない指導力」で、あなたの最初の一歩を全力でサポートします。一緒に、ミシンを通してもっとご機嫌な自分に出会いましょう。</p>
</div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"120px"} -->
<div style="height:120px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->
`;

        // Voices Content
        const voicesContent = `
<!-- wp:cover {"dimRatio":40,"overlayColor":"pale-pink","isDark":false,"align":"full","className":"first-view-cover"} -->
<div class="wp-block-cover alignfull is-light first-view-cover" style="min-height:40vh; border-radius: 0 0 20px 20px; margin-bottom: 60px;">
<span aria-hidden="true" class="wp-block-cover__background has-pale-pink-background-color has-background-dim-40 has-background-dim"></span>
<div class="wp-block-cover__inner-container">
<h1 class="wp-block-heading has-text-align-center font-mincho" style="font-size: 3rem; color:#4a4a4a;">生徒さんの声</h1>
</div></div>
<!-- /wp:cover -->

<!-- wp:group {"layout":{"type":"constrained","contentSize":"900px"}} -->
<div class="wp-block-group">
<!-- wp:columns -->
<div class="wp-block-columns">
<!-- wp:column -->
<div class="wp-block-column voice-box" style="background:#fff; border:1px solid #f0f0f0; border-radius:12px; padding:40px; margin-bottom:30px; box-shadow:0 5px 20px rgba(0,0,0,0.03);">
<div style="display:flex; align-items:center; margin-bottom:20px;">
<div class="placeholder-img circle-img" style="width:60px; height:60px; margin-right:15px;"></div>
<strong>2歳の女の子ママ</strong>
</div>
<h4 style="color:#c55c70;">「ミシンへの恐怖心がなくなりました」</h4>
<p style="font-size:0.95em;">ずっと興味はあったものの、何から手をつけていいか分からず2年間ミシンを寝かせていました。体験レッスンで3時間で1着完成でき、「私にもできるんだ！」と自信になりました。今では娘の服を作るのが毎日の楽しみです。</p>
</div>
<!-- /wp:column -->
<!-- wp:column -->
<div class="wp-block-column voice-box" style="background:#fff; border:1px solid #f0f0f0; border-radius:12px; padding:40px; margin-bottom:30px; box-shadow:0 5px 20px rgba(0,0,0,0.03);">
<div style="display:flex; align-items:center; margin-bottom:20px;">
<div class="placeholder-img circle-img" style="width:60px; height:60px; margin-right:15px;"></div>
<strong>継続コース受講中ママ</strong>
</div>
<h4 style="color:#c55c70;">「論理的な教え方で迷いません」</h4>
<p style="font-size:0.95em;">先生の教え方はとてもロジカルで、「なぜこうするのか」が分かるので家で一人で縫うときも迷うことが少なくなりました。少人数なので質問もしやすく、不器用な私でも着実にステップアップできています。</p>
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
</div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"120px"} -->
<div style="height:120px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->
`;

        const profileId = await createPage('講師プロフィール', 'profile', profileContent);
        const voicesId = await createPage('生徒さんの声', 'voice', voicesContent);

        await cleanPage(profileId);
        await cleanPage(voicesId);

        // Update style.css
        await page.goto('https://mirii-sewing.online/wp-admin/theme-editor.php?file=style.css&theme=cocoon-child-master', { waitUntil: 'networkidle2' });
        await page.evaluate((pid1, pid2) => {
            const cm = document.querySelector('.CodeMirror').CodeMirror;
            let currentVal = cm.getValue();
            if (currentVal.includes('body.page-id-29 ')) {
                const newVal = currentVal.replace(/body\.page-id-29 /g, 'body.page-id-29 , body.page-id-' + pid1 + ' , body.page-id-' + pid2 + ' ');
                cm.setValue(newVal);
            }
        }, profileId, voicesId);
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
