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

        const contentRaw = `
【ファーストビュー】

はじめてでも、
少しずつ身につく理由があります

mirii sewing は、
ただその場で完成させるだけの教室ではありません。

お家でも自分で作れるようになることを大切にした、
初心者さんのためのミシン教室です。

[ まずは1Day体験レッスンを見る ]


【導入】

「動画を見ても途中で止まってしまう」
「ミシンを買ったものの、何から始めればいいか分からない」

そんな方が、少しずつ前に進めるようになるのには理由があります。

mirii sewing では、
初心者さんがつまずきやすいところをそのままにせず、
一つずつ整理しながら進められる形を整えています。

ここでは、その特徴をご紹介します。


【特徴1】

順序立てて進めるから、迷いにくい

初心者さんが止まりやすい理由のひとつは、
「何からやればいいのか分からない」ことです。

mirii sewing では、
服作りに必要な流れを一つずつ整理しながら進めていきます。

・何を先にやるのか
・どこでつまずきやすいのか
・どう進めれば混乱しにくいのか

を意識して進めるので、
感覚だけで置いていかれることがありません。


【特徴2】

縫う前の準備から、大切にしています

きれいに仕上がるかどうかは、
縫い方だけで決まるものではありません。

水通し、生地の扱い方、裁断、型紙の見方など、
縫う前の準備が整うことで、
その後の進みやすさも変わってきます。

mirii sewing では、
そうした「最初の準備」から大切にしています。

完成した見た目だけではなく、
どうすれば次も自分で進められるかを大事にしているからです。


【特徴3】

少人数だから、分からないまま終わりにしません

人数を絞っているのは、
一人ひとりの様子をきちんと見ながら進めたいからです。

・糸のかけ方で止まっている
・手元で何が分からなくなっている
・質問したいけれど言いづらい

そういった場面をそのままにせず、
確認しながら進めていけるようにしています。

「分からないけれど、そのまま終わった」
が積み重ならないことを大切にしています。


【特徴4】

教室で終わらず、お家でも続けられることを目指します

教室で完成するだけなら、
その場では楽しく終わるかもしれません。

でも、
本当に自分で作れるようになったと言えるのは、
お家でもミシンを出して進められるようになったときです。

mirii sewing では、
教室の時間だけで完結するのではなく、
お家でも少しずつ続けられることを目指しています。

そのために、
分からないところを整理しながら進めることや、
復習しやすい形を整えることを大切にしています。


【特徴5】

初心者さんの気持ちを前提にしたレッスンです

mirii sewing に来られる方の多くは、
最初からスムーズにできる方ではありません。

・家庭科以来ミシンに触っていない
・ミシンを買ったけれど使わないまま
<li>動画で挑戦したけれどうまくいかなかった</li>
<li>不器用だから自分には向いていないと思っている</li>

そんな方が、
少しずつ「私にもできるかもしれない」と思えるように、
安心して進められる雰囲気と伝え方を大切にしています。


【教室で大切にしていること】

完成より、習得。
依存より、自立。

mirii sewing では、
ただ教室で綺麗に完成することだけをゴールにしていません。

大切にしているのは、
お家に帰ってからも、
自分で少しずつ進められるようになることです。

そのために、
分からないまま進めないこと、
順序立てて伝えること、
できるだけ自分で理解しながら手を動かせることを大切にしています。

「先生がいないと作れない」
ではなく、
「次も自分でやってみよう」
と思えるようになることを目指しています。


【こんな方に向いています】

この教室は、こんな方に向いています

・ミシンを買ったものの、しまったままになっている
・動画を見ても途中で止まってしまう
・裁断や準備の段階で難しく感じる
・子どもの服を作ってみたい
・教室で完成するだけでなく、ちゃんと身につけたい
・お家でも自分で作れるようになりたい
・少人数で落ち着いて学びたい


【まずは体験から】

いきなり継続ではなく、
まずは1Day体験レッスンから始めていただけます

「自分に合うか分からない」
「いきなり継続コースは不安」

そんな方のために、
mirii sewing では、まず1Day体験レッスンをご用意しています。

体験では、
初心者さんでも安心して取り組める形で、
最初の一歩を踏み出していただけます。

そのうえで、
もっと身につけたいと感じた方に、
継続コースをご案内しています。

[ 1Day体験レッスンの詳細を見る ]


【最終CTA】

まずは、体験レッスンかLINE登録からどうぞ

教室の特徴を読んで、
「自分にもできるかもしれない」と感じていただけたら、
最初の一歩として十分です。

まずは体験レッスンで実際に手を動かしてみる。
またはLINEで、募集情報や教室の案内を受け取る。

どちらからでも始めていただけます。

[ 1Day体験レッスンの詳細を見る ]
[ 公式LINEで最新情報を受け取る ]
`;

        const result = await page.evaluate(async (pageId, content) => {
            const nonce = window.wpApiSettings ? window.wpApiSettings.nonce : null;
            if (!nonce) return { error: 'No nonce' };

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
        }, PAGE_ID, contentRaw);

        console.log("Update result:", result);

        if (result.status === 'success') {
            const previewUrl = 'https://mirii-sewing.online/features/';
            console.log("Checking result at: " + previewUrl);
            await page.goto(previewUrl, { waitUntil: 'networkidle2' });
            // Wait for some content to be visible
            await page.waitForSelector('.entry-content');
            console.log("Content check: page loaded.");
        }

    } catch (e) {
        console.error("Error:", e);
    } finally {
        await browser.close();
    }
})();
