const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    try {
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(180000);

        console.log("Logging in...");
        await page.goto('https://mirii-sewing.online/wp-admin/', { waitUntil: 'load' });
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

        // --- 画像リストの役割再定義 ---
        const urls = {
            // 世界観写真（アトリエ全体）
            top_fv: "https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_0519-scaled.jpg",

            // 下部の世界観セクション用（元FVのお揃い着画など、素敵な作品写真）
            top_world: "https://mirii-sewing.online/wp-content/uploads/2026/03/4017D5D8-1CF6-4C12-9C3D-9D42E6807741-11064-00000698C60B498F-scaled.jpg",

            // 共感：手元・準備風景
            top_sympathy: "https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_2713-scaled.jpg",

            // 特徴：レッスン風景や手元
            top_feat1: "https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_1337-scaled.jpg", // 準備不要（生地や糸）
            top_feat2: "https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_1574-scaled.jpg", // 少人数（レッスン風景）
            top_feat3: "https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_2781-scaled.jpg", // お家でも（別の手元やミシン）

            // 1Day導線：完成作品
            top_link1: "https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_5641-scaled.jpg", // 完成服
            top_link2: "https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_3124-scaled.jpg", // コース導線

            // 生徒さんの変化：着画や笑顔写真
            top_voice: "https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_6824-scaled.jpg"
        };

        const html_top = `
<!-- wp:cover {"url":"${urls.top_fv}","dimRatio":20,"overlayColor":"black","align":"full","customCSS":"min-height:90vh;"} -->
<div class="wp-block-cover alignfull" style="min-height:90vh;">
    <span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim-20 has-background-dim"></span>
    <img class="wp-block-cover__image-background" src="${urls.top_fv}" data-object-fit="cover"/>
    <div class="wp-block-cover__inner-container">
        <!-- wp:group {"layout":{"type":"constrained","wideSize":"1000px"}} -->
        <div class="wp-block-group" style="text-align:center;">
            <p class="has-text-align-center font-mincho" style="color:#fff; font-size:clamp(1rem, 2.5vw, 1.8rem); text-shadow:0 3px 10px rgba(0,0,0,0.6); margin-bottom:15px; letter-spacing:0.05em; font-weight:normal;">子どものために服作りをはじめたいママへ</p>
            <h1 class="has-text-align-center font-mincho" style="color:#fff; font-size:clamp(2rem, 5vw, 4rem); margin:0 0 20px 0; text-shadow:0 3px 15px rgba(0,0,0,0.7); line-height:1.4;">未経験から、<br>ひとりで作れるようになる<br>少人数制ミシン教室</h1>
            <p class="has-text-align-center font-mincho" style="color:#fff; font-size:clamp(1rem, 2vw, 1.5rem); text-shadow:0 3px 10px rgba(0,0,0,0.6); margin-bottom:0; font-weight:normal; letter-spacing:0.1em;">mirii sewing</p>
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
                <p>・ミシンを買ったけれど、箱の中に入ったまま…</p>
                <p>・作り方の動画を見ても、途中で止まってしまう</p>
                <p>・生地の裁断や準備で、難しく感じてしまう</p>
                <p>・そもそも何から始めればいいのか分からない</p>
            </div>
            <p>そんな独学で止まってしまった初心者さんにこそ、<br>mirii sewingはぴったりです。</p>
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

<!-- wp:cover {"url":"${urls.top_voice}","dimRatio":40,"overlayColor":"black","align":"full","customCSS":"min-height:70vh; margin-bottom:0;"} -->
<div class="wp-block-cover alignfull" style="min-height:70vh; margin-bottom:0px;">
    <span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim-40 has-background-dim"></span>
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

        // キャッシュパージのクリック処理（もしあれば）
        console.log("Saving complete.");

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
        process.exit(0);
    }
})();
