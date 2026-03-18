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
            const result = await page.evaluate(async (pid, content) => {
                const nonce = window.wpApiSettings.nonce;
                const resp = await fetch(window.wpApiSettings.root + 'wp/v2/pages/' + pid, {
                    method: 'POST',
                    headers: { 'X-WP-Nonce': nonce, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content: content })
                });
                return { status: resp.status, ok: resp.ok };
            }, id, html);
            console.log("Page ID " + id + " update result:", JSON.stringify(result));
        };

        const images = {
            fv_top: 'https://mirii-sewing.online/wp-content/uploads/2026/03/64D9D67A-4638-4A57-A15C-79560E941E9B-71066-000016B28B41CE60.jpeg',
            fv_1day: 'https://mirii-sewing.online/wp-content/uploads/2026/03/3894_724909648.jpg',
            fv_welcome: 'https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_3017_0.jpg',
            work_a: 'https://mirii-sewing.online/wp-content/uploads/2026/03/69261.jpg',
            work_b: 'https://mirii-sewing.online/wp-content/uploads/2026/03/69262.jpg'
        };

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
            '<p>✔ 次に何を学れば理想の服が作れるのか、自分に合ったステップが見えるようになります。</p>' +
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
            '    <p>カーブの縫い方やウエストゴムの基本を学びます。活発な男の子でも動きやすい定番の形です。</p>' +
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

        await updatePage(18, html_home);
        await updatePage(24, html_1day);
        await updatePage(25, html_welcome);

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
        process.exit(0);
    }
})();
