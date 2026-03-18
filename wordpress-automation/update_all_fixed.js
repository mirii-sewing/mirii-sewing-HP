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

        const cleanLayout = async (id) => {
            console.log("Navigating to Edit Page ID " + id + " to clean layout...");
            await page.goto('https://mirii-sewing.online/wp-admin/post.php?post=' + id + '&action=edit', { waitUntil: 'networkidle2' });
            await page.waitForFunction(() => typeof wp !== 'undefined' && wp.data && wp.data.select('core/editor') !== null, { timeout: 15000 }).catch(() => { });
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
        };

        // --- 全画像リスト（完全に重複しないように各ページへ割り当て） ---
        const urls = {
            // [トップページ用]
            top_fv: "https://mirii-sewing.online/wp-content/uploads/2026/03/4017D5D8-1CF6-4C12-9C3D-9D42E6807741-11064-00000698C60B498F-scaled.jpg", // 着画お揃い
            top_world: "https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_0519-scaled.jpg", // アトリエ全体
            top_sympathy: "https://mirii-sewing.online/wp-content/uploads/2026/03/3224AE36-550C-4158-A124-B287CD812561-11064-00000698F12CB829-scaled.jpg", // 悩み共感エリア用（別のお揃い着画）
            top_feat1: "https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_1337-scaled.jpg", // 特徴:準備不要
            top_feat2: "https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_1574-scaled.jpg", // 特徴:少人数
            top_feat3: "https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_2713-scaled.jpg", // 特徴:お家でも
            top_link1: "https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_2781-scaled.jpg", // 1Dayリンク
            top_link2: "https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_3124-scaled.jpg", // 少人数リンク
            top_voice: "https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_4742-scaled.jpg", // 生徒さんの声

            // [1Day体験レッスン用]
            day_fv: "https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_4814-scaled.jpg", // 1Day FV
            day_sympathy: "https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_4843-scaled.jpg", // 1Day 共感
            day_item1: "https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_5278-scaled.jpg", // 1Day アイテム1
            day_item2: "https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_5641-scaled.jpg", // 1Day アイテム2
            day_change: "https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_6824-scaled.jpg", // 1Day 体験後

            // [はじめての方へ（想い）用] - 本来の完成原稿の構成に戻す
            wel_fv: "https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_7086-1-scaled.jpg", // はじめに FV
            wel_story1: "https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_7363-scaled.jpg", // はじめに 思い出
            wel_story2: "https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_8313-1-scaled.jpg", // はじめに 時間
            wel_story3: "https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_8663-scaled.jpg" // はじめに 完成
        };


        // --- 1. トップページ (ID: 18) ---
        const html_top = `
<!-- wp:cover {"url":"${urls.top_fv}","dimRatio":10,"overlayColor":"black","align":"full","customCSS":"min-height:90vh;"} -->
<div class="wp-block-cover alignfull" style="min-height:90vh;">
    <span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim-10 has-background-dim"></span>
    <img class="wp-block-cover__image-background" src="${urls.top_fv}" data-object-fit="cover"/>
    <div class="wp-block-cover__inner-container">
        <!-- wp:group {"layout":{"type":"constrained","wideSize":"1000px"}} -->
        <div class="wp-block-group" style="text-align:center;">
            <p class="has-text-align-center font-mincho" style="color:#fff; font-size:clamp(1.2rem, 3vw, 2.2rem); text-shadow:0 3px 10px rgba(0,0,0,0.6); margin-bottom:15px; letter-spacing:0.05em; font-weight:normal;">「子どものために、何かを作りたい」<br>そのあたたかい気持ちを、形にする場所。</p>
            <h1 class="has-text-align-center font-mincho" style="color:#fff; font-size:clamp(2.5rem, 6vw, 5rem); margin:0; text-shadow:0 3px 15px rgba(0,0,0,0.7); letter-spacing:0.1em; line-height:1.2;">mirii sewing</h1>
        </div>
        <!-- /wp:group -->
    </div>
</div>
<!-- /wp:cover -->

<div class="brand-section">
    <div style="max-width:1000px; margin:0 auto; text-align:center;">
        <img src="${urls.top_world}" alt="アトリエ風景" style="width:100%; max-height:600px; object-fit:cover; border-radius:12px; box-shadow:0 15px 40px rgba(0,0,0,0.06); margin-bottom:50px;"/>
        <p class="font-mincho" style="font-size:clamp(1.1rem, 2vw, 1.4rem); line-height:2.2; color:#555;">
            ミシンの音が響く、ゆったりとした時間。<br>
            日常の忙しさを少しだけ忘れて、<br>
            一枚の布から小さな洋服が生まれる喜びを。<br>
            mirii sewing は、初心者でも安心して服作りを楽しめる<br>
            洋裁教室です。
        </p>
    </div>
</div>

<div class="section-bg-beige brand-section">
    <div class="wp-block-columns are-vertically-aligned-center" style="max-width:1000px; margin:0 auto; gap:6vw;">
        <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:45%">
            <img src="${urls.top_sympathy}" alt="洋服と温もり" style="border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.05); aspect-ratio:3/4; object-fit:cover; width:100%;"/>
        </div>
        <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:55%">
            <h2 class="brand-title" style="text-align:left !important;">こんなお悩みはありませんか？</h2>
            <div style="margin-left: 15px; border-left: 2px solid var(--mirii-pink-dark); padding-left: 15px; margin-bottom: 20px;">
                <p>・可愛い服を作ってあげたいけど、何から始めればいいか分からない。</p>
                <p>・ミシンは買ったけれど、箱に入ったまま。</p>
                <p>・自己流でやってみたら、失敗して嫌になってしまった。</p>
            </div>
            <p>そんな初心者さんにこそ、mirii sewing はぴったりです。</p>
        </div>
    </div>
</div>

<div class="brand-section">
    <div style="max-width:1000px; margin:0 auto;">
        <h2 class="brand-title" style="text-align:center !important; margin-bottom:60px;">mirii sewing 3つの特徴</h2>
        <div class="wp-block-columns" style="gap:4vw;">
            <div class="wp-block-column" style="text-align:center;">
                <img src="${urls.top_feat1}" alt="準備不要" style="width:100%; aspect-ratio:1/1; object-fit:cover; border-radius:50%; margin-bottom:20px; box-shadow:0 10px 20px rgba(0,0,0,0.05); border:5px solid #fff;"/>
                <h4 style="color:var(--mirii-pink-dark); margin-bottom:15px;">準備はすべてお任せ</h4>
                <p style="font-size:0.9rem;">一番つまずきやすい「水通し」や「裁断」などの面倒な準備は、すべてこちらで済ませた「キット」をご用意しています。手ぶらで気軽に参加できます。</p>
            </div>
            <div class="wp-block-column" style="text-align:center;">
                <img src="${urls.top_feat2}" alt="少人数" style="width:100%; aspect-ratio:1/1; object-fit:cover; border-radius:50%; margin-bottom:20px; box-shadow:0 10px 20px rgba(0,0,0,0.05); border:5px solid #fff;"/>
                <h4 style="color:var(--mirii-pink-dark); margin-bottom:15px;">最大2名までの少人数制</h4>
                <p style="font-size:0.9rem;">講師の目が行き届くよう、少人数できめ細やかにサポートします。ミシンの糸のかけ方から丁寧にお教えするので、初めての方でも安心です。</p>
            </div>
            <div class="wp-block-column" style="text-align:center;">
                <img src="${urls.top_feat3}" alt="お家でも" style="width:100%; aspect-ratio:1/1; object-fit:cover; border-radius:50%; margin-bottom:20px; box-shadow:0 10px 20px rgba(0,0,0,0.05); border:5px solid #fff;"/>
                <h4 style="color:var(--mirii-pink-dark); margin-bottom:15px;">「お家でも作れる」が目標</h4>
                <p style="font-size:0.9rem;">教室で完成することだけでなく、お家に帰ってからも一人で作れるように「洋裁の基礎体力」を身につけることを大切にしています。</p>
            </div>
        </div>
    </div>
</div>

<div class="section-bg-pink brand-section">
    <div style="max-width:1000px; margin:0 auto;">
        <h2 class="brand-title" style="text-align:center !important; margin-bottom:50px;">LESSON</h2>
        <div class="wp-block-columns" style="gap:40px;">
            <div class="wp-block-column" style="background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 15px 40px rgba(0,0,0,0.03);">
                <img src="${urls.top_link1}" alt="1Day体験レッスン" style="width:100%; aspect-ratio:4/3; object-fit:cover; display:block;"/>
                <div style="padding:40px 30px; text-align:center;">
                    <h3 style="font-size:1.4rem; margin-bottom:15px;">1Day体験レッスン</h3>
                    <p style="font-size:0.95rem; line-height:1.7; color:#666; margin-bottom:25px;">たった3時間で「私にもできた」を実感。<br>初めての方のための最初の一歩です。</p>
                    <a href="/1day-lesson/" class="btn-mirii-primary" style="padding:15px 40px;">詳細を見る</a>
                </div>
            </div>
            <div class="wp-block-column" style="background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 15px 40px rgba(0,0,0,0.03);">
                <img src="${urls.top_link2}" alt="少人数継続コース" style="width:100%; aspect-ratio:4/3; object-fit:cover; display:block;"/>
                <div style="padding:40px 30px; text-align:center;">
                    <h3 style="font-size:1.4rem; margin-bottom:15px;">少人数継続コース</h3>
                    <p style="font-size:0.95rem; line-height:1.7; color:#666; margin-bottom:25px;">基礎から着実にステップアップ。<br>自分の好きな服が作れるようになるコースです。</p>
                    <a href="/lessons/" class="btn-mirii-tertiary" style="padding:15px 40px;">詳細を見る</a>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- wp:cover {"url":"${urls.top_voice}","dimRatio":60,"overlayColor":"black","align":"full","customCSS":"min-height:70vh;"} -->
<div class="wp-block-cover alignfull" style="min-height:70vh; margin-bottom:0px;">
    <span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim-60 has-background-dim"></span>
    <img class="wp-block-cover__image-background" src="${urls.top_voice}" data-object-fit="cover"/>
    <div class="wp-block-cover__inner-container">
        <!-- wp:group {"layout":{"type":"constrained","wideSize":"800px"}} -->
        <div class="wp-block-group" style="text-align:center; padding: 0 20px;">
            <h2 class="has-text-align-center font-mincho" style="color:#fff; font-size:clamp(1.8rem, 4vw, 2.5rem); margin-bottom:40px; text-shadow:0 2px 8px rgba(0,0,0,0.5);">生徒さんの声</h2>
            <p style="color:#fff; font-size:clamp(1rem, 2vw, 1.1rem); line-height:2.0; font-style:italic; text-shadow:0 2px 8px rgba(0,0,0,0.5);">
                「不器用な私でも、本当に3時間で可愛い服が完成しました！<br>
                ミシンに向かう時間が、自分のための最高のリフレッシュになっています。」
            </p>
            <div style="margin-top:40px;">
                <a href="https://lin.ee/xyz" class="btn-mirii-secondary" style="background:rgba(255,255,255,0.9); border:none; color:var(--mirii-pink-dark);">公式LINEで最新情報をチェック</a>
            </div>
        </div>
        <!-- /wp:group -->
    </div>
</div>
<!-- /wp:cover -->
        `;
        await updatePage(18, html_top);
        await cleanLayout(18);


        // --- 2. 1Day体験レッスン (ID: 24) ---
        const html_1day = `
<!-- wp:cover {"url":"${urls.day_fv}","dimRatio":30,"overlayColor":"black","align":"full","customCSS":"min-height:70vh;"} -->
<div class="wp-block-cover alignfull" style="min-height:70vh;">
    <span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim-30 has-background-dim"></span>
    <img class="wp-block-cover__image-background" src="${urls.day_fv}" data-object-fit="cover"/>
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
    <div class="wp-block-columns are-vertically-aligned-center" style="max-width:900px; margin:0 auto; gap:6vw;">
        <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:45%">
            <figure class="wp-block-image size-large">
                <img src="${urls.day_sympathy}" alt="ミシン作業風景" style="border-radius:8px; box-shadow:0 10px 30px rgba(0,0,0,0.05); aspect-ratio:3/4; object-fit:cover; width:100%;"/>
            </figure>
        </div>
        <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:55%">
            <h2 class="brand-title" style="text-align:left !important;">ミシンを買ったものの、箱の中に眠っていませんか？</h2>
            <p>「子どものために可愛い服を作りたい」と思ってミシンを用意したけれど、いざ始めようとすると「何から手をつければいいのか分からない」「生地の切り方も合っているか不安」と手が止まってしまう…。</p>
            <p>そんなお悩みを持つ初心者さんのための、最初の一歩となる体験レッスンです。</p>
            <p>当教室では、一番つまずきやすい「水通し」や「裁断」などの一番最初の準備はすべてこちらで済ませた「キット」をご用意しています。</p>
            <p>そのため、「縫う楽しさ」と「服が完成する感動」を、たった3時間で味わっていただくことができます。</p>
        </div>
    </div>
</div>

<div class="section-bg-beige brand-section">
    <div style="max-width:900px; margin:0 auto;">
        <h2 class="brand-title" style="text-align:center !important; margin-bottom:50px;">作れるもの</h2>
        <div class="wp-block-columns" style="gap:40px;">
            <div class="wp-block-column" style="background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.03);">
                <img src="${urls.day_item1}" alt="ワンピース" style="width:100%; aspect-ratio:4/3; object-fit:cover; display:block;"/>
                <div style="padding:30px;">
                    <h4 style="font-size:1.3rem; margin-bottom:15px; border-bottom:1px solid #eee; padding-bottom:15px;">A. 裏地付きワンピース</h4>
                    <p style="font-size:0.95rem; line-height:1.7;">初心者でも綺麗に仕上がる裏地の付け方や、ギャザーの寄せ方の基礎を学びます。そのままお出かけに着ていける上品なデザインです。</p>
                </div>
            </div>
            <div class="wp-block-column" style="background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.03);">
                <img src="${urls.day_item2}" alt="男の子用パンツ" style="width:100%; aspect-ratio:4/3; object-fit:cover; display:block;"/>
                <div style="padding:30px;">
                    <h4 style="font-size:1.3rem; margin-bottom:15px; border-bottom:1px solid #eee; padding-bottom:15px;">B. 男の子用パンツ</h4>
                    <p style="font-size:0.95rem; line-height:1.7;">カーブの縫い方や、ウエストゴムの通し方の基本を学びます。活発な男の子でも動きやすく、何本も作りたくなる定番の形です。</p>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="brand-section">
    <div style="max-width:900px; margin:0 auto; display:flex; align-items:center; gap:50px; flex-wrap:wrap; flex-direction:row-reverse;">
        <div style="flex:1; min-width:300px;">
            <img src="${urls.day_change}" alt="笑顔の着画" style="width:100%; aspect-ratio:4/3; object-fit:cover; border-radius:8px; box-shadow:0 10px 30px rgba(0,0,0,0.05);"/>
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
        await cleanLayout(24);

        // --- 3. はじめての方へ（完成原稿の構成） ---
        const html_welcome = `
