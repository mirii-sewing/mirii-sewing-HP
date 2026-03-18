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
                const response = await fetch(window.wpApiSettings.root + 'wp/v2/pages/' + pid, {
                    method: 'POST',
                    headers: { 'X-WP-Nonce': nonce, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content: content })
                });
                return response.status;
            }, id, html);
        };

        const images = {
            fv_1day: 'https://mirii-sewing.online/wp-content/uploads/2026/03/64D9D67A-4638-4A57-A15C-79560E941E9B-71066-000016B28B41CE60.jpeg',
            fv_welcome: 'https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_3017_0.jpg'
        };

        const html_1day = `
<!-- wp:cover {"url":"${images.fv_1day}","dimRatio":10,"overlayColor":"black","align":"full"} -->
<div class="wp-block-cover alignfull" style="min-height:85vh;">
    <span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim-10 has-background-dim"></span>
    <img class="wp-block-cover__image-background" src="${images.fv_1day}" data-object-fit="cover"/>
    <div class="wp-block-cover__inner-container">
        <!-- wp:group {"layout":{"type":"constrained","wideSize":"1000px"}} -->
        <div class="wp-block-group">
            <h2 class="has-text-align-center" style="color:#fff; font-size:clamp(1.6rem, 5vw, 2.6rem); line-height:1.6; text-shadow:0 3px 10px rgba(0,0,0,0.5); margin:0; font-weight:normal;">まずは1回、<br>「私にもできた」を感じるところから。</h2>
            <div style="height:30px;"></div>
            <p class="has-text-align-center" style="color:#fff; font-size:1.1rem;">初心者さんでも安心して参加できる、<br>子ども服づくりの1Day体験レッスンです。</p>
            <div style="height:30px;"></div>
            <p class="has-text-align-center" style="color:#fff; font-size:0.95rem;">・初心者さん歓迎<br>・3時間で達成感<br>・準備は教室で整えています</p>
            <div style="height:40px;"></div>
            <div style="text-align:center;"><a href="https://lin.ee/xyz" class="btn-mirii-secondary">公式LINEで募集案内を受け取る</a></div>
        </div>
        <!-- /wp:group -->
    </div>
</div>
<!-- /wp:cover -->

<div class="brand-section">
    <div style="max-width:850px; margin:0 auto; text-align:left;">
        <h2 class="brand-title" style="text-align:center !important;">ミシンを買ったものの、箱の中に眠っていませんか？</h2>
        <p>「子どものために何か作ってあげたい」<br>そう思ってミシンを用意したものの、</p>
        <p>・糸の通し方が分からない<br>・真っ直ぐ縫える自信がない<br>・動画を見ても途中で止まってしまう<br>・裁断や準備の時点で、難しく感じる</p>
        <p>そんな不安を持ったまま、ミシンをしまい込んでしまう方は少なくありません。</p>
        <p>この体験レッスンは、<br>そんな初心者さんが安心して最初の一歩を踏み出すためのレッスンです。</p>
    </div>
</div>

<div class="section-bg-beige brand-section">
    <div style="max-width:850px; margin:0 auto;">
        <h2 class="brand-title">体験後に、こんな変化を感じる方が多いです</h2>
        <p>・ミシンへの苦手意識がやわらぐ<br>・「私にもできるかもしれない」と思える<br>・完成まで進める達成感を味わえる<br>・次に何を学べばいいかが見えてくる</p>
        <p>ただ楽しかったで終わるのではなく、<br>続けたらもっとできるかも と思える時間を大切にしています。</p>
    </div>
</div>

<div class="brand-section">
    <div style="max-width:950px; margin:0 auto;">
        <h2 class="brand-title">お好きな作品をお選びいただけます</h2>
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap:40px; margin-top:50px;">
            <div style="background:#fff; border:1px solid var(--mirii-border); padding:40px;">
                <h4 style="font-size:1.4rem; margin-bottom:20px; color:var(--mirii-pink-dark);">A. 裏地付きワンピース</h4>
                <p>初心者さんでも取り組みやすい形で、きれいに仕上げるための基本を学べます。そのままお出かけにも着せやすいデザインです。</p>
                <div style="aspect-ratio:4/3; background:#F8F5F2; margin-top:20px; display:flex; align-items:center; justify-content:center; color:#999;">[ 作品画像 A ]</div>
            </div>
            <div style="background:#fff; border:1px solid var(--mirii-border); padding:40px;">
                <h4 style="font-size:1.4rem; margin-bottom:20px; color:var(--mirii-pink-dark);">B. 男の子用パンツ</h4>
                <p>カーブの縫い方やゴム通しなど、基本の動きを無理なく体験できます。動きやすく、毎日使いやすい形です。</p>
                <div style="aspect-ratio:4/3; background:#F8F5F2; margin-top:20px; display:flex; align-items:center; justify-content:center; color:#999;">[ 作品画像 B ]</div>
            </div>
        </div>
    </div>
</div>

<div class="section-bg-pink brand-section">
    <div style="max-width:850px; margin:0 auto;">
        <h2 class="brand-title">はじめてでも進めやすいように、準備しています</h2>
        <p>この体験レッスンでは、初心者さんが縫うことに集中しやすいように、必要な準備を整えた状態でスタートします。</p>
        <p>・裁断などの事前準備はこちらで対応<br>・少人数で進めるので、置いていかれにくい<br>・分からないところはその場で確認できる</p>
        <p>「やってみたいけれど不安」<br>そんな方こそ、来ていただきたいレッスンです。</p>
    </div>
</div>

<div class="brand-section">
    <div style="max-width:800px; margin:0 auto;">
        <h2 class="brand-title">開催概要</h2>
        <table style="width:100%; border-collapse:collapse; margin-top:30px;">
            <tr style="border-bottom:1px solid var(--mirii-border);"><th style="padding:20px; text-align:left; width:30%;">所要時間</th><td style="padding:20px;">3時間</td></tr>
            <tr style="border-bottom:1px solid var(--mirii-border);"><th style="padding:20px; text-align:left;">参加費</th><td style="padding:20px;">15,000円</td></tr>
            <tr style="border-bottom:1px solid var(--mirii-border);"><th style="padding:20px; text-align:left;">持ち物</th><td style="padding:20px;">基本的には不要</td></tr>
            <tr style="border-bottom:1px solid var(--mirii-border);"><th style="padding:20px; text-align:left;">開催方法</th><td style="padding:20px;">対面 / オンラインの案内に準ずる</td></tr>
            <tr style="border-bottom:1px solid var(--mirii-border);"><th style="padding:20px; text-align:left;">申込み方法</th><td style="padding:20px;">公式LINEよりご案内</td></tr>
        </table>
    </div>
</div>

<div class="section-bg-beige brand-section">
    <div style="max-width:850px; margin:0 auto;">
        <h2 class="brand-title">よくある質問</h2>
        <div style="margin-bottom:30px; border-bottom:1px solid var(--mirii-border); padding-bottom:15px;">
            <h4 style="margin-bottom:10px; font-weight:bold;">不器用でも大丈夫ですか？</h4>
            <p>大丈夫です。最初から上手にできる必要はありません。一つずつ進めながら、完成までサポートします。</p>
        </div>
        <div style="margin-bottom:30px; border-bottom:1px solid var(--mirii-border); padding-bottom:15px;">
            <h4 style="margin-bottom:10px; font-weight:bold;">ミシン初心者でも参加できますか？</h4>
            <p>はい。この体験は、むしろ初心者さんのための入口としてご用意しています。</p>
        </div>
        <div style="margin-bottom:0; padding-bottom:0;">
            <h4 style="margin-bottom:10px; font-weight:bold;">無理に継続コースをすすめられませんか？</h4>
            <p>無理なご案内はしていません。体験してみて、もっと身につけたいと思った方に継続コースをご案内しています。</p>
        </div>
    </div>
</div>

<div class="brand-section">
    <div style="max-width:850px; margin:0 auto;">
        <h2 class="brand-title">もっと自分で作れるようになりたい方へ</h2>
        <p>体験レッスンは、最初の成功体験をつくる場です。<br>そのうえで、もっと基礎から身につけたい方には、4ヶ月少人数コースをご用意しています。</p>
        <p>まずは体験で、「私にもできる」感覚を持っていただくことを大切にしています。</p>
    </div>
</div>

<div class="section-bg-pink brand-section" style="text-align:center; padding:100px 24px;">
    <div style="max-width:850px; margin:0 auto;">
        <h2 class="brand-title">まずはLINEで募集案内を受け取ってください</h2>
        <p>1Day体験レッスンは、不定期でご案内しています。<br>参加をご希望の方は、まずは公式LINEにご登録ください。</p>
        <p>募集日程や空き状況、体験内容の詳細をお送りします。</p>
        <div style="height:50px;"></div>
        <div style="text-align:center;"><a href="https://lin.ee/xyz" class="btn-mirii-secondary">公式LINEで募集案内を受け取る</a></div>
    </div>
</div>
`;

        const html_welcome = `
<!-- wp:cover {"url":"${images.fv_welcome}","dimRatio":10,"overlayColor":"black","align":"full"} -->
<div class="wp-block-cover alignfull" style="min-height:80vh;">
    <span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim-10 has-background-dim"></span>
    <img class="wp-block-cover__image-background" src="${images.fv_welcome}" data-object-fit="cover"/>
    <div class="wp-block-cover__inner-container">
        <!-- wp:group {"layout":{"type":"constrained","wideSize":"1000px"}} -->
        <div class="wp-block-group">
            <h2 class="has-text-align-center" style="color:#fff; font-size:clamp(1.6rem, 5vw, 2.6rem); line-height:1.6; text-shadow:0 3px 10px rgba(0,0,0,0.5); margin:0; font-weight:normal;">家庭科以来、<br>ミシンに触っていないママへ。</h2>
            <div style="height:30px;"></div>
            <p class="has-text-align-center" style="color:#fff; font-size:1.1rem;">一歩ずつ、「私にもできる」を形にしていく教室です。</p>
            <div style="height:40px;"></div>
            <div style="text-align:center;"><a href="/1day-lesson/" class="btn-mirii-primary">1Day体験レッスンを見る</a></div>
        </div>
        <!-- /wp:group -->
    </div>
</div>
<!-- /wp:cover -->

<div class="brand-section">
    <div style="max-width:850px; margin:0 auto; text-align:left;">
        <h2 class="brand-title" style="text-align:center !important;">ミシンが苦手でも、大丈夫です</h2>
        <p>「真っ直ぐ縫えるか不安」<br>「糸の通し方がわからない」<br>「自分は不器用だから無理かもしれない」</p>
        <p>実は、当教室に来られる方の多くが、そんな不安を抱えてスタートされます。</p>
        <p>ここでは、難しい専門用語は使いません。<br>お子さんのために何か作ってあげたいという気持ちを大切にしながら、一人ひとりの歩幅に合わせて進めていきます。</p>
    </div>
</div>

<div class="section-bg-beige brand-section">
    <div style="max-width:900px; margin:0 auto;">
        <h2 class="brand-title">mirii sewing が大切にしていること</h2>
        <div style="margin-top:50px;">
            <div style="margin-bottom:40px;">
                <h4 style="font-size:1.3rem; margin-bottom:15px; border-left:3px solid var(--mirii-pink-dark); padding-left:15px;">完成することより、お家でも作れるようになること</h4>
                <p>教室で形になるだけではなく、お家に帰ってからも、自分で進められることを大切にしています。</p>
            </div>
            <div style="margin-bottom:40px;">
                <h4 style="font-size:1.3rem; margin-bottom:15px; border-left:3px solid var(--mirii-pink-dark); padding-left:15px;">分からないまま進めないこと</h4>
                <p>初心者さんにとって、分からないことを分からないままにしないことは大切です。だからこそ、順序立てて、一つずつ確認しながら進めます。</p>
            </div>
            <div>
                <h4 style="font-size:1.3rem; margin-bottom:15px; border-left:3px solid var(--mirii-pink-dark); padding-left:15px;">依存ではなく、自立につながること</h4>
                <p>ずっと教室がないと作れない状態ではなく、少しずつ自分でできることを増やしていくことを目指しています。</p>
            </div>
        </div>
    </div>
</div>

<div class="brand-section">
    <div style="max-width:850px; margin:0 auto; text-align:left;">
        <h2 class="brand-title" style="text-align:center !important;">「不器用だから」と諦める前に</h2>
        <p>自分には向いていないと思っていたことが、少しずつできるようになる。<br>その経験は、育児に忙しいママにとって、大きな自信につながります。</p>
        <p>お子さんに「これ、ママが作ったの？」と喜んでもらえる時間は、嬉しいだけではなく、自分のことを少し好きになれる時間でもあります。</p>
    </div>
</div>

<div class="section-bg-pink brand-section">
    <div style="max-width:850px; margin:0 auto;">
        <h2 class="brand-title">こんな方に向いています</h2>
        <p>・家庭科以来、ミシンに触っていない<br>・ミシンを買ったものの、しまったままになっている<br>・子どもの服を作ってみたい<br>・動画を見ても途中で止まってしまう<br>・自分の時間を、少しでも気持ちよく使いたい<br>・ただ完成するだけでなく、ちゃんと身につけたい</p>
    </div>
</div>

<div class="brand-section">
    <div style="max-width:850px; margin:0 auto; text-align:center;">
        <h2 class="brand-title">最初の一歩は、1Day体験レッスンから</h2>
        <p>いきなり継続コースに進むのが不安な方のために、まずは1Day体験レッスンをご用意しています。</p>
        <p>最初の一歩として、「私にもできるかもしれない」を感じていただける時間です。</p>
        <div style="height:40px;"></div>
        <div style="text-align:center;"><a href="/1day-lesson/" class="btn-mirii-primary">体験レッスンの詳細はこちら</a></div>
    </div>
</div>
`;

        await updatePage(39, html_1day);
        await updatePage(35, html_welcome);

        console.log("Pages Updated (Final Strict v3). Cleaning Cache...");

        // Final sanity check by navigating
        await page.goto('https://mirii-sewing.online/1day-lesson/', { waitUntil: 'networkidle2' });
        await page.reload({ waitUntil: 'networkidle2' });

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
        process.exit(0);
    }
})();
