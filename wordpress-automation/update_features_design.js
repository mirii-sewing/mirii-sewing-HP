const puppeteer = require('puppeteer');

const PAGE_ID = 27; // 教室の特徴 (features)

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--window-size=1280,1024'] });
    try {
        const page = await browser.newPage();
        
        await page.goto('https://mirii-sewing.online/wp-login.php', { waitUntil: 'networkidle2' });
        await page.type('#user_login', 'antigravity-ai@gmail.com');
        await page.type('#user_pass', 'hE6AnSDQNzN0FJ&lX&ITOU(o');
        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle2' }),
            page.click('#wp-submit')
        ]);

        const result = await page.evaluate(async (pageId) => {
            const nonce = window.wpApiSettings ? window.wpApiSettings.nonce : null;
            if (!nonce) return { error: 'No nonce' };

            const content = `
<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">

<!-- ファーストビュー (#FCF7F8) -->
<!-- wp:group {"layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group" style="background-color:#FCF7F8; padding: 60px 20px; text-align:center; border-bottom: 1px solid #E9E6E4; margin-bottom:50px;">

<!-- wp:heading {"textAlign":"center","level":1} -->
<h1 class="wp-block-heading has-text-align-center" style="color:#333333; font-size:clamp(1.5rem, 5vw, 2.5rem); margin-bottom:30px; line-height:1.5;">はじめてでも、<br>少しずつ身につく理由があります</h1>
<!-- /wp:heading -->

<!-- wp:image {"align":"center"} -->
<figure class="wp-block-image aligncenter"><img src="https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_8835-scaled.jpg" alt="世界観が伝わる写真" style="max-width:100%; border-radius:12px; margin-bottom:35px; box-shadow:0 4px 10px rgba(0,0,0,0.05);"/></figure>
<!-- /wp:image -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center" style="color:#4A4A4A; font-size:1.1rem; margin-bottom:20px; line-height:1.8;">mirii sewing は、<br>ただその場で完成させるだけの教室ではありません。</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center" style="color:#4A4A4A; font-size:1.1rem; margin-bottom:40px; line-height:1.8;">お家でも自分で作れるようになることを大切にした、<br>初心者さんのためのミシン教室です。</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons">
<!-- wp:button -->
<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" style="background-color:#D8AEB7; color:#FFFFFF; padding:18px 50px; border-radius:50px; text-decoration:none; font-weight:bold; font-size:1.1rem; box-shadow:0 4px 15px rgba(216,174,183,0.3);" href="/1day-lesson">まずは1Day体験レッスンを見る</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->

</div>
<!-- /wp:group -->

<!-- 導入 (#FFFFFF) -->
<!-- wp:group {"layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group" style="background-color:#FFFFFF; padding:40px 20px; margin-bottom:20px;">
<!-- wp:paragraph -->
<p style="color:#4A4A4A; font-size:1.1rem; margin-bottom:20px; line-height:1.8;">「動画を見ても途中で止まってしまう」<br>「ミシンを買ったものの、何から始めればいいか分からない」</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p style="color:#4A4A4A; font-size:1.1rem; margin-bottom:30px; line-height:1.8;">そんな方が、少しずつ前に進めるようになるのには理由があります。</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p style="color:#4A4A4A; font-size:1.1rem; margin-bottom:0; line-height:1.8;">mirii sewing では、<br>初心者さんがつまずきやすいところをそのままにせず、<br>一つずつ整理しながら進められる形を整えています。<br><br>ここでは、その特徴をご紹介します。</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->

<!-- 特徴1 (#F8F5F2) -->
<!-- wp:group {"layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group" style="background-color:#F8F5F2; padding:60px 40px; margin-bottom:40px; border-radius:12px;">
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading" style="color:#333333; font-size:1.5rem; border-bottom:2px solid #F4DFE3; padding-bottom:10px; margin-bottom:30px;">順序立てて進めるから、迷いにくい</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p style="color:#4A4A4A; margin-bottom:25px; line-height:1.8;">初心者さんが止まりやすい理由のひとつは、<br>「何からやればいいのか分からない」ことです。</p>
<!-- /wp:paragraph -->

<div style="background-color:#FFFFFF; padding:25px; border-radius:8px; margin-bottom:25px;">
<!-- wp:paragraph -->
<p style="color:#4A4A4A; margin-bottom:20px; line-height:1.8;">mirii sewing では、<br>服作りに必要な流れを一つずつ整理しながら進めていきます。</p>
<!-- /wp:paragraph -->
<!-- wp:list {"className":"is-style-default"} -->
<ul class="is-style-default" style="color:#4A4A4A; line-height:2.0; padding-left:1.5em; margin-bottom:0;">
<li><span style="color:#D8AEB7;">・</span>何を先にやるのか</li>
<li><span style="color:#D8AEB7;">・</span>どこでつまずきやすいのか</li>
<li><span style="color:#D8AEB7;">・</span>どう進めれば混乱しにくいのか</li>
</ul>
<!-- /wp:list -->
</div>

<!-- wp:paragraph -->
<p style="color:#4A4A4A; margin-bottom:0; line-height:1.8;">を意識して進めるので、<br>感覚だけで置いていかれることがありません。</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->

<!-- 特徴2 (#FFFFFF) -->
<!-- wp:group {"layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group" style="background-color:#FFFFFF; padding:40px 20px; margin-bottom:20px;">
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading" style="color:#333333; font-size:1.5rem; border-bottom:2px solid #F4DFE3; padding-bottom:10px; margin-bottom:30px;">縫う前の準備から、大切にしています</h2>
<!-- /wp:heading -->

<!-- wp:image {"align":"center"} -->
<figure class="wp-block-image aligncenter"><img src="https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_4814-scaled.jpg" alt="準備の様子" style="max-width:100%; border-radius:12px; margin-bottom:35px; box-shadow:0 4px 10px rgba(0,0,0,0.05);"/></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p style="color:#4A4A4A; margin-bottom:25px; line-height:1.8;">きれいに仕上がるかどうかは、<br>縫い方だけで決まるものではありません。</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p style="color:#4A4A4A; margin-bottom:25px; line-height:1.8;">水通し、生地の扱い方、裁断、型紙の見方など、<br>縫う前の準備が整うことで、<br>その後の進みやすさも変わってきます。</p>
<!-- /wp:paragraph -->

<div style="background-color:#FCF7F8; padding:25px; border-radius:8px; margin-bottom:25px; border-left:4px solid #D8AEB7;">
<!-- wp:paragraph -->
<p style="color:#4A4A4A; margin-bottom:0; line-height:1.8;">mirii sewing では、<br>そうした「最初の準備」から大切にしています。</p>
<!-- /wp:paragraph -->
</div>

<!-- wp:paragraph -->
<p style="color:#4A4A4A; margin-bottom:0; line-height:1.8;">完成した見た目だけではなく、<br>どうすれば次も自分で進められるかを大事にしているからです。</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->

<!-- 特徴3 (#F8F5F2) -->
<!-- wp:group {"layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group" style="background-color:#F8F5F2; padding:60px 40px; margin-bottom:40px; border-radius:12px;">
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading" style="color:#333333; font-size:1.5rem; border-bottom:2px solid #F4DFE3; padding-bottom:10px; margin-bottom:30px;">少人数だから、分からないまま終わりにしません</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p style="color:#4A4A4A; margin-bottom:25px; line-height:1.8;">人数を絞っているのは、<br>一人ひとりの様子をきちんと見ながら進めたいからです。</p>
<!-- /wp:paragraph -->

<div style="background-color:#FFFFFF; padding:25px; border-radius:8px; margin-bottom:30px; border:1px solid #E9E6E4;">
<!-- wp:list {"className":"is-style-default"} -->
<ul class="is-style-default" style="color:#4A4A4A; line-height:2.0; padding-left:1.5em; margin-bottom:0;">
<li><span style="color:#D8AEB7;">・</span>糸のかけ方で止まっている</li>
<li><span style="color:#D8AEB7;">・</span>手元で何が分からなくなっている</li>
<li><span style="color:#D8AEB7;">・</span>質問したいけれど言いづらい</li>
</ul>
<!-- /wp:list -->
</div>

<!-- wp:paragraph -->
<p style="color:#4A4A4A; margin-bottom:0; line-height:1.8;">そういった場面をそのままにせず、<br>確認しながら進めていけるようにしています。<br><br>「分からないけれど、そのまま終わった」<br>が積み重ならないことを大切にしています。</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->

<!-- 特徴4 (#FFFFFF) -->
<!-- wp:group {"layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group" style="background-color:#FFFFFF; padding:40px 20px; margin-bottom:20px;">
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading" style="color:#333333; font-size:1.5rem; border-bottom:2px solid #F4DFE3; padding-bottom:10px; margin-bottom:30px;">教室で終わらず、お家でも続けられることを目指します</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p style="color:#4A4A4A; margin-bottom:25px; line-height:1.8;">教室で完成するだけなら、<br>その場では楽しく終わるかもしれません。</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p style="color:#4A4A4A; margin-bottom:25px; line-height:1.8;">でも、<br>本当に自分で作れるようになったと言えるのは、<br>お家でもミシンを出して進められるようになったときです。</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p style="color:#4A4A4A; margin-bottom:30px; line-height:1.8;">mirii sewing では、<br>教室の時間だけで完結するのではなく、<br>お家でも少しずつ続けられることを目指しています。</p>
<!-- /wp:paragraph -->

<div style="background-color:#F8F5F2; padding:25px; border-radius:8px;">
<!-- wp:paragraph -->
<p style="color:#4A4A4A; margin-bottom:0; line-height:1.8;">そのために、<br>分からないところを整理しながら進めることや、<br>復習しやすい形を整えることを大切にしています。</p>
<!-- /wp:paragraph -->
</div>
</div>
<!-- /wp:group -->

<!-- 特徴5 (#F8F5F2) -->
<!-- wp:group {"layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group" style="background-color:#F8F5F2; padding:60px 40px; margin-bottom:40px; border-radius:12px;">
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading" style="color:#333333; font-size:1.5rem; border-bottom:2px solid #F4DFE3; padding-bottom:10px; margin-bottom:30px;">初心者さんの気持ちを前提にしたレッスンです</h2>
<!-- /wp:heading -->

<!-- wp:image {"align":"center"} -->
<figure class="wp-block-image aligncenter"><img src="https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_0121-scaled.jpg" alt="初心者指導の様子" style="max-width:100%; border-radius:12px; margin-bottom:35px; box-shadow:0 4px 10px rgba(0,0,0,0.05);"/></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p style="color:#4A4A4A; margin-bottom:25px; line-height:1.8;">mirii sewing に来られる方の多くは、<br>最初からスムーズにできる方ではありません。</p>
<!-- /wp:paragraph -->

<div style="background-color:#FFFFFF; padding:25px; border-radius:8px; margin-bottom:30px;">
<!-- wp:list {"className":"is-style-default"} -->
<ul class="is-style-default" style="color:#4A4A4A; line-height:2.0; padding-left:1.5em; margin-bottom:0;">
<li><span style="color:#D8AEB7;">・</span>家庭科以来ミシンに触っていない</li>
<li><span style="color:#D8AEB7;">・</span>ミシンを買ったけれど使わないまま</li>
<li><span style="color:#D8AEB7;">・</span>動画で挑戦したけれどうまくいかなかった</li>
<li><span style="color:#D8AEB7;">・</span>不器用だから自分には向いていないと思っている</li>
</ul>
<!-- /wp:list -->
</div>

<!-- wp:paragraph -->
<p style="color:#4A4A4A; margin-bottom:0; line-height:1.8;">そんな方が、<br>少しずつ「私にもできるかもしれない」と思えるように、<br>安心して進められる雰囲気と伝え方を大切にしています。</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->

<!-- 教室で大切にしていること (#FFFFFF) -->
<!-- wp:group {"layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group" style="background-color:#FFFFFF; padding:60px 20px; margin-bottom:40px; text-align:center;">
<!-- wp:heading {"textAlign":"center","level":2} -->
<h2 class="wp-block-heading has-text-align-center" style="color:#333333; font-size:1.8rem; border-bottom:2px solid #F4DFE3; padding-bottom:15px; margin-bottom:40px; display:inline-block;">教室で大切にしていること</h2>
<!-- /wp:heading -->

<!-- wp:group {"layout":{"type":"flex","justifyContent":"center","orientation":"vertical"}, "style":{"spacing":{"blockGap":"0px"}}} -->
<div class="wp-block-group" style="margin-bottom:40px;">
<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center" style="color:#D8AEB7; font-size:1.6rem; font-weight:bold; margin-bottom:10px; font-family:'Noto Serif JP',serif;">完成より、習得。</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center" style="color:#D8AEB7; font-size:1.6rem; font-weight:bold; margin-bottom:0; font-family:'Noto Serif JP',serif;">依存より、自立。</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->

<!-- wp:paragraph {"align":"left"} -->
<p style="color:#4A4A4A; line-height:1.8; margin-bottom:25px;">mirii sewing では、<br>ただ教室で綺麗に完成することだけをゴールにしていません。</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"align":"left"} -->
<p style="color:#4A4A4A; line-height:1.8; margin-bottom:25px;">大切にしているのは、<br>お家に帰ってからも、<br>自分で少しずつ進められるようになることです。</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"align":"left"} -->
<p style="color:#4A4A4A; line-height:1.8; margin-bottom:40px;">そのために、<br>分からないまま進めないこと、<br>順序立てて伝えること、<br>できるだけ自分で理解しながら手を動かせることを大切にしています。</p>
<!-- /wp:paragraph -->

<div style="background-color:#FCF7F8; padding:30px 20px; border:1px solid #D8AEB7; border-radius:8px;">
<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center" style="color:#4A4A4A; font-weight:bold; font-size:1.2rem; line-height:1.8; margin-bottom:0;">「先生がいないと作れない」<br>ではなく、<br>「次も自分でやってみよう」<br>と思えるようになることを目指しています。</p>
<!-- /wp:paragraph -->
</div>
</div>
<!-- /wp:group -->

<!-- こんな方に向いています (#FCF7F8) -->
<!-- wp:group {"layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group" style="background-color:#FCF7F8; padding:60px 40px; margin-bottom:40px; border-radius:12px;">
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading" style="color:#333333; font-size:1.5rem; border-bottom:2px solid #D8AEB7; padding-bottom:10px; margin-bottom:35px;">この教室は、こんな方に向いています</h2>
<!-- /wp:heading -->

<!-- wp:list {"className":"is-style-default"} -->
<ul class="is-style-default" style="color:#4A4A4A; line-height:2.2; padding-left:1.5em; margin-bottom:0;">
<li><span style="color:#D8AEB7;">・</span>ミシンを買ったものの、しまったままになっている</li>
<li><span style="color:#D8AEB7;">・</span>動画を見ても途中で止まってしまう</li>
<li><span style="color:#D8AEB7;">・</span>裁断や準備の段階で難しく感じる</li>
<li><span style="color:#D8AEB7;">・</span>子どもの服を作ってみたい</li>
<li><span style="color:#D8AEB7;">・</span>教室で完成するだけでなく、ちゃんと身につけたい</li>
<li><span style="color:#D8AEB7;">・</span>お家でも自分で作れるようになりたい</li>
<li><span style="color:#D8AEB7;">・</span>少人数で落ち着いて学びたい</li>
</ul>
<!-- /wp:list -->
</div>
<!-- /wp:group -->

<!-- まずは体験から (#FFFFFF) -->
<!-- wp:group {"layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group" style="background-color:#FFFFFF; padding:40px 20px; margin-bottom:40px;">
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading" style="color:#333333; font-size:1.5rem; border-bottom:2px solid #F4DFE3; padding-bottom:10px; margin-bottom:30px;">いきなり継続ではなく、<br>まずは1Day体験レッスンから始めていただけます</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p style="color:#4A4A4A; margin-bottom:25px; line-height:1.8;">「自分に合うか分からない」<br>「いきなり継続コースは不安」</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p style="color:#4A4A4A; margin-bottom:30px; line-height:1.8;">そんな方のために、<br>mirii sewing では、まず1Day体験レッスンをご用意しています。</p>
<!-- /wp:paragraph -->

<!-- wp:image {"align":"center"} -->
<figure class="wp-block-image aligncenter"><img src="https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_2713-scaled.jpg" alt="体験レッスンのイメージ" style="max-width:100%; border-radius:12px; margin-bottom:35px; box-shadow:0 4px 10px rgba(0,0,0,0.05);"/></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p style="color:#4A4A4A; margin-bottom:25px; line-height:1.8;">体験では、<br>初心者さんでも安心して取り組める形で、<br>最初の一歩を踏み出していただけます。</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p style="color:#4A4A4A; margin-bottom:40px; line-height:1.8;">そのうえで、<br>もっと身につけたいと感じた方に、<br>継続コースをご案内しています。</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons">
<!-- wp:button -->
<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" style="background-color:#D8AEB7; color:#FFFFFF; padding:15px 40px; border-radius:50px; text-decoration:none; font-weight:bold; font-size:1.1rem; box-shadow:0 4px 12px rgba(216,174,183,0.3);" href="/1day-lesson">1Day体験レッスンの詳細を見る</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->

<!-- 最終CTA (#F8F5F2) -->
<!-- wp:group {"layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group" style="background-color:#F8F5F2; padding:80px 20px; text-align:center; border-top: 1px solid #E9E6E4;">

<!-- wp:heading {"textAlign":"center","level":2} -->
<h2 class="wp-block-heading has-text-align-center" style="color:#333333; font-size:1.6rem; margin-bottom:40px;">まずは、体験レッスンかLINE登録からどうぞ</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center" style="color:#4A4A4A; margin-bottom:25px; line-height:1.8;">教室の特徴を読んで、<br>「自分にもできるかもしれない」を感じていただけたら、<br>最初の一歩として十分です。</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center" style="color:#4A4A4A; margin-bottom:50px; line-height:1.8;">まずは体験レッスンで実際に手を動かしてみる。<br>またはLINEで、募集情報や教室の案内を受け取る。<br><br>どちらからでも始めていただけます。</p>
<!-- /wp:paragraph -->

<!-- CTAボタン（重要度による見た目の強弱） -->
<div style="max-width:400px; margin:0 auto; text-align:center;">
    <!-- 第一優先：1Day体験 -->
    <!-- wp:button -->
    <div class="wp-block-button" style="margin-bottom:25px;">
        <a class="wp-block-button__link wp-element-button" style="background-color:#D8AEB7; color:#FFFFFF; padding:20px 50px; border-radius:50px; text-decoration:none; font-weight:bold; font-size:1.2rem; display:block; box-shadow:0 6px 15px rgba(216,174,183,0.4);" href="/1day-lesson">1Day体験レッスンの詳細を見る</a>
    </div>
    <!-- /wp:button -->
    
    <!-- 第二優先：LINE登録 -->
    <!-- wp:button -->
    <div class="wp-block-button">
        <a class="wp-block-button__link wp-element-button" style="background-color:#FFFFFF; color:#7FAE9B; padding:12px 30px; border-radius:50px; text-decoration:none; font-weight:normal; font-size:1rem; display:inline-block; border:1px solid #7FAE9B;" href="#">公式LINEで最新情報を受け取る</a>
    </div>
    <!-- /wp:button -->
</div>

</div>
<!-- /wp:group -->

</div>
<!-- /wp:group -->
`;

            const updateRes = await fetch(window.wpApiSettings.root + 'wp/v2/pages/' + pageId, {
                method: 'POST',
                headers: {
                    'X-WP-Nonce': nonce,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: content
                })
            });
            const data = await updateRes.json();
            return { status: 'success', pageId: data.id };
        }, PAGE_ID);

        console.log("Update API result:", result);
        
        // Hide title and other elements via WP Admin meta
        console.log("Setting page meta settings for page", PAGE_ID);
        await page.goto('https://mirii-sewing.online/wp-admin/post.php?post=' + PAGE_ID + '&action=edit', { waitUntil: 'networkidle2' });
        await page.waitForFunction(() => typeof wp !== 'undefined' && wp.data && wp.data.select('core/editor') !== null, { timeout: 15000 });
        await new Promise(r => setTimeout(r, 4000));
        await page.evaluate(() => {
            const pageTypeCheck = document.querySelector('input[name="cocoon_page_type"][value="1column_wide"]');
            if (pageTypeCheck && !pageTypeCheck.checked) pageTypeCheck.click();
            ['cocoon_hide_page_title', 'cocoon_hide_sns_share_buttons', 'cocoon_hide_sns_follow_buttons', 'cocoon_hide_author_info', 'cocoon_hide_date_info', 'cocoon_hide_update_info']
                .forEach(name => {
                    const cb = document.querySelector('input[name="' + name + '"]');
                    if (cb && !cb.checked) cb.click();
                });
            wp.data.dispatch('core/editor').savePost();
        });
        await new Promise(r => setTimeout(r, 5000));
        console.log("Done.");

    } catch (e) {
        console.error("Error:", e);
    } finally {
        await browser.close();
    }
})();
