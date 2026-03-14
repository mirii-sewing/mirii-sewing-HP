const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--window-size=1280,1024'] });
    try {
        const page = await browser.newPage();

        // 1. ログイン
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

            // 新しいコンテンツHTMLの定義（全書き換え）
            const refinedContent = `
<!-- wp:cover {"dimRatio":40,"overlayColor":"pale-pink","isDark":false,"align":"full","className":"first-view-cover"} -->
<div class="wp-block-cover alignfull is-light first-view-cover" style="min-height:80vh">
<span aria-hidden="true" class="wp-block-cover__background has-pale-pink-background-color has-background-dim-40 has-background-dim"></span>
<div class="wp-block-cover__inner-container">
<!-- wp:group {"layout":{"type":"constrained","wideSize":"800px","contentSize":"800px"}} -->
<div class="wp-block-group">
<!-- wp:paragraph {"align":"center","className":"font-mincho"} -->
<p class="has-text-align-center font-mincho" style="font-size: clamp(1.5rem, 4vw, 2.5rem); font-weight: bold; line-height: 1.5; margin-bottom: 20px;">未経験から、ひとりで<br>子ども服が作れるようになる。</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center" style="font-size: 1.1rem; margin-bottom: 40px;">ミシン初心者さんでも、順序立てて学べる子ども服教室です。</p>
<!-- /wp:paragraph -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons">
<!-- wp:button {"className":"custom-btn main-cta-btn"} -->
<div class="wp-block-button custom-btn main-cta-btn"><a class="wp-block-button__link wp-element-button" href="https://mirii-sewing.online/1day-lesson/">1Day体験レッスンの詳細を見る</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
</div></div>
<!-- /wp:cover -->

<!-- wp:spacer {"height":"80px"} -->
<div style="height:80px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {"layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group">
<!-- wp:heading {"textAlign":"center","className":"font-mincho"} -->
<h2 class="wp-block-heading has-text-align-center font-mincho">「動画の通りに作ってみたけれど、<br>途中で分からなくなって止まってしまった…」<br>そんな経験はありませんか？</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"left"} -->
<p class="has-text-align-left">「可愛い服を作ってあげたい」とミシンを買ってみたものの、本や動画を見よう見まねで作るうちに、「ここはどう縫うの？」「これで合っているの？」と手が止まってしまう。<br>そしていつの間にか、ミシンを箱にしまったままになっている。<br><br>そんなふうに悩んでいませんか？<br><br>「私って不器用なのかも…」と落ち込む必要はありません。<br>うまく縫えなかったのは、ただ「正しい順序」や「縫う前の準備」を知る機会がなかっただけなのです。<br><br>当教室は、そんな「ミシン初心者さん」や「独学で手が止まってしまったママ」が、安心して一歩を踏み出すための教室です。</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons">
<!-- wp:button {"className":"custom-btn outline-btn"} -->
<div class="wp-block-button custom-btn outline-btn"><a class="wp-block-button__link wp-element-button" href="https://mirii-sewing.online/welcome/">はじめての方へ（当教室の想い）</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"100px"} -->
<div style="height:100px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {"backgroundColor":"luminous-vivid-amber","className":"section-features","layout":{"type":"constrained","contentSize":"1000px"}} -->
<div class="wp-block-group section-features has-luminous-vivid-amber-background-color has-background" style="padding-top:60px;padding-bottom:60px;padding-left:20px;padding-right:20px; border-radius:12px;">
<!-- wp:heading {"textAlign":"center","className":"font-mincho"} -->
<h2 class="wp-block-heading has-text-align-center font-mincho">元警察官ならではの「迷わせない」ステップ設計で、<br>最終的には「ひとりで服が作れる」技術が身につきます。</h2>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center" style="margin-bottom:50px;">当教室が一番大切にしているのは、レッスン中に「先生の力でただ完成させる」ことではありません。<br>卒業後もご自宅で自由に服作りを楽しめる「一生のスキル」として身につけていただくことです。</p>
<!-- /wp:paragraph -->

<!-- wp:columns -->
<div class="wp-block-columns">
<!-- wp:column -->
<div class="wp-block-column blank-box feature-box">
<!-- wp:html -->
<div class="placeholder-img rect-img"></div>
<!-- /wp:html -->
<!-- wp:heading {"level":3,"className":"feature-title"} -->
<h3 class="wp-block-heading feature-title">1. 迷わせない構造的なレッスン</h3>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"left"} -->
<p class="has-text-align-left" style="font-size:0.95em;">元警察官として多くの方に防犯講話を行ってきた経験から、「初心者がどこでつまずくか」を逆算し、論理的でわかりやすいステップで教えます。感覚に頼らないため、途中で迷子になりません。</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column blank-box feature-box">
<!-- wp:html -->
<div class="placeholder-img rect-img"></div>
<!-- /wp:html -->
<!-- wp:heading {"level":3,"className":"feature-title"} -->
<h3 class="wp-block-heading feature-title">2. ゼロからの準備をお伝えします</h3>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"left"} -->
<p class="has-text-align-left" style="font-size:0.95em;">服を綺麗に仕上げるための最大のコツは「縫う前の準備（裁断・アイロンなど）」にあります。キットを縫い合わせるだけでなく、一番基礎となる生地の扱い方から丁寧にお伝えします。</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column blank-box feature-box">
<!-- wp:html -->
<div class="placeholder-img rect-img"></div>
<!-- /wp:html -->
<!-- wp:heading {"level":3,"className":"feature-title"} -->
<h3 class="wp-block-heading feature-title">3. 負担にならない復習サポート</h3>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"left"} -->
<p class="has-text-align-left" style="font-size:0.95em;">「習ったけれど、家で一人だとできない」を防ぐため、ご自身のペースで無理なく進められる復習サポートをご用意しています。甘やかすのではなく、あなたの「ひとりでできる」をしっかり応援します。</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons" style="margin-top:30px;">
<!-- wp:button {"className":"custom-btn outline-btn"} -->
<div class="wp-block-button custom-btn outline-btn"><a class="wp-block-button__link wp-element-button" href="https://mirii-sewing.online/features/">教室の特徴を詳しく見る</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"100px"} -->
<div style="height:100px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {"backgroundColor":"pale-pink","className":"section-trial","layout":{"type":"constrained","contentSize":"900px"}} -->
<div class="wp-block-group section-trial has-pale-pink-background-color has-background" style="padding:60px 40px; border-radius:12px; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
<!-- wp:columns {"verticalAlignment":"center"} -->
<div class="wp-block-columns are-vertically-aligned-center">
<!-- wp:column {"verticalAlignment":"center","width":"50%"} -->
<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:50%">
<!-- wp:html -->
<div class="placeholder-img square-img"></div>
<!-- /wp:html -->
</div>
<!-- /wp:column -->

<!-- wp:column {"verticalAlignment":"center","width":"50%"} -->
<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:50%">
<!-- wp:heading {"level":3,"className":"font-mincho"} -->
<h3 class="wp-block-heading font-mincho" style="color:#c55c70; font-size:1.1rem; margin-bottom:10px;">まずは3時間の体験レッスンから</h3>
<!-- /wp:heading -->
<!-- wp:heading {"level":2,"className":"font-mincho"} -->
<h2 class="wp-block-heading font-mincho" style="margin-top:0; font-size:1.6rem; line-height:1.4;">たった1回でも「私にもできた」が<br>実感できる最初の一歩。</h2>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"left"} -->
<p class="has-text-align-left" style="font-size:0.95em;">最初のハードルとなる水通しや裁断などの下準備は、こちらで済ませた「キット」をご用意しています。<br>ミシンの3つのコツを学びながら、シンプルで上品な裏地付きワンピース（または男の子用パンツ）を、その日のうちに完成させることができます。<br>（参加費：15,000円）</p>
<!-- /wp:paragraph -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"flex-start"}} -->
<div class="wp-block-buttons">
<!-- wp:button {"className":"custom-btn main-cta-btn"} -->
<div class="wp-block-button custom-btn main-cta-btn"><a class="wp-block-button__link wp-element-button" href="https://mirii-sewing.online/1day-lesson/">1Day体験レッスンの詳細を見る</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
</div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"100px"} -->
<div style="height:100px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {"layout":{"type":"constrained","contentSize":"900px"}} -->
<div class="wp-block-group" style="padding:40px; border: 1px solid #eaeaea; border-radius:12px;">
<!-- wp:heading {"textAlign":"center","className":"font-mincho"} -->
<h2 class="wp-block-heading has-text-align-center font-mincho" style="margin-top:10px;">最短3〜4ヶ月で基礎からしっかり身につく<br>少人数継続コース</h2>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"left"} -->
<p class="has-text-align-left">全8回のステップアップ形式で、生地選びや裁断、さまざまな縫製テクニックを網羅。卒業する頃には「先生がいなくても、一人で作れる」状態を目指します。<br><br>※現在ご案内中のクラスは満席が続いております。次回募集時期やコースの詳細は、専用ページをご確認ください。</p>
<!-- /wp:paragraph -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons">
<!-- wp:button {"className":"custom-btn outline-btn"} -->
<div class="wp-block-button custom-btn outline-btn"><a class="wp-block-button__link wp-element-button" href="https://mirii-sewing.online/course-4months/">4ヶ月少人数コースの詳細を見る</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"100px"} -->
<div style="height:100px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {"layout":{"type":"constrained","contentSize":"1000px"}} -->
<div class="wp-block-group">
<!-- wp:heading {"textAlign":"center","className":"font-mincho"} -->
<h2 class="wp-block-heading has-text-align-center font-mincho">「この服、ママが作ったの？」<br>手作りから生まれる、ご機嫌な時間と笑顔。</h2>
<!-- /wp:heading -->
<!-- wp:columns -->
<div class="wp-block-columns">
<!-- wp:column -->
<div class="wp-block-column blank-box voice-box">
<!-- wp:columns {"verticalAlignment":"center"} -->
<div class="wp-block-columns are-vertically-aligned-center">
<!-- wp:column {"verticalAlignment":"center","width":"30%"} -->
<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:30%">
<!-- wp:html -->
<div class="placeholder-img circle-img"></div>
<!-- /wp:html -->
</div>
<!-- /wp:column -->
<!-- wp:column {"verticalAlignment":"center","width":"70%"} -->
<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:70%">
<!-- wp:paragraph {"align":"left"} -->
<p class="has-text-align-left" style="font-weight:bold; margin-bottom:5px; font-size:1.05em;">2歳の女の子ママ</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
<!-- wp:heading {"level":4} -->
<h4 class="wp-block-heading" style="color:#c55c70; font-size:1.1em; margin-top:15px; margin-bottom:10px;">「ミシンを2年間寝かせていた私でも作れました」</h4>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"left"} -->
<p class="has-text-align-left" style="font-size:0.95em;">ずっと興味はあったものの自信がありませんでした。でも体験レッスンで3時間で1着完成し、「私にも立派な手作り服が作れるんだ」と自信につながりました。</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column blank-box voice-box">
<!-- wp:columns {"verticalAlignment":"center"} -->
<div class="wp-block-columns are-vertically-aligned-center">
<!-- wp:column {"verticalAlignment":"center","width":"30%"} -->
<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:30%">
<!-- wp:html -->
<div class="placeholder-img circle-img"></div>
<!-- /wp:html -->
</div>
<!-- /wp:column -->
<!-- wp:column {"verticalAlignment":"center","width":"70%"} -->
<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:70%">
<!-- wp:paragraph {"align":"left"} -->
<p class="has-text-align-left" style="font-weight:bold; margin-bottom:5px; font-size:1.05em;">継続コース受講中ママ</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
<!-- wp:heading {"level":4} -->
<h4 class="wp-block-heading" style="color:#c55c70; font-size:1.1em; margin-top:15px; margin-bottom:10px;">「家でもひとりで作れるようになりました」</h4>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"left"} -->
<p class="has-text-align-left" style="font-size:0.95em;">最初は不安でしたが、教え方が順序立っていてとても分かりやすいです。先生に質問できるので、子どもがお昼寝中のすきま時間にミシンがはかどっています。</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons" style="margin-top:30px;">
<!-- wp:button {"className":"custom-btn outline-btn"} -->
<div class="wp-block-button custom-btn outline-btn"><a class="wp-block-button__link wp-element-button" href="https://mirii-sewing.online/voice/">生徒さんの声をもっと見る</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"100px"} -->
<div style="height:100px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {"className":"section-profile","layout":{"type":"constrained","contentSize":"900px"}} -->
<div class="wp-block-group section-profile">
<!-- wp:heading {"textAlign":"center","className":"font-mincho"} -->
<h2 class="wp-block-heading has-text-align-center font-mincho">講師プロフィール</h2>
<!-- /wp:heading -->
<!-- wp:columns {"verticalAlignment":"center"} -->
<div class="wp-block-columns are-vertically-aligned-center">
<!-- wp:column {"verticalAlignment":"center","width":"35%"} -->
<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:35%">
<!-- wp:html -->
<div class="placeholder-img profile-img"></div>
<!-- /wp:html -->
</div>
<!-- /wp:column -->
<!-- wp:column {"verticalAlignment":"center","width":"65%"} -->
<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:65%">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" style="margin-bottom:5px; font-size:1.3rem;">加瀬 あゆみ</h3>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"left"} -->
<p class="has-text-align-left" style="color:#888; font-size:0.9em; margin-bottom:20px;">ミシン初心者専門・子ども服ミシン教室講師</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph {"align":"left"} -->
<p class="has-text-align-left" style="font-size:0.95em;">約15年間、警察官として勤務。長年の不妊治療を経て第一子を出産後、「この子のために何かを作ってあげたい」という想いからミシン教室に通い始めました。<br><br>完成した服を娘が喜んで着てくれた感動。育児や家事に追われるママにこそ、自分のための時間を持ち、ご機嫌になれる「手作り」の楽しさを知ってほしいと願っています。</p>
<!-- /wp:paragraph -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"flex-start"}} -->
<div class="wp-block-buttons">
<!-- wp:button {"className":"custom-btn outline-btn"} -->
<div class="wp-block-button custom-btn outline-btn"><a class="wp-block-button__link wp-element-button" href="https://mirii-sewing.online/profile/">詳しいプロフィールはこちら</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
</div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"120px"} -->
<div style="height:120px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {"backgroundColor":"light-green-cyan","className":"section-cta-line","layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group section-cta-line has-light-green-cyan-background-color has-background" style="padding:50px 40px; border-radius:12px; border: 2px solid #a3d9a5; box-shadow: 0 10px 30px rgba(163,217,165,0.2);">
<!-- wp:heading {"textAlign":"center","className":"font-mincho"} -->
<h2 class="wp-block-heading has-text-align-center font-mincho" style="margin-top:0; color:#2c8a32;">まずは公式LINEにて、<br>ミシンの基本がわかる3大特典をお受け取りください。</h2>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center" style="font-weight:bold;">公式LINEにご登録いただいた方限定で、<br>ミシン初心者さんが最初に知っておくべき特典を無料プレゼント！</p>
<!-- /wp:paragraph -->
<!-- wp:list {"className":"benefit-list"} -->
<ul class="benefit-list" style="background:#fff; padding:30px; border-radius:8px; margin-top:20px; list-style-position:inside;">
<li><strong>特典1.</strong> 水通し、地直しマニュアル</li>
<li><strong>特典2.</strong> 生地の種類丸わかり図鑑</li>
<li><strong>特典3.</strong> 最初に揃えるべきお道具リスト</li>
</ul>
<!-- /wp:list -->
<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center" style="margin-top:30px; font-size:0.9em;">体験レッスンの先行案内や、レッスンのご相談などもお届けしております。<br>まずは日々の服作りにお役立てください。</p>
<!-- /wp:paragraph -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons" style="margin-top:20px;">
<!-- wp:button {"className":"custom-btn line-btn"} -->
<div class="wp-block-button custom-btn line-btn" style="width:100%; max-width:400px;"><a class="wp-block-button__link wp-element-button" style="width:100%; text-align:center; background-color:#06C755; color:#fff; padding:15px; font-size:1.2rem; border-radius:50px; box-shadow:0 4px 10px rgba(6,199,85,0.3);" href="https://lin.ee/xyz">公式LINEに登録して特典を受け取る</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"60px"} -->
<div style="height:60px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->
`;

            await fetch(window.wpApiSettings.root + 'wp/v2/pages/18', {
                method: 'POST',
                headers: {
                    'X-WP-Nonce': nonce,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: refinedContent
                })
            });

            // テーマエディターからCSSを更新するのは確実なので、
            // カスタマイザーAPIを使ってCSSを注入する
            const cssRes = await fetch(window.wpApiSettings.root + 'wp/v2/custom_css?status=publish', {
                headers: { 'X-WP-Nonce': nonce }
            });
            const cssList = await cssRes.json();
            if (cssList && cssList.length > 0) {
                const target = cssList.find(c => c.slug === 'cocoon-master' || c.slug === 'cocoon-child-master') || cssList[0];
                let existingCss = target.content.raw || '';

                const styleCSS = `
/* --- トップページ デザイン改善 (仮画像、ボタン、余白) --- */
/* ボタン共通 */
.custom-btn .wp-block-button__link {
    border-radius: 50px !important;
    padding: 12px 30px !important;
    font-weight: bold !important;
    transition: all 0.3s ease !important;
    display: inline-block !important;
}

/* メインCTAボタン（濃いめのピンク系） */
.main-cta-btn .wp-block-button__link {
    background-color: #c55c70 !important;
    color: #fff !important;
    box-shadow: 0 4px 15px rgba(197, 92, 112, 0.3) !important;
}
.main-cta-btn .wp-block-button__link:hover {
    transform: translateY(-3px) !important;
    box-shadow: 0 6px 20px rgba(197, 92, 112, 0.4) !important;
}

/* アウトラインボタン（枠線のみ・控えめ） */
.outline-btn .wp-block-button__link {
    background-color: transparent !important;
    color: #c55c70 !important;
    border: 1px solid #c55c70 !important;
}
.outline-btn .wp-block-button__link:hover {
    background-color: #fdf2f4 !important;
    transform: translateY(-2px) !important;
}

/* 背景ブロックの色微調整 */
.has-luminous-vivid-amber-background-color {
    background-color: #faf5ed !important; /* より上品な薄いベージュに上書き */
}

/* プレースホルダー画像 (上品な水玉と色味) */
.placeholder-img {
    background-color: #f9ecef;
    background-image: radial-gradient(rgba(197, 92, 112, 0.1) 1px, transparent 1px);
    background-size: 15px 15px;
    position: relative;
    border: 1px solid rgba(197, 92, 112, 0.1);
    box-shadow: 0 4px 10px rgba(0,0,0,0.02) inset;
    width: 100%;
}
.placeholder-img::after {
    content: "PHOTO";
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    color: rgba(197, 92, 112, 0.4);
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 0.9em;
}
/* 形ごとのプレースホルダー */
.rect-img {
    aspect-ratio: 4/3;
    border-radius: 8px;
    margin-bottom: 20px;
}
.square-img {
    aspect-ratio: 1/1;
    border-radius: 8px;
}
.circle-img {
    aspect-ratio: 1/1;
    border-radius: 50%;
}
.profile-img {
    aspect-ratio: 1/1;
    border-radius: 50%;
    max-width: 250px;
    margin: 0 auto;
}

/* ファーストビューのカバー */
.first-view-cover {
    border-radius: 0 0 20px 20px;
    margin-bottom: 40px;
}

/* カード要素 (教室の特徴、生徒の声) */
.feature-box, .voice-box {
    background: #fff !important;
    border: 1px solid #f0f0f0 !important;
    box-shadow: 0 5px 20px rgba(0,0,0,0.03) !important;
    border-radius: 12px;
    padding: 30px !important;
    height: 100%;
}
.feature-title {
    font-size: 1.15em;
    border-bottom: 2px dotted #f0f0f0;
    padding-bottom: 10px;
    margin-bottom: 15px;
    color: #4a4a4a;
}
/* --- トップページ デザイン改善終了 --- */
`;
                if (!existingCss.includes('トップページ デザイン改善')) {
                    await fetch(window.wpApiSettings.root + 'wp/v2/custom_css/' + target.id, {
                        method: 'POST',
                        headers: {
                            'X-WP-Nonce': nonce,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ content: existingCss + '\\n' + styleCSS })
                    });
                }
            }
            return { status: 'success' };
        });

        console.log("Result:", result);

    } catch (e) {
        console.error("Error:", e);
    } finally {
        await browser.close();
    }
})();
