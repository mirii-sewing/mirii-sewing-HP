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
            fv_welcome: 'https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_3017_0.jpg',
            work_a: 'https://mirii-sewing.online/wp-content/uploads/2026/03/69261.jpg',
            work_b: 'https://mirii-sewing.online/wp-content/uploads/2026/03/69262.jpg',
            profile: 'https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_3017_0.jpg'
        };

        // 1. HOME (18) - Goal: Discovery & 1Day
        const html_home = '<!-- wp:cover {"url":"' + images.fv_top + '","dimRatio":10,"overlayColor":"black","align":"full"} -->' +
            '<div class="wp-block-cover alignfull" style="min-height:90vh;"><span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim-10 has-background-dim"></span><img class="wp-block-cover__image-background" src="' + images.fv_top + '" data-object-fit="cover"/><div class="wp-block-cover__inner-container"><!-- wp:group {"layout":{"type":"constrained","wideSize":"1000px"}} -->' +
            '<div class="wp-block-group">' +
            '<h2 class="has-text-align-center" style="color:#fff; font-size:clamp(1.6rem, 5vw, 2.8rem); line-height:1.6; text-shadow:0 3px 10px rgba(0,0,0,0.5); margin:0; font-weight:normal;">子どものお洋服を、<br>お家で手作りできるようになりたいママへ</h2>' +
            '<div style="height:50px;"></div>' +
            '<div style="text-align:center;"><a href="/welcome/" class="btn-mirii-primary">はじめての方へ</a></div>' +
            '</div>' +
            '<!-- /wp:group --></div></div>' +
            '<!-- /wp:cover -->' +
            '<div class="brand-section">' +
            '  <div style="max-width:900px; margin:0 auto; text-align:center;">' +
            '    <h2 class="brand-title">ミシンの出し入れが「億劫」から<br>「楽しみ」に変わる場所</h2>' +
            '    <p style="font-size:1.1rem; color:#666;">mirii sewingは、初心者ママのための少人数制洋裁教室です。<br>「不器用だから」「ミシンを持っていないから」と諦めていた方も、<br>たった数時間で、お子さんへの素敵なプレゼントが作れるようになります。</p>' +
            '    <div style="margin-top:80px; display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:40px;">' +
            '      <div class="section-bg-beige" style="padding:50px; border-radius:15px; text-align:left;">' +
            '        <h3 style="margin-bottom:15px; font-size:1.5rem;">まずは体験レッスンから</h3>' +
            '        <p style="font-size:0.95rem;">3時間で完成する達成感を。材料もミシンもすべて教室に揃っています。</p>' +
            '        <div style="height:35px;"></div>' +
            '        <a href="/1day-lesson/" class="btn-mirii-primary" style="padding:15px 35px; font-size:1rem;">体験レッスンの詳細</a>' +
            '      </div>' +
            '      <div class="section-bg-beige" style="padding:50px; border-radius:15px; text-align:left;">' +
            '        <h3 style="margin-bottom:15px; font-size:1.5rem;">公式LINEで最新情報を</h3>' +
            '        <p style="font-size:0.95rem;">レッスンの空き状況や、募集開始のタイミングを一番早くお届けします。</p>' +
            '        <div style="height:35px;"></div>' +
            '        <a href="https://lin.ee/xyz" class="btn-mirii-secondary" style="padding:15px 35px; font-size:1rem;">LINEで先行予約する</a>' +
            '      </div>' +
            '    </div>' +
            '  </div>' +
            '</div>';

        // 2. 1DAY (24) - Goal: Application (LINE)
        const html_1day = '<!-- wp:cover {"url":"' + images.fv_1day + '","dimRatio":20,"overlayColor":"black","align":"full"} -->' +
            '<div class="wp-block-cover alignfull" style="min-height:70vh;"><span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim-20 has-background-dim"></span><img class="wp-block-cover__image-background" src="' + images.fv_1day + '" data-object-fit="cover"/><div class="wp-block-cover__inner-container"><!-- wp:group {"layout":{"type":"constrained","contentSize":"850px"}} -->' +
            '<div class="wp-block-group">' +
            '<div style="text-align:center;"><span class="badge-mirii">🔰 裁断済みのキットをご用意</span><span class="badge-mirii">⏱️ たった3時間で完成</span><span class="badge-mirii">👜 手ぶらで参加OK</span></div>' +
            '<p class="has-text-align-center" style="font-size: 1.2rem; color:#fff; text-shadow: 0 2px 5px rgba(0,0,0,0.4); margin-top:30px; margin-bottom:10px;">準備はすべてお任せください。</p>' +
            '<h1 class="has-text-align-center" style="font-size: clamp(2.2rem, 6vw, 3.8rem); color:#fff; text-shadow: 0 2px 5px rgba(0,0,0,0.4); margin:0;">1Day体験レッスン</h1>' +
            '</div>' +
            '<!-- /wp:group --></div></div>' +
            '<!-- /wp:cover -->' +
            '<div class="brand-section">' +
            '<div style="max-width:850px; margin:0 auto; text-align:center;">' +
            '<h2 class="brand-title">「自分には無理かも」と思って<br>箱の中に眠らせているミシンはありませんか？</h2>' +
            '<p style="text-align:left; font-size:1.1rem;">お洋服を作ってあげたいけれど、どこから手をつけていいか分からない。そんな初心者ママさんのために、裁断や印付けといった「一番大変な準備」を済ませたキットをご用意しました。当日はミシンを楽しむことだけに集中していただけます。</p>' +
            '</div>' +
            '</div>' +
            '<div class="section-bg-pink brand-section">' +
            '<div style="max-width:850px; margin:0 auto;">' +
            '<h2 class="has-text-align-center" style="margin-bottom:60px;">レッスンが終わる頃には、<br>こんな気持ちに変わっています</h2>' +
            '<div style="font-size:1.1rem; line-height:2.2;">' +
            '<p style="margin-bottom:25px; border-bottom:1px solid rgba(0,0,0,0.06); padding-bottom:15px;">✔ ミシンへの「怖い」という気持ちが消え、自信に変わります。</p>' +
            '<p style="margin-bottom:25px; border-bottom:1px solid rgba(0,0,0,0.06); padding-bottom:15px;">✔ 次はこの布でこれを作ろう！と、ワクワクしながら手芸店に行きたくなります。</p>' +
            '<p>✔ お家で眠っていたミシンが、大切な家族との思い出を紡ぐ道具に変わります。</p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="brand-section">' +
            '<div style="max-width:1000px; margin:0 auto;">' +
            '<h2 class="has-text-align-center brand-title">体験で作れるもの</h2>' +
            '<div style="margin-top:60px; display:grid; grid-template-columns: 1fr 1fr; gap:60px;">' +
            '  <div style="text-align:left;">' +
            '    <img src="' + images.work_a + '" class="brand-img img-square"/>' +
            '    <h4 style="margin-top:25px; font-size:1.4rem;">裏地付きワンピース</h4>' +
            '    <p style="font-size:0.95rem;">基本の直線縫いで、上品な仕上がりに。裁断済みなので、すぐに縫い始められます。</p>' +
            '  </div>' +
            '  <div style="text-align:left;">' +
            '    <img src="' + images.work_b + '" class="brand-img img-square"/>' +
            '    <h4 style="margin-top:25px; font-size:1.4rem;">男の子用パンツ</h4>' +
            '    <p style="font-size:0.95rem;">カーブの縫い方やウエストゴムの入れ方を学びます。飽きのこないシンプルな形です。</p>' +
            '  </div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="section-bg-beige brand-section">' +
            '<div style="max-width:850px; margin:0 auto; text-align:center;">' +
            '<h3 style="margin-bottom:40px; font-size:1.8rem;">空き状況の確認・お申し込みは<br>公式LINEより承っています</h3>' +
            '<p style="margin-bottom:40px;">レッスンの最新スケジュールをご覧いただけます。お気軽にご登録ください。</p>' +
            '<a href="https://lin.ee/xyz" class="btn-mirii-secondary">公式LINEでスケジュールを確認</a>' +
            '</div>' +
            '</div>';

        // 3. WELCOME (25) - Goal: 1Day Lesson
        const html_welcome = '<!-- wp:cover {"url":"' + images.fv_welcome + '","dimRatio":20,"overlayColor":"black","align":"full"} -->' +
            '<div class="wp-block-cover alignfull" style="min-height:60vh;"><span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim-20 has-background-dim"></span><img class="wp-block-cover__image-background" src="' + images.fv_welcome + '" data-object-fit="cover"/><div class="wp-block-cover__inner-container"><!-- wp:group {"layout":{"type":"constrained","contentSize":"850px"}} -->' +
            '<div class="wp-block-group">' +
            '<p class="has-text-align-center" style="font-size: 1.1rem; color:#fff; text-shadow:0 2px 5px rgba(0,0,0,0.4); margin-bottom:20px;">ミシンは、ママの毎日を<br>もっと豊かなものにする魔法のツール。</p>' +
            '<h1 class="has-text-align-center" style="font-size: clamp(2rem, 6vw, 3.5rem); color:#fff; text-shadow:0 2px 5px rgba(0,0,0,0.4); margin:0;">はじめての方へ</h1>' +
            '</div>' +
            '<!-- /wp:group --></div></div>' +
            '<!-- /wp:cover -->' +
            '<div class="brand-section">' +
            '<div style="max-width:800px; margin:0 auto;">' +
            '<h2 class="brand-title">「家庭科が苦手だったから無理」<br>そう思っていませんか？</h2>' +
            '<div style="font-size:1.1rem; line-height:2.2;">' +
            '<p>当教室に来られるママさんの多くが「学生の頃はミシンが大嫌いだった」と仰います。でも、子どもの笑顔を想像しながら作るお洋服は、学校の課題とは全く別物です。</p>' +
            '<p>特別な才能は必要ありません。正しい手順と、ちょっとしたコツ。それだけで、誰でも自分の手で魔法を生み出せるようになります。私たちは、その最初の一歩を一緒にお手伝いします。</p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="section-bg-beige brand-section">' +
            '  <div style="max-width:800px; margin:0 auto;">' +
            '    <h2 class="has-text-align-center brand-title" style="margin-bottom:80px;">私たちが大切にしていること</h2>' +
            '    ' +
            '    <div style="margin-bottom:70px;">' +
            '      <h3 style="border-left:5px solid var(--mirii-pink-dark); padding-left:25px; margin-bottom:25px; font-size:1.6rem;">「完成」だけでなく「作り方」を学ぶ</h3>' +
            '      <p style="font-size:1.05rem;">ただ出来上がって終わりではなく、お家に帰ってもお一人で形にできるような、一生ものの技術をお伝えしています。</p>' +
            '    </div>' +
            '    ' +
            '    <div>' +
            '      <h3 style="border-left:5px solid var(--mirii-pink-dark); padding-left:25px; margin-bottom:25px; font-size:1.6rem;">自分に自信を持つための洋裁</h3>' +
            '      <p style="font-size:1.05rem;">「私にもできた」という喜びは、育児中のママにとって大きな活力になります。完成した瞬間の笑顔、それが私たちの最高の喜びです。</p>' +
            '    </div>' +
            '  </div>' +
            '</div>' +
            '<div class="section-bg-pink brand-section">' +
            '  <div style="max-width:800px; margin:0 auto; text-align:center;">' +
            '    <h3 style="margin-bottom:40px; font-size:1.8rem;">まずは3時間の体験から、<br>始めてみませんか？</h3>' +
            '    <a href="/1day-lesson/" class="btn-mirii-primary">体験レッスンの詳細はこちら</a>' +
            '  </div>' +
            '</div>';

        // Additional update for COURSE (29) - Goal: LINE Consultation
        const html_course = '<div class="brand-section"><div style="max-width:850px; margin:0 auto;"><h2 class="brand-title">4ヶ月少人数継続コース</h2>' +
            '<p style="font-size:1.1rem;">体験レッスンを終えて、「もっと本格的に学びたい」「プロのような仕上がりを目指したい」という方のための継続コースです。</p>' +
            '<div style="margin-top:60px;"><h3>レッスンのポイント</h3>' +
            '<p>・型紙の補正方法や、生地選びの知識を深めます。<br>・同じ志を持つママさん仲間との時間も楽しめます。<br>・全8回のレッスンを通じて、お好みの子供服を数点完成させます。</p></div>' +
            '<div class="section-bg-beige" style="padding:50px; margin-top:60px; text-align:center; border-radius:15px;">' +
            '<h3 style="margin-bottom:30px;">自分だけの特別な子供服を。</h3>' +
            '<p style="margin-bottom:30px;">募集は公式LINEにて定期的にお知らせしています。<br>コースに関するご質問もこちらから承ります。</p>' +
            '<a href="https://lin.ee/xyz" class="btn-mirii-secondary">公式LINEで個別に相談する</a>' +
            '</div></div></div>';

        // Update pages
        await updatePage(18, html_home);
        await updatePage(24, html_1day);
        await updatePage(25, html_welcome);
        await updatePage(29, html_course);

        // Simple update for others to ensure consistency
        await updatePage(27, '<div class="brand-section"><div style="max-width:850px; margin:0 auto;"><h2 class="brand-title">mirii sewing の3つの特徴</h2>' +
            '<div class="section-bg-beige" style="padding:45px; border-radius:12px; margin-bottom:35px;"><h3>最大3名の少人数制</h3><p>講師が一人一人の手元をしっかり見守れる人数に限定しています。</p></div>' +
            '<div class="section-bg-beige" style="padding:45px; border-radius:12px; margin-bottom:35px;"><h3>ママに寄り添うお休み制度</h3><p>お子様の急な発熱などによるお休みも、振替レッスンで対応可能です。</p></div>' +
            '<div class="section-bg-beige" style="padding:45px; border-radius:12px;"><h3>道具の揃った快適な空間</h3><p>手芸屋さんのような豊富な糸やボタン、プロ仕様のアイロンをご用意しています。</p></div>' +
            '<div style="text-align:center; margin-top:60px;"><a href="/1day-lesson/" class="btn-mirii-primary">まずは体験レッスンへ</a></div>' +
            '</div></div>');

        await updatePage(31, '<div class="brand-section"><div style="max-width:850px; margin:0 auto; text-align:center;">' +
            '<img src="' + images.profile + '" class="brand-img img-square" style="width:220px; border-radius:50%; margin-bottom:40px;"/>' +
            '<h2 class="brand-title">講師プロフィール</h2>' +
            '<div style="text-align:left; font-size:1.05rem; line-height:2.0; background:#fff; padding:40px; border-radius:15px; border:1px solid var(--mirii-border);"><p>洋裁歴15年。二男の母。2020年に「mirii sewing」をオープン。</p>' +
            '<p>ミシンが苦手だった私だからこそ伝えられる「カンタンで綺麗に仕上がるコツ」が好評で、延べ300名以上のママさんにレッスンを行ってきました。皆さんの「作りたい！」という気持ちを大切に、全力でサポートします。</p></div>' +
            '<div style="margin-top:60px;"><a href="/welcome/" class="btn-mirii-tertiary">教室の想いをもっと詳しく</a></div>' +
            '</div></div>');

        await updatePage(32, '<div class="brand-section"><div style="max-width:850px; margin:0 auto;"><h2 class="brand-title">生徒さんの声</h2>' +
            '<div style="display:grid; gap:35px;">' +
            '<div class="section-bg-pink" style="padding:40px; border-radius:15px;">' +
            '<p style="font-size:1.05rem;">「ミシンを触るのも怖かったですが、丁寧に教えていただき、最後は自分の手で出来上がった服を見て涙が出ました。」（1歳児のママ）</p></div>' +
            '<div class="section-bg-pink" style="padding:40px; border-radius:15px;">' +
            '<p style="font-size:1.05rem;">「裁断の手間がないのが本当に助かります。3時間の集中タイムが、毎月の楽しみになっています。」（3歳・5歳児のママ）</p></div>' +
            '</div>' +
            '<div style="text-align:center; margin-top:80px;"><a href="/1day-lesson/" class="btn-mirii-primary">体験レッスンの詳細を見る</a></div>' +
            '</div></div>');

        console.log("Final Polish Complete.");

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
        process.exit(0);
    }
})();
