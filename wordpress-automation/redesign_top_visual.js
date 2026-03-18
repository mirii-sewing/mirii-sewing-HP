
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    try {
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(180000);

        console.log("Logging in...");
        await page.goto('https://mirii-sewing.online/wp-admin/', { waitUntil: 'domcontentloaded' });
        await page.type('#user_login', 'antigravity-ai@gmail.com');
        await page.type('#user_pass', 'hE6AnSDQNzN0FJ&lX&ITOU(o');
        await Promise.all([page.waitForNavigation({ waitUntil: 'domcontentloaded' }), page.click('#wp-submit')]);

        const html = `
<!-- wp:group {"tagName":"section","align":"full","style":{"spacing":{"padding":{"top":"0","bottom":"0"}}},"className":"hero-visual-section"} -->
<section class="wp-block-group alignfull hero-visual-section" style="padding-top:0;padding-bottom:0">
    <div class="hero-bg" style="background-image: url('https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_3166-scaled.jpeg');">
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
<!-- /wp:group -->

<!-- wp:group {"tagName":"section","align":"full","className":"concept-visual-section"} -->
<section class="wp-block-group alignfull concept-visual-section">
    <div class="concept-container">
        <div class="concept-image">
            <img src="https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_2991-scaled.jpg" alt="手作りの喜び">
        </div>
        <div class="concept-text">
            <h2>完成よりも「習得」を。<br>一生もののスキルを、あなたに。</h2>
            <p>mirii sewingは、単にお洋服を完成させる場所ではありません。<br>
            「自分で作れる」という自信と、家族を想う時間そのものをお届けします。</p>
            <a href="/welcome" class="link-more">はじめての方へ →</a>
        </div>
    </div>
</section>
<!-- /wp:group -->

<!-- wp:group {"tagName":"section","align":"full","className":"lifestyle-gallery-section"} -->
<section class="wp-block-group alignfull lifestyle-gallery-section">
    <div class="gallery-grid">
        <div class="gallery-item">
            <img src="https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_0121-scaled.jpg" alt="日常の幸せ">
            <div class="item-caption">日常に寄り添う一着</div>
        </div>
        <div class="gallery-item">
            <img src="https://mirii-sewing.online/wp-content/uploads/2026/03/IMG_7104-scaled.jpg" alt="家族の思い出">
            <div class="item-caption">歩みとともに、育つ思い出</div>
        </div>
    </div>
</section>
<!-- /wp:group -->

<!-- wp:html -->
<style>
/* Base Styles */
body {
    color: #4a4a4a;
    font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;
}

/* Hero Section */
.hero-visual-section {
    position: relative;
    height: 90vh;
    min-height: 600px;
    overflow: hidden;
}
.hero-bg {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}
.hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.25);
}
.hero-content {
    position: relative;
    z-index: 2;
    padding: 20px;
}
.hero-subtitle {
    font-size: 1.2rem;
    letter-spacing: 0.2em;
    margin-bottom: 20px;
    color: #6d6d6d;
}
.hero-title {
    font-size: 3.5rem;
    font-weight: 300;
    line-height: 1.4;
    margin-bottom: 40px;
    color: #333;
}
.btn-primary {
    display: inline-block;
    padding: 18px 45px;
    background: #d4a373; /* Elegant Sand/Gold */
    color: #fff;
    text-decoration: none;
    border-radius: 50px;
    font-size: 1.1rem;
    letter-spacing: 0.1em;
    transition: all 0.3s;
    box-shadow: 0 4px 15px rgba(212, 163, 115, 0.3);
}
.btn-primary:hover {
    background: #b88b5d;
    transform: translateY(-2px);
}

/* Concept Section */
.concept-visual-section {
    padding: 100px 5%;
    background: #fdfaf7;
}
.concept-container {
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 60px;
}
.concept-image {
    flex: 1;
}
.concept-image img {
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}
.concept-text {
    flex: 1;
}
.concept-text h2 {
    font-size: 2.2rem;
    font-weight: 300;
    margin-bottom: 30px;
    line-height: 1.5;
}
.concept-text p {
    line-height: 2;
    margin-bottom: 30px;
    font-size: 1.05rem;
}
.link-more {
    color: #d4a373;
    text-decoration: none;
    border-bottom: 1px solid #d4a373;
    padding-bottom: 5px;
    transition: opacity 0.3s;
}

/* Gallery Section */
.lifestyle-gallery-section {
    padding: 80px 0;
}
.gallery-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding: 0 20px;
}
.gallery-item {
    position: relative;
    overflow: hidden;
    height: 500px;
}
.gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s;
}
.gallery-item:hover img {
    transform: scale(1.05);
}
.item-caption {
    position: absolute;
    bottom: 30px;
    left: 30px;
    color: #fff;
    font-size: 1.2rem;
    text-shadow: 0 2px 10px rgba(0,0,0,0.5);
}

/* Responsive */
@media screen and (max-width: 768px) {
    .hero-title { font-size: 2rem; }
    .concept-container { flex-direction: column; text-align: center; }
    .gallery-grid { grid-template-columns: 1fr; }
    .gallery-item { height: 350px; }
}
</style>
<!-- /wp:html -->
        `;

        const topIds = [8, 18];

        for (const topId of topIds) {
            console.log(`Updating Top Page ID ${topId} Visual-First...`);
            await page.evaluate(async (pid, content) => {
                const nonce = window.wpApiSettings.nonce;
                await fetch(window.wpApiSettings.root + 'wp/v2/pages/' + pid, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-WP-Nonce': nonce
                    },
                    body: JSON.stringify({ content: content })
                });
            }, topId, html);
        }

        console.log("Redesign complete.");
        await page.goto('https://mirii-sewing.online/', { waitUntil: 'networkidle2' });
        await page.screenshot({ path: 'redesign_top_check_v2.png', fullPage: true });

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
})();
