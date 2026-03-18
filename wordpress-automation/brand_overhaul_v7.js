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

        console.log("Injecting Global CSS v7...");
        await page.goto('https://mirii-sewing.online/wp-admin/customize.php', { waitUntil: 'networkidle2' });
        await page.waitForSelector('#accordion-section-custom_css');
        await page.click('#accordion-section-custom_css');

        const css = '/* --- Mirii Sewing Brand Guidelines v7 --- */' +
            ':root {' +
            '  --mirii-pink-soft: #F4DFE3;' +
            '  --mirii-pink-dark: #D8AEB7;' +
            '  --mirii-green: #7FAE9B;' +
            '  --mirii-text: #4A4A4A;' +
            '  --mirii-heading: #333333;' +
            '  --mirii-bg-main: #FAFAFA;' +
            '  --mirii-bg-beige: #F8F5F2;' +
            '  --mirii-bg-pink: #FCF7F8;' +
            '  --mirii-border: #E9E6E4;' +
            '}' +
            'body { color: var(--mirii-text) !important; background-color: var(--mirii-bg-main) !important; font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif; line-height: 1.8; }' +
            'h1, h2, h3, h4, h5, h6 { color: var(--mirii-heading) !important; font-family: "Noto Serif JP", serif !important; font-weight: 600 !important; }' +
            '/* Aggressive Hide for All Major Pages */' +
            '.page-id-18 .article-header, .page-id-18 .article-footer, .page-id-18 .sidebar, .page-id-18 .breadcrumb, .page-id-18 .entry-title, ' +
            '.page-id-24 .article-header, .page-id-24 .article-footer, .page-id-24 .sidebar, .page-id-24 .breadcrumb, .page-id-24 .entry-title, ' +
            '.page-id-25 .article-header, .page-id-25 .article-footer, .page-id-25 .sidebar, .page-id-25 .breadcrumb, .page-id-25 .entry-title, ' +
            '.page-id-27 .article-header, .page-id-27 .article-footer, .page-id-27 .sidebar, .page-id-27 .breadcrumb, .page-id-27 .entry-title, ' +
            '.page-id-29 .article-header, .page-id-29 .article-footer, .page-id-29 .sidebar, .page-id-29 .breadcrumb, .page-id-29 .entry-title, ' +
            '.page-id-31 .article-header, .page-id-31 .article-footer, .page-id-31 .sidebar, .page-id-31 .breadcrumb, .page-id-31 .entry-title, ' +
            '.page-id-32 .article-header, .page-id-32 .article-footer, .page-id-32 .sidebar, .page-id-32 .breadcrumb, .page-id-32 .entry-title, ' +
            '.page-id-35 .article-header, .page-id-35 .article-footer, .page-id-35 .sidebar, .page-id-35 .breadcrumb, .page-id-35 .entry-title, ' +
            '.page-id-36 .article-header, .page-id-36 .article-footer, .page-id-36 .sidebar, .page-id-36 .breadcrumb, .page-id-36 .entry-title, ' +
            '.sns-share, .sns-follow, .author-info, .copy-info, .toc, .post-meta, .footer-meta, .footer-bottom-logo, .sns-copy-message, .tagcloud, .widget_recent_entries, .widget_recent_comments, .widget_archive, .widget_categories, .widget_search, .widget_text, .widget_media_gallery, .widget_media_image { display: none !important; }' +
            '/* Full Width Layout for Major Pages */' +
            '.page-id-18 #main, .page-id-24 #main, .page-id-25 #main, .page-id-27 #main, .page-id-29 #main, .page-id-31 #main, .page-id-32 #main, .page-id-35 #main, .page-id-36 #main { width: 100% !important; max-width: 100% !important; padding: 0 !important; margin: 0 !important; }' +
            '.container { max-width: none !important; width: 100% !important; padding: 0 !important; }' +
            '#content { margin-top: 0 !important; }' +
            '/* Premium UI Elements */' +
            '.btn-mirii-pink { background: var(--mirii-pink-dark) !important; color: #fff !important; border-radius: 50px !important; padding: 18px 45px !important; font-weight: bold; text-decoration: none; display: inline-block; text-align: center; box-shadow: 0 4px 15px rgba(216, 174, 183, 0.3); transition: all 0.3s; border: none !important; }' +
            '.btn-mirii-pink:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(216, 174, 183, 0.4); opacity: 0.9; }' +
            '.btn-mirii-green { background: var(--mirii-green) !important; color: #fff !important; border-radius: 50px !important; padding: 18px 45px !important; font-weight: bold; text-decoration: none; display: inline-block; text-align: center; box-shadow: 0 4px 15px rgba(127, 174, 155, 0.3); transition: all 0.3s; border: none !important; }' +
            '.btn-mirii-outline { background: #fff !important; color: var(--mirii-text) !important; border: 1px solid var(--mirii-border) !important; border-radius: 50px !important; padding: 16px 43px !important; font-weight: bold; text-decoration: none; display: inline-block; text-align: center; transition: all 0.3s; }' +
            '.badge-mirii { background: var(--mirii-pink-soft) !important; color: var(--mirii-pink-dark) !important; padding: 8px 20px; border-radius: 30px; font-size: 0.9rem; font-weight: bold; margin: 6px; display: inline-block; }' +
            '.section-bg-pink { background: var(--mirii-bg-pink) !important; }' +
            '.section-bg-beige { background: var(--mirii-bg-beige) !important; }' +
            '.brand-section { padding: 100px 20px; }' +
            '.brand-title { margin-bottom: 50px; line-height: 1.6; font-size: 2.2rem; }' +
            'h2::before, h3::before, .entry-content h2::before, .entry-content h3::before { content: none !important; }' +
            '.brand-img { border-radius: 15px; width: 100%; height: auto; object-fit: cover; }' +
            '.entry-content { padding: 0 !important; margin: 0 !important; }';

        await page.evaluate((newCss) => {
            const editor = document.querySelector('.CodeMirror').CodeMirror;
            editor.setValue(newCss);
        }, css);

        await page.click('#save');
        console.log("Saving CSS v7...");
        await new Promise(r => setTimeout(r, 8000));

        // 2. Update Page Content
        const images = {
            fv_top: 'https://mirii-sewing.online/wp-content/uploads/2026/03/64D9D67A-4638-4A57-A15C-79560E941E9B-71066-000016B28B41CE60.jpeg',
            fv_1day: 'https://mirii-sewing.online/wp-content/uploads/2026/03/3894_724909648.jpg',
            fv_welcome: 'https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_3017_0.jpg',
            work_a: 'https://mirii-sewing.online/wp-content/uploads/2026/03/69261.jpg',
            work_b: 'https://mirii-sewing.online/wp-content/uploads/2026/03/69262.jpg',
            profile: 'https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_3017_0.jpg'
        };

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

        // HOME (18) - No Numbers
        const html_home = '<!-- wp:cover {"url":"' + images.fv_top + '","dimRatio":10,"overlayColor":"black","align":"full"} -->' +
            '<div class="wp-block-cover alignfull" style="min-height:95vh;"><span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim-10 has-background-dim"></span><img class="wp-block-cover__image-background" src="' + images.fv_top + '" data-object-fit="cover"/><div class="wp-block-cover__inner-container"><!-- wp:group {"layout":{"type":"constrained","wideSize":"1000px"}} -->' +
            '<div class="wp-block-group">' +
            '<h2 class="has-text-align-center" style="color:#fff; font-size:clamp(1.8rem, 5vw, 3.2rem); line-height:1.6; text-shadow:0 3px 10px rgba(0,0,0,0.5); margin:0;">ミシンで紡ぐ、<br>ママと子供の愛おしい時間</h2>' +
            '<div style="height:60px;"></div>' +
            '<div style="text-align:center;"><a href="/welcome/" class="btn-mirii-pink">はじめての方へ</a></div>' +
            '</div>' +
            '<!-- /wp:group --></div></div>' +
            '<!-- /wp:cover -->' +
            '<div class="brand-section">' +
            '  <div style="max-width:900px; margin:0 auto; text-align:center;">' +
            '    <h2 class="brand-title">ミシンへの「苦手意識」を<br>「私にもできる！」という自信に</h2>' +
            '    <p style="font-size:1.15rem;">mirii sewingは、初心者ママのための少人数制洋裁教室です。<br>箱の中に眠ったままのミシンを、子供のための素敵な魔法のツールに変えてみませんか？</p>' +
            '    <div style="margin-top:100px; display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:50px;">' +
            '      <div class="section-bg-beige" style="padding:55px; border-radius:20px; text-align:left;">' +
            '        <h3 style="margin-bottom:20px; font-size:1.6rem;">1Day体験レッスン</h3>' +
            '        <p>まずは3時間で体験。ミシンの基本と完成の喜びを味わえます。</p>' +
            '        <div style="height:40px;"></div>' +
            '        <a href="/1day-lesson/" class="btn-mirii-outline">詳細を見る</a>' +
            '      </div>' +
            '      <div class="section-bg-beige" style="padding:55px; border-radius:20px; text-align:left;">' +
            '        <h3 style="margin-bottom:20px; font-size:1.6rem;">公式LINEのご案内</h3>' +
            '        <p>レッスンの先行予約や、最新情報を定期的にお届けしています。</p>' +
            '        <div style="height:40px;"></div>' +
            '        <a href="https://lin.ee/xyz" class="btn-mirii-green">友だち追加する</a>' +
            '      </div>' +
            '    </div>' +
            '  </div>' +
            '</div>';

        // 1DAY (24) - No Numbers
        const html_1day = '<!-- wp:cover {"url":"' + images.fv_1day + '","dimRatio":20,"overlayColor":"black","align":"full"} -->' +
            '<div class="wp-block-cover alignfull" style="min-height:75vh;"><span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim-20 has-background-dim"></span><img class="wp-block-cover__image-background" src="' + images.fv_1day + '" data-object-fit="cover"/><div class="wp-block-cover__inner-container"><!-- wp:group {"layout":{"type":"constrained","contentSize":"850px"}} -->' +
            '<div class="wp-block-group">' +
            '<div style="text-align:center;"><span class="badge-mirii">🔰 初心者さん大歓迎</span><span class="badge-mirii">⏱️ たった3時間で完成</span><span class="badge-mirii">👜 手ぶらでOK</span></div>' +
            '<p class="has-text-align-center" style="font-size: clamp(1.2rem, 3vw, 1.8rem); color:#fff; text-shadow: 0 2px 5px rgba(0,0,0,0.4); margin-top:35px; margin-bottom:15px;">たった1回で「私にもできた」を実感できる</p>' +
            '<h1 class="has-text-align-center" style="font-size: clamp(2.5rem, 8vw, 4.5rem); color:#fff; text-shadow: 0 2px 5px rgba(0,0,0,0.4); margin:0;">1Day体験レッスン</h1>' +
            '</div>' +
            '<!-- /wp:group --></div></div>' +
            '<!-- /wp:cover -->' +
            '<div class="brand-section">' +
            '<div style="max-width:850px; margin:0 auto; text-align:center;">' +
            '<h2 class="brand-title">ミシンを買ったものの、<br>箱の中に眠っていませんか？</h2>' +
            '<p style="text-align:left; font-size:1.15rem;">「子どものために可愛い服を作りたい」と思ってミシンを用意したけれど、いざ始めようとすると不安で手が止まってしまう…。そんなお悩みを持つ初心者さんのための、最初の一歩となる体験レッスンです。裁断などの準備はすべて済ませた便利なキットをご用意しています。</p>' +
            '</div>' +
            '</div>' +
            '<div class="section-bg-pink brand-section">' +
            '<div style="max-width:850px; margin:0 auto;">' +
            '<h2 class="has-text-align-center" style="margin-bottom:70px;">体験後にどう変わるか</h2>' +
            '<div style="font-size:1.15rem; line-height:2.2;">' +
            '<p style="margin-bottom:30px; border-bottom:1px solid rgba(0,0,0,0.08); padding-bottom:15px;">✔ ミシンへの恐怖心が消え、「私にもできる！」という自信が持てるようになります。</p>' +
            '<p style="margin-bottom:30px; border-bottom:1px solid rgba(0,0,0,0.08); padding-bottom:15px;">✔ お家でミシンを出すのが、「億劫な時間」から「楽しみな時間」に変わります。</p>' +
            '<p>✔ 次に何を学べば理想の服が作れるのか、自分に合ったステップが見えるようになります。</p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="brand-section">' +
            '<div style="max-width:1100px; margin:0 auto;">' +
            '<h2 class="has-text-align-center brand-title">作れるもの</h2>' +
            '<div style="margin-top:80px; display:grid; grid-template-columns: 1fr 1fr; gap:70px;">' +
            '  <div style="text-align:left;">' +
            '    <img src="' + images.work_a + '" class="brand-img" style="aspect-ratio:1/1;"/>' +
            '    <h4 style="margin-top:35px; font-size:1.6rem;">裏地付きワンピース</h4>' +
            '    <p>初心者でも綺麗に仕上がる基礎を学びます。そのままお出かけに着ていける上品なデザインです。</p>' +
            '  </div>' +
            '  <div style="text-align:left;">' +
            '    <img src="' + images.work_b + '" class="brand-img" style="aspect-ratio:1/1;"/>' +
            '    <h4 style="margin-top:35px; font-size:1.6rem;">男の子用パンツ</h4>' +
            '    <p>裁断の手間なく、カーブの縫い方やウエストゴムの基本を学びます。活発な男の子でも動きやすい定番の形です。</p>' +
            '  </div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="section-bg-pink brand-section">' +
            '<div style="max-width:850px; margin:0 auto; text-align:center;">' +
            '<h3 style="margin-bottom:50px; font-size:2rem;">まずは、たった3時間の<br>「たしかな自信」から。</h3>' +
            '<a href="https://lin.ee/xyz" class="btn-mirii-green">公式LINEで募集案内を受け取る</a>' +
            '</div>' +
            '</div>';

        // WELCOME (25) - No Numbers
        const html_welcome = '<!-- wp:cover {"url":"' + images.fv_welcome + '","dimRatio":20,"overlayColor":"black","align":"full"} -->' +
            '<div class="wp-block-cover alignfull" style="min-height:65vh;"><span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim-20 has-background-dim"></span><img class="wp-block-cover__image-background" src="' + images.fv_welcome + '" data-object-fit="cover"/><div class="wp-block-cover__inner-container"><!-- wp:group {"layout":{"type":"constrained","contentSize":"850px"}} -->' +
            '<div class="wp-block-group">' +
            '<p class="has-text-align-center" style="font-size: clamp(1.2rem, 3vw, 1.8rem); color:#fff; text-shadow:0 2px 5px rgba(0,0,0,0.4); margin-bottom:25px;">ミシンは、ママの毎日を<br>もっと自由に、もっと楽しくする魔法。</p>' +
            '<h1 class="has-text-align-center" style="font-size: clamp(2.5rem, 8vw, 4.5rem); color:#fff; text-shadow:0 2px 5px rgba(0,0,0,0.4); margin:0;">はじめての方へ</h1>' +
            '</div>' +
            '<!-- /wp:group --></div></div>' +
            '<!-- /wp:cover -->' +
            '<div class="brand-section">' +
            '<div style="max-width:850px; margin:0 auto;">' +
            '<h2 class="brand-title">「私には無理」と思っていませんか？</h2>' +
            '<div style="font-size:1.15rem; line-height:2.2;">' +
            '<p>「子供のために何か作りたいけど、家庭科の時間は苦手だった」「ミシンの糸通しだけで挫折しそう」<br>当教室に来られる方の多くが、最初はそう仰います。SNSで見かける素敵な作品との距離を、私たちは埋めたいと考えています。</p>' +
            '<p>大丈夫です。ミシンは特別な才能が必要なツールではありません。正しい手順とコツさえ分かれば、誰でも自分の手で魔法を生み出せるようになります。</p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="section-bg-beige brand-section">' +
            '  <div style="max-width:850px; margin:0 auto;">' +
            '    <h2 class="has-text-align-center brand-title" style="margin-bottom:100px;">mirii sewing が大切にしていること</h2>' +
            '    ' +
            '    <div style="margin-bottom:80px;">' +
            '      <h3 style="border-left:6px solid var(--mirii-pink-dark); padding-left:30px; margin-bottom:30px; font-size:1.8rem;">「完成すること」より「習得すること」</h3>' +
            '      <p style="font-size:1.15rem;">理屈が分かれば、教室を出た後もお一人で応用ができるようになります。なぜそうするのか、という「裏側」を丁寧にお伝えします。</p>' +
            '    </div>' +
            '    ' +
            '    <div>' +
            '      <h3 style="border-left:6px solid var(--mirii-pink-dark); padding-left:30px; margin-bottom:30px; font-size:1.8rem;">「依存」ではなく「自立」へ</h3>' +
            '      <p style="font-size:1.15rem;">最終的には、型紙を見て自分で判断し、自由に子供服を作れるようになる。その自立した喜びこそが、洋裁の本当の楽しさです。</p>' +
            '    </div>' +
            '  </div>' +
            '</div>' +
            '<div class="section-bg-pink brand-section">' +
            '  <div style="max-width:850px; margin:0 auto; text-align:center;">' +
            '    <h3 style="margin-bottom:50px; font-size:2rem;">まずは、ここから始めてみませんか？</h3>' +
            '    <a href="/1day-lesson/" class="btn-mirii-pink">1Day体験レッスンを見る</a>' +
            '  </div>' +
            '</div>';

        // Additional Pages (27, 29, 31, 32, 35, 36)

        // 27: 教室の特徴
        const html_features = '<div class="brand-section"><div style="max-width:850px; margin:0 auto;"><h2 class="brand-title">mirii sewing の3つの特徴</h2>' +
            '<div class="section-bg-beige" style="padding:40px; border-radius:15px; margin-bottom:40px;"><h3>少人数制の丁寧なレッスン</h3><p>最大3名までの少人数制なので、一人一人のペースに合わせてきめ細かくサポートします。</p></div>' +
            '<div class="section-bg-beige" style="padding:40px; border-radius:15px; margin-bottom:40px;"><h3>ママに優しい環境</h3><p>お子様連れでも安心して通えるよう、アットホームな空間作りに努めています。急な予定変更にも柔軟に対応いたします。</p></div>' +
            '<div class="section-bg-beige" style="padding:40px; border-radius:15px;"><h3>一生モノの技術を習得</h3><p>ただ作るだけでなく、型紙の読み方や生地の選び方など、一生使える洋裁の基礎をしっかり学べます。</p></div>' +
            '</div></div>';

        // 29: 4ヶ月少人数継続コース
        const html_course = '<div class="brand-section"><div style="max-width:850px; margin:0 auto;"><h2 class="brand-title">4ヶ月少人数継続コース</h2>' +
            '<p>体験レッスンを終えた方のための、本格的に子供服作りを学ぶコースです。</p>' +
            '<h3 style="margin-top:60px;">カリキュラムの例</h3>' +
            '<ul><li>1ヶ月目：基本のトップス作り</li><li>2ヶ月目：パンツ・スカートのバリエーション</li><li>3ヶ月目：ワンピースや複雑なディテール</li><li>4ヶ月目：卒業制作・オリジナル作品</li></ul>' +
            '<div class="section-bg-pink" style="padding:40px; margin-top:60px; text-align:center;"><p>詳細は公式LINEよりお問い合わせください。</p><a href="https://lin.ee/xyz" class="btn-mirii-green">LINEで相談する</a></div>' +
            '</div></div>';

        // 31: 講師プロフィール
        const html_profile = '<div class="brand-section"><div style="max-width:850px; margin:0 auto; text-align:center;">' +
            '<img src="' + images.profile + '" class="brand-img" style="width:250px; height:250px; border-radius:50%; margin-bottom:40px;"/>' +
            '<h2 class="brand-title">講師プロフィール</h2>' +
            '<div style="text-align:left; font-size:1.1rem;"><p>洋裁歴15年。二人の子供の母。子供が産まれたのを機に子供服作りを始め、その楽しさを多くのママに伝えたいという想いで2020年に教室をオープンしました。</p>' +
            '<p>「ミシンは難しくない、楽しいもの」ということをモットーに、日々レッスンを行っています。</p></div>' +
            '</div></div>';

        // 32: 生徒さんの声
        const html_voice = '<div class="brand-section"><div style="max-width:850px; margin:0 auto;"><h2 class="brand-title">生徒さんの声</h2>' +
            '<div style="display:grid; gap:40px;">' +
            '<div class="section-bg-beige" style="padding:40px; border-radius:15px;">' +
            '<p>「家庭科以来のミシンでしたが、3時間で可愛い服が完成して感動しました！」（Aさん・2才児のママ）</p></div>' +
            '<div class="section-bg-beige" style="padding:40px; border-radius:15px;">' +
            '<p>「少人数なので質問しやすく、自己流では分からなかったコツが学べました。」（Bさん・5才児のママ）</p></div>' +
            '</div></div></div>';

        // 35: よくある質問
        const html_faq = '<div class="brand-section"><div style="max-width:850px; margin:0 auto;"><h2 class="brand-title">よくある質問</h2>' +
            '<div style="display:grid; gap:30px;">' +
            '<div><strong>Q. 全くの初心者ですが、大丈夫ですか？</strong><p>A. はい、大歓迎です。糸の通し方から丁寧にお教えしますのでご安心ください。</p></div>' +
            '<div><strong>Q. 持ち物はありますか？</strong><p>A. 基本的に手ぶらでOKです。使い慣れた道具があればお持ち込みも可能です。</p></div>' +
            '<div><strong>Q. 子供連れでも参加できますか？</strong><p>A. はい、可能です。事前にお知らせいただければ、遊びスペースなどの準備をいたします。</p></div>' +
            '</div></div></div>';

        // 36: お問い合わせ
        const html_contact = '<div class="brand-section"><div style="max-width:850px; margin:0 auto; text-align:center;">' +
            '<h2 class="brand-title">お問い合わせ</h2>' +
            '<p>レッスンのご予約やご質問は、公式LINEにて24時間受け付けております。</p>' +
            '<div style="margin:60px 0;"><a href="https://lin.ee/xyz" class="btn-mirii-green">公式LINEはこちら</a></div>' +
            '<p>※3日以内に返信がない場合は、お手数ですが再度ご連絡ください。</p>' +
            '</div></div>';

        // Update all
        await updatePage(18, html_home);
        await updatePage(24, html_1day);
        await updatePage(25, html_welcome);
        await updatePage(27, html_features);
        await updatePage(29, html_course);
        await updatePage(31, html_profile);
        await updatePage(32, html_voice);
        await updatePage(35, html_faq);
        await updatePage(36, html_contact);

        console.log("All pages updated.");

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
        process.exit(0);
    }
})();
