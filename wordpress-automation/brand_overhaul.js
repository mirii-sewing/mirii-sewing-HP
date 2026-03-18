const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    try {
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(180000);

        console.log("Logging in...");
        await page.goto('https://mirii-sewing.online/wp-login.php');
        await page.type('#user_login', 'antigravity-ai@gmail.com');
        await page.type('#user_pass', 'hE6AnSDQNzN0FJ&lX&ITOU(o');
        await Promise.all([page.waitForNavigation({ waitUntil: 'load' }), page.click('#wp-submit')]);

        // 1. Update style.css
        console.log("Updating Global CSS...");
        await page.goto('https://mirii-sewing.online/wp-admin/theme-editor.php?file=style.css&theme=cocoon-child-master', { waitUntil: 'load' });
        const newGlobalCSS = `
/* Brand Design Overhaul */
:root {
  --mirii-pink-soft: #F4DFE3;
  --mirii-pink-dark: #D8AEB7;
  --mirii-green-line: #7FAE9B;
  --mirii-text: #4A4A4A;
  --mirii-heading: #333333;
  --mirii-bg-main: #FAFAFA;
  --mirii-bg-alt: #F8F5F2;
  --mirii-border: #E9E6E4;
}

body {
  color: var(--mirii-text) !important;
  background-color: var(--mirii-bg-main) !important;
}

h1, h2, h3, h4, h5, h6 {
  color: var(--mirii-heading) !important;
}

.font-mincho {
  font-family: "Noto Serif JP", serif !important;
}

/* UI Elements */
.btn-mirii-pink {
  background-color: var(--mirii-pink-dark) !important;
  color: #fff !important;
  border-radius: 50px !important;
  padding: 16px 40px !important;
  font-weight: bold !important;
  text-decoration: none !important;
  display: inline-block !important;
  transition: all 0.3s ease !important;
  border: none !important;
  text-align: center;
}
.btn-mirii-pink:hover {
  opacity: 0.8;
}

.btn-mirii-green {
  background-color: var(--mirii-green-line) !important;
  color: #fff !important;
  border-radius: 50px !important;
  padding: 16px 40px !important;
  font-weight: bold !important;
  text-decoration: none !important;
  display: inline-block !important;
  transition: all 0.3s ease !important;
  border: none !important;
  text-align: center;
}

.btn-mirii-outline {
  background-color: #fff !important;
  color: var(--mirii-text) !important;
  border: 1px solid var(--mirii-border) !important;
  border-radius: 50px !important;
  padding: 14px 38px !important;
  font-weight: bold !important;
  text-decoration: none !important;
  display: inline-block !important;
  transition: all 0.3s ease !important;
  text-align: center;
}

.badge-mirii {
  background-color: var(--mirii-pink-soft) !important;
  color: var(--mirii-pink-dark) !important;
  padding: 6px 16px !important;
  border-radius: 20px !important;
  font-size: 0.85em !important;
  font-weight: bold !important;
  margin: 5px !important;
  display: inline-block !important;
}

.section-bg-pink {
  background-color: #FCF7F8 !important;
  border-radius: 12px;
}

.section-bg-beige {
  background-color: #F8F5F2 !important;
  border-radius: 12px;
}

/* Hide Blog Elements on specific pages */
.page-id-8 .entry-title, .page-id-8 .post-meta, .page-id-18 .entry-title, .page-id-18 .post-meta,
.page-id-24 .entry-title, .page-id-24 .post-meta, .page-id-25 .entry-title, .page-id-25 .post-meta,
.page-id-8 #sidebar, .page-id-18 #sidebar, .page-id-24 #sidebar, .page-id-25 #sidebar,
.page-id-8 .sns-share, .page-id-18 .sns-share, .page-id-24 .sns-share, .page-id-25 .sns-share,
.page-id-8 .toc, .page-id-18 .toc, .page-id-24 .toc, .page-id-25 .toc,
.page-id-8 .article-header, .page-id-18 .article-header, .page-id-24 .article-header, .page-id-25 .article-header,
.page-id-8 .article-footer, .page-id-18 .article-footer, .page-id-24 .article-footer, .page-id-25 .article-footer {
    display: none !important;
}

.page-id-8 #main, .page-id-18 #main, .page-id-24 #main, .page-id-25 #main {
    width: 100% !important;
    max-width: 100% !important;
    padding: 0 !important;
}
`;
        await page.evaluate((css) => {
            const cm = document.querySelector('.CodeMirror').CodeMirror;
            cm.setValue(cm.getValue() + '\\n' + css);
        }, newGlobalCSS);
        await page.click('#submit');
        await new Promise(r => setTimeout(r, 3000));

        // 2. Update Pages Content
        const images = {
            fv_top: 'https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_8469.jpg',
            fv_1day: 'https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_8313.jpg',
            fv_welcome: 'https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_8379.jpg',
            work_a: 'https://mirii-sewing.online/wp-content/uploads/2026/03/69261.jpg',
            work_b: 'https://mirii-sewing.online/wp-content/uploads/2026/03/69262.jpg',
            profile: 'https://mirii-sewing.online/wp-content/uploads/2026/03/3894_724909648.jpg'
        };

        const updatePage = async (id, html) => {
            console.log(`Updating Page ID ${id}...`);
            await page.evaluate(async (pid, content) => {
                const nonce = window.wpApiSettings.nonce;
                await fetch(window.wpApiSettings.root + 'wp/v2/pages/' + pid, {
                    method: 'POST',
                    headers: { 'X-WP-Nonce': nonce, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content: content })
                });
            }, id, html);
        };

        // --- 1Day Lesson Page Update ---
        const html_1day = `
<!-- wp:cover {"url":"${images.fv_1day}","dimRatio":30,"overlayColor":"black","isDark":false,"align":"full"} -->
<div class="wp-block-cover alignfull is-light" style="min-height:60vh;"><span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim-30 has-background-dim"></span><img class="wp-block-cover__image-background" src="${images.fv_1day}" data-object-fit="cover"/><div class="wp-block-cover__inner-container"><!-- wp:group {"layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group"><!-- wp:group {"layout":{"type":"flex","flexWrap":"wrap","justifyContent":"center"}} -->
<div class="wp-block-group"><span class="badge-mirii">🔰 初心者さん大歓迎</span><span class="badge-mirii">⏱️ たった3時間で完成</span><span class="badge-mirii">👜 手ぶらでOK</span></div>
<!-- /wp:group -->
<!-- wp:paragraph {"align":"center","className":"font-mincho"} -->
<p class="has-text-align-center font-mincho" style="font-size: clamp(1.2rem, 3vw, 2.0rem); color:#fff; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">たった1回で「私にもできた」を実感できる</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"textAlign":"center","level":1,"className":"font-mincho"} -->
<h1 class="wp-block-heading has-text-align-center font-mincho" style="font-size: clamp(2.5rem, 8vw, 4.5rem); color:#fff; margin-top:0.5em; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">1Day体験レッスン</h1>
<!-- /wp:heading --></div>
<!-- /wp:group --></div></div>
<!-- /wp:cover -->

<!-- wp:spacer {"height":"80px"} -->
<div style="height:80px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {"layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group">
<!-- wp:heading {"textAlign":"center","className":"font-mincho"} -->
<h2 class="wp-block-heading has-text-align-center font-mincho">ミシンを買ったものの、<br>箱の中に眠っていませんか？</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p style="margin-top:40px;">「子どものために可愛い服を作りたい」と思ってミシンを用意したけれど、いざ始めようとすると不安で手が止まってしまう…。そんなお悩みを持つ初心者さんのための、最初の一歩となる体験レッスンです。一番つまずきやすい「裁断」などの準備はすべて済ませた便利なキットをご用意しています。</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"80px"} -->
<div style="height:80px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {"className":"section-bg-pink","layout":{"type":"constrained","contentSize":"800px"},"style":{"spacing":{"padding":{"top":"80px","bottom":"80px"}}}} -->
<div class="wp-block-group section-bg-pink" style="padding:80px;"><!-- wp:heading {"textAlign":"center","className":"font-mincho"} -->
<h2 class="wp-block-heading has-text-align-center font-mincho">体験後にどう変わるか</h2>
<!-- /wp:heading -->

<!-- wp:group {"layout":{"type":"constrained","contentSize":"600px"},"style":{"spacing":{"margin":{"top":"40px"}}}} -->
<div class="wp-block-group" style="margin-top:40px">
<p>✔ ミシンへの恐怖心が消え、「私にもできる！」という自信が持てるようになります。</p>
<p>✔ お家でミシンを出すのが、「億劫な時間」から「楽しみな時間」に変わります。</p>
<p>✔ 次に何を学べば理想の服が作れるのか、自分に合ったステップが見えるようになります。</p>
</div>
<!-- /wp:group --></div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"80px"} -->
<div style="height:80px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {"layout":{"type":"constrained","contentSize":"1000px"}} -->
<div class="wp-block-group"><!-- wp:heading {"textAlign":"center","className":"font-mincho"} -->
<h2 class="wp-block-heading has-text-align-center font-mincho">作れるもの</h2>
<!-- /wp:heading -->

<!-- wp:columns {"style":{"spacing":{"margin":{"top":"60px"}}}} -->
<div class="wp-block-columns" style="margin-top:60px"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:image {"url":"${images.work_a}","sizeSlug":"large","linkNodes":false} -->
<figure class="wp-block-image size-large"><img src="${images.work_a}" alt="" style="border-radius:12px;"/></figure>
<!-- /wp:image --><!-- wp:heading {"level":4,"className":"font-mincho"} -->
<h4 class="wp-block-heading font-mincho" style="margin-top:20px;">A. 裏地付きワンピース</h4><p>初心者でも綺麗に仕上がる基礎を学びます。そのままお出かけに着ていける上品なデザインです。</p></div>
<!-- /wp:column --><!-- wp:column -->
<div class="wp-block-column"><!-- wp:image {"url":"${images.work_b}","sizeSlug":"large","linkNodes":false} -->
<figure class="wp-block-image size-large"><img src="${images.work_b}" alt="" style="border-radius:12px;"/></figure>
<!-- /wp:image --><!-- wp:heading {"level":4,"className":"font-mincho"} -->
<h4 class="wp-block-heading font-mincho" style="margin-top:20px;">B. 男の子用パンツ</h4><p>カーブの縫い方やウエストゴムの基本を学びます。活発な男の子でも動きやすい定番の形です。</p></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"100px"} -->
<div style="height:100px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {"layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group"><!-- wp:heading {"textAlign":"center","className":"font-mincho"} -->
<h2 class="wp-block-heading has-text-align-center font-mincho">安心のサポート体制</h2>
<!-- /wp:heading -->
<div style="margin-top:60px;">
  <div style="background:#fff; border:1px solid #eee; padding:30px; border-radius:12px; margin-bottom:20px;">
    <h4 class="font-mincho" style="color:var(--mirii-pink-dark);">Q. 本当に初心者ですが、大丈夫でしょうか？</h4>
    <p>もちろんです！参加者のほとんどが、ミシンの使い方が不安な初心者さんです。丁寧にお教えしますのでご安心ください。</p>
  </div>
  <div style="background:#fff; border:1px solid #eee; padding:30px; border-radius:12px;">
    <h4 class="font-mincho" style="color:var(--mirii-pink-dark);">Q. 無理な勧誘はありますか？</h4>
    <p>一切ございません。ご自身のペースで楽しんでいただくことを最優先にしています。</p>
  </div>
</div>
</div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"100px"} -->
<div style="height:100px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {"className":"section-bg-pink","layout":{"type":"constrained","contentSize":"800px"},"style":{"spacing":{"padding":{"top":"80px","bottom":"80px"}}}} -->
<div class="wp-block-group section-bg-pink" style="padding:80px; text-align:center;">
<h3 class="font-mincho" style="margin-bottom:30px;">まずは、たった3時間の<br>「たしかな自信」から。</h3>
<a href="https://lin.ee/xyz" class="btn-mirii-green">公式LINEで募集案内を受け取る</a>
<p style="margin-top:20px; font-size:0.85em;">※ご登録だけでカリキュラム等の最新情報を先行でお届けします。</p>
</div>
<!-- /wp:group -->
<div style="height:120px;"></div>
`;

        await updatePage(24, html_1day);

        // --- Welcome (はじめての方へ) Page Update ---
        const html_welcome = `
<!-- wp:cover {"url":"${images.fv_welcome}","dimRatio":20,"overlayColor":"black","align":"full"} -->
<div class="wp-block-cover alignfull" style="min-height:50vh;"><span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim-20 has-background-dim"></span><img class="wp-block-cover__image-background" src="${images.fv_welcome}" data-object-fit="cover"/><div class="wp-block-cover__inner-container"><!-- wp:group {"layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group">
<p class="has-text-align-center font-mincho" style="font-size: clamp(1.2rem, 3vw, 1.8rem); color:#fff; text-shadow:0 2px 4px rgba(0,0,0,0.3);">ミシンは、ママの毎日を<br>もっと自由に、もっと楽しくする魔法。</p>
<h1 class="wp-block-heading has-text-align-center font-mincho" style="font-size: clamp(2.5rem, 8vw, 4rem); color:#fff; margin-top:0.5em; text-shadow:0 2px 4px rgba(0,0,0,0.3);">はじめての方へ</h1>
</div>
<!-- /wp:group --></div></div>
<!-- /wp:cover -->

<!-- wp:spacer {"height":"80px"} -->
<div style="height:80px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {"layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group">
<h2 class="font-mincho">「私には無理」と思っていませんか？</h2>
<p style="margin-top:40px;">「子供のために何か作りたいけど、家庭科の時間は苦手だった」「ミシンの糸通しだけで挫折しそう」<br>当教室に来られる方の多くが、最初はそう仰います。SNSで見かける素敵な作品との距離を、私たちは埋めたいと考えています。</p>
<p>大丈夫です。ミシンは特別な才能が必要なツールではありません。正しい手順とコツさえ分かれば、誰でも自分の手で魔法を生み出せるようになります。</p>
</div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"100px"} -->
<div style="height:100px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<div class="section-bg-beige" style="padding:80px 40px;">
  <div style="max-width:800px; margin:0 auto;">
    <h2 class="has-text-align-center font-mincho" style="margin-bottom:60px;">mirii sewing が大切にしていること</h2>
    <h3 class="font-mincho" style="border-left:4px solid var(--mirii-pink-dark); padding-left:20px; margin-bottom:20px;">1. 「完成すること」より「習得すること」</h3>
    <p style="margin-bottom:40px;">理屈が分かれば、教室を出た後もお一人で応用ができるようになります。なぜそうするのか、という「裏側」を丁寧にお伝えします。</p>
    <h3 class="font-mincho" style="border-left:4px solid var(--mirii-pink-dark); padding-left:20px; margin-bottom:20px;">2. 「依存」ではなく「自立」へ</h3>
    <p>最終的には、型紙を見て自分で判断し、自由に子供服を作れるようになる。その自立した喜びこそが、洋裁の本当の楽しさです。</p>
  </div>
</div>

<div style="height:120px;"></div>

<div class="section-bg-pink" style="padding:80px 40px; text-align:center;">
  <h3 class="font-mincho" style="margin-bottom:30px;">まずは、ここから始めてみませんか？</h3>
  <a href="/1day-lesson/" class="btn-mirii-pink">1Day体験レッスンを見る</a>
  <p style="margin-top:20px; font-size:0.85em;">あるいは公式LINEにて、最新情報を配信しています。</p>
</div>
`;
        await updatePage(25, html_welcome);

        // --- Home Page Update ---
        const html_home = `
<!-- wp:cover {"url":"${images.fv_top}","dimRatio":20,"overlayColor":"black","align":"full"} -->
<div class="wp-block-cover alignfull" style="min-height:92vh;"><span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim-20 has-background-dim"></span><img class="wp-block-cover__image-background" src="${images.fv_top}" data-object-fit="cover"/><div class="wp-block-cover__inner-container"><!-- wp:group {"layout":{"type":"constrained","wideSize":"1000px"}} -->
<div class="wp-block-group">
<h2 class="has-text-align-center font-mincho" style="color:#fff; font-size:clamp(1.5rem, 4vw, 2.5rem); line-height:1.6; text-shadow:0 3px 6px rgba(0,0,0,0.4);">ミシンで紡ぐ、<br>ママと子供の愛おしい時間</h2>
<div style="height:40px;"></div>
<div style="text-align:center;"><a href="/welcome/" class="btn-mirii-pink">はじめての方へ</a></div>
</div>
<!-- /wp:group --></div></div>
<!-- /wp:cover -->

<div style="height:120px;"></div>

<div style="max-width:900px; margin:0 auto; padding:0 20px;">
  <h2 class="has-text-align-center font-mincho" style="margin-bottom:60px;">ミシンへの「苦手意識」を<br>「私にもできる！」という自信に</h2>
  <p>mirii sewingは、初心者ママのための少人数制洋裁教室です。箱の中に眠ったままのミシンを、子供のための素敵な魔法のツールに変えてみませんか？</p>
  
  <div style="margin-top:80px; display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:40px;">
    <div style="background:var(--mirii-bg-alt); padding:40px; border-radius:12px;">
      <h3 class="font-mincho" style="margin-bottom:20px;">1Day体験レッスン</h3>
      <p>まずは3時間で体験。ミシンの基本と完成の喜びを味わえます。</p>
      <a href="/1day-lesson/" class="btn-mirii-outline" style="margin-top:20px;">詳細を見る</a>
    </div>
    <div style="background:var(--mirii-bg-alt); padding:40px; border-radius:12px;">
      <h3 class="font-mincho" style="margin-bottom:20px;">公式LINEのご案内</h3>
      <p>レッスンの先行予約や、最新情報を定期的にお届けしています。</p>
      <a href="https://lin.ee/xyz" class="btn-mirii-green" style="margin-top:20px;">友だち追加する</a>
    </div>
  </div>
</div>

<div style="height:120px;"></div>
`;
        await updatePage(18, html_home); // HOME (New)

        console.log("Taking final verification screenshots...");
        // 1Day
        await page.goto('https://mirii-sewing.online/1day-lesson/', { waitUntil: 'load' });
        await page.screenshot({ path: '/Users/ayumi/.gemini/antigravity/brain/b3195448-d29e-4066-a535-3f07e06d8a74/overhaul_1day.png', fullPage: true });
        // Welcome
        await page.goto('https://mirii-sewing.online/welcome/', { waitUntil: 'load' });
        await page.screenshot({ path: '/Users/ayumi/.gemini/antigravity/brain/b3195448-d29e-4066-a535-3f07e06d8a74/overhaul_welcome.png', fullPage: true });
        // Home
        await page.goto('https://mirii-sewing.online/home-new/', { waitUntil: 'load' });
        await page.screenshot({ path: '/Users/ayumi/.gemini/antigravity/brain/b3195448-d29e-4066-a535-3f07e06d8a74/overhaul_home.png', fullPage: true });

        console.log("Brand Overhaul Complete.");

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
        process.exit(0);
    }
})();
