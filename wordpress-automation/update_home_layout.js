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
            fv: 'https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_5640-scaled.jpg',
            sympathy_img: 'https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_8524-scaled.jpg',
            atelier: 'https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_7105-scaled.jpg',
            feature1: 'https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_7086-scaled.jpg',
            feature2: 'https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_9330-scaled.jpg',
            feature3: 'https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_9345.png',
            oneday: 'https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_9961-scaled.jpg',
            course: 'https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_5667-scaled.jpg',
            profile: 'https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_3017_0.jpg',
            voice: 'https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_8313-scaled.jpg'
        };

        const html_home = `
<!-- wp:cover {"url":"${images.fv}","dimRatio":20,"overlayColor":"black","align":"full","customCSS":"min-height:95vh;"} -->
<div class="wp-block-cover alignfull" style="min-height:95vh;">
    <span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim-20 has-background-dim"></span>
    <img class="wp-block-cover__image-background" src="${images.fv}" data-object-fit="cover"/>
    <div class="wp-block-cover__inner-container">
        <!-- wp:group {"layout":{"type":"constrained","wideSize":"1000px"}} -->
        <div class="wp-block-group">
            <h2 class="has-text-align-center" style="color:#fff; font-size:clamp(1.6rem, 5vw, 2.8rem); line-height:1.6; text-shadow:0 3px 10px rgba(0,0,0,0.5); margin:0; font-weight:normal;">子どものお洋服を、<br>お家で手作りできるようになりたいママへ</h2>
            <div style="height:30px;"></div>
            <p class="has-text-align-center" style="color:#fff; font-size:1.1rem; text-shadow:0 2px 8px rgba(0,0,0,0.5);">未経験から、ひとりで子ども服が作れるようになる。<br>初心者さんのための、少人数制ミシン教室です。</p>
            <div style="height:40px;"></div>
            <div style="text-align:center;"><a href="/1day-lesson/" class="btn-mirii-primary" style="box-shadow:0 4px 15px rgba(0,0,0,0.2);">1Day体験レッスンの詳細を見る</a></div>
        </div>
        <!-- /wp:group -->
    </div>
</div>
<!-- /wp:cover -->

<!-- wp:image {"align":"full","sizeSlug":"large"} -->
<figure class="wp-block-image alignfull">
    <img src="${images.atelier}" alt="アトリエ風景" style="width:100%; height:auto; max-height:600px; object-fit:cover; margin-bottom:0; display:block;"/>
</figure>
<!-- /wp:image -->

<div class="brand-section" style="padding-top: 80px;">
    <!-- wp:columns {"verticalAlignment":"center"} -->
    <div class="wp-block-columns are-vertically-aligned-center" style="max-width:1000px; margin:0 auto; gap:6vw;">
        <!-- wp:column {"verticalAlignment":"center","width":"45%"} -->
        <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:45%">
            <figure class="wp-block-image size-large">
                <img src="${images.sympathy_img}" alt="手作りの子ども服" style="border-radius:8px; box-shadow:0 10px 30px rgba(0,0,0,0.05);"/>
            </figure>
        </div>
        <!-- /wp:column -->
        <!-- wp:column {"verticalAlignment":"center","width":"55%"} -->
        <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:55%">
            <h2 class="brand-title" style="text-align:left !important;">ミシンを買ったものの、箱の中に眠らせていませんか？</h2>
            <p>「子どものために何か作ってあげたい」<br>そう思ってミシンを用意したものの、</p>
            <p>・糸の通し方で手が止まる<br>・真っ直ぐ縫えるか不安<br>・動画を見ても、どこをやっているのか分からない<br>・裁断や生地の準備で、難しく感じてしまう</p>
            <p>そんなふうに、最初の一歩で止まってしまう方は少なくありません。</p>
            <p>でも、それは不器用だからではありません。<br>服作りの順序が分からないまま始めようとしていた だけです。</p>
            <p>mirii sewing は、そんな初心者ママが<br>「私にもできた」 を少しずつ積み重ねていくための教室です。</p>
            <div style="height:30px;"></div>
            <div><a href="/welcome/" class="btn-mirii-tertiary">はじめての方へ</a></div>
        </div>
        <!-- /wp:column -->
    </div>
    <!-- /wp:columns -->
</div>

<div class="section-bg-beige brand-section">
    <div style="max-width:1000px; margin:0 auto;">
        <h2 class="brand-title" style="text-align:center !important; margin-bottom:60px;">はじめてでも、少しずつ身につく理由があります</h2>
        <!-- wp:columns -->
        <div class="wp-block-columns" style="gap:40px;">
            <!-- wp:column -->
            <div class="wp-block-column">
                <figure class="wp-block-image size-large" style="margin-bottom:20px;">
                    <img src="${images.feature1}" alt="生地と道具" style="aspect-ratio:4/3; object-fit:cover; border-radius:8px; width:100%;"/>
                </figure>
                <h4 style="font-size:1.2rem; margin-bottom:15px; border-left:3px solid var(--mirii-pink-dark); padding-left:15px;">順序立てて学べるから、迷いません</h4>
                <p style="font-size:0.95rem; line-height:1.7;">何から始めればいいか分からない状態でも大丈夫です。服作りに必要な流れを、一つずつ整理しながら進めていきます。</p>
            </div>
            <!-- /wp:column -->
            <!-- wp:column -->
            <div class="wp-block-column">
                <figure class="wp-block-image size-large" style="margin-bottom:20px;">
                    <img src="${images.feature2}" alt="丁寧なサポート" style="aspect-ratio:4/3; object-fit:cover; border-radius:8px; width:100%;"/>
                </figure>
                <h4 style="font-size:1.2rem; margin-bottom:15px; border-left:3px solid var(--mirii-pink-dark); padding-left:15px;">縫う前の準備から、丁寧にお伝えします</h4>
                <p style="font-size:0.95rem; line-height:1.7;">きれいに仕上がるかどうかは、縫い方だけでは決まりません。生地の扱い方や裁断など、最初の準備から大切にしています。</p>
            </div>
            <!-- /wp:column -->
            <!-- wp:column -->
            <div class="wp-block-column">
                <figure class="wp-block-image size-large" style="margin-bottom:20px;">
                    <img src="${images.feature3}" alt="お家でも" style="aspect-ratio:4/3; object-fit:cover; border-radius:8px; width:100%;"/>
                </figure>
                <h4 style="font-size:1.2rem; margin-bottom:15px; border-left:3px solid var(--mirii-pink-dark); padding-left:15px;">お家でも続けられることを大切にしています</h4>
                <p style="font-size:0.95rem; line-height:1.7;">教室で完成することよりも、お家でも自分で作れるようになること を大切にしています。分からないまま置いていかないレッスンです。</p>
            </div>
            <!-- /wp:column -->
        </div>
        <!-- /wp:columns -->
        <div style="height:50px;"></div>
        <div style="text-align:center;"><a href="/features/" class="btn-mirii-tertiary">教室の特徴を見る</a></div>
    </div>
</div>

<div class="brand-section">
    <!-- wp:columns {"verticalAlignment":"center"} -->
    <div class="wp-block-columns are-vertically-aligned-center" style="max-width:1000px; margin:0 auto; gap:6vw; flex-direction:row-reverse;">
        <!-- wp:column {"verticalAlignment":"center","width":"45%"} -->
        <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:45%">
            <figure class="wp-block-image size-large">
                <img src="${images.oneday}" alt="はじめてでも作れる服" style="border-radius:8px; box-shadow:0 10px 30px rgba(0,0,0,0.05); aspect-ratio:3/4; object-fit:cover; width:100%;"/>
            </figure>
        </div>
        <!-- /wp:column -->
        <!-- wp:column {"verticalAlignment":"center","width":"55%"} -->
        <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:55%">
            <h2 class="brand-title" style="text-align:left !important;">まずは、1回の体験から始めてみませんか？</h2>
            <p>「いきなり継続コースは不安」<br>そんな方のために、1Day体験レッスンをご用意しています。</p>
            <p>体験では、初心者さんでも取り組みやすいように、必要な準備を整えた状態からスタートできます。</p>
            <p>・1回でも「私にもできた」を実感しやすい<br>・ミシンへの苦手意識がやわらぐ<br>・次に何を学べばいいかが見えてくる</p>
            <p>最初の一歩として、ちょうどいいレッスンです。</p>
            <div style="height:30px;"></div>
            <div><a href="/1day-lesson/" class="btn-mirii-primary">1Day体験レッスンの詳細を見る</a></div>
        </div>
        <!-- /wp:column -->
    </div>
    <!-- /wp:columns -->
</div>

<div class="section-bg-beige brand-section">
    <!-- wp:columns {"verticalAlignment":"center"} -->
    <div class="wp-block-columns are-vertically-aligned-center" style="max-width:1000px; margin:0 auto; gap:6vw;">
        <!-- wp:column {"verticalAlignment":"center","width":"50%"} -->
        <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:50%">
            <figure class="wp-block-image size-large">
                <img src="${images.course}" alt="もっと作れるように" style="border-radius:8px; aspect-ratio:4/3; object-fit:cover; width:100%; box-shadow:0 10px 30px rgba(0,0,0,0.05);"/>
            </figure>
        </div>
        <!-- /wp:column -->
        <!-- wp:column {"verticalAlignment":"center","width":"50%"} -->
        <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:50%">
            <h2 class="brand-title" style="text-align:left !important;">基礎からしっかり身につけたい方へ</h2>
            <p>体験レッスンで楽しさを感じて、「もっと自分で作れるようになりたい」と思った方のために、4ヶ月少人数コースをご用意しています。</p>
            <p>このコースでは、</p>
            <p>・生地選び<br>・裁断<br>・基本の縫製<br>・続けて作るための考え方</p>
            <p>まで、順を追って学んでいきます。</p>
            <p>体験は入口。<br>4ヶ月コースは、お家でもひとりで作れるようになるための本体です。</p>
            <div style="height:30px;"></div>
            <div><a href="/course/" class="btn-mirii-tertiary">4ヶ月少人数コースを見る</a></div>
        </div>
        <!-- /wp:column -->
    </div>
    <!-- /wp:columns -->
</div>

<div class="brand-section">
    <div style="max-width:900px; margin:0 auto; display:flex; align-items:center; gap:50px; flex-wrap:wrap;">
        <div style="flex:1; min-width:300px; text-align:center;">
            <img src="${images.profile}" class="brand-img" style="border-radius:50%; width:250px; aspect-ratio:1/1; object-fit:cover; box-shadow:0 10px 30px rgba(0,0,0,0.1);"/>
        </div>
        <div style="flex:1.5; min-width:300px;">
            <h2 class="brand-title" style="text-align:left !important; margin-bottom:25px;">はじめての不安がわかる講師が、一緒に進みます</h2>
            <p>講師自身も、最初から何でもできたわけではありません。だからこそ、初心者さんがどこで止まりやすいのか、どんな声かけがあると安心できるのかを大切にしています。</p>
            <p>家事や育児の合間でも、無理なく、でもきちんと身につくこと。それを大事にしながらレッスンをしています。</p>
            <div style="height:30px;"></div>
            <a href="/profile/" class="btn-mirii-tertiary">講師プロフィールを見る</a>
        </div>
    </div>
</div>

<!-- wp:cover {"url":"${images.voice}","dimRatio":40,"overlayColor":"black","align":"full"} -->
<div class="wp-block-cover alignfull" style="min-height:500px;">
    <span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim-40 has-background-dim"></span>
    <img class="wp-block-cover__image-background" src="${images.voice}" data-object-fit="cover"/>
    <div class="wp-block-cover__inner-container">
        <!-- wp:group {"layout":{"type":"constrained","wideSize":"800px"}} -->
        <div class="wp-block-group" style="padding:40px; background:rgba(255,255,255,0.9); border-radius:8px; margin:0 auto; box-shadow:0 10px 30px rgba(0,0,0,0.1);">
            <h2 class="brand-title" style="text-align:center !important; margin-bottom:30px;">少しずつ、「私にもできる」が増えていきます</h2>
            <p>・ミシンを出すこと自体が億劫ではなくなった<br>・子どもの服を自分で作れる喜びを感じられた<br>・お家でもひとりで進められるようになってきた<br>・育児の合間に、自分のための時間が持てるようになった</p>
            <div style="height:10px;"></div>
            <p style="text-align:center;">最初は不安でも、順序立てて進めることで、少しずつ景色が変わっていきます。</p>
            <div style="height:30px;"></div>
            <div style="text-align:center;"><a href="/voice/" class="btn-mirii-tertiary">生徒さんの声を見る</a></div>
        </div>
        <!-- /wp:group -->
    </div>
</div>
<!-- /wp:cover -->

<div class="brand-section">
    <div style="max-width:800px; margin:0 auto;">
        <h2 class="brand-title" style="text-align:center !important;">よくある質問</h2>
        <div style="margin-bottom:35px; border-bottom:1px solid var(--mirii-border); padding-bottom:20px;">
            <h4 style="margin-bottom:10px; font-weight:bold;">はじめてでも本当に大丈夫ですか？</h4>
            <p>はい、大丈夫です。<br>家庭科以来ミシンに触っていない方や、ミシンを持っていても使わないままになっていた方も来られます。</p>
        </div>
        <div style="margin-bottom:35px; border-bottom:1px solid var(--mirii-border); padding-bottom:20px;">
            <h4 style="margin-bottom:10px; font-weight:bold;">不器用でもついていけますか？</h4>
            <p>大丈夫です。<br>器用さよりも、順序がわかることのほうが大切です。<br>一つずつ進められるようにお伝えしています。</p>
        </div>
        <div style="margin-bottom:35px; border-bottom:1px solid var(--mirii-border); padding-bottom:20px;">
            <h4 style="margin-bottom:10px; font-weight:bold;">いきなりコースに申し込まないといけませんか？</h4>
            <p>いいえ。<br>まずは1Day体験レッスンから始めていただけます。<br>体験してみて、もっと学びたいと感じた方に継続コースをご案内しています。</p>
        </div>
        <div style="height:30px;"></div>
        <div style="text-align:center;"><a href="/faq/" class="btn-mirii-tertiary">よくある質問を見る</a></div>
    </div>
</div>

<div class="section-bg-pink brand-section" style="text-align:center; padding:100px 24px;">
    <div style="max-width:850px; margin:0 auto;">
        <h2 class="brand-title" style="text-align:center !important;">まずは、体験レッスンかLINE登録からどうぞ</h2>
        <p>「自分にもできるかもしれない」<br>その気持ちが少しでもあるなら、最初の一歩として十分です。</p>
        <p>まずは体験レッスンで、実際に手を動かしてみる。<br>またはLINEで、募集情報や教室の案内を受け取る。<br>どちらからでも始めていただけます。</p>
        <div style="height:50px;"></div>
        <div style="display:flex; justify-content:center; gap:20px; flex-wrap:wrap;">
            <a href="/1day-lesson/" class="btn-mirii-primary">1Day体験レッスンの詳細を見る</a>
            <a href="https://lin.ee/xyz" class="btn-mirii-secondary">公式LINEで最新情報を受け取る</a>
        </div>
    </div>
</div>
        `;

        await updatePage(18, html_home);

        console.log("TOP Page Update Complete with Custom Layout.");

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
        process.exit(0);
    }
})();