<!-- wp:cover {"url":"${urls.wel_fv}","dimRatio":20,"overlayColor":"black","align":"full","customCSS":"min-height:60vh;"} -->
<div class="wp-block-cover alignfull" style="min-height:60vh;">
    <span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim-20 has-background-dim"></span>
    <img class="wp-block-cover__image-background" src="${urls.wel_fv}" data-object-fit="cover"/>
    <div class="wp-block-cover__inner-container">
        <!-- wp:group {"layout":{"type":"constrained","wideSize":"800px"}} -->
        <div class="wp-block-group" style="text-align:center;">
            <p class="has-text-align-center font-mincho" style="color:#fff; font-size:clamp(1.2rem, 3vw, 1.8rem); text-shadow:0 3px 10px rgba(0,0,0,0.5); margin-bottom:10px; font-weight:normal;">子どものために、お家で服作りをはじめたいママへ</p>
            <h1 class="has-text-align-center" style="color:#fff; font-size:clamp(2rem, 5vw, 3.5rem); margin:0; text-shadow:0 3px 10px rgba(0,0,0,0.5); font-weight:normal;">はじめに</h1>
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
                <img src="${urls.wel_story1}" alt="ママの手作り服" style="border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.05); aspect-ratio:3/4; object-fit:cover; width:100%;"/>
            </figure>
        </div>
        <!-- /wp:column -->
        <!-- wp:column {"verticalAlignment":"center","width":"55%"} -->
        <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:55%">
            <h2 class="brand-title" style="text-align:left !important;">「ママが作ったの」と喜ぶ笑顔が見たいから</h2>
            <p>mirii sewingは、初心者ママのためのミシン教室です。</p>
            <p>「子どものために可愛い服を作りたい」<br>「ミシンの音を聞きながら、ほっとする時間を過ごしたい」<br>「成長していく子どもの思い出を手作りで残したい」</p>
            <p>この教室は、そんなあたたかい気持ちを持つママたちが集まる場所です。<br>特別な才能や、家庭科の成績は関係ありません。</p>
            <p>「自分にもできるかな」というほんの少しの勇気さえあれば、必ずお洋服は完成します。</p>
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
                <img src="${urls.wel_story2}" alt="自分の時間" style="border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.05); aspect-ratio:3/4; object-fit:cover; width:100%;"/>
            </figure>
        </div>
        <!-- /wp:column -->
        <!-- wp:column {"verticalAlignment":"center","width":"55%"} -->
        <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:55%">
            <h2 class="brand-title" style="text-align:left !important;">服作りの前に、「楽しむ時間」を作ること</h2>
            <p>mirii sewing が大切にしているのは、ただ「服の作り方」を教えることではありません。</p>
            <p>毎日忙しく過ごすママが、<br>「自分のための時間」を持ち、<br>「子どものために何かを作れた」と喜びを感じられる場所。<br>そんな空間を作りたいと思い、この教室を開きました。</p>
            <p>ミシンに向かう時間が、日常から少し離れてリフレッシュできる時間であってほしい。<br>難しくて嫌になってしまうのではなく、「私にもできた」と自信を持てる時間であってほしい。</p>
            <p>だからこそ、当教室は「初心者さんが安心して通える」ことに徹底的にこだわっています。</p>
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
                <img src="${urls.wel_story3}" alt="お家でも一人で" style="border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.05); aspect-ratio:3/4; object-fit:cover; width:100%;"/>
            </figure>
        </div>
        <!-- /wp:column -->
        <!-- wp:column {"verticalAlignment":"center","width":"55%"} -->
        <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:55%">
            <h2 class="brand-title" style="text-align:left !important;">完成させることより、「ひとりで出来るようになる」こと</h2>
            <p>教室で先生に手伝ってもらって、立派な服が一着できた。<br>それも嬉しい体験かもしれません。</p>
            <p>でも、mirii sewing が目指すのはその先です。<br>「お家に帰ってからも、自分で作り続けられるようになること」。<br>そのために、</p>
            <div style="margin-left: 15px; border-left: 2px solid var(--mirii-pink-dark); padding-left: 15px; margin-bottom:20px;">
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
                if (title.includes('はじめての方へ') || title.includes('はじめに')) {
                    return row.id.replace('post-', '');
                }
            }
            return null;
        });

        if (pageId) {
            console.log("Found Welcome page ID: " + pageId);
            await updatePage(pageId, html_welcome);
            await cleanLayout(pageId);
        } else {
            console.log("Could not find Welcome page.");
        }

        console.log("All Pages Restored & Updated.");

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
        process.exit(0);
    }
})();
