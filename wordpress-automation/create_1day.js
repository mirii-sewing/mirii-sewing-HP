const puppeteer = require('puppeteer');

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

        const result = await page.evaluate(async () => {
            const nonce = window.wpApiSettings ? window.wpApiSettings.nonce : null;
            if (!nonce) return { error: 'No nonce' };

            const content = `
<!-- wp:cover {"dimRatio":40,"overlayColor":"pale-pink","isDark":false,"align":"full","className":"first-view-cover"} -->
<div class="wp-block-cover alignfull is-light first-view-cover" style="min-height:50vh">
<span aria-hidden="true" class="wp-block-cover__background has-pale-pink-background-color has-background-dim-40 has-background-dim"></span>
<div class="wp-block-cover__inner-container">
<!-- wp:group {"layout":{"type":"constrained","wideSize":"800px","contentSize":"800px"}} -->
<div class="wp-block-group">
<!-- wp:paragraph {"align":"center","className":"font-mincho"} -->
<p class="has-text-align-center font-mincho" style="font-size: clamp(1.2rem, 3vw, 2.0rem); font-weight: bold; line-height: 1.5; margin-bottom: 20px;">たった1回でも「私にもできた」が実感できる</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"textAlign":"center","level":1,"className":"font-mincho"} -->
<h1 class="wp-block-heading has-text-align-center font-mincho" style="font-size: clamp(1.8rem, 5vw, 3.0rem); margin-top:0; margin-bottom: 20px;">1Day体験レッスン</h1>
<!-- /wp:heading -->
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
<h2 class="wp-block-heading has-text-align-center font-mincho">ミシンを買ったものの、<br>箱の中に眠っていませんか？</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"left"} -->
<p class="has-text-align-left">「子どものために可愛い服を作りたい」と思ってミシンを用意したけれど、いざ始めようとすると「何から手をつければいいのか分からない」「生地の切り方も合っているか不安」と手が止まってしまう。<br><br>そんなお悩みを持つ初心者さんのための、最初の一歩となる体験レッスンです。<br><br>当教室の体験レッスンでは、一番つまずきやすい「水通し」や「裁断」などの一番最初の準備はすべてこちらで済ませた「キット」をご用意しています。<br>そのため、「縫う楽しさ」と「服が完成する感動」を、たった3時間で味わっていただくことができます。</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"100px"} -->
<div style="height:100px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {"backgroundColor":"luminous-vivid-amber","className":"section-features","layout":{"type":"constrained","contentSize":"900px"}} -->
<div class="wp-block-group section-features has-luminous-vivid-amber-background-color has-background" style="padding-top:60px;padding-bottom:60px;padding-left:40px;padding-right:40px; border-radius:12px;">
<!-- wp:heading {"textAlign":"center","className":"font-mincho"} -->
<h2 class="wp-block-heading has-text-align-center font-mincho" style="margin-top:0;">体験レッスンで「作れるもの」と「学べること」</h2>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center" style="margin-bottom:40px;">以下から、お好きなアイテムを1つお選びいただけます。</p>
<!-- /wp:paragraph -->

<!-- wp:columns -->
<div class="wp-block-columns">
<!-- wp:column -->
<div class="wp-block-column blank-box feature-box">
<!-- wp:html -->
<div class="placeholder-img rect-img"></div>
<!-- /wp:html -->
<!-- wp:heading {"level":3,"className":"feature-title"} -->
<h3 class="wp-block-heading feature-title" style="font-size:1.1em;">A. シンプルで上品な<br>裏地付きワンピース（女の子向け）</h3>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"left"} -->
<p class="has-text-align-left" style="font-size:0.95em;">初心者でも綺麗に仕上がる裏地の付け方や、ギャザーの寄せ方の基礎を学びます。そのままお出かけに着ていける上品なデザインです。</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column blank-box feature-box">
<!-- wp:html -->
<div class="placeholder-img rect-img"></div>
<!-- /wp:html -->
<!-- wp:heading {"level":3,"className":"feature-title"} -->
<h3 class="wp-block-heading feature-title" style="font-size:1.1em;">B. 動きやすくておしゃれな<br>男の子用パンツ</h3>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"left"} -->
<p class="has-text-align-left" style="font-size:0.95em;">カーブの縫い方や、ウエストゴムの通し方の基本を学びます。活発な男の子でも動きやすく、何本も作りたくなる定番の形です。</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
</div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"100px"} -->
<div style="height:100px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {"layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group">
<!-- wp:heading {"textAlign":"center","className":"font-mincho"} -->
<h2 class="wp-block-heading has-text-align-center font-mincho">レッスン詳細</h2>
<!-- /wp:heading -->

<!-- wp:table {"className":"is-style-regular"} -->
<figure class="wp-block-table is-style-regular"><table style="border-collapse: collapse; width: 100%;"><tbody>
<tr style="border-bottom: 1px solid #eaeaea;">
<td style="padding: 20px 15px; font-weight: bold; width: 30%; color: #c55c70;">所要時間</td>
<td style="padding: 20px 15px;">約3時間（前後する場合がございます）</td>
</tr>
<tr style="border-bottom: 1px solid #eaeaea;">
<td style="padding: 20px 15px; font-weight: bold; width: 30%; color: #c55c70;">参加費</td>
<td style="padding: 20px 15px;"><strong>15,000円</strong>（税込・材料キット代含む）</td>
</tr>
<tr style="border-bottom: 1px solid #eaeaea;">
<td style="padding: 20px 15px; font-weight: bold; width: 30%; color: #c55c70;">場所</td>
<td style="padding: 20px 15px;">神奈川県内（※詳細はご予約確定後にお知らせいたします）</td>
</tr>
<tr style="border-bottom: 1px solid #eaeaea;">
<td style="padding: 20px 15px; font-weight: bold; width: 30%; color: #c55c70;">持ち物</td>
<td style="padding: 20px 15px;">必要な道具はすべて教室でご用意しております。<br>手ぶらでお気軽にお越しください。</td>
</tr>
<tr style="border-bottom: 1px solid #eaeaea;">
<td style="padding: 20px 15px; font-weight: bold; width: 30%; color: #c55c70;">お子様連れ</td>
<td style="padding: 20px 15px;">可能です。お気に入りのおもちゃなどを少しご持参いただくと安心です。</td>
</tr>
</tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph {"align":"left"} -->
<p class="has-text-align-left" style="font-size:0.9em; margin-top:30px; color:#666;">※当教室は少人数制のため、現在ご案内できる枠が限られております。<br>※体験レッスン後、ご希望の方には継続コース（4ヶ月少人数コース）のご案内をいたしますが、無理な勧誘は一切ございませんのでご安心ください。</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"100px"} -->
<div style="height:100px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {"backgroundColor":"light-green-cyan","className":"section-cta-line","layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group section-cta-line has-light-green-cyan-background-color has-background" style="padding:50px 40px; border-radius:12px; border: 2px solid #a3d9a5; box-shadow: 0 10px 30px rgba(163,217,165,0.2);">
<!-- wp:heading {"textAlign":"center","className":"font-mincho"} -->
<h2 class="wp-block-heading has-text-align-center font-mincho" style="margin-top:0; color:#2c8a32;">お申し込み方法</h2>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">体験レッスンの募集は、公式LINEにて先行してご案内しております。<br>まずは公式LINEにご登録いただき、次回の募集案内をお待ちいただくか、メニューから直接お問い合わせください。</p>
<!-- /wp:paragraph -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons" style="margin-top:30px;">
<!-- wp:button {"className":"custom-btn line-btn"} -->
<div class="wp-block-button custom-btn line-btn" style="width:100%; max-width:400px;"><a class="wp-block-button__link wp-element-button" style="width:100%; text-align:center; background-color:#06C755; color:#fff; padding:15px; font-size:1.2rem; border-radius:50px; box-shadow:0 4px 10px rgba(6,199,85,0.3);" href="https://lin.ee/xyz">公式LINEでお知らせを受け取る</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"120px"} -->
<div style="height:120px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->
`;

            // 1Day体験レッスンページの存在確認
            const existingRes = await fetch(window.wpApiSettings.root + 'wp/v2/pages?search=1Day体験レッスン', {
                headers: { 'X-WP-Nonce': nonce }
            });
            const existingPages = await existingRes.json();

            const existingPage = existingPages.find(p => p.title.rendered.includes('1Day体験レッスン'));

            let pageId;
            if (existingPage) {
                const updateRes = await fetch(window.wpApiSettings.root + 'wp/v2/pages/' + existingPage.id, {
                    method: 'POST',
                    headers: {
                        'X-WP-Nonce': window.wpApiSettings.nonce,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        content: content,
                        status: 'publish',
                        meta: {
                            cocoon_page_type: '1column_wide'
                        }
                    })
                });
                pageId = existingPage.id;
            } else {
                const createRes = await fetch(window.wpApiSettings.root + 'wp/v2/pages', {
                    method: 'POST',
                    headers: {
                        'X-WP-Nonce': window.wpApiSettings.nonce,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title: '1Day体験レッスン',
                        content: content,
                        status: 'publish',
                        slug: '1day-lesson',
                        meta: {
                            cocoon_page_type: '1column_wide'
                        }
                    })
                });
                const createData = await createRes.json();
                pageId = createData.id;
            }

            return { status: 'success', pageId };
        });

        console.log("Result:", result);

    } catch (e) {
        console.error("Error:", e);
    } finally {
        await browser.close();
    }
})();
