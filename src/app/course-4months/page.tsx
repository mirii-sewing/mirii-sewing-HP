import Link from "next/link";

export default function Course4MonthsPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#4A4A4A] font-sans pb-20">
      
      {/* ファーストビュー */}
      <section className="bg-[#FCF7F8] py-20 px-4 text-center border-b border-[#E9E6E4]">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-[#333333] text-2xl md:text-3xl leading-relaxed mb-8">
            ひとりで作れるようになるための、<br />
            4ヶ月少人数コース
          </h1>
          
          <div className="w-full max-w-[600px] h-[300px] md:h-[400px] bg-[#E9E6E4] mx-auto rounded-lg mb-8 flex items-center justify-center text-slate-500">
            FV画像 仮配置
          </div>
          
          <p className="text-lg mb-4 text-center">
            体験レッスンが「最初の一歩」なら、<br />
            こちらは基礎からしっかり身につけるための本コースです。
          </p>
          <p className="text-lg mb-10 text-center">
            お家でも自分で子ども服が作れるようになりたい方へ。<br />
            少人数で、一つずつ確認しながら進めていきます。
          </p>
          
          <div className="flex justify-center mt-8">
            <Link
              href="#line-cta"
              className="inline-block px-8 py-4 bg-[#7FAE9B] text-white rounded-full font-bold shadow hover:opacity-90 transition-opacity"
            >
              まずはLINEで募集案内を受け取る
            </Link>
          </div>
        </div>
      </section>

      {/* 導入 */}
      <section className="bg-[#FFFFFF] py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-[#333333] text-xl md:text-2xl leading-relaxed mb-8 pb-3 border-b-2 border-[#F4DFE3]">
            体験レッスンのあと、<br />「もっと自分で作れるようになりたい」と感じた方へ
          </h2>
          <div className="space-y-6 text-left">
            <p>
              1Day体験レッスンでは、<br />
              「私にもできた」という最初の成功体験を大切にしています。
            </p>
            <p>
              その一方で、<br />
              本当にお家でひとりで作れるようになるためには、<br />
              もう少し時間をかけて、順序立てて身につけていくことが必要です。
            </p>
            <p>
              この4ヶ月少人数コースは、<br />
              そのための土台をつくるコースです。
            </p>
          </div>
          <div className="w-full max-w-[600px] h-[300px] bg-[#E9E6E4] mx-auto mt-10 rounded-lg flex items-center justify-center text-slate-500">
            導入画像 仮配置
          </div>
        </div>
      </section>

      {/* このコースで目指すこと */}
      <section className="bg-[#F8F5F2] py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-[#333333] text-xl md:text-2xl leading-relaxed mb-8 pb-3 border-b-2 border-[#F4DFE3]">
            教室で完成するだけでなく、<br />お家でも自分で作れるようになることを目指します
          </h2>
          <div className="space-y-6 text-left">
            <p>
              このコースで大切にしているのは、<br />
              「その場で完成した」で終わらないことです。
            </p>
            <ul className="space-y-3 my-6">
              {['生地を選ぶ', '裁断する', '順序立てて縫い進める', '分からないところを整理する'].map((item, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <span className="text-[#D8AEB7] mt-1">・</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p>
              こうした基本を一つずつ身につけながら、<br />
              教室の外でも少しずつ続けられることを目指していきます。
            </p>
            <p>
              教室に来たときだけ作れるのではなく、<br />
              お家でも「次はこれを作ってみよう」と思える状態へ進んでいくためのコースです。
            </p>
          </div>
        </div>
      </section>

      {/* こんな方に向いています */}
      <section className="bg-[#FFFFFF] py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-[#333333] text-xl md:text-2xl leading-relaxed mb-8 pb-3 border-b-2 border-[#F4DFE3]">
            こんな方に向いているコースです
          </h2>
          <ul className="space-y-4 text-left">
            {[
              '体験レッスンを受けて、もっと基礎から学びたいと思った',
              '動画や独学では途中で止まってしまう',
              '裁断や生地選びからきちんと分かるようになりたい',
              'お家でも一人で作れるようになりたい',
              'ただ完成するだけでなく、ちゃんと身につけたい',
              '子どもの服を、少しずつ自分で作れるようになりたい'
            ].map((item, i) => (
              <li key={i} className="flex gap-2 items-start">
                <span className="text-[#D8AEB7] mt-1">・</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="w-full max-w-[600px] h-[300px] bg-[#E9E6E4] mx-auto mt-10 rounded-lg flex items-center justify-center text-slate-500">
            イメージ画像 仮配置
          </div>
        </div>
      </section>

      {/* 体験レッスンとの違い */}
      <section className="bg-[#F8F5F2] py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-[#333333] text-xl md:text-2xl leading-relaxed mb-8 pb-3 border-b-2 border-[#F4DFE3]">
            1Day体験レッスンとの違い
          </h2>
          <div className="space-y-6 text-left">
            <p>
              1Day体験レッスンは、<br />
              初心者さんが「私にもできる」と感じるための最初の一歩です。
            </p>
            <p>
              一方で、この4ヶ月コースは、<br />
              その感覚を一時的なものにせず、<br />
              基礎から順序立てて身につけるためのコースです。
            </p>
            <p>
              体験では、準備を整えた状態から始めて、<br />
              まずは完成まで進むことを大切にします。
            </p>
            <p>
              継続コースでは、<br />
              その先にある<br />
              「自分で生地を選び、裁断し、家でも作れるようになること」<br />
              を目指します。
            </p>
          </div>
        </div>
      </section>

      {/* 学べる内容 */}
      <section className="bg-[#FFFFFF] py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-[#333333] text-xl md:text-2xl leading-relaxed mb-8 pb-3 border-b-2 border-[#F4DFE3]">
            4ヶ月を通して、少しずつできることを増やしていきます
          </h2>
          <div className="space-y-6 text-left">
            <p>
              このコースでは、月2回 × 全8回を通して、<br />
              服作りの基本を順序立てて学んでいきます。
            </p>
            <p>内容の例：</p>
            <ul className="space-y-3 mb-6 pl-4">
              {[
                '生地や道具の扱い方',
                '型紙の見方',
                '裁断の基本',
                '縫製の基本',
                'きれいに仕上げるための考え方',
                'お家で続けるための進め方'
              ].map((item, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <span className="text-[#D8AEB7] mt-1">・</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p>
              最初から全部できる必要はありません。<br />
              一つずつ確認しながら、積み重ねていきます。
            </p>
          </div>
          <div className="w-full max-w-[600px] h-[300px] bg-[#E9E6E4] mx-auto mt-10 rounded-lg flex items-center justify-center text-slate-500">
            講座の様子画像 仮配置
          </div>
        </div>
      </section>

      {/* 少人数制で進める理由 */}
      <section className="bg-[#F8F5F2] py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-[#333333] text-xl md:text-2xl leading-relaxed mb-8 pb-3 border-b-2 border-[#F4DFE3]">
            少人数だからこそ、<br />分からないまま置いていきません
          </h2>
          <div className="space-y-6 text-left">
            <p>このコースは少人数制です。</p>
            <p>
              人数を絞っているのは、<br />
              一人ひとりの手元の様子や、<br />
              どこで止まりやすいかをきちんと見ながら進めたいからです。
            </p>
            <p>
              「分からないけれど、聞けないまま終わった」<br />
              という状態にならないように、<br />
              安心して進められる環境を整えています。
            </p>
          </div>
        </div>
      </section>

      {/* サポート内容 */}
      <section className="bg-[#FFFFFF] py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-[#333333] text-xl md:text-2xl leading-relaxed mb-8 pb-3 border-b-2 border-[#F4DFE3]">
            教室の時間だけで終わらせないためのサポートがあります
          </h2>
          <div className="space-y-6 text-left">
            <p>
              教室で学んだことを、<br />
              お家でも少しずつ続けていただけるように、<br />
              必要なサポートをご用意しています。
            </p>
            <ul className="space-y-3 my-6 pl-4">
              {[
                'LINEでの質問対応',
                '添削サポート',
                '必要に応じた動画での補足',
                '無理のない範囲での復習サポート'
              ].map((item, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <span className="text-[#D8AEB7] mt-1">・</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p>
              ただし、全部を先生任せにするのではなく、<br />
              ご自身で進められる力を育てることを大切にしています。
            </p>
          </div>
          <div className="w-full max-w-[600px] h-[300px] bg-[#E9E6E4] mx-auto mt-10 rounded-lg flex items-center justify-center text-slate-500">
            サポートの様子画像 仮配置
          </div>
        </div>
      </section>

      {/* オンラインでも安心な理由 */}
      <section className="bg-[#F8F5F2] py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-[#333333] text-xl md:text-2xl leading-relaxed mb-8 pb-3 border-b-2 border-[#F4DFE3]">
            オンラインでも、<br />順序立てて進められるように整えています
          </h2>
          <div className="space-y-6 text-left">
            <p>
              オンラインでミシンを習うことに、<br />
              不安を感じる方もいらっしゃると思います。
            </p>
            <p>
              このコースでは、<br />
              少人数で進めることに加え、<br />
              質問しやすい形や、復習しやすい形を整えています。
            </p>
            <p>
              だからこそ、<br />
              ご自宅にいながらでも、<br />
              一つずつ確認しながら進めていくことができます。
            </p>
          </div>
        </div>
      </section>

      {/* 卒業後のイメージ */}
      <section className="bg-[#FFFFFF] py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-[#333333] text-xl md:text-2xl leading-relaxed mb-8 pb-3 border-b-2 border-[#F4DFE3]">
            コースを終える頃には、<br />「次に何を作ろう」が自分で考えられるように
          </h2>
          <div className="space-y-6 text-left">
            <p>
              このコースのゴールは、<br />
              ただ8回通い終えることではありません。
            </p>
            <ul className="space-y-3 my-6 pl-4">
              {[
                '家でもミシンを出せる',
                '作りたいものに向けて準備できる',
                '分からないところを整理しながら進められる'
              ].map((item, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <span className="text-[#D8AEB7] mt-1">・</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p>
              そんなふうに、<br />
              服作りを自分の生活の中で続けられる状態を目指しています。
            </p>
            <p>
              「先生がいないとできない」ではなく、<br />
              「自分でも作っていける」<br />
              その感覚を育てていくコースです。
            </p>
          </div>
          <div className="w-full max-w-[600px] h-[300px] bg-[#E9E6E4] mx-auto mt-10 rounded-lg flex items-center justify-center text-slate-500">
            完成した服や卒業後のイメージ画像 仮配置
          </div>
        </div>
      </section>

      {/* 開催概要 */}
      <section className="bg-[#F8F5F2] py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-[#333333] text-xl md:text-2xl leading-relaxed mb-8 pb-3 border-b-2 border-[#F4DFE3]">
            コース概要
          </h2>
          <div className="space-y-6 text-left">
            <ul className="space-y-4">
              {[
                '回数：月2回 × 全8回',
                '期間：4ヶ月',
                '形式：オンライン中心（対面は千葉）',
                '時間帯：昼10:00 / 夜21:00',
                'サポート：LINE質問、添削、必要に応じて動画回答',
                '募集案内：公式LINEでご案内'
              ].map((item, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <span className="text-[#D8AEB7] mt-1">・</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm mt-6 text-[#888888]">
              ※価格や募集時期の詳細は、募集案内時にご確認いただけます。
            </p>
          </div>
        </div>
      </section>

      {/* よくある質問 */}
      <section className="bg-[#FFFFFF] py-16 px-4">
        <div className="max-w-3xl mx-auto text-left">
          <h2 className="font-serif text-[#333333] text-xl md:text-2xl leading-relaxed mb-10 pb-3 border-b-2 border-[#F4DFE3]">
            よくある質問
          </h2>
          <div className="space-y-10">
            <div>
              <h3 className="flex gap-3 font-bold text-[#333333] mb-3 items-start">
                <span className="font-serif text-[#D8AEB7] text-xl leading-none pt-1">Q.</span>
                <span className="mt-0.5">体験を受けていなくても申し込めますか？</span>
              </h3>
              <div className="flex gap-3 items-start">
                <span className="font-serif text-[#E9E6E4] text-xl leading-none pt-1">A.</span>
                <p className="leading-relaxed mt-0.5">
                  基本的には、まず体験レッスンからのご参加をご案内しています。<br />
                  教室の雰囲気や進め方を知っていただいたうえで、<br />
                  継続コースをご検討いただく流れです。
                </p>
              </div>
            </div>

            <div>
              <h3 className="flex gap-3 font-bold text-[#333333] mb-3 items-start">
                <span className="font-serif text-[#D8AEB7] text-xl leading-none pt-1">Q.</span>
                <span className="mt-0.5">お家で復習できるか不安です</span>
              </h3>
              <div className="flex gap-3 items-start">
                <span className="font-serif text-[#E9E6E4] text-xl leading-none pt-1">A.</span>
                <p className="leading-relaxed mt-0.5">
                  最初から完璧にできる必要はありません。<br />
                  教室で確認したことを、お家でも少しずつ続けられるようにサポートしています。
                </p>
              </div>
            </div>

            <div>
              <h3 className="flex gap-3 font-bold text-[#333333] mb-3 items-start">
                <span className="font-serif text-[#D8AEB7] text-xl leading-none pt-1">Q.</span>
                <span className="mt-0.5">本当に初心者でも大丈夫ですか？</span>
              </h3>
              <div className="flex gap-3 items-start">
                <span className="font-serif text-[#E9E6E4] text-xl leading-none pt-1">A.</span>
                <p className="leading-relaxed mt-0.5">
                  はい、大丈夫です。<br />
                  このコースは、独学で止まってしまった方や、<br />
                  ミシンが久しぶりの方にも分かるように、<br />
                  順序立てて進めることを大切にしています。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 最終CTA */}
      <section id="line-cta" className="bg-[#FCF7F8] py-20 px-4 text-center border-t border-[#E9E6E4]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-[#333333] text-xl md:text-2xl leading-relaxed mb-8">
            募集案内は、公式LINEでお届けしています
          </h2>
          <p className="mb-4">
            4ヶ月少人数コースは、<br />
            募集時期や空き状況にあわせてご案内しています。
          </p>
          <p className="mb-4">
            ご興味のある方は、<br />
            まずは公式LINEにご登録ください。
          </p>
          <p className="mb-10">
            体験レッスンのご案内や、<br />
            継続コースの募集情報をお届けしています。
          </p>
          
          <div className="flex flex-col gap-5 items-center justify-center mt-8">
            <Link
              href="#"
              className="w-full md:w-auto min-w-[300px] px-8 py-4 bg-[#7FAE9B] text-white rounded-full font-bold shadow-md hover:opacity-90 transition-opacity"
            >
              公式LINEで募集案内を受け取る
            </Link>
            <Link
              href="/#trial"
              className="w-full md:w-auto min-w-[300px] px-8 py-4 bg-white text-[#4A4A4A] border border-[#D8AEB7] rounded-full font-bold shadow-sm hover:bg-[#FAFAFA] transition-colors"
            >
              まずは1Day体験レッスンを見る
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
