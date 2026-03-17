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
            fv_top: 'https://mirii-sewing.online/wp-content/uploads/2026/03/64D9D67A-4638-4A57-A15C-79560E941E9B-71066-000016B28B41CE60.jpeg',
            fv_1day: 'https://mirii-sewing.online/wp-content/uploads/2026/03/3894_724909648.jpg',
            work_a: 'https://mirii-sewing.online/wp-content/uploads/2026/03/69261.jpg',
            work_b: 'https://mirii-sewing.online/wp-content/uploads/2026/03/69262.jpg',
            profile: 'https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_3017_0.jpg'
        };

        // FULL TOP PAGE REBUILD
        const html_home = '<!-- wp:cover {"url":"' + images.fv_top + '","dimRatio":10,"overlayColor":"black","align":"full"} -->' +
            '<div class="wp-block-cover alignfull" style="min-height:95vh;"><span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim-10 has-background-dim"></span><img class="wp-block-cover__image-background" src="' + images.fv_top + '" data-object-fit="cover"/><div class="wp-block-cover__inner-container"><!-- wp:group {"layout":{"type":"constrained","wideSize":"1000px"}} -->' +
            '<div class="wp-block-group">' +
            '<h2 class="has-text-align-center" style="color:#fff; font-size:clamp(1.6rem, 5vw, 2.8rem); line-height:1.6; text-shadow:0 3px 10px rgba(0,0,0,0.5); margin:0; font-weight:normal;">子どものお洋服を、<br>お家で手作りできるようになりたいママへ</h2>' +
            '<div style="height:50px;"></div>' +
            '<div style="text-align:center;"><a href="/welcome/" class="btn-mirii-primary">はじめての方へ</a></div>' +
            '</div>' +
            '<!-- /wp:group --></div></div>' +
            '<!-- /wp:cover -->' +

            '<!-- 1. Empathy Section -->' +
            '<div class="brand-section">' +
            '  <div style="max-width:850px; margin:0 auto; text-align:center;">' +
            '    <h2 class="brand-title">ミシンを買ったものの、<br>箱の中に眠らせていませんか？</h2>' +
            '    <p style="font-size:1.1rem; line-height:2.0; color:#444;">「家庭科以来、一度も触っていない」「真っ直ぐ縫える自信がない」<br>mirii sewingは、そんな不安を抱える初心者ママのための洋裁教室です。<br>不器用な方でも、一歩ずつ丁寧に進めれば、必ず形にできる喜びが待っています。</p>' +
            '  </div>' +
            '</div>' +

            '<!-- 2. Features Section -->' +
            '<div class="section-bg-beige brand-section">' +
            '  <div style="max-width:1000px; margin:0 auto;">' +
            '    <h2 class="brand-title">mirii sewing の3つの特徴</h2>' +
            '    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:30px; margin-top:50px;">' +
            '      <div style="background:#fff; padding:40px; border-radius:15px; border:1px solid var(--mirii-border);">' +
            '        <h4 style="margin-bottom:15px; font-size:1.3rem;">裁断済みのキット</h4>' +
            '        <p style="font-size:0.95rem;">一番大変な準備（裁断・印付け）はすべて講師が済ませてお渡しします。当日は「楽しく縫うこと」に集中できる環境です。</p>' +
            '      </div>' +
            '      <div style="background:#fff; padding:40px; border-radius:15px; border:1px solid var(--mirii-border);">' +
            '        <h4 style="margin-bottom:15px; font-size:1.3rem;">最大3名の少人数制</h4>' +
            '        <p style="font-size:0.95rem;">講師の目が全員に届くよう、人数を限定。聞きにくい悩みも、その場で解決しながら自分のペースで進められます。</p>' +
            '      </div>' +
            '      <div style="background:#fff; padding:40px; border-radius:15px; border:1px solid var(--mirii-border);">' +
            '        <h4 style="margin-bottom:15px; font-size:1.3rem;">ママに優しい振替制度</h4>' +
            '        <p style="font-size:0.95rem;">お子様の急な体調不良などで欠席される場合も、別日程への振替が可能。無理なく通い続けられる仕組みです。</p>' +
            '      </div>' +
            '    </div>' +
            '    <div style="text-align:center; margin-top:60px;"><a href="/features/" class="btn-mirii-tertiary">教室の特徴をもっと詳しく</a></div>' +
            '  </div>' +
            '</div>' +

            '<!-- 3. Lesson Guide -->' +
            '<div class="brand-section">' +
            '  <div style="max-width:1000px; margin:0 auto; text-align:center;">' +
            '    <h2 class="brand-title">レッスンのご案内</h2>' +
            '    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:50px; margin-top:60px;">' +
            '      <div class="section-bg-pink" style="padding:50px; border-radius:20px; text-align:left;">' +
            '        <span class="badge-mirii" style="margin-bottom:15px;">STEP 1</span>' +
            '        <h3 style="margin-bottom:20px; font-size:1.7rem;">1Day体験レッスン</h3>' +
            '        <p style="font-size:1rem;">まずは3時間の集中レッスンで、ミシンの基本と「完成の喜び」を。手ぶらで気軽にご参加いただけます。</p>' +
            '        <div style="height:40px;"></div>' +
            '        <a href="/1day-lesson/" class="btn-mirii-primary">体験レッスンの詳細</a>' +
            '      </div>' +
            '      <div class="section-bg-beige" style="padding:50px; border-radius:20px; text-align:left;">' +
            '        <span class="badge-mirii" style="margin-bottom:15px;">STEP 2</span>' +
            '        <h3 style="margin-bottom:20px; font-size:1.7rem;">4ヶ月継続コース</h3>' +
            '        <p style="font-size:1rem;">お家で一人で服が作れるようになりたい方へ。基礎から応用まで、仲間と一緒にじっくり学びます。</p>' +
            '        <div style="height:40px;"></div>' +
            '        <a href="/course/" class="btn-mirii-tertiary">継続コースの詳細</a>' +
            '      </div>' +
            '    </div>' +
            '  </div>' +
            '</div>' +

            '<!-- 4. Profile Section -->' +
            '<div class="section-bg-beige brand-section">' +
            '  <div style="max-width:900px; margin:0 auto; display:flex; align-items:center; gap:60px; flex-wrap:wrap;">' +
            '    <div style="flex:1; min-width:300px;"><img src="' + images.profile + '" class="brand-img img-square" style="border-radius:50%; width:280px; margin:0 auto; display:block;"/></div>' +
            '    <div style="flex:1.5; min-width:300px;">' +
            '      <h2 style="text-align:left; margin-bottom:30px;">講師プロフィール</h2>' +
            '      <p style="font-size:1.05rem; line-height:1.9;">洋裁歴15年。二男の母。2020年に「mirii sewing」をオープン。<br>「不器用だから」と諦めているママを一人でも多く笑顔にしたい。そんな想いで、300名以上の初心者をサポートしてきました。</p>' +
            '      <div style="height:30px;"></div>' +
            '      <a href="/profile/" class="btn-mirii-tertiary">講師について</a>' +
            '    </div>' +
            '  </div>' +
            '</div>' +

            '<!-- 5. Voice & Transformation -->' +
            '<div class="brand-section">' +
            '  <div style="max-width:1000px; margin:0 auto;">' +
            '    <h2 class="brand-title">生徒さんの変化</h2>' +
            '    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:40px;">' +
            '      <div class="section-bg-pink" style="padding:40px; border-radius:15px; position:relative;">' +
            '        <p style="font-size:1rem; italic;">「ミシンを触るのも怖かったですが、丁寧に教えていただき、最後は自分の手で出来上がった服を見て涙が出ました。」（1歳児のママ）</p>' +
            '      </div>' +
            '      <div class="section-bg-pink" style="padding:40px; border-radius:15px; position:relative;">' +
            '        <p style="font-size:1rem; italic;">「裁断の手間がないのが本当に助かります。3時間の集中タイムが、毎月の楽しみになっています。」（3歳・5歳児のママ）</p>' +
            '      </div>' +
            '    </div>' +
            '    <div style="text-align:center; margin-top:60px;"><a href="/voice/" class="btn-mirii-tertiary">生徒さんの声をもっと見る</a></div>' +
            '  </div>' +
            '</div>' +

            '<!-- 6. FAQ Section -->' +
            '<div class="section-bg-beige brand-section">' +
            '  <div style="max-width:800px; margin:0 auto;">' +
            '    <h2 class="brand-title">よくある質問</h2>' +
            '    <div style="text-align:left;">' +
            '      <div style="margin-bottom:30px; border-bottom:1px solid #ddd; padding-bottom:15px;">' +
            '        <h4 style="margin-bottom:10px;">Q. ミシンを持っていなくても参加できますか？</h4>' +
            '        <p>A. はい、大丈夫です。教室内には数台のミシンをご用意しておりますので、手ぶらでご参加いただけます。</p>' +
            '      </div>' +
            '      <div style="margin-bottom:30px; border-bottom:1px solid #ddd; padding-bottom:15px;">' +
            '        <h4 style="margin-bottom:10px;">Q. 不器用でも大丈夫でしょうか？</h4>' +
            '        <p>A. もちろんです。少人数制で、難しい箇所は講師がしっかりとサポートします。まずは簡単なものから一歩ずつ始めましょう。</p>' +
            '      </div>' +
            '    </div>' +
            '    <div style="text-align:center; margin-top:50px;"><a href="/faq/" class="btn-mirii-tertiary">よくある質問一覧</a></div>' +
            '  </div>' +
            '</div>' +

            '<!-- 7. Final Footer CTA -->' +
            '<div class="brand-section" style="text-align:center;">' +
            '  <div style="max-width:850px; margin:0 auto;">' +
            '    <h2 style="font-size:2rem; margin-bottom:40px;">まずは体験レッスンから。</h2>' +
            '    <p style="margin-bottom:50px;">空き状況の確認や先行予約は、公式LINEより承っています。</p>' +
            '    <div style="display:flex; justify-content:center; gap:20px; flex-wrap:wrap;">' +
            '      <a href="/1day-lesson/" class="btn-mirii-primary">体験レッスンの詳細</a>' +
            '      <a href="https://lin.ee/xyz" class="btn-mirii-secondary">LINEで先行予約する</a>' +
            '    </div>' +
            '  </div>' +
            '</div>';

        // Update Pages
        await updatePage(18, html_home);

        console.log("Top Page Rebuild Complete.");

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
        process.exit(0);
    }
})();
