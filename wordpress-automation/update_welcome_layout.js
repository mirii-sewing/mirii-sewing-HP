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
            fv: 'https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_7875-scaled.jpg', // 準備された綺麗なテーブル
            sympathy1: 'https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_8314-scaled.jpg', // 嬉しそうに走るお子さん
            sympathy2: 'https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_9684-scaled.jpg', // 手元のサポート
            sympathy3: 'https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_8910-scaled.jpg', // 色とりどりの生地や糸
            alt_fv: 'https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_7105-scaled.jpg', // もし上記がなかった場合の代替（アトリエ風景）
            alt_sympathy1: 'https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_5640-scaled.jpg', // 着画
            alt_sympathy2: 'https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_9330-scaled.jpg', // 手元
            alt_sympathy3: 'https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_8524-scaled.jpg'  // 綺麗な服
        };

        const html_welcome = `
<!-- wp:cover {"url":"${images.fv}","dimRatio":20,"overlayColor":"black","align":"full","customCSS":"min-height:60vh;"} -->
<div class="wp-block-cover alignfull" style="min-height:60vh;">
    <span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim-20 has-background-dim"></span>
    <img class="wp-block-cover__image-background" src="${images.fv}" data-object-fit="cover" onerror="this.src='${images.alt_fv}'"/>
    <div class="wp-block-cover__inner-container">
        <!-- wp:group {"layout":{"type":"constrained","wideSize":"800px"}} -->
        <div class="wp-block-group" style="text-align:center;">
            <h1 class="has-text-align-center" style="color:#fff; font-size:clamp(2rem, 5vw, 3.5rem); margin:0; text-shadow:0 3px 10px rgba(0,0,0,0.5); font-weight:normal;">はじめての方へ</h1>
        </div>
        <!-- /wp:group -->
    </div>
</div>
<!-- /wp:cover -->

<div class="brand-section" style="padding-top: 80px;">
    <!-- wp:columns {"verticalAlignment":"center"} -->
    <div class="wp-block-columns are-vertically-aligned-center" style="max-width:900px; margin:0 auto; gap:6vw;">
        <!-- wp:column {"verticalAlignment":"center","width":"45%"} -->
        <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:45%">
            <figure class="wp-block-image size-large">
                <img src="${images.sympathy1}" alt="ママの手作り服" style="border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.05); aspect-ratio:3/4; object-fit:cover; width:100%;" onerror="this.src='${images.alt_sympathy1}'"/>
            </figure>
        </div>
        <!-- /wp:column -->
        <!-- wp:column {"verticalAlignment":"center","width":"55%"} -->
        <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:55%">
            <h2 class="brand-title" style="text-align:left !important;">服作りの前に、「楽しむ時間」を作ること</h2>
            <p>mirii sewing が大切にしているのは、ただ「服の作り方」を教えることではありません。</p>
            <p>毎日忙しく過ごすママが、<br>「自分のための時間」を持ち、<br>「子どものために何かを作れた」と喜びを感じられる場所。<br>そんな空間を作りたいと思い、この教室を開きました。</p>
            <p>ミシンに向かう時間が、日常から少し離れてリフレッシュできる時間であってほしい。<br>難しくて嫌になってしまうのではなく、「私にもできた」と自信を持てる時間であってほしい。</p>
            <p>だからこそ、当教室は「初心者さんが安心して通える」ことに特化しています。</p>
        </div>
        <!-- /wp:column -->
    </div>
    <!-- /wp:columns -->
</div>

<div class="section-bg-beige brand-section">
    <!-- wp:columns {"verticalAlignment":"center"} -->
    <div class="wp-block-columns are-vertically-aligned-center" style="max-width:900px; margin:0 auto; gap:6vw; flex-direction:row-reverse;">
        <!-- wp:column {"verticalAlignment":"center","width":"45%"} -->
        <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:45%">
            <figure class="wp-block-image size-large">
                <img src="${images.sympathy2}" alt="丁寧なサポート" style="border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.05); aspect-ratio:3/4; object-fit:cover; width:100%;" onerror="this.src='${images.alt_sympathy2}'"/>
            </figure>
        </div>
        <!-- /wp:column -->
        <!-- wp:column {"verticalAlignment":"center","width":"55%"} -->
        <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:55%">
            <h2 class="brand-title" style="text-align:left !important;">「私には無理」と思っていませんか？</h2>
            <p>「家庭科以来、ミシンなんて触っていない」<br>「裁縫は苦手で、ボタン付けくらいしかできない」<br>「ミシンは買ったけど、糸の通し方でつまずいて箱にしまったまま」</p>
            <p>現在通われている生徒さんも、最初は皆さんそうおっしゃっていました。</p>
            <p>でも、つまずくのが当たり前です。<br>服作りには「順序」があり、それを知らないまま自己流で始めようとするから難しく感じてしまうだけなのです。</p>
        </div>
        <!-- /wp:column -->
    </div>
    <!-- /wp:columns -->
</div>

<div class="brand-section">
    <!-- wp:columns {"verticalAlignment":"center"} -->
    <div class="wp-block-columns are-vertically-aligned-center" style="max-width:900px; margin:0 auto; gap:6vw;">
        <!-- wp:column {"verticalAlignment":"center","width":"45%"} -->
        <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:45%">
            <figure class="wp-block-image size-large">
                <img src="${images.sympathy3}" alt="お家でも作れるように" style="border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.05); aspect-ratio:3/4; object-fit:cover; width:100%;" onerror="this.src='${images.alt_sympathy3}'"/>
            </figure>
        </div>
        <!-- /wp:column -->
        <!-- wp:column {"verticalAlignment":"center","width":"55%"} -->
        <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:55%">
            <h2 class="brand-title" style="text-align:left !important;">完成させることより、「ひとりで出来るようになる」こと</h2>
            <p>教室で先生に手伝ってもらって、立派な服が一着できた。<br>それも嬉しい体験かもしれません。</p>
            <p>でも、mirii sewing が目指すのはその先です。<br>「お家に帰ってからも、自分で作り続けられるようになること」。<br>そのために、</p>
            <div style="margin-left: 15px; border-left: 2px solid var(--mirii-pink-dark); padding-left: 15px;">
                <p>・生地はどうやって選べばいいの？<br>・型紙はどう使うの？<br>・綺麗に縫うためのコツは？</p>
            </div>
            <p>といった「服作りの基礎体力」を、順を追って丁寧にお伝えしています。<br>「先生がいなくても作れた！」 その小さな成功体験の積み重ねが、一生楽しめる趣味へと繋がっていきます。</p>
        </div>
        <!-- /wp:column -->
    </div>
    <!-- /wp:columns -->
</div>

<div class="section-bg-pink brand-section" style="text-align:center; padding:100px 24px;">
    <div style="max-width:850px; margin:0 auto; background:#fff; padding:60px; border-radius:16px; box-shadow:0 10px 40px rgba(0,0,0,0.03);">
        <h2 class="brand-title" style="text-align:center !important;">まずは体験で、ミシンの楽しさを思い出してください</h2>
        <p>「自分にもできるかもしれない」<br>その気持ちが芽生えたら、ぜひ一度1Day体験レッスンに遊びにいらしてください。</p>
        <p>一番つまずきやすい準備はこちらで済ませてあるので、「縫う楽しさ」だけを純粋に味わっていただけます。</p>
        <div style="height:40px;"></div>
        <div style="display:flex; justify-content:center; gap:20px; flex-wrap:wrap;">
            <a href="/1day-lesson/" class="btn-mirii-primary">1Day体験レッスンの詳細を見る</a>
            <a href="https://lin.ee/xyz" class="btn-mirii-secondary">公式LINEで最新情報を受け取る</a>
        </div>
    </div>
</div>
        `;

        await page.goto('https://mirii-sewing.online/wp-admin/edit.php?post_type=page', { waitUntil: 'load' });

        const pageId = await page.evaluate(() => {
            const rows = document.querySelectorAll('#the-list tr');
            for (const row of rows) {
                const title = row.querySelector('.row-title')?.innerText || '';
                if (title.includes('はじめての方へ')) {
                    return row.id.replace('post-', '');
                }
            }
            return null;
        });

        if (pageId) {
            console.log("Found Welcome page ID: " + pageId);
            await updatePage(pageId, html_welcome);

            console.log("Navigating to Edit Page to clean layout...");
            await page.goto('https://mirii-sewing.online/wp-admin/post.php?post=' + pageId + '&action=edit', { waitUntil: 'networkidle2' });
            await page.waitForFunction(() => typeof wp !== 'undefined' && wp.data && wp.data.select('core/editor') !== null, { timeout: 15000 });
            await new Promise(r => setTimeout(r, 3000));

            const metaUpdated = await page.evaluate(() => {
                let updated = false;
                const pageTypeCheck = document.querySelector('input[name="cocoon_page_type"][value="1column_wide"]');
                if (pageTypeCheck && !pageTypeCheck.checked) {
                    pageTypeCheck.click();
                    updated = true;
                }
                const checkboxNames = ['cocoon_hide_page_title', 'cocoon_hide_sns_share_buttons', 'cocoon_hide_sns_follow_buttons', 'cocoon_hide_author_info', 'cocoon_hide_date_info', 'cocoon_hide_update_info'];
                checkboxNames.forEach(name => {
                    const cb = document.querySelector('input[name="' + name + '"]');
                    if (cb && !cb.checked) {
                        cb.click();
                        updated = true;
                    }
                });
                return updated;
            });

            if (metaUpdated) {
                await page.evaluate(() => { wp.data.dispatch('core/editor').savePost(); });
                await new Promise(r => setTimeout(r, 5000));
            }
        } else {
            console.log("Could not find Welcome page.");
        }

        console.log("Welcome Page Update Complete.");

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
        process.exit(0);
    }
})();
