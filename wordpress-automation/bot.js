const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    try {
        await page.goto('https://mirii-sewing.online/wp-login.php');
        await page.type('#user_login', 'antigravity-ai@gmail.com');
        await page.type('#user_pass', 'hE6AnSDQNzN0FJ&lX&ITOU(o');
        await page.click('#wp-submit');
        await page.waitForNavigation({ waitUntil: 'networkidle2' });

        // Go to dashboard
        await page.goto('https://mirii-sewing.online/wp-admin/');

        const result = await page.evaluate(async () => {
            const nonce = window.wpApiSettings ? window.wpApiSettings.nonce : null;
            if (!nonce) return { error: 'No nonce' };

            // HTML structure for block editor
            const content = `
<!-- wp:cover {"url":"","dimRatio":50,"overlayColor":"base","isDark":false,"align":"full"} -->
<div class="wp-block-cover alignfull is-light"><span aria-hidden="true" class="wp-block-cover__background has-base-background-color has-background-dim"></span><div class="wp-block-cover__inner-container">
<!-- wp:paragraph {"align":"center","className":"font-mincho"} -->
<p class="has-text-align-center font-mincho"><strong>未経験から、ひとりで<br>子ども服が作れるようになる。</strong></p>
<!-- /wp:paragraph -->
<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">ミシン初心者さんでも、順序立てて学べる子ども服教室です。</p>
<!-- /wp:paragraph -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"className":"custom-btn"} -->
<div class="wp-block-button custom-btn"><a class="wp-block-button__link wp-element-button" href="https://mirii-sewing.online/1day-lesson/">1Day体験レッスンの詳細を見る</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons -->
</div></div>
<!-- /wp:cover -->

<!-- wp:spacer {"height":"80px"} -->
<div style="height:80px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {"backgroundColor":"luminous-vivid-amber","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-luminous-vivid-amber-background-color has-background">
<!-- wp:heading {"textAlign":"center"} -->
<h2 class="wp-block-heading has-text-align-center font-mincho">「動画の通りに作ってみたけれど、<br>途中で分からなくなって止まってしまった…」<br>そんな経験はありませんか？</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>「可愛い服を作ってあげたい」とミシンを買ってみたものの、本や動画を見よう見まねで作るうちに、「ここはどう縫うの？」「これで合っているの？」と手が止まってしまう。<br>そしていつの間にか、ミシンを箱にしまったままになっている。<br><br>そんなふうに悩んでいませんか？<br><br>「私って不器用なのかも…」と落ち込む必要はありません。<br>うまく縫えなかったのは、ただ「正しい順序」や「縫う前の準備」を知る機会がなかっただけなのです。<br><br>当教室は、そんな「ミシン初心者さん」や「独学で手が止まってしまったママ」が、安心して一歩を踏み出すための教室です。</p>
<!-- /wp:paragraph -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"className":"custom-btn"} -->
<div class="wp-block-button custom-btn"><a class="wp-block-button__link wp-element-button" href="https://mirii-sewing.online/welcome/">はじめての方へ</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"80px"} -->
<div style="height:80px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">
<!-- wp:heading {"textAlign":"center"} -->
<h2 class="wp-block-heading has-text-align-center font-mincho">元警察官ならではの「迷わせない」ステップ設計で、<br>最終的には「ひとりで服が作れる」技術が身につきます。</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>当教室が一番大切にしているのは、レッスン中に「先生の力でただ完成させる」ことではありません。<br>卒業後もご自宅で自由に服作りを楽しめる「一生のスキル」として身につけていただくことです。</p>
<!-- /wp:paragraph -->
<!-- wp:columns -->
<div class="wp-block-columns">
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">1. 迷わせない構造的なレッスン</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>元警察官として多くの方に防犯講話を行ってきた経験から、「初心者がどこでつまずくか」を逆算し、論理的でわかりやすいステップで教えます。感覚に頼らないため、途中で迷子になりません。</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">2. ゼロからの準備をお伝えします</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>服を綺麗に仕上げるための最大のコツは「縫う前の準備（裁断・アイロンなど）」にあります。キットを縫い合わせるだけでなく、一番基礎となる生地の扱い方から丁寧にお伝えします。</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">3. 負担にならない復習サポート</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>「習ったけれど、家で一人だとできない」を防ぐため、ご自身のペースで無理なく進められる復習サポートをご用意しています。甘やかすのではなく、あなたの「ひとりでできる」をしっかり応援します。</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"className":"custom-btn"} -->
<div class="wp-block-button custom-btn"><a class="wp-block-button__link wp-element-button" href="https://mirii-sewing.online/features/">教室の特徴を詳しく見る</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"80px"} -->
<div style="height:80px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {"backgroundColor":"pale-pink","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-pale-pink-background-color has-background">
<!-- wp:heading {"textAlign":"center"} -->
<h2 class="wp-block-heading has-text-align-center font-mincho">たった1回でも「私にもできた」が実感できる最初の一歩。<br>まずは3時間の体験レッスンから。</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>「いきなり継続して通えるか不安…」という方は、まずは1Day体験レッスンにお越しください。<br><br>最初のハードルとなる水通しや裁断などの下準備は、こちらで済ませた「キット」をご用意しています。<br>ミシンの3つのコツを学びながら、シンプルで上品な裏地付きワンピース（または男の子用パンツ）を、その日のうちに完成させることができます。<br><br>「途中で止まってしまう」独学との違いを、ぜひ体感してください。<br>（参加費：15,000円）</p>
<!-- /wp:paragraph -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"className":"custom-btn"} -->
<div class="wp-block-button custom-btn"><a class="wp-block-button__link wp-element-button" href="https://mirii-sewing.online/1day-lesson/">1Day体験レッスンの詳細を見る</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"80px"} -->
<div style="height:80px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">
<!-- wp:heading {"textAlign":"center"} -->
<h2 class="wp-block-heading has-text-align-center font-mincho">基礎から確実に身につけたい方へ。<br>最短3〜4ヶ月で基礎からしっかり身につく継続コース</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>体験レッスンで服作りの楽しさを実感し、「もっとひとりで色々な服を作れるようになりたい」と感じた方のために、少人数制のコースをご用意しています。<br><br>全8回のステップアップ形式で、生地選びや裁断、さまざまな縫製テクニックを網羅。卒業する頃には「先生がいなくても、一人で作れる」状態を目指します。<br><br>※現在ご案内中のクラスは満席が続いております。次回募集時期やコースの詳細は、専用ページをご確認ください。</p>
<!-- /wp:paragraph -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"className":"custom-btn"} -->
<div class="wp-block-button custom-btn"><a class="wp-block-button__link wp-element-button" href="https://mirii-sewing.online/course-4months/">4ヶ月少人数コースの詳細を見る</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"80px"} -->
<div style="height:80px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">
<!-- wp:heading {"textAlign":"center"} -->
<h2 class="wp-block-heading has-text-align-center font-mincho">「この服、ママが作ったの？」<br>手作りから生まれる、ご機嫌な時間と笑顔。</h2>
<!-- /wp:heading -->
<!-- wp:columns -->
<div class="wp-block-columns">
<!-- wp:column -->
<div class="wp-block-column blank-box">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">「ミシンを2年間寝かせていた私でも作れました」<br>（2歳の女の子ママ）</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>ずっと興味はあったものの自信がありませんでした。でも体験レッスンで3時間で1着完成し、「私にも立派な手作り服が作れるんだ」と自信につながりました。</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
<!-- wp:column -->
<div class="wp-block-column blank-box">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">「家でもひとりで作れるようになりました」<br>（継続コース受講中ママ）</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>最初は不安でしたが、教え方が順序立っていてとても分かりやすいです。先生に質問できるので、子どもがお昼寝中のすきま時間にミシンがはかどっています。</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"className":"custom-btn"} -->
<div class="wp-block-button custom-btn"><a class="wp-block-button__link wp-element-button" href="https://mirii-sewing.online/voice/">生徒さんの変化を詳しく見る</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"80px"} -->
<div style="height:80px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">
<!-- wp:heading {"textAlign":"center"} -->
<h2 class="wp-block-heading has-text-align-center font-mincho">講師プロフィール</h2>
<!-- /wp:heading -->
<!-- wp:columns -->
<div class="wp-block-columns">
<!-- wp:column {"width":"33.33%"} -->
<div class="wp-block-column" style="flex-basis:33.33%">
<!-- wp:paragraph -->
<p>（ここに講師画像を配置）</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
<!-- wp:column {"width":"66.66%"} -->
<div class="wp-block-column" style="flex-basis:66.66%">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">加瀬 あゆみ</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>ミシン初心者専門・子ども服ミシン教室講師</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>約15年間、警察官として勤務。長年の不妊治療を経て第一子を出産後、「この子のために何かを作ってあげたい」という強い想いからミシン教室に通い始めました。<br><br>完成した服を娘が喜んで着てくれた感動。そして、「私にも可愛い服が作れた」という自己肯定感の高まる経験。<br>育児や家事に追われるママにこそ、自分のための時間を持ち、ご機嫌になれる「手作り」の楽しさを知ってほしいと願っています。<br><br>「うまく進めない」と悩む初心者の方の気持ちに寄り添い、確実なステップアップをサポートいたします。</p>
<!-- /wp:paragraph -->
<!-- wp:buttons -->
<div class="wp-block-buttons"><!-- wp:button {"className":"custom-btn"} -->
<div class="wp-block-button custom-btn"><a class="wp-block-button__link wp-element-button" href="https://mirii-sewing.online/profile/">講師プロフィールはこちら</a></div>
<!-- /wp:button --></div>
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

<!-- wp:group {"backgroundColor":"light-green-cyan","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-light-green-cyan-background-color has-background" style="padding:40px;">
<!-- wp:heading {"textAlign":"center"} -->
<h2 class="wp-block-heading has-text-align-center font-mincho">まずは公式LINEにて、<br>ミシンの基本がわかる3大特典をお受け取りください。</h2>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">公式LINEにご登録いただいた方限定で、ミシン初心者さんが最初に知っておくべき特典を無料プレゼントしております。</p>
<!-- /wp:paragraph -->
<!-- wp:list {"align":"center"} -->
<ul class="has-text-align-center">
<li>水通し、地直しマニュアル</li>
<li>生地の種類丸わかり図鑑</li>
<li>最初に揃えるべきお道具リスト</li>
</ul>
<!-- /wp:list -->
<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">体験レッスンの先行案内や、レッスンのご相談なども定期的にお届けしております。まずは日々の服作りにお役立てください。</p>
<!-- /wp:paragraph -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"className":"custom-btn"} -->
<div class="wp-block-button custom-btn"><a class="wp-block-button__link wp-element-button" href="https://lin.ee/xyz">公式LINEにご登録のうえ特典を受け取る</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
`;

            // 1. Fetch existing pages to check if HOME already exists
            const existingRes = await fetch(window.wpApiSettings.root + 'wp/v2/pages?search=HOME', {
                headers: { 'X-WP-Nonce': window.wpApiSettings.nonce }
            });
            const existingPages = await existingRes.json();
            let pageId = null;

            const existingHome = existingPages.find(p => p.title.rendered === 'HOME');
            if (existingHome) {
                const updateRes = await fetch(window.wpApiSettings.root + 'wp/v2/pages/' + existingHome.id, {
                    method: 'POST',
                    headers: {
                        'X-WP-Nonce': window.wpApiSettings.nonce,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        content: content,
                        status: 'publish',
                        meta: {
                            // cocoon specific settings could go here
                            page_type: 'wide'
                        }
                    })
                });
                pageId = existingHome.id;
            } else {
                const createRes = await fetch(window.wpApiSettings.root + 'wp/v2/pages', {
                    method: 'POST',
                    headers: {
                        'X-WP-Nonce': window.wpApiSettings.nonce,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title: 'HOME (New)',
                        content: content,
                        status: 'publish'
                    })
                });
                const createData = await createRes.json();
                pageId = createData.id;
            }

            // 2. Set Front Page
            const res2 = await fetch(window.wpApiSettings.root + 'wp/v2/settings', {
                method: 'POST',
                headers: {
                    'X-WP-Nonce': window.wpApiSettings.nonce,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    show_on_front: 'page',
                    page_on_front: pageId
                })
            });

            // 3. Update CSS
            const css = `
body {
    color: #4a4a4a;
    line-height: 1.8;
}
p {
    margin-bottom: 24px;
}
h2 {
    margin-top: 60px;
    margin-bottom: 30px;
}
.wp-block-button__link {
    border-radius: 8px !important;
    transition: all 0.3s ease;
    font-weight: bold;
}
.wp-block-button__link:hover {
    opacity: 0.8;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0,0,0,0.1) !important;
}
.blank-box {
    border: 1px solid #eaeaea !important;
    box-shadow: 0 4px 15px rgba(0,0,0,0.03) !important;
    border-radius: 8px;
    padding: 30px;
    background-color: #ffffff;
}
.font-mincho {
    font-family: "Noto Serif JP", "Hiragino Mincho ProN", serif !important;
}
`;

            const cssRes = await fetch(window.wpApiSettings.root + 'wp/v2/custom_css?status=publish', {
                headers: { 'X-WP-Nonce': window.wpApiSettings.nonce }
            });
            const cssList = await cssRes.json();
            let cssUpdateResult = "failed";
            if (cssList && cssList.length > 0) {
                const target = cssList.find(c => c.slug === 'cocoon-master' || c.slug === 'cocoon-child-master') || cssList[0];
                const r = await fetch(window.wpApiSettings.root + 'wp/v2/custom_css/' + target.id, {
                    method: 'POST',
                    headers: {
                        'X-WP-Nonce': window.wpApiSettings.nonce,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ content: css })
                });
                cssUpdateResult = "updated " + target.slug;
            } else {
                // Determine active theme from option
                const tr = await fetch(window.wpApiSettings.root + 'wp/v2/settings');
                // Usually custom_css name is the theme slug
                const r = await fetch(window.wpApiSettings.root + 'wp/v2/custom_css', {
                    method: 'POST',
                    headers: {
                        'X-WP-Nonce': window.wpApiSettings.nonce,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title: 'cocoon-master',
                        content: css,
                        status: 'publish'
                    })
                });
                cssUpdateResult = "created";

                // create for child theme to be safe if active
                await fetch(window.wpApiSettings.root + 'wp/v2/custom_css', {
                    method: 'POST',
                    headers: {
                        'X-WP-Nonce': window.wpApiSettings.nonce,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title: 'cocoon-child-master',
                        content: css,
                        status: 'publish'
                    })
                });
            }

            return { pageId, cssStatus: cssUpdateResult };
        });

        console.log("Success:", JSON.stringify(result));
    } catch (e) {
        console.error("Puppeteer Error:", e);
    }
    await browser.close();
})();
