const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--window-size=1280,1024'] });
    try {
        const page = await browser.newPage();

        // 1. Login
        await page.goto('https://mirii-sewing.online/wp-login.php', { waitUntil: 'networkidle2' });
        await page.type('#user_login', 'antigravity-ai@gmail.com');
        await page.type('#user_pass', 'hE6AnSDQNzN0FJ&lX&ITOU(o');
        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle2' }),
            page.click('#wp-submit')
        ]);
        console.log("Logged in");

        const result = await page.evaluate(async () => {
            const nonce = window.wpApiSettings ? window.wpApiSettings.nonce : null;
            if (!nonce) return { error: 'No nonce' };

            // 1Day体験レッスンページのコンテンツを定義
            const content = `
<!-- wp:html -->
<style>
/* カスタムCSS（1カラム・ブログ要素非表示） */
.page-id-24 .entry-title, .page-id-24 .page-title, .page-id-24 h1.entry-title,
.page-id-24 .post-meta, .page-id-24 .post-date, .page-id-24 .post-update,
.page-id-24 .author-info, .page-id-24 .sns-share, .page-id-24 .sns-follow,
.page-id-24 .toc, .page-id-24 #toc, .page-id-24 .article-header, .page-id-24 .article-footer,
.page-id-24 #sidebar, .page-id-24 .sidebar, .page-id-24 .widget {
    display: none !important;
}

.page-id-24 #main, .page-id-24 .main, .page-id-24 .content {
    width: 100% !important;
    max-width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
}
.page-id-24 .article, .page-id-24 .entry-content {
    border: none !important;
    background: transparent !important;
    padding: 0 !important;
}
.page-id-24 #content {
    padding-top: 0 !important;
}

/* 安心バッジのスタイル */
.badge-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
    list-style: none;
    padding: 0;
    margin-top: 25px;
}
.badge-list li {
    background: rgba(255,255,255,0.9);
    color: #c55c70;
    padding: 8px 16px;
    border-radius: 50px;
    font-size: 0.95em;
    font-weight: bold;
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}
/* Q&A / チェックリストスタイル */
.qa-box {
    margin-bottom: 20px;
}
.qa-q {
    font-weight: bold;
    color: #c55c70;
    margin-bottom: 8px;
    display: flex;
    align-items: flex-start;
}
.qa-q::before {
    content: "Q.";
    margin-right: 8px;
    font-size: 1.2em;
}
.qa-a {
    padding-left: 28px;
    font-size: 0.95em;
    color: #4a4a4a;
    line-height: 1.6;
}
.check-list {
    list-style: none;
    padding: 0;
}
.check-list li {
    padding-left: 1.5em;
    position: relative;
    margin-bottom: 15px;
    line-height: 1.6;
}
.check-list li::before {
    content: "✓";
    color: #c55c70;
    font-weight: bold;
    position: absolute;
    left: 0;
}
</style>
<!-- /wp:html -->

<!-- wp:cover {"dimRatio":40,"overlayColor":"pale-pink","isDark":false,"align":"full","className":"first-view-cover"} -->
<div class="wp-block-cover alignfull is-light first-view-cover" style="min-height:60vh; border-radius: 0 0 20px 20px; margin-bottom: 40px;">
<span aria-hidden="true" class="wp-block-cover__background has-pale-pink-background-color has-background-dim-40 has-background-dim"></span>
<div class="wp-block-cover__inner-container">
<!-- wp:group {"layout":{"type":"constrained","wideSize":"800px","contentSize":"800px"}} -->
<div class="wp-block-group">
<!-- wp:paragraph {"align":"center","className":"font-mincho"} -->
<p class="has-text-align-center font-mincho" style="font-size: clamp(1.2rem, 3vw, 2.0rem); font-weight: bold; line-height: 1.5; margin-bottom: 10px;">たった1回でも「私にもできた」が実感できる</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"textAlign":"center","level":1,"className":"font-mincho"} -->
<h1 class="wp-block-heading has-text-align-center font-mincho" style="font-size: clamp(2.0rem, 6vw, 3.5rem); margin-top:0; margin-bottom: 10px; color:#4a4a4a;">1Day体験レッスン</h1>
<!-- /wp:heading -->

<!-- wp:html -->
<ul class="badge-list">
    <li>🔰 初心者さん大歓迎</li>
    <li>⏱️ たった3時間で完成</li>
    <li>👜 準備不要・手ぶらでOK</li>
</ul>
<!-- /wp:html -->
</div>
<!-- /wp:group -->
</div></div>
<!-- /wp:cover -->

<!-- wp:spacer {"height":"60px"} -->
<div style="height:60px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {"layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group">
<!-- wp:heading {"textAlign":"center","className":"font-mincho"} -->
<h2 class="wp-block-heading has-text-align-center font-mincho">ミシンを買ったものの、<br>箱の中に眠っていませんか？</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"left"} -->
<p class="has-text-align-left">「子どものために可愛い服を作りたい」と思ってミシンを用意したけれど、いざ始めようとすると「何から手をつければいいのか分からない」「生地の切り方も合っているか不安」と手が止まってしまう。<br><br>そんなお悩みを持つ初心者さんのための、最初の一歩となる体験レッスンです。<br><br>当教室の体験レッスンでは、一番つまずきやすい「水通し」や「裁断」などの一番最初の準備はすべてこちらで済ませた「キット」をご用意しています。<br>そのため、「縫う楽しさ」と「服が完成する感動」を、たった3時間で味わっていただくことができます。</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"100px"} -->
<div style="height:100px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {"backgroundColor":"luminous-vivid-amber","className":"section-features","layout":{"type":"constrained","contentSize":"900px"}} -->
<div class="wp-block-group section-features has-luminous-vivid-amber-background-color has-background" style="background-color:#faf5ed !important; padding-top:60px;padding-bottom:60px;padding-left:40px;padding-right:40px; border-radius:12px;">
<!-- wp:heading {"textAlign":"center","className":"font-mincho"} -->
<h2 class="wp-block-heading has-text-align-center font-mincho" style="margin-top:0;">体験後に、こんな風に変わります</h2>
<!-- /wp:heading -->

<!-- wp:html -->
<ul class="check-list" style="max-width: 600px; margin: 30px auto; background: #fff; padding: 40px; border-radius: 12px; box-shadow: 0 5px 20px rgba(0,0,0,0.03);">
    <li><strong>ミシンへの苦手意識がなくなる</strong><br><span style="font-size:0.9em; color:#666;">「箱から出すのが億劫」な状態から、「縫うのが楽しい！」に変わります。</span></li>
    <li><strong>「私にもできた」という自信が持てる</strong><br><span style="font-size:0.9em; color:#666;">3時間で立派な服が1着仕上がることで、大きな達成感を味わえます。</span></li>
    <li><strong>次に独学で進むべき「正しい道筋」が見える</strong><br><span style="font-size:0.9em; color:#666;">感覚に頼らない「縫うコツ」がわかるため、一人で作る上での課題が明確になります。</span></li>
</ul>
<!-- /wp:html -->
</div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"100px"} -->
<div style="height:100px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {"layout":{"type":"constrained","contentSize":"900px"}} -->
<div class="wp-block-group">
<!-- wp:heading {"textAlign":"center","className":"font-mincho"} -->
<h2 class="wp-block-heading has-text-align-center font-mincho" style="margin-top:0;">当日の「作れるもの」と「学べること」</h2>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center" style="margin-bottom:40px;">以下から、お好きなアイテムを1つお選びいただけます。</p>
<!-- /wp:paragraph -->

<!-- wp:columns -->
<div class="wp-block-columns">
<!-- wp:column -->
<div class="wp-block-column blank-box feature-box" style="background:#fff; border:1px solid #f0f0f0; border-radius:12px; padding:30px; box-shadow:0 5px 20px rgba(0,0,0,0.03);">
<!-- wp:html -->
<div class="placeholder-img rect-img" style="background-color: #f9ecef; background-image: radial-gradient(rgba(197, 92, 112, 0.1) 1px, transparent 1px); background-size: 15px 15px; border-radius: 8px; aspect-ratio: 4/3; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
    <span style="color: rgba(197, 92, 112, 0.4); font-weight: bold;">PHOTO A</span>
</div>
<!-- /wp:html -->
<!-- wp:heading {"level":3,"className":"feature-title"} -->
<h3 class="wp-block-heading feature-title" style="font-size:1.1em; border-bottom:2px dotted #f0f0f0; padding-bottom:10px; margin-bottom:15px; color:#4a4a4a;">A. シンプルで上品な<br>裏地付きワンピース（女の子向け）</h3>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"left"} -->
<p class="has-text-align-left" style="font-size:0.95em;">初心者でも綺麗に仕上がる裏地の付け方や、ギャザーの寄せ方の基礎を学びます。そのままお出かけに着ていける上品なデザインです。</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column blank-box feature-box" style="background:#fff; border:1px solid #f0f0f0; border-radius:12px; padding:30px; box-shadow:0 5px 20px rgba(0,0,0,0.03);">
<!-- wp:html -->
<div class="placeholder-img rect-img" style="background-color: #fce4ec; background-image: radial-gradient(rgba(100, 150, 200, 0.1) 1px, transparent 1px); background-size: 15px 15px; border-radius: 8px; aspect-ratio: 4/3; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
    <span style="color: rgba(100, 150, 200, 0.4); font-weight: bold;">PHOTO B</span>
</div>
<!-- /wp:html -->
<!-- wp:heading {"level":3,"className":"feature-title"} -->
<h3 class="wp-block-heading feature-title" style="font-size:1.1em; border-bottom:2px dotted #f0f0f0; padding-bottom:10px; margin-bottom:15px; color:#4a4a4a;">B. 動きやすくておしゃれな<br>男の子用パンツ</h3>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"left"} -->
<p class="has-text-align-left" style="font-size:0.95em;">カーブの縫い方や、ウエストゴムの通し方の基本を学びます。活発な男の子でも動きやすく、何本も作りたくなる定番の形です。</p>
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

<!-- wp:group {"layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group">
<!-- wp:heading {"textAlign":"center","className":"font-mincho"} -->
<h2 class="wp-block-heading has-text-align-center font-mincho">レッスン詳細</h2>
<!-- /wp:heading -->

<!-- wp:table {"className":"is-style-regular"} -->
<figure class="wp-block-table is-style-regular"><table style="border-collapse: collapse; width: 100%;"><tbody>
<tr style="border-bottom: 1px solid #eaeaea;">
<td style="padding: 20px 15px; font-weight: bold; width: 30%; color: #c55c70;">所要時間</td>
<td style="padding: 20px 15px;">約3時間（前後する場合がございます）</td>
</tr>
<tr style="border-bottom: 1px solid #eaeaea;">
<td style="padding: 20px 15px; font-weight: bold; width: 30%; color: #c55c70;">参加費</td>
<td style="padding: 20px 15px;"><strong>15,000円</strong>（税込・材料キット代含む）</td>
</tr>
<tr style="border-bottom: 1px solid #eaeaea;">
<td style="padding: 20px 15px; font-weight: bold; width: 30%; color: #c55c70;">場所</td>
<td style="padding: 20px 15px;">神奈川県内（※詳細はご予約確定後にお知らせいたします）</td>
</tr>
<tr style="border-bottom: 1px solid #eaeaea;">
<td style="padding: 20px 15px; font-weight: bold; width: 30%; color: #c55c70;">持ち物</td>
<td style="padding: 20px 15px;">必要な道具はすべて教室でご用意しております。<br>手ぶらでお気軽にお越しください。</td>
</tr>
<tr style="border-bottom: 1px solid #eaeaea;">
<td style="padding: 20px 15px; font-weight: bold; width: 30%; color: #c55c70;">お子様連れ</td>
<td style="padding: 20px 15px;">可能です。お気に入りのおもちゃなどを少しご持参いただくと安心です。</td>
</tr>
</tbody></table></figure>
<!-- /wp:table -->
</div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"100px"} -->
<div style="height:100px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {"backgroundColor":"pale-pink","layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group has-pale-pink-background-color has-background" style="background-color:#fdf6f7 !important; padding:50px 40px; border-radius:12px;">
<!-- wp:heading {"textAlign":"center","className":"font-mincho"} -->
<h2 class="wp-block-heading has-text-align-center font-mincho" style="margin-top:0;">よくあるご不安（Q&amp;A）</h2>
<!-- /wp:heading -->

<!-- wp:html -->
<div class="qa-box">
    <div class="qa-q">まったくの初心者ですが大丈夫ですか？</div>
    <div class="qa-a">ご安心ください。水通しや裁断など、初心者の方が一番悩みやすい準備はこちらで済ませた「キット」をご用意しています。当日は「まっすぐ縫う」楽しさに集中していただけます。</div>
</div>
<div class="qa-box">
    <div class="qa-q">昔から本当に不器用なのですが…</div>
    <div class="qa-a">警察官から転身した講師が、「感覚」ではなく「論理的で迷いようのないステップ」で丁寧にお伝えします。おひとりおひとりのペースに合わせて進めますので焦る必要はありません。</div>
</div>
<div class="qa-box">
    <div class="qa-q">終わった後に無理な勧誘はありませんか？</div>
    <div class="qa-a">体験レッスン終了後に、希望される方のために「4ヶ月継続コース」のご案内資料等はお渡ししますが、無理な勧誘は一切行いません。「まずは1回作ってみたかった」という動機でも大歓迎です。</div>
</div>
<!-- /wp:html -->
</div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"120px"} -->
<div style="height:120px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {"backgroundColor":"light-green-cyan","className":"section-cta-line","layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group section-cta-line has-light-green-cyan-background-color has-background" style="padding:50px 40px; border-radius:12px; border: 2px solid #a3d9a5; box-shadow: 0 10px 30px rgba(163,217,165,0.2);">
<!-- wp:heading {"textAlign":"center","className":"font-mincho"} -->
<h2 class="wp-block-heading has-text-align-center font-mincho" style="margin-top:0; color:#2c8a32;">お申し込みの流れ</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"left"} -->
<p class="has-text-align-left" style="margin-bottom:20px;">当教室は少人数制のため、体験レッスンの募集枠が限られており、不定期でのご案内となっております。<br><br>募集の開始や日程の先行案内は、<strong>すべて公式LINEから</strong>お知らせしております。<br>ご興味がある方は、まずは公式LINEにご登録いただき、ミシンの基礎が学べる「3大特典」をお受け取りになりながら、次回の募集案内をお待ちください。</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons" style="margin-top:30px;">
<!-- wp:button {"className":"custom-btn line-btn"} -->
<div class="wp-block-button custom-btn line-btn" style="width:100%; max-width:400px;"><a class="wp-block-button__link wp-element-button" style="width:100%; text-align:center; background-color:#06C755; color:#fff; padding:15px; font-weight:bold; font-size:1.1rem; border-radius:50px; box-shadow:0 4px 10px rgba(6,199,85,0.3);" href="https://lin.ee/xyz">公式LINEで特典を受け取り<br><span style="font-size:0.8em; opacity:0.9; font-weight:normal;">次回の「募集案内」を待つ</span></a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"120px"} -->
<div style="height:120px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->
`;

            // 1Day体験レッスンページ(ID 24)の更新
            await fetch(window.wpApiSettings.root + 'wp/v2/pages/24', {
                method: 'POST',
                headers: {
                    'X-WP-Nonce': nonce,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: content
                })
            });

            return { status: 'success' };
        });

        console.log("Result 1Day Update:", result);

        // ======================================
        // 次に、「はじめての方へ」のページ作成
        // ======================================
        const newPageResult = await page.evaluate(async () => {
            const nonce = window.wpApiSettings.nonce;

            const content = `
<!-- wp:html -->
<style>
/* カスタムCSS（1カラム・ブログ要素非表示） */
body[class*="page-id-"] .entry-title, body[class*="page-id-"] .page-title, body[class*="page-id-"] h1.entry-title,
body[class*="page-id-"] .post-meta, body[class*="page-id-"] .post-date, body[class*="page-id-"] .post-update,
body[class*="page-id-"] .author-info, body[class*="page-id-"] .sns-share, body[class*="page-id-"] .sns-follow,
body[class*="page-id-"] .toc, body[class*="page-id-"] #toc, body[class*="page-id-"] .article-header, body[class*="page-id-"] .article-footer,
body[class*="page-id-"] #sidebar, body[class*="page-id-"] .sidebar, body[class*="page-id-"] .widget {
    display: none !important;
}

body[class*="page-id-"] #main, body[class*="page-id-"] .main, body[class*="page-id-"] .content {
    width: 100% !important;
    max-width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
}
body[class*="page-id-"] .article, body[class*="page-id-"] .entry-content {
    border: none !important;
    background: transparent !important;
    padding: 0 !important;
}
body[class*="page-id-"] #content {
    padding-top: 0 !important;
}
</style>
<!-- /wp:html -->

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
<h1 class="wp-block-heading has-text-align-center font-mincho" style="font-size: clamp(1.8rem, 5vw, 3.0rem); margin-top:0; margin-bottom: 20px; color:#4a4a4a;">はじめての方へ</h1>
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
            const createData = await createRes.json();
            return { status: 'success', pageId: createData.id };
        });

        console.log("Result Welcome Page:", newPageResult);

    } catch (e) {
        console.error("Error:", e);
    } finally {
        await browser.close();
    }
})();
