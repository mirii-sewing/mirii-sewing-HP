
const puppeteer = require('puppeteer');
const fs = require('fs');

const WP_URL = 'https://mirii-sewing.online';
const WP_USER = 'antigravity-ai@gmail.com';
const WP_PASS = 'hE6AnSDQNzN0FJ&lX&ITOU(o';

const imgUrls = {
    hero: 'https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_3166-scaled.jpeg',
    smile: 'https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_2991-scaled.jpg',
    lifestyle1: 'https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_0121-scaled.jpg',
    lifestyle2: 'https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_7104-scaled.jpg',
    lesson: 'https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_2991-scaled.jpg' // Using smile for 1Day hero too
};

const pagesData = [
    {
        id: 18,
        title: 'HOME (New)',
        html: `
<!-- wp:group {"tagName":"section","align":"full","className":"hero-visual-section"} -->
<section class="wp-block-group alignfull hero-visual-section">
    <div class="hero-bg" style="background-image: url('${imgUrls.hero}');">
        <div class="hero-overlay"></div>
        <div class="hero-content">
            <p class="hero-subtitle">はじめての、愛しい一着を。</p>
            <h1 class="hero-title">世界にひとつ、<br>家族の笑顔を紡ぐミシン教室</h1>
            <div class="hero-cta-wrapper">
                <a href="/1day-lesson" class="btn-primary">1Day体験レッスンを見る</a>
            </div>
        </div>
    </div>
</section>
<!-- wp:group {"tagName":"section","align":"full","className":"concept-visual-section"} -->
<section class="wp-block-group alignfull concept-visual-section">
    <div class="concept-container">
        <div class="concept-image"><img src="${imgUrls.smile}" alt="手作りの喜び"></div>
        <div class="concept-text">
            <h2>完成よりも「習得」を。<br>一生もののスキルを、あなたに。</h2>
            <p>mirii sewingは、単にお洋服を完成させる場所ではありません。<br>「自分で作れる」という自信と、家族を想う時間そのものをお届けします。</p>
            <a href="/welcome" class="link-more">はじめての方へ →</a>
        </div>
    </div>
</section>
<!-- wp:group {"tagName":"section","align":"full","className":"lifestyle-gallery-section"} -->
<section class="wp-block-group alignfull lifestyle-gallery-section">
    <div class="gallery-grid">
        <div class="gallery-item"><img src="${imgUrls.lifestyle1}"><div class="item-caption">日常に寄り添う一着</div></div>
        <div class="gallery-item"><img src="${imgUrls.lifestyle2}"><div class="item-caption">歩みとともに、育つ思い出</div></div>
    </div>
</section>
<style>
.hero-visual-section { height: 90vh; position: relative; overflow: hidden; }
.hero-bg { width:100%; height:100%; background-size:cover; background-position:center; display:flex; align-items:center; justify-content:center; text-align:center; }
.hero-overlay { position:absolute; top:0; left:0; right:0; bottom:0; background:rgba(255,255,255,0.25); }
.hero-content { position:relative; z-index:2; }
.hero-title { font-size: 3.5rem; font-weight:300; margin-bottom:40px; color:#333; }
.btn-primary { display:inline-block; padding:18px 45px; background:#d4a373; color:#fff; text-decoration:none; border-radius:50px; }
.concept-visual-section { padding: 100px 5%; background:#fdfaf7; }
.concept-container { max-width:1100px; margin:0 auto; display:flex; gap:60px; align-items:center; }
.concept-image, .concept-text { flex:1; }
.concept-image img { width:100%; border-radius:10px; }
.lifestyle-gallery-section { padding:80px 0; }
.gallery-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; padding:0 20px; }
.gallery-item { height:500px; position:relative; overflow:hidden; }
.gallery-item img { width:100%; height:100%; object-fit:cover; }
@media (max-width:768px) { .hero-title { font-size:2rem; } .concept-container { flex-direction:column; } .gallery-grid { grid-template-columns:1fr; } }
</style>
        `
    },
    {
        id: 24,
        title: '1Day体験レッスン',
        html: `
<!-- wp:group {"tagName":"section","align":"full","className":"page-hero-visual"} -->
<section class="wp-block-group alignfull page-hero-visual">
    <div class="hero-bg" style="background-image: url('${imgUrls.lesson}');">
        <div class="hero-overlay"></div>
        <div class="hero-content">
            <h1 class="hero-title">1Day体験レッスン</h1>
            <p class="hero-subtitle">まずは一歩、針と糸で想いを形にする体験を。</p>
        </div>
    </div>
</section>
<!-- wp:group {"className":"lesson-intro-section"} -->
<div class="wp-block-group lesson-intro-section">
    <div class="lesson-container">
        <h2>初心者さんも安心。<br>手ぶらで参加できる体験レッスン。</h2>
        <p>ミシンが初めての方、独学で挫折してしまった方。mirii sewingは、そんなあなたの「やってみたい」を全力で応援します。</p>
    </div>
</div>
<style>
.page-hero-visual { height: 60vh; position:relative; overflow:hidden; }
.hero-bg { width:100%; height:100%; background-size:cover; background-position:center; display:flex; align-items:center; justify-content:center; text-align:center; }
.hero-overlay { position:absolute; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.3); }
.hero-content { position:relative; z-index:2; color:#fff; }
.hero-title { font-size: 3rem; margin-bottom:10px; }
.lesson-intro-section { padding: 80px 5%; text-align:center; }
</style>
        `
    }
];

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(300000);

    try {
        console.log("Logging in...");
        await page.goto(`${WP_URL}/wp-admin/`, { waitUntil: 'load' });
        await page.type('#user_login', WP_USER);
        await page.type('#user_pass', WP_PASS);
        await page.click('#wp-submit');
        await page.waitForSelector('#wpadminbar', { timeout: 60000 });

        for (const data of pagesData) {
            console.log(`Updating ${data.title} (ID: ${data.id})...`);
            await page.evaluate(async (pid, content) => {
                const nonce = window.wpApiSettings.nonce;
                await fetch(window.wpApiSettings.root + 'wp/v2/pages/' + pid, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': nonce },
                    body: JSON.stringify({ content: content })
                });
            }, data.id, data.html);
        }

        console.log("All pages updated.");
    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
})();
