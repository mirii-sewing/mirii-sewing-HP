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

        // 既存アップロード済みの類似画像や、今回選定した画像のURL（手動取得・推測）を使用
        // ※ すでにWPメディアライブラリに同名ファイルがある場合を想定。
        // ※ もし画像が表示されない場合は別途アップロード処理を修正しますが、一旦このURLで進めます。
        const images = {
            fv: 'https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_9758-scaled.jpg', // 作業着物アップ（代替FV）
            item1: 'https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_8857-scaled.jpg', // 1Day完成服
            item2: 'https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_8932-scaled.jpeg', // 服単体
            support: 'https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_6860-scaled.jpg', // 手元と講師
            smile: 'https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_6045-scaled.jpg' // 着画喜び
        };

        const html_1day = `
<!-- wp:cover {"url":"${images.fv}","dimRatio":30,"overlayColor":"black","align":"full","customCSS":"min-height:70vh;"} -->
<div class="wp-block-cover alignfull" style="min-height:70vh;">
    <span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim-30 has-background-dim"></span>
    <img class="wp-block-cover__image-background" src="${images.fv}" data-object-fit="cover"/>
    <div class="wp-block-cover__inner-container">
        <!-- wp:group {"layout":{"type":"constrained","wideSize":"800px"}} -->
        <div class="wp-block-group" style="text-align:center;">
            <!-- wp:group {"layout":{"type":"flex","flexWrap":"wrap","justifyContent":"center"},"style":{"spacing":{"margin":{"bottom":"20px"}}}} -->
            <div class="wp-block-group" style="margin-bottom:20px; display:flex; justify-content:center; gap:10px;">
                <span style="background:rgba(255,255,255,0.9); color:#4a4a4a; padding:6px 16px; border-radius:30px; font-weight:bold; font-size:0.9rem; box-shadow:0 2px 5px rgba(0,0,0,0.1);">初心者さん大歓迎</span>
                <span style="background:rgba(255,255,255,0.9); color:#4a4a4a; padding:6px 16px; border-radius:30px; font-weight:bold; font-size:0.9rem; box-shadow:0 2px 5px rgba(0,0,0,0.1);">たった3時間で完成</span>
                <span style="background:rgba(255,255,255,0.9); color:#4a4a4a; padding:6px 16px; border-radius:30px; font-weight:bold; font-size:0.9rem; box-shadow:0 2px 5px rgba(0,0,0,0.1);">準備不要・手ぶらでOK</span>
            </div>
            <!-- /wp:group -->
            <p class="has-text-align-center" style="color:#fff; font-size:clamp(1.2rem, 3vw, 1.8rem); line-height:1.5; text-shadow:0 2px 8px rgba(0,0,0,0.5);">たった1回で「私にもできた」を実感できる</p>
            <h1 class="has-text-align-center" style="color:#fff; font-size:clamp(2.5rem, 6vw, 4rem); margin:10px 0 0 0; text-shadow:0 3px 10px rgba(0,0,0,0.5); font-weight:normal;">1Day体験レッスン</h1>
        </div>
        <!-- /wp:group -->
    </div>
</div>
<!-- /wp:cover -->

<div class="brand-section">
    <!-- wp:columns {"verticalAlignment":"center"} -->
    <div class="wp-block-columns are-vertically-aligned-center" style="max-width:900px; margin:0 auto; gap:6vw;">
        <!-- wp:column {"verticalAlignment":"center","width":"45%"} -->
        <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:45%">
            <figure class="wp-block-image size-large">
                <img src="${images.support}" alt="ミシン作業風景" style="border-radius:8px; box-shadow:0 10px 30px rgba(0,0,0,0.05); aspect-ratio:3/4; object-fit:cover; width:100%;"/>
            </figure>
        </div>
        <!-- /wp:column -->
        <!-- wp:column {"verticalAlignment":"center","width":"55%"} -->
        <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:55%">
            <h2 class="brand-title" style="text-align:left !important;">ミシンを買ったものの、箱の中に眠っていませんか？</h2>
            <p>「子どものために可愛い服を作りたい」と思ってミシンを用意したけれど、いざ始めようとすると「何から手をつければいいのか分からない」「生地の切り方も合っているか不安」と手が止まってしまう…。</p>
            <p>そんなお悩みを持つ初心者さんのための、最初の一歩となる体験レッスンです。</p>
            <p>当教室では、一番つまずきやすい「水通し」や「裁断」などの一番最初の準備はすべてこちらで済ませた「キット」をご用意しています。</p>
            <p>そのため、「縫う楽しさ」と「服が完成する感動」を、たった3時間で味わっていただくことができます。</p>
        </div>
        <!-- /wp:column -->
    </div>
    <!-- /wp:columns -->
</div>

<div class="section-bg-beige brand-section">
    <div style="max-width:900px; margin:0 auto;">
        <h2 class="brand-title" style="text-align:center !important; margin-bottom:50px;">作れるもの</h2>
        <!-- wp:columns -->
        <div class="wp-block-columns" style="gap:40px;">
            <!-- wp:column -->
            <div class="wp-block-column" style="background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.03);">
                <img src="${images.item1}" alt="ワンピース" style="width:100%; aspect-ratio:4/3; object-fit:cover; display:block;"/>
                <div style="padding:30px;">
                    <h4 style="font-size:1.3rem; margin-bottom:15px; border-bottom:1px solid #eee; padding-bottom:15px;">A. 裏地付きワンピース</h4>
                    <p style="font-size:0.95rem; line-height:1.7;">初心者でも綺麗に仕上がる裏地の付け方や、ギャザーの寄せ方の基礎を学びます。そのままお出かけに着ていける上品なデザインです。</p>
                </div>
            </div>
            <!-- /wp:column -->
            <!-- wp:column -->
            <div class="wp-block-column" style="background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.03);">
                <img src="${images.item2}" alt="男の子用パンツ" style="width:100%; aspect-ratio:4/3; object-fit:cover; display:block;"/>
                <div style="padding:30px;">
                    <h4 style="font-size:1.3rem; margin-bottom:15px; border-bottom:1px solid #eee; padding-bottom:15px;">B. 男の子用パンツ</h4>
                    <p style="font-size:0.95rem; line-height:1.7;">カーブの縫い方や、ウエストゴムの通し方の基本を学びます。活発な男の子でも動きやすく、何本も作りたくなる定番の形です。</p>
                </div>
            </div>
            <!-- /wp:column -->
        </div>
        <!-- /wp:columns -->
    </div>
</div>

<div class="brand-section">
    <div style="max-width:900px; margin:0 auto; display:flex; align-items:center; gap:50px; flex-wrap:wrap; flex-direction:row-reverse;">
        <div style="flex:1; min-width:300px;">
            <img src="${images.smile}" alt="笑顔の着画" style="width:100%; aspect-ratio:4/3; object-fit:cover; border-radius:8px; box-shadow:0 10px 30px rgba(0,0,0,0.05);"/>
        </div>
        <div style="flex:1.5; min-width:300px;">
            <h2 class="brand-title" style="text-align:left !important; margin-bottom:30px;">体験後にどう変わるか</h2>
            <div style="margin-bottom:20px; display:flex; gap:15px;">
                <span style="color:var(--mirii-pink-dark); font-weight:bold; font-size:1.2rem;">✔</span>
                <p style="margin:0;">ミシンへの恐怖心が消え、「私にもできる！」という自信が持てるようになります。</p>
            </div>
            <div style="margin-bottom:20px; display:flex; gap:15px;">
                <span style="color:var(--mirii-pink-dark); font-weight:bold; font-size:1.2rem;">✔</span>
                <p style="margin:0;">お家でミシンを箱から出すのが、「億劫な時間」から「楽しみな時間」に変わります。</p>
            </div>
            <div style="margin-bottom:20px; display:flex; gap:15px;">
                <span style="color:var(--mirii-pink-dark); font-weight:bold; font-size:1.2rem;">✔</span>
                <p style="margin:0;">次に何を学べば理想の服が作れるのか、自分に合ったステップが見えるようになります。</p>
            </div>
        </div>
    </div>
</div>

<div class="section-bg-pink brand-section">
    <div style="max-width:800px; margin:0 auto;">
        <h2 class="brand-title" style="text-align:center !important;">安心のサポート体制</h2>
        <div style="background:#fff; border-radius:12px; padding:30px; margin-bottom:20px; box-shadow:0 5px 15px rgba(0,0,0,0.02);">
            <div style="font-weight:bold; font-size:1.1rem; margin-bottom:10px;">Q. 本当に初心者ですが、大丈夫でしょうか？</div>
            <p style="margin:0; color:#555;">もちろんです！参加者のほとんどが、ミシンの使い方が不安な初心者さんです。講師が一人ひとり丁寧にお教えしますので、ご安心ください。</p>
        </div>
        <div style="background:#fff; border-radius:12px; padding:30px; margin-bottom:20px; box-shadow:0 5px 15px rgba(0,0,0,0.02);">
            <div style="font-weight:bold; font-size:1.1rem; margin-bottom:10px;">Q. 不器用なので、時間内に終わるか心配です。</div>
            <p style="margin:0; color:#555;">裁断などの難しい工程を済ませた状態で始めますので、3時間でお洋服を完成させて、笑顔でお持ち帰りいただけます。</p>
        </div>
        <div style="background:#fff; border-radius:12px; padding:30px; margin-bottom:20px; box-shadow:0 5px 15px rgba(0,0,0,0.02);">
            <div style="font-weight:bold; font-size:1.1rem; margin-bottom:10px;">Q. 無理な勧誘はありますか？</div>
            <p style="margin:0; color:#555;">一切ございません。体験後、もっと学びたいと思われた方には継続コースのご案内もいたしますが、ご自身のペースで楽しんでいただくことを最優先にしています。</p>
        </div>
    </div>
</div>

<div class="brand-section" style="text-align:center; padding:100px 24px;">
    <div style="max-width:850px; margin:0 auto; background:#fdf6f7; padding:60px; border-radius:16px;">
        <h2 class="brand-title" style="text-align:center !important;">まずは、たった3時間の<br>「たしかな自信」から。</h2>
        <p>体験レッスンの募集は、公式LINEにて不定期で行っております。<br>「私にもできるかな？」と迷われている方も、まずは公式LINEにて最新の募集案内を受け取ってみてください。</p>
        <div style="height:40px;"></div>
        <div>
            <a href="https://lin.ee/xyz" class="btn-mirii-secondary" style="font-size:1.1rem; padding:18px 50px;">公式LINEで募集案内を受け取る</a>
        </div>
        <p style="margin-top:20px; font-size:0.85em; color:#888;">※ご登録だけでカリキュラム等の最新情報を先行でお届けします。</p>
    </div>
</div>
        `;

        await updatePage(24, html_1day);

        // クリーン設定（メタボックス更新）
        console.log("Navigating to Edit Page (post ID 24) to clean layout...");
        await page.goto('https://mirii-sewing.online/wp-admin/post.php?post=24&action=edit', { waitUntil: 'networkidle2' });
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

        console.log("1Day Lesson Page Update Complete.");

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
        process.exit(0);
    }
})();
