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

        const images = {
            fv_top: 'https://mirii-sewing.online/wp-content/uploads/2026/03/64D9D67A-4638-4A57-A15C-79560E941E9B-71066-000016B28B41CE60.jpeg',
            fv_1day: 'https://mirii-sewing.online/wp-content/uploads/2026/03/3894_724909648.jpg',
            fv_welcome: 'https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_3017_0.jpg',
            work_a: 'https://mirii-sewing.online/wp-content/uploads/2026/03/69261.jpg',
            work_b: 'https://mirii-sewing.online/wp-content/uploads/2026/03/69262.jpg'
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

        const html_home = '<!-- wp:cover {"url":"' + images.fv_top + '","dimRatio":10,"overlayColor":"black","align":"full"} -->' +
            '<div class="wp-block-cover alignfull" style="min-height:92vh;"><span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim-10 has-background-dim"></span><img class="wp-block-cover__image-background" src="' + images.fv_top + '" data-object-fit="cover"/><div class="wp-block-cover__inner-container"><!-- wp:group {"layout":{"type":"constrained","wideSize":"1000px"}} -->' +
            '<div class="wp-block-group">' +
            '<h2 class="has-text-align-center font-mincho" style="color:#fff; font-size:clamp(1.5rem, 5vw, 2.8rem); line-height:1.6; text-shadow:0 3px 6px rgba(0,0,0,0.4); margin:0;">ミシンで紡ぐ、<br>ママと子供の愛おしい時間</h2>' +
            '<div style="height:60px;"></div>' +
            '<div style="text-align:center;"><a href="/welcome/" class="btn-mirii-pink">はじめての方へ</a></div>' +
            '</div>' +
            '<!-- /wp:group --></div></div>' +
            '<!-- /wp:cover -->' +
            '<div style="height:120px;"></div>' +
            '<div style="max-width:900px; margin:0 auto; padding:0 20px;">' +
            '  <h2 class="has-text-align-center font-mincho" style="margin-bottom:60px; line-height:1.5;">ミシンへの「苦手意識」を<br>「私にもできる！」という自信に</h2>' +
            '  <p>mirii sewingは、初心者ママのための少人数制洋裁教室です。箱の中に眠ったままのミシンを、子供のための素敵な魔法のツールに変えてみませんか？</p>' +
            '  <div style="margin-top:80px; display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:40px;">' +
            '    <div class="section-bg-beige" style="padding:40px;">' +
            '      <h3 class="font-mincho" style="margin-bottom:20px;">1Day体験レッスン</h3>' +
            '      <p>まずは3時間で体験。ミシンの基本と完成の喜びを味わえます。</p>' +
            '      <div style="margin-top:20px;"><a href="/1day-lesson/" class="btn-mirii-outline">詳細を見る</a></div>' +
            '    </div>' +
            '    <div class="section-bg-beige" style="padding:40px;">' +
            '      <h3 class="font-mincho" style="margin-bottom:20px;">公式LINEのご案内</h3>' +
            '      <p>レッスンの先行予約や、最新情報を定期的にお届けしています。</p>' +
            '      <div style="margin-top:20px;"><a href="https://lin.ee/xyz" class="btn-mirii-green">友だち追加する</a></div>' +
            '    </div>' +
            '  </div>' +
            '</div>' +
            '<div style="height:150px;"></div>';

        const html_1day = '<!-- wp:cover {"url":"' + images.fv_1day + '","dimRatio":20,"overlayColor":"black","align":"full"} -->' +
            '<div class="wp-block-cover alignfull" style="min-height:65vh;"><span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim-20 has-background-dim"></span><img class="wp-block-cover__image-background" src="' + images.fv_1day + '" data-object-fit="cover"/><div class="wp-block-cover__inner-container"><!-- wp:group {"layout":{"type":"constrained","contentSize":"800px"}} -->' +
            '<div class="wp-block-group"><!-- wp:group {"layout":{"type":"flex","flexWrap":"wrap","justifyContent":"center"}} -->' +
            '<div class="wp-block-group"><span class="badge-mirii">🔰 初心者さん大歓迎</span><span class="badge-mirii">⏱️ たった3時間で完成</span><span class="badge-mirii">👜 手ぶらでOK</span></div>' +
            '<!-- /wp:group -->' +
            '<p class="has-text-align-center font-mincho" style="font-size: clamp(1.2rem, 3vw, 1.8rem); color:#fff; text-shadow: 0 2px 4px rgba(0,0,0,0.3); margin-top:25px; margin-bottom:10px;">たった1回で「私にもできた」を実感できる</p>' +
            '<h1 class="has-text-align-center font-mincho" style="font-size: clamp(2.2rem, 8vw, 4.0rem); color:#fff; text-shadow: 0 2px 4px rgba(0,0,0,0.3); margin:0;">1Day体験レッスン</h1>' +
            '</div>' +
            '<!-- /wp:group --></div></div>' +
            '<!-- /wp:cover -->' +
            '<div style="height:100px;"></div>' +
            '<div style="max-width:800px; margin:0 auto; padding:0 20px;">' +
            '<h2 class="has-text-align-center font-mincho" style="line-height:1.6;">ミシンを買ったものの、<br>箱の中に眠っていませんか？</h2>' +
            '<p style="margin-top:40px;">「子どものために可愛い服を作りたい」と思ってミシンを用意したけれど、いざ始めようとすると不安で手が止まってしまう…。そんなお悩みを持つ初心者さんのための、最初の一歩となる体験レッスンです。裁断などの準備はすべて済ませた便利なキットをご用意しています。</p>' +
            '</div>' +
            '<div style="height:100px;"></div>' +
            '<div class="section-bg-pink" style="padding:100px 40px; max-width:1000px; margin:0 auto;">' +
            '<h2 class="has-text-align-center font-mincho">体験後にどう変わるか</h2>' +
            '<div style="max-width:600px; margin: 40px auto 0;">' +
            '<p style="margin-bottom:20px; border-bottom:1px solid #eee; padding-bottom:10px;">✔ ミシンへの恐怖心が消え、「私にもできる！」という自信が持てるようになります。</p>' +
            '<p style="margin-bottom:20px; border-bottom:1px solid #eee; padding-bottom:10px;">✔ お家でミシンを出すのが、「億劫な時間」から「楽しみな時間」に変わります。</p>' +
            '<p>✔ 次に何を学れば理想の服が作れるのか、自分に合ったステップが見えるようになります。</p>' +
            '</div>' +
            '</div>' +
            '<div style="height:100px;"></div>' +
            '<div style="max-width:1000px; margin:0 auto; padding:0 20px;">' +
            '<h2 class="has-text-align-center font-mincho">作れるもの</h2>' +
            '<div style="margin-top:60px; display:grid; grid-template-columns: 1fr 1fr; gap:40px;">' +
            '  <div style="text-align:left;">' +
            '    <img src="' + images.work_a + '" style="width:100%; border-radius:12px; aspect-ratio:1/1; object-fit:cover;"/>' +
            '    <h4 class="font-mincho" style="margin-top:20px; font-size:1.3rem;">A. 裏地付きワンピース</h4><p>初心者でも綺麗に仕上がる基礎を学びます。そのままお出かけに着ていける上品なデザインです。</p>' +
            '  </div>' +
            '  <div style="text-align:left;">' +
            '    <img src="' + images.work_b + '" style="width:100%; border-radius:12px; aspect-ratio:1/1; object-fit:cover;"/>' +
            '    <h4 class="font-mincho" style="margin-top:20px; font-size:1.3rem;">B. 男の子用パンツ</h4><p>カーブの縫い方やウエストゴムの基本を学びます。活発な男の子でも動きやすい定番の形です。</p>' +
            '  </div>' +
            '</div>' +
            '</div>' +
            '<div style="height:120px;"></div>' +
            '<div class="section-bg-pink" style="padding:80px 40px; text-align:center; max-width:800px; margin:0 auto;">' +
            '<h3 class="font-mincho" style="margin-bottom:30px;">まずは、たった3時間の<br>「たしかな自信」から。</h3>' +
            '<a href="https://lin.ee/xyz" class="btn-mirii-green">公式LINEで募集案内を受け取る</a>' +
            '</div>' +
            '<div style="height:150px;"></div>';

        const html_welcome = '<!-- wp:cover {"url":"' + images.fv_welcome + '","dimRatio":20,"overlayColor":"black","align":"full"} -->' +
            '<div class="wp-block-cover alignfull" style="min-height:55vh;"><span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim-20 has-background-dim"></span><img class="wp-block-cover__image-background" src="' + images.fv_welcome + '" data-object-fit="cover"/><div class="wp-block-cover__inner-container"><!-- wp:group {"layout":{"type":"constrained","contentSize":"800px"}} -->' +
            '<div class="wp-block-group">' +
            '<p class="has-text-align-center font-mincho" style="font-size: clamp(1.2rem, 3vw, 1.8rem); color:#fff; text-shadow:0 2px 4px rgba(0,0,0,0.3); margin-bottom:15px;">ミシンは、ママの毎日を<br>もっと自由に、もっと楽しくする魔法。</p>' +
            '<h1 class="has-text-align-center font-mincho" style="font-size: clamp(2.5rem, 8vw, 4.0rem); color:#fff; text-shadow:0 2px 4px rgba(0,0,0,0.3); margin:0;">はじめての方へ</h1>' +
            '</div>' +
            '<!-- /wp:group --></div></div>' +
            '<!-- /wp:cover -->' +
            '<div style="height:100px;"></div>' +
            '<div style="max-width:800px; margin:0 auto; padding:0 20px;">' +
            '<h2 class="font-mincho">「私には無理」と思っていませんか？</h2>' +
            '<p style="margin-top:40px;">「子供のために何か作りたいけど、家庭科の時間は苦手だった」「ミシンの糸通しだけで挫折しそう」<br>当教室に来られる方の多くが、最初はそう仰います。SNSで見かける素敵な作品との距離を、私たちは埋めたいと考えています。</p>' +
            '<p>大丈夫です。ミシンは特別な才能が必要なツールではありません。正しい手順とコツさえ分かれば、誰でも自分の手で魔法を生み出せるようになります。</p>' +
            '</div>' +
            '<div style="height:120px;"></div>' +
            '<div class="section-bg-beige" style="padding:100px 40px;">' +
            '  <div style="max-width:800px; margin:0 auto;">' +
            '    <h2 class="has-text-align-center font-mincho" style="margin-bottom:60px;">mirii sewing が大切にしていること</h2>' +
            '    <h3 class="font-mincho" style="border-left:4px solid var(--mirii-pink-dark); padding-left:20px; margin-bottom:20px; font-size:1.4rem;">1. 「完成すること」より「習得すること」</h3>' +
            '    <p style="margin-bottom:40px;">理屈が分かれば、教室を出た後もお一人で応用ができるようになります。なぜそうするのか、という「裏側」を丁寧にお伝えします。</p>' +
            '    <h3 class="font-mincho" style="border-left:4px solid var(--mirii-pink-dark); padding-left:20px; margin-bottom:20px; font-size:1.4rem;">2. 「依存」ではなく「自立」へ</h3>' +
            '    <p>最終的には、型紙を見て自分で判断し、自由に子供服を作れるようになる。その自立した喜びこそが、洋裁の本当の楽しさです。</p>' +
            '  </div>' +
            '</div>' +
            '<div style="height:120px;"></div>' +
            '<div class="section-bg-pink" style="padding:80px 40px; text-align:center; max-width:800px; margin:0 auto;">' +
            '  <h3 class="font-mincho" style="margin-bottom:30px;">まずは、ここから始めてみませんか？</h3>' +
            '  <div style="margin-top:20px;"><a href="/1day-lesson/" class="btn-mirii-pink">1Day体験レッスンを見る</a></div>' +
            '</div>' +
            '<div style="height:150px;"></div>';

        await updatePage(18, html_home);
        await updatePage(24, html_1day);
        await updatePage(25, html_welcome);

        console.log("Cleanup complete.");

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
        process.exit(0);
    }
})();
