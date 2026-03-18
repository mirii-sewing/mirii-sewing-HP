import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* 1. Hero Section (FV) */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          {/* Fallback image if video doesn't load */}
          <Image
            src="/images/IMG_8098.JPG"
            alt="教室の風景"
            fill
            className="object-cover"
          />
        </video>
        <div className="absolute inset-0 bg-black/30 bg-gradient-to-b from-transparent to-brand-paper/80" />

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <span className="inline-block px-4 py-1 mb-6 text-sm font-medium tracking-widest text-white bg-brand-sage rounded-full animate-fade-in">
            完成より、習得。依存より、自立。
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-slate-900 leading-tight mb-6 text-balance">
            未経験から、ひとりで<br />子供服が作れるようになる。
          </h1>
          <p className="text-lg md:text-xl text-slate-800 mb-10 font-medium">
            「今日、ママが作ったの？」その一言が、一生の宝物に。<br className="hidden md:block" />
            初心者専門ではない、本気で身につけたい方のための「自立型」ミシン教室。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#trial"
              className="px-8 py-4 bg-brand-sage text-white rounded-lg font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              1Day体験レッスンを予約する
            </Link>
            <Link
              href="#line"
              className="px-8 py-4 bg-white text-brand-sage border-2 border-brand-sage rounded-lg font-bold shadow-md hover:bg-slate-50 transition-all font-sans"
            >
              公式LINEで3大特典を受け取る
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Empathy Section */}
      <section className="py-20 bg-white px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-4xl mb-8 leading-relaxed">
            「可愛い服を縫ってあげたい。でも、私には無理かも...」<br className="hidden md:block" />
            そう思っていたママたちが、続々と「自立」しています。
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center mt-12">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/IMG_8469.JPG"
                alt="生徒さんの作品"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-left space-y-6">
              <p className="text-lg leading-relaxed text-slate-700">
                YouTubeや本を見ても、途中の工程でわからなくなる。<br />
                裁断が怖くて、お気に入りの生地をしまったまま。<br />
                「先生がいないと完成できない」という不安。
              </p>
              <p className="text-lg leading-relaxed text-slate-700 font-medium">
                それは、あなたが不器用だからではありません。<br />
                「正しい順序」と「技術の構造」を知らないだけなのです。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Philosophy Section (Police Background) */}
      <section className="py-24 bg-brand-paper px-4 overflow-hidden relative">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="z-10">
            <h2 className="font-serif text-3xl md:text-4xl mb-6 text-slate-900 leading-tight">
              延べ60,000人への講話経験。<br />
              元警察官だからこそできる、<br />
              「迷わせない」ステップ設計。
            </h2>
            <p className="text-lg text-slate-700 leading-loose mb-8">
              警察官として走り抜いた15年。講話を通して培った「情報を構造化し、誰にでもわかるように伝える」力は、私の洋裁指導の核となっています。<br /><br />
              「なぜこう縫うのか？」という根拠からお伝えするので、レッスン後もご自宅で迷わず一着を仕上げられる一生モノの技術が身につきます。
            </p>
            <blockquote className="border-l-4 border-brand-sage pl-6 italic text-brand-sage font-medium">
              「完成」させることより、「本当に身につくこと」を。<br />
              依存ではなく、あなたの「自立」を全力でサポートします。
            </blockquote>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-brand-sage/10 rounded-3xl -rotate-2 group-hover:rotate-0 transition-transform" />
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/IMG_3016_0.jpg"
                alt="加瀬あゆみ 講師画像"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Features Section */}
      <section className="py-24 bg-white px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-5xl mb-4">ミリイ・ソーイングの特徴</h2>
            <div className="w-20 h-1 bg-brand-beige mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-brand-paper p-8 rounded-2xl border border-brand-beige/30 transition hover:shadow-lg">
              <div className="w-12 h-12 bg-brand-sage rounded-full flex items-center justify-center text-white mb-6">01</div>
              <h3 className="text-xl font-bold mb-4">論理的なステップ設計</h3>
              <p className="text-slate-600 leading-relaxed text-sm lg:text-base">感覚的な指導ではなく、元警察官ならではの「構造化されたマニュアル」で、未経験からでも着実に上達します。</p>
            </div>
            <div className="bg-brand-paper p-8 rounded-2xl border border-brand-beige/30 transition hover:shadow-lg">
              <div className="w-12 h-12 bg-brand-sage rounded-full flex items-center justify-center text-white mb-6">02</div>
              <h3 className="text-xl font-bold mb-4">徹底した復習サポート</h3>
              <p className="text-slate-600 leading-relaxed text-sm lg:text-base">LINE質問対応や添削サポート、必要に応じた動画解説あり。レッスン以外の時間もあなたの「学び」を止めません。</p>
            </div>
            <div className="bg-brand-paper p-8 rounded-2xl border border-brand-beige/30 transition hover:shadow-lg">
              <div className="w-12 h-12 bg-brand-sage rounded-full flex items-center justify-center text-white mb-6">03</div>
              <h3 className="text-xl font-bold mb-4">ママの現実に寄り添う運営</h3>
              <p className="text-slate-600 leading-relaxed text-sm lg:text-base">寝かしつけ後の「夜21:00コース」や、集中して作業できる「MOKUMOKU会」など、子育て中のママに最適化。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Course Section */}
      <section id="trial" className="py-24 bg-brand-paper/30 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* 1Day Trial */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col items-center text-center p-8 border-t-8 border-brand-beige">
              <span className="text-brand-beige font-bold tracking-widest mb-2 uppercase">Step 01</span>
              <h3 className="font-serif text-3xl mb-4">1Day 体験レッスン</h3>
              <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6">
                <Image
                  src="/images/IMG_8313.JPG"
                  alt="体験で作るワンピース"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-slate-600 mb-8">
                面倒な裁断・水通しは不要。準備済みのキットで、一番楽しい「縫う」に集中。たった3時間で裏地付きワンピースが完成します。
              </p>
              <div className="mt-auto w-full">
                <div className="text-2xl font-bold text-slate-900 mb-6 font-sans">
                  ¥15,000 <span className="text-sm font-normal text-slate-500">(税込)</span>
                </div>
                <Link
                  href="#"
                  className="block w-full py-4 bg-brand-beige text-white rounded-xl font-bold hover:opacity-90 transition shadow-md"
                >
                  体験レッスンの詳細を見る
                </Link>
              </div>
            </div>

            {/* 4 Month Course */}
            <div className="bg-brand-sage rounded-3xl shadow-xl overflow-hidden flex flex-col items-center text-center p-8 text-white">
              <span className="text-white/80 font-bold tracking-widest mb-2 uppercase">Step 02</span>
              <h3 className="font-serif text-3xl mb-4">4ヶ月 少人数コース</h3>
              <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6 bg-white/10 flex items-center justify-center p-4">
                <Image
                  src="/images/IMG_8379.JPG"
                  alt="4ヶ月コースの作品群"
                  fill
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="font-serif text-xl border-2 border-white/50 px-6 py-3">本気で「自立」を目指す方へ</p>
                </div>
              </div>
              <p className="text-white/90 mb-8">
                全8回。月2回×4ヶ月。オンライン主軸の徹底した個別伴走。卒業する頃には、先生がいなくても「ひとりで」お洋服が仕立てられるようになります。
              </p>
              <div className="mt-auto w-full">
                <div className="text-2xl font-bold mb-6 font-sans">
                  ¥146,520 <span className="text-sm font-normal text-white/70">(税込)</span>
                </div>
                <Link
                  href="#"
                  className="block w-full py-4 bg-white text-brand-sage rounded-xl font-bold hover:bg-slate-50 transition shadow-md"
                >
                  コース詳細・申込み
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Footer / LINE CTA */}
      <section id="line" className="py-24 bg-slate-900 text-white px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl mb-8 leading-tight">
            ママをご機嫌にする、<br />特別な魔法をあなたに。
          </h2>
          <p className="text-lg text-white/80 mb-12">
            公式LINEでは、最新の募集スケジュールや、<br className="hidden md:block" />
            洋裁の基礎が詰まった「教科書レベル」の3大特典を無料プレゼントしています。
          </p>
          <div className="bg-white/10 p-8 rounded-2xl border border-white/20 mb-12">
            <h4 className="text-brand-beige font-bold mb-4 tracking-wider">LINE登録限定特典</h4>
            <ul className="text-left space-y-4 inline-block mx-auto">
              <li className="flex items-center gap-3">
                <span className="text-brand-beige">✓</span> 水通し、地直し完全マニュアル
              </li>
              <li className="flex items-center gap-3">
                <span className="text-brand-beige">✓</span> 生地の種類丸わかり図鑑
              </li>
              <li className="flex items-center gap-3">
                <span className="text-brand-beige">✓</span> 最初に揃えるべきお道具リスト
              </li>
            </ul>
          </div>
          <Link
            href="#"
            className="inline-block px-12 py-5 bg-green-500 text-white rounded-full font-bold text-xl shadow-lg hover:shadow-green-500/20 hover:scale-105 transition-all"
          >
            友だち追加して詳細を受け取る
          </Link>
          <p className="mt-12 text-sm text-white/50">
            &copy; 2026 Mirii Sewing. All Rights Reserved.
          </p>
        </div>
      </section>
    </main>
  );
}
