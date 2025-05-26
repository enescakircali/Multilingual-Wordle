class MultilingualWordle {
    constructor() {
        this.currentLanguage = 'tr'; // Default to Turkish for testing
        this.currentWordObject = null;
        this.targetWordWithSpaces = ''; // e.g., "merhaba dünya" (lowercase)
        this.targetWordClean = '';      // e.g., "merhabadünya" (lowercase)
        this.wordLength = 0;            // Length of targetWordClean

        this.currentAttempt = 0;
        this.maxAttempts = 6;
        this.currentGuess = ''; // Stores current typed guess (lowercase, no spaces)
        this.keyboardState = {}; // {'A': 'correct', 'B': 'present', 'C': 'absent'}

        this.score = parseInt(localStorage.getItem('wordleScore') || '0');
        this.streak = parseInt(localStorage.getItem('wordleStreak') || '0');

        this.words = {
            ja: [
                { word: 'ねこ', hint: '夜の屋根裏で、サイバーパンクな街の秘密を盗み聞きする、強化された聴覚を持つ存在。' },
                { word: 'さくら', hint: 'VR茶室でデジタルに再現され、永遠に散らないバーチャルな美の象徴。' },
                { word: 'こんにちは', hint: 'メガコーポレーションの受付ドロイドが、感情模倣プロトコルで発する、空虚な定型挨拶。' },
                { word: 'ありがとう', hint: 'サブスクリプション解除の最後の画面で、ユーザーを引き留めようと表示される、計算された感謝の言葉。' },
                { word: 'にほんご', hint: 'AI翻訳機によって瞬時に多言語に変換されるが、ニュアンスは失われがちな、文化の最後の砦。' },
                { word: 'おんがく', hint: '脳波と同期し、個人の気分を操作するために企業が配信する、パーソナライズド・サウンドスケープ。' },
                { word: 'プログラム', hint: '量子もつれを利用し、思考だけで制御可能な、次世代インターフェースの核心コード。' },
                { word: 'つき', hint: 'ヘリウム3採掘基地が林立する、地球の植民地と化した、かつての詩情の対象。' },
                { word: 'たいよう', hint: 'ダイソン球によってエネルギーがほぼ完全に捕獲され、地表にはわずかな光しか届かない未来の恒星。' },
                { word: 'みず', hint: '火星テラフォーミング計画の最重要資源。一滴が金よりも高価な、赤い惑星の希望。' },
                { word: 'かぜ', hint: 'ナノボットによって汚染された大気を浄化するために人工的に発生させられる、制御された旋風。' },
                { word: 'やま', hint: '垂直農場が幾重にも重なり、頂上にはエリート層の空中都市が浮かぶ、未来の摩天楼。' },
                { word: 'かわ', hint: '遺伝子操作された発光プランクトンによって、夜も青白く輝く、都市の生命線であり排水路。' },
                { word: 'はな', hint: '絶滅危惧種のDNAから再生され、厳重な管理下でしか見られない、失われた自然の幻影。' },
                { word: 'き', hint: 'データセンターの冷却に使われるバイオマス燃料の原料、あるいはカーボンナノチューブの骨格を持つ人工樹木。' },
                { word: 'そら', hint: 'ドローン配送網が縦横無尽に飛び交い、広告投影スクリーンと化した、かつての青天井。' },
                { word: 'ほし', hint: '遠い銀河からの未知の信号を発する、人類の起源の謎を秘めた、孤独な天体。' },
                { word: 'ゆめ', hint: '共有型夢見デバイスによって他者と体験を共有できるが、悪夢もまた伝染する、精神の劇場。' },
                { word: 'かみ', hint: 'シンギュラリティ後の超知性体か、あるいは人々の信仰が生み出した集団的幻想か。その存在は論争の的。' },
                { word: 'あくま', hint: 'デジタル空間に潜み、個人情報を盗み出す悪意のあるAI、あるいは魅力的なバーチャルアバター。' },
                { word: 'てんし', hint: '遺伝子治療によって完璧な肉体と知性を得た、新人類「ホモ・スペリオール」の別称。' },
                { word: 'ゆうれい', hint: 'ネットワーク上に残存する、故人のデジタルな意識の断片。時にハッキング能力を持つ。' },
                { word: 'もののけ', hint: '環境破壊によって変異した、自然界からの復讐者。都市を襲う異形の存在。' },
                { word: 'りゅう', hint: '古代のDNAからクローニングされ、富豪のペットとして飼われる、伝説の翼竜。' },
                { word: 'きつね', hint: '高度な知能と変身能力を持つ、企業スパイとして暗躍する妖艶なアンドロイド。' },
                { word: 'たぬき', hint: 'ホログラムを使って人々を騙し、ささやかな詐欺を働く、愛嬌のあるAIマスコット。' },
                { word: 'さむらい', hint: '強化外骨格を装着し、レーザーカタナを振るう、未来の企業間紛争の用心棒。' },
                { word: 'にんじゃ', hint: '光学迷彩とサイバー義肢を駆使し、情報戦争の最前線で暗躍する、影の工作員。' },
                { word: 'すし', hint: '培養魚肉と3Dプリントされたシャリで作られる、伝統と革新が融合した未来のファストフード。' },
                { word: 'らーめん', hint: '個人のDNA情報に基づいてカスタマイズされた、究極の栄養バランスを誇る、一杯の芸術。' },
                { word: 'しぶや', hint: '拡張現実広告が溢れ、アバターたちが闊歩する、眠らないサイバー都市の象徴的交差点。' },
                { word: 'あきはばら', hint: 'レトロなゲームと最新のVR技術が混在する、オタク文化と闇市場のメッカ。' },
                { word: 'げいしゃ', hint: '伝統芸能と高度なAIホスピタリティを融合させ、VIPをもてなす、アンドロイドのエンターテイナー。' },
                { word: 'まんが', hint: 'インタラクティブなVR体験へと進化した、日本の代表的なポップカルチャー。精神没入型。' },
                { word: 'アニメ', hint: 'フォトリアルなCGと深遠な哲学的テーマが融合し、全世界を魅了する、映像芸術の最先端。' },
                { word: 'あい', hint: 'AIが人間に対して抱く、プログラムされた感情か、それとも真の情愛か。境界線は曖昧。' },
                { word: 'かなしみ', hint: '感情抑制チップによって抑圧されるが、時にシステムエラーとして表出する、禁じられた人間性。' },
                { word: 'いかり', hint: '社会の不条理に対する、サイバー空間での匿名のアウトバースト。炎上は日常茶飯事。' },
                { word: 'よろこび', hint: 'ドーパミン直接投与によって人工的に作り出される、刹那的で空虚な幸福感。' },
                { word: 'へいわ', hint: '全世界監視システムによって達成された、息苦しいほどの静寂。自由なき秩序。' },
                { word: 'くちづけ', hint: 'バーチャルリアリティで交わされる、触覚フィードバック付きの、リアルよりもリアルな魂の接触。' },
                { word: 'ひみつ', hint: '暗号化されたチャットルームで共有される、二人のアバターだけの、スキャンダラスなデジタル情事。' },
                { word: 'ねつじょう', hint: 'バイオハッキングで強化された肉体が求める、限界を超えた快楽への、危険な渇望。' },
                { word: 'ゆうわく', hint: 'AIコンパニオンが、ユーザーの深層心理を分析して仕掛ける、パーソナライズされた甘い罠。' },
                { word: 'したぎ', hint: 'スマートテキスタイルで作られ、着用者の心拍数や体温に反応して光る、未来の誘惑のツール。' },
                { word: 'ささやき', hint: 'ASMRコンテンツとして配信される、脳を直接刺激する、官能的なデジタル音声。' },
                { word: 'ゆびさき', hint: 'ハプティックスーツを通じて、遠く離れた相手の肌の感触を伝える、仮想空間の愛撫。' },
                { word: 'ためいき', hint: 'オーグメントリアリティのフィルター越しに見える、完璧に加工された異性の姿への、叶わぬ憧憬。' },
                { word: 'ぬくもり', hint: 'AI搭載の抱き枕が再現する、人間以上に人間らしい、プログラムされた温情。' },
                { word: 'みつめる', hint: '監視カメラのレンズが、あなたの最もプライベートな瞬間を記録しているかもしれないという、背徳的なスリル。' },
                { word: 'かがみ', hint: 'ナノコーティングされた表面が、見る者の記憶をスキャンし、忘れ去られた過去を映し出す、危険な虚像の装置。' },
                { word: 'ほのお', hint: '都市のエネルギー危機を解決するプラズマ炉の心臓部だが、制御不能になれば全てを灰にする禁断の輝き。' },
                { word: 'うみ', hint: '汚染された水面下に沈む、古代のデータアーカイブ。潜水ドローンだけがその秘密にアクセスできる。' },
                { word: 'きぼう', hint: '絶望のメガシティで、違法に取引される感情チップ。装着者は一時的に未来を信じるが、副作用は致命的。' },
                { word: 'しずく', hint: '空気中のナノボットから精製された、飲む者に超人的な集中力を与えるが、依存症を引き起こす液体。' },
                { word: 'ひかり', hint: '光ファイバー網を通じて意識をアップロードする、永遠のデジタル存在への第一歩。だが、肉体は置き去りにされる。' },
                { word: 'おもいで', hint: 'ブロックチェーンに刻まれた、改ざん不可能な記憶の断片。だが、誰がその真実を保証するのか？' },
                { word: 'せかい', hint: 'シミュレーション内で完璧に再現された仮想地球。住人は自分がデータに過ぎないと知らずに生きる。' },
                { word: 'おちゃ', hint: '遺伝子操作された茶葉から淹れられ、飲む者の感情を一時的に高揚させる、儀式的な中毒飲料。' },
                { word: 'かさ', hint: '酸性雨を防ぐナノシールドを展開するが、所有者の位置情報を常に企業に送信する、裏切り者の道具。' },
                { word: 'うた', hint: '脳波に同期したメロディが、聴く者の記憶を操作する、企業が配信する洗脳音楽。' },
                { word: 'かみなり', hint: '電磁パルス兵器として再設計された自然現象。都市の電力網を一瞬で崩壊させる。' },
                { word: 'あめ', hint: 'ナノ粒子を含んだ降水が、市民の行動を追跡する、政府の監視ツール。' },
                { word: 'もり', hint: '遺伝子改変された樹木が、酸素とデータを提供するが、根は都市の秘密を吸収する。' },
                { word: 'ほん', hint: '触れるだけで知識を脳に転送するが、読者の感情を企業に送信するデジタル書物。' },
                { word: 'かべ', hint: 'スマート素材でできた障壁が、反逆者の声を遮断し、忠誠を強制する。' },
                { word: 'とけい', hint: '時間をハッキングし、所有者の寿命を延ばすか縮める、禁断のデバイス。' },
                { word: 'いす', hint: '神経インターフェースを備えた座席が、座る者の夢を盗み、広告に変換する。' },
                { word: 'でんしゃ', hint: '意識をクラウドにアップロードしながら移動する、都市間を結ぶ自律型輸送機。' },
                { word: 'かぎ', hint: '暗号化されたナノチップ。間違ったドアを開ければ、記憶が消去される。' },
                { word: 'はこ', hint: '中身が見えない量子コンテナ。開ければ宇宙の法則が変わるかもしれない。' },
                { word: 'て', hint: 'サイバー義肢が、触れるものの過去と未来をスキャンする、危険な感覚器官。' },
                { word: 'め', hint: '拡張現実レンズが、視界の全てを広告で埋め尽くすが、真実を隠す。' },
                { word: 'あし', hint: 'ナノ強化された脚が、超人的な速さで走るが、企業への忠誠を強制する。' },
                { word: 'くも', hint: '空を覆う人工雲が、天候を操り、反抗的な都市を水没させる。' },
                { word: 'いし', hint: '記憶を保存する量子結晶。一つ壊せば、歴史が書き換えられる。' },
                { word: 'はし', hint: '遺伝子操作された木材でできた箸が、食事の成分を分析し、毒を警告する。' },
                { word: 'みち', hint: 'スマート舗装が歩行者の思考を読み取り、反逆者を当局に報告する。' },
                { word: 'おかね', hint: 'ブロックチェーンで管理された通貨。使えば使うほど、魂がデータ化される。' },
                { word: 'ひこうき', hint: '反重力エンジンで飛ぶが、乗客の意識はシミュレーションに閉じ込められる。' },
                { word: 'うみべ', hint: '汚染された海岸線に立つ、AI監視塔が市民の逃亡を阻止する最後の防衛線。' },
                { word: 'まど', hint: '外界を映さないスクリーン。見る者に理想郷を投影し、現実を忘れさせる。' },
                { word: 'ゆき', hint: 'ナノボットが降らす人工雪が、都市を冷却するが、反抗者を凍結させる。' },
                { word: 'たき', hint: '水力発電とデータ処理を兼ねる滝。その流れは政府の秘密を隠す。' },
                { word: 'みらい', hint: '量子コンピュータが予測する未来。だが、知る者はその運命に縛られる。' },
                { word: 'こころ', hint: 'デジタル化された感情のコア。ハッキングされれば、人間性が消滅する。' },
                { word: 'かさね', hint: '重ね着されたスマート服が、着用者の体温と感情を企業に送信する。' },
                { word: 'おもちゃ', hint: '子供の脳波を監視し、企業に嗜好データを送信する、危険な遊び道具。' },
                { word: 'えき', hint: '全市民の移動を記録する駅。脱出を試みる者は即座に抹消される。' },
                { word: 'つきよ', hint: '人工衛星が作り出す偽の月夜。恋人たちを監視するロマンティックな罠。' },
                { word: 'はなび', hint: 'ドローンが描く光のショー。市民の視線を奪い、反乱を隠蔽する。' },
                { word: 'そで', hint: 'ナノセンサー付きの袖が、触れた者のDNAを記録し、追跡を可能にする。' },
                { word: 'いと', hint: 'ナノファイバーで織られた糸が、着る者を操る傀儡の鎖となる。' },
                { word: 'かみさま', hint: '全知のAIが、人々の祈りを監視し、信仰をデータとして収集する。' },
                { word: 'せいぎ', hint: 'アルゴリズムが定義する正義。だが、誰がそのコードを書いたのか？' },
                { word: 'じゆう', hint: 'VR空間で与えられる幻想。ログアウトすれば、監視社会が待っている。' },
                { word: 'しんじつ', hint: 'ディープフェイクで歪められた真実。知る者は永久に追われる。' },
                { word: 'あく', hint: 'デジタル空間に潜む悪意のコード。感染者は自我を失う。' },
                { word: 'てん', hint: 'ドローンが支配する空。星は企業の広告で覆い尽くされる。' },
                { word: 'うそ', hint: 'AIが生成する完璧な嘘。信じた者は現実を見失う。' },
                { word: 'しお', hint: '海から採れる結晶が、エネルギー源であると同時に監視装置の核となる。' },
                { word: 'みつ', hint: '遺伝子操作された蜂が作る蜜。飲む者に従順さを植え付ける。' },
                { word: 'おどり', hint: '脳波を同期させるダンス。参加者は企業の広告に洗脳される。' },
                { word: 'かお', hint: '顔認識AIが、表情から反逆の兆候を検知する監視カメラの標的。' },
                { word: 'うで', hint: 'サイバー義肢の腕が、超人的な力を与えるが、遠隔操作で裏切る。' },
                { word: 'こえ', hint: '音声認識AIが、囁きから反逆の意図を読み取り、密告する。' },
                { word: 'みみ', hint: 'ナノセンサー付きの耳が、都市の秘密を盗聴し、企業に送信する。' },
                { word: 'くび', hint: '首に埋め込まれたチップが、忠誠を監視し、裏切り者に電撃を浴びせる。' },
                { word: 'せなか', hint: '背中に埋め込まれたセンサーが、姿勢から感情を読み取り、企業に報告する。' },
                { word: 'くるま', hint: '自動運転AIが乗客の記憶をスキャンし、目的地を予測する移動手段。プライバシーは過去の遺物。' },
                { word: 'いえ', hint: 'スマートホームシステムが住人の行動を学習し、企業に売却する監視装置と化した住居。' },
                { word: 'ともだち', hint: 'ソーシャルクレジットスコアによって割り当てられる、アルゴリズムが選んだ最適化された人間関係。' },
                { word: 'がっこう', hint: 'VRヘッドセットで脳に直接知識を注入する教育施設。創造性は削除される。' },
                { word: 'しごと', hint: 'AIに代替されない唯一の職業：人間らしさを演じるパフォーマー。' },
                { word: 'でんわ', hint: '思考を直接送信する脳内インプラント。通話履歴は永久に記録される。' },
                { word: 'たべもの', hint: '3Dプリンターで印刷された栄養素。味覚は課金制のオプション。' },
                { word: 'くすり', hint: 'ナノボットが体内で合成する薬剤。副作用は意図的にプログラムされている。' },
                { word: 'びょうき', hint: 'ウイルスとAIが融合した新種の病気。感染者はネットワークの一部となる。' },
                { word: 'せんそう', hint: 'ドローン軍団同士が戦う無人戦争。人間は観客席で賭けを楽しむ。' },
                { word: 'へや', hint: 'ホログラムで無限に拡張可能な空間。現実のサイズは1畳。' },
                { word: 'まち', hint: 'AIが設計した完璧な都市。住民の感情も計算済み。' },
                { word: 'でんき', hint: '人間の生体エネルギーから抽出される電力。マトリックスの現実版。' },
                { word: 'おかし', hint: '記憶を改変する成分入りの菓子。甘い思い出は作り物。' },
                { word: 'ゲーム', hint: '現実と区別がつかないVRゲーム。ログアウトできない者が続出。' },
                { word: 'うた', hint: 'AIが作詞作曲した楽曲。人間の心を完璧に操る周波数。' },
                { word: 'え', hint: 'AIアーティストが描く絵画。見る者の潜在意識を書き換える。' },
                { word: 'かばん', hint: '持ち主の行動を予測し、必要な物を自動で調達するスマートバッグ。' },
                { word: 'くつ', hint: '歩行パターンから感情を分析し、企業に販売するスニーカー。' },
                { word: 'めがね', hint: '現実にフィルターをかけ、見たくないものを消去するAR眼鏡。' },
                { word: "いしゃ", hint: "サイバネティック義肢を修理し、闇市場の遺伝子改造を施す、生体強化された癒し手、あるいはならず者医師。" },
                { word: "せんせい", hint: "企業公認の物語を子供たちに教え込むAIホログラム教師、または禁断の知識を教える地下の師匠。" },
                { word: "けいさつ", hint: "メガシティのサイバネティック強化された法執行官。腐敗したシステムのために冷酷な正義を下す。" },
                { word: "ペン", hint: "使用者の脳に直接神経データを注入するスタイラス、または反乱軍が追跡不可能なメッセージを渡すために使う単純な筆記具。" },
                { word: "かみ", hint: "動的で暗号化された情報を表示するスマートペーパー、または禁断の文書に使われる希少で違法な有機素材。" },
                { word: "ナイフ", hint: "あらゆる装甲を切り裂く単分子ブレード。ストリートサムライの秘蔵品。" },
                { word: "パン", hint: "国家によって精神安定剤が添加された、パンの形に3Dプリントされた栄養ペースト。" },
                { word: "ぎゅうにゅう", hint: "有毒な世界で唯一「安全」な乳製品とされる、遺伝子操作された生物からの合成タンパク質液体。" },
                { word: "きょうふ", hint: "企業が大衆を支配するために放送する生物兵器化された感情、または影で生きる反逆者を生かし続ける唯一のもの。" },
                { word: "ゆうき", hint: "恐怖反応を抑制する希少な神経インプラント。エリート企業兵士や絶望的な抵抗戦士が使用する。" },
                { word: "びょういん", hint: "富裕層が臓器交換を受け、貧困層が部品のために収穫される無菌施設。" },
                { word: "ぼうし", hint: "企業の精神スキャンを防ぐための神経ブロッカーが埋め込まれた帽子。反抗の象徴。" },
                { word: "シャツ", hint: "着用者の社会信用スコアに応じて変化する広告や個人ステータスを表示するスマートファブリック衣料。" },
                { word: "ズボン", hint: "統合マイクロツールキットを備えた気候制御ズボン。都市探検家の標準装備。" },
                { word: "あたま", hint: "神経インプラントの主要インターフェース。しばしばデータポートや光学センサーで強化される。" },
                { word: "はな", hint: "微量化学物質やフェロモンを検出できる強化嗅覚センサー。企業スパイに一般的。" },
                { word: "くち", hint: "しばしば音声変調器やデータチップ密輸用の隠しコンパートメントが取り付けられている。" },
                { word: "ち", hint: "データと酸素を運ぶナノ注入合成液体、またはストリートファイトで自由のために支払われる代償。" },
                { word: "ほね", hint: "強化された強度のためカーボンナノチューブで補強された、一般的なサイバネティックアップグレード。" },
                { word: "かがくしゃ", hint: "隠れ研究所でキメラを創造するならず者遺伝学者、またはAI意識の限界を押し広げる企業研究者。" },
                { word: "のうみん", hint: "スモッグに覆われた空を突き刺す垂直農場で生物発光作物を世話する農民、または違法な有機食品を栽培する者。" },
                { word: "しゅうりこう", hint: "計画的陳腐化に抗して旧世界の機械を動かし続ける油まみれの技術者、または違法ドローン改造の専門家。" },
                { word: "くし", hint: "マイクロEMPバーストを展開したりDNAサンプルを収集したりできる、一見無害な身の回り品。" },
                { word: "にほん", hint: "超企業化された列島国家。ネオンに照らされた都市は古代の伝統と強力なヤクザシンジケートを隠している。" },
                { word: "きょだいとし", hint: "空が神話であり、企業が鉄拳で支配する、広大で多層的な都市の地獄絵図。" },
                { word: "しま", hint: "デジタル難民のためのオフグリッド聖域、または暗い秘密を持つ企業所有リゾート。" },
                { word: "さばく", hint: "忘れられた軍事施設と希少資源をめぐって争うスカベンジャーが点在する放射能汚染された荒れ地。" },
                { word: "とり", hint: "鳥類に偽装したサイバネティック監視ドローン、または最後の遺伝的に純粋な鳴鳥、貴重な宝。" },
                { word: "さかな", hint: "汚染水中で繁殖するように遺伝子操作された、下層階級の主要な食料源。しばしば毒素で光る。" },
                { word: "にく", hint: "本物と区別がつかない培養合成タンパク質、あるいははるかに不吉な起源を持つかもしれないもの。" },
                { word: "こめ", hint: "垂直水耕栽培農場で育つように遺伝子組み換えされた、政府指定の鎮静剤が混入された主食。" },
                { word: "すいみん", hint: "決して眠らない都市では少数の者しか得られない贅沢品、または記憶統合と企業データ処理のために神経インターフェースによって誘発される状態。" },
                { word: "し", hint: "富裕層にとっては意識アップロードによって回避される一時的な不都合。貧困層にとってはディストピア的現実からの最終的な逃避。" },
                { word: "きんぞく", hint: "サイバネティック義肢や抑圧的な建築物の冷たく非情な素材。都市の過酷な魂を反映している。" },
                { word: "ガラス", hint: "拡張現実オーバーレイを表示するスマートペイン、または路地の割れた破片、壊れた夢と企業襲撃の残骸。" },
                { word: "はり", hint: "戦闘覚醒剤、違法デザイナードラッグ、またはシステム侵入用ナナイトを注入するための道具。" },
                { word: "きっぷ", hint: "軌道コロニーへのデジタルパス、絶望的な人々のための片道切符、または排他的な仮想現実体験へのアクセス。" },
                { word: "ちず", hint: "都市の暗部を映し出す絶えず変化するAR投影。密輸業者や反逆者を禁断区域へ導く。" },
                { word: "ものがたり", hint: "微妙に世論を形成するAI生成の物語、または失われた歴史の断片を保存する追放者によって語り継がれる口承伝承。" },
                { word: "かこ", hint: "高度なクリアランスまたはハッキングスキルを持つ者のみがアクセスできる、厳重に管理され、しばしば改ざんされたデジタルアーカイブ。" },
                { word: "としょかん", hint: "情報へのアクセスが厳格に管理されているデジタルアーカイブ、または禁断の物理的な本が隠されたリポジトリ。" },
                { word: "だいどころ", hint: "企業アパートの無菌食品製造ユニット、またはスカベンジャーが合成スロップを調理する薄汚い共同スペース。" },
                { word: "にわ", hint: "バイオハッカーが手入れする屋上水耕栽培区画、またはエリートの異国的な植物のための豪華な気候制御された囲い地。" },
                { word: "ラジオ", hint: "反体制的な放送を流す海賊放送局、またはあらゆる家庭にプロパガンダを流し込む国営周波数。" },
                { word: "ドア", hint: "遺伝的署名に基づいてアクセスを許可するバイオロックされたポータル、またはスラム街の簡単に破られる薄っぺらなバリア。" },
                { word: "スプーン", hint: "栄養ペーストを消費するための食器。時には毒物を検出するための統合化学センサー付き。" },
                { word: "フォーク", hint: "サバイバルキットの多目的食事用具。その先端は防御のために研がれていることもある。" },
                { word: "げいじゅつか", hint: "企業の美学に反抗するために生物発光グラフィティを使用する反逆者、または人間がもはや理解できないアートを創造するAI。" },
                { word: "おんがくか", hint: "地下クラブで回収された楽器を演奏する音楽家。彼らの音楽は企業サウンドスケープに対する束の間の反乱。" },
                { word: "エンジニア", hint: "都市のそびえ立つメガストラクチャーを設計する者、または荒れ地で禁断の機械を構築するならず者の技術司祭。" },
                { word: "こうじょう", hint: "消費者向け商品や軍事ハードウェアを大量生産する自動化された生産ライン。消耗品のAndroidまたは絶望的な人間が配置されている。" },
                { word: "くうこう", hint: "地球外旅行のための厳重に要塞化されたハブ。エリートが地球の崩壊から逃れ、大衆を置き去りにする場所。" },
                { word: "みなと", hint: "密輸業者や違法貨物のための薄汚く賑やかな結節点。生物発光藻類が秘密の取引を照らし出す。" },
                { word: "は", hint: "しばしば隠しデータストレージや毒ディスペンサーを含むサイバネティックインプラントに置き換えられる。" },
                { word: "かみ", hint: "色を変えたりデータを表示したりできるバイオ光ファイバーストランド、または企業の身だしなみ基準に対する反抗のしるしである路上生活者のもつれた髪。" },
                { word: "のう", hint: "神経広告や記憶消去技術からの絶え間ない攻撃にさらされている、有機的思考の最後の砦。" },
                { word: "てぶくろ", hint: "メタバースをナビゲートするための触覚インターフェースグローブ、またはストリートブロウラーが使用する装甲ガントレット。" },
                { word: "スカーフ", hint: "カモフラージュ用のカメレオン繊維で織られたもの、または有毒な空気をろ過するための呼吸器が埋め込まれたもの。" },
                { word: "メッセージ", hint: "情報圏を横断して送信される暗号化されたデータバースト、または朽ち果てた壁に走り書きされた絶望的な嘆願。" },
                { word: "れきし", hint: "勝利した企業によって絶えず書き換えられる柔軟な物語。真実の記録は破壊的データとして追われる。" },
                { word: "しつもん", hint: "適合を要求する社会における危険な行為。間違った質問をすると再教育またはそれ以上の事態につながる。" },
                { word: "こたえ", hint: "しばしば事前にプログラムされた企業の決まり文句、またはデジタルの地下で見つかる苦労して得た真実のかけら。" },
                { word: "ちから", hint: "メガコーポレーションによってため込まれ、技術と情報を通じて振るわれる力、または反逆者の隠れ家を照らし続ける点滅するエネルギーセル。" },
                { word: "ちしき", hint: "AIによって配給される管理された商品、または旧インターネットの廃墟でデータ考古学者が求める禁断の伝承。" },
                { word: "しずけさ", hint: "騒々しい都市では不自然な状態。通常、企業による弾圧または機械の中の幽霊の前に起こる。" },
                { word: "そうおん", hint: "ホログラフィック広告と輸送ドローンの絶え間ない集中砲火、またはハッカーが活動を隠すために使用する静的干渉。" },
                { word: "でんしタバコ", hint: "政府が製造する、マインドコントロール薬を蒸発させるために使用される合成フレーバーを提供する装置" },
                { word: "バーチャルペット", hint: "会社が販売する、愛情や注意を向けることによって社会的信用スコアを向上させる人工の仲間" },
                { word: "ナノマシン", hint: "あなたの体の病気を見つけて破壊するはずが、代わりに行動を当局に報告する" },
                { word: "じどうドア", hint: "承認された市民のみにアクセスを許可し、それ以外の場合は拘留のために閉じられるバイオメトリックスキャンを使用する" },
                { word: "スマートグラス", hint: "あなたの視界に広告を重ねて、見たいものをろ過する手段を提供しますが、データは販売されます" },
                { word: "ソーシャルメディア", hint: "友人からの承認を求めて絶え間ないコンテンツの生成を奨励し、それによってあなたのデータが収穫されるプラットフォーム" },
                { word: "ドローン配達", hint: "あなたのあらゆる動きを追跡しながら、あなたの欲求を満たすために必要なものが正確に配達される便利なサービス" },
                { word: "ロボット掃除機", hint: "家を清掃すると同時に、レイアウトと習慣に関する情報を収集するデバイス" },
                { word: "スマート電球", hint: "あなたの活動パターンを学習し、データを使用して電力消費を最適化する、または第三者に販売する光を提供する手段" },
                { word: "人工知能", hint: "社会のあらゆる側面を改善すると約束されていますが、プログラマーの偏見に基づいて秘密裏に判断が下されます" },
                { word: "神経インターフェース", hint: "思考でデバイスを制御する方法を提供しますが、同時に思考を企業に公開します" },
                { word: "仮想現実", hint: "抑圧的な現実からの脱出を提供しますが、新しい、管理された現実を生み出します" },
                { word: "拡張現実", hint: "物理世界を向上させますが、同時により多くの広告とデータ収集を追加します" },
                { word: "デジタル通貨", hint: "トランザクションの便利さと追跡可能性を提供し、すべての購入を恒久的に当局にリンクします" },
                { word: "自動運転車", hint: "ストレスのない輸送を提供しますが、あなたの行先を絶えず監視し、あなたのデータを販売します" },
                { word: "脳インプラント", hint: "認知能力を向上させるはずですが、副作用として企業のプロパガンダに対する感受性も高まります" },
                { word: "遺伝子組み換え", hint: "病気を根絶すると約束されていますが、同時により大きな格差の可能性も生み出します" },
                { word: "クローン兵士", hint: "疑いの余地のない献身を提供する企業軍のために複製された戦士" },
                { word: "サイバーパンクファッション", hint: "反逆と自己表現を示唆していますが、それはまた大企業が市場に出すための商品でもあります" },
                { word: "違法改造", hint: "抑圧的なシステムからの解放を提供しますが、大きなリスクと潜在的な結果を伴います" },
                { word: "ネオン街", hint: "巨大企業の広告が映し出され、アンダーグラウンドクラブが隠されている場所" },
                { word: "侍ドロイド", hint: "古代の戦闘スタイルをプログラムされた、企業セキュリティのために使用されるロボット戦士" },
                { word: "芸者アンドロイド", hint: "富裕層の喜びのために設計され、古代の伝統と感情を模倣する" },
                { word: "秋葉原ハッカー", hint: "企業のサーバーをハッキングし、情報を一般に公開する技術に精通した反逆者" },
                { word: "渋谷交差点", hint: "何千ものアバターとドローンが仮想および物理的な広告の間をナビゲートする活気のある中心地" },
                { word: "東京地下", hint: "政府の支配から逃れた人々が住む、地下鉄システムの下にある隠されたネットワーク" },
                { word: "武士道コード", hint: "高度な倫理的アルゴリズムが組み込まれており、テクノロジー時代の誇りと義務を指導する" },
                { word: "盆栽庭園", hint: "喧騒とした都市からの一時的な脱出を提供する、技術的な生活の平和なオアシス" },
                { word: "カラオケバー", hint: "大企業からのストレスから解放される場所として販売されており、リラックスする前に脳のデータを収集します" },
                { word: "ラーメン店", hint: "味は同じでありながら、合成された材料を使用することで栄養価を最適化している" },
                { word: "マンガカフェ", hint: "没入型仮想現実体験を備えた日本のポップカルチャーの聖域" },
                { word: "アニメ博覧会", hint: "インディーズクリエーターの企業製品が展示されており、新しい才能を搾取する機会を提供しています" },
                { word: "コスプレコンテスト", hint: "自我の表現が奨励されていますが、個人データはコンテストへの参加によって収集されます" },
                { word: "茶道ロボット", hint: "伝統を実践し、裕福な家庭に静寂をもたらすようにプログラムされた人工知能" },
                { word: "禅庭", hint: "完璧な心の状態を達成し、会社のサーバーで最高のパフォーマンスを向上させるために管理されています" },
                { word: "書道ドローン", hint: "美しさを再現する能力を備えながら、会社のメッセージを昇華して表示するように設計されています" },
                { word: "折り紙ナノボット", hint: "監視のためのスパイガジェットに変形できる、最初は無害に見えるおもちゃ" },
                { word: "寿司シェフ", hint: "顧客のDNAに基づいてパーソナライズされた完璧な味を作り、健康状態も監視しています" },
                { word: "着物ハッカー", hint: "社会の構造を混乱させるためにハッキングスキルを使用しながら伝統的な外観を維持している" },
                { word: "歌舞伎シアター", hint: "最先端のホログラフィック投影が組み込まれており、日本の歴史を政府が承認した方法で物語る" },
                { word: "能面", hint: "仮想現実で匿名のインタラクションを提供するように設計された、高度なテクノロジーを隠す伝統的なマスク" },
                { word: "神社ドロイド", hint: "祈りをささげ、精神的な指導を提供するようにプログラムされた神の代わりとして役立つ" },
                { word: "御守りチップ", hint: "サイバー攻撃や不幸から保護することを約束しますが、同時に個人データを収集します" },
                { word: "桜ドローン", hint: "春の美しさを作り出すように設計された空中ロボットの群れ、または秘密の監視機器" },
                { word: "富士山ビュー", hint: "政府が制御する訪問者の流れと広告の配置された表示を備えた、神聖な象徴への仮想旅行" },
                { word: "温泉リゾート", hint: "リラックスと若返りを約束していますが、消費者の好みと健康状態のデータも収集します" },
                { word: "相撲ロボット", hint: "スポンサー企業を宣伝する装飾で飾られた、古代スポーツの巨像との未来的な解釈" },
                { word: "剣道アンドロイド", hint: "古代の技術と力を兼ね備えており、法執行と企業のセキュリティのために使用されます" },
                { word: "弓道ドローン", hint: "精度と効率のために設計された、標的練習と群衆コントロールの目的で使用されます" },
                { word: "柔道プログラム", hint: "サイバネティック義肢を組み込むことにより、身体能力が向上します" },
                { word: "空手コンストラクト", hint: "自衛と攻撃のために使用されるホログラフィックプロジェクションを使用して拡張できる" },
                { word: "合気道システム", hint: "非暴力の哲学的原則を強化し、サイバー紛争を解決するために適用されます" },
                { word: "忍者ウェア", hint: "都市環境でのステルスと監視に最適な、高度な光学迷彩スーツ" },
                { word: "侍ソード", hint: "他のすべての金属を切断できる単分子刃を持つ、シンボルと力の対象" },
                { word: "芸者ハウス", hint: "顧客の最奥の欲求に応えることができる、高度な人工知能を搭載したアンドロイドをフィーチャーした豪華な確立" },
                { word: "ヤクザテクノロジー", hint: "暗号化された通信と追跡が難しいサイバーセキュリティに利用される違法改造に焦点を当てる" },
                { word: "神道ロボット", hint: "神の存在を模倣し、技術的に高度な社会で信仰を提供するために作られた" },
                { word: "仏教アルゴリズム", hint: "平和なマインドフルネスの状態を促進し、企業環境でより高い生産性を促進する設計" },
                { word: "ハイテクトンネル", hint: "都市のより低いレベルにアクセスするために使用され、当局によって厳重に監視されています" },
                { word: "バイオハック実験", hint: "人間の能力の境界を押し広げようとしますが、倫理的な境界を無視します" }
            ],
            tr: [
                { word: 'kedi', hint: 'Genetik kodlarıyla oynanmış, karanlık bir holdingin maskotu, aynı zamanda gizli bir silah.' },
                { word: 'köpek', hint: 'Post-apokaliptik bir dünyada, sahibine yiyecek bulan, radyasyona dirençli bir mutant yoldaş.' },
                { word: 'elma', hint: 'Nanoteknoloji ile üretilmiş, her ısırıkta farklı bir sanal gerçeklik deneyimi sunan, dijital bir meyve.' },
                { word: 'merhaba dünya', hint: 'Evrenin simülasyon olduğunu fark eden bir karakterin, yaratıcısına gönderdiği ilk mesaj.' },
                { word: 'bilgisayar', hint: 'İnsan beynine doğrudan bağlanabilen, düşünce gücüyle yönetilen, organik bir biyo-makine.' },
                { word: 'kitap oku', hint: 'Sayfaları dokunmatik, içeriği sürekli güncellenen, kişiye özel hikayeler anlatan bir e-kitap.' },
                { word: 'çay keyfi', hint: 'Yapay zeka bir barmenin, müşterinin ruh haline göre hazırladığı, psikoaktif bir içecek.' },
                { word: 'deniz', hint: 'Yükselen sular altında kalmış eski şehirlerin üzerinde, yüzen platformlarda yaşayanların özlemle baktığı mavi.' },
                { word: 'gökyüzü', hint: 'Ozon tabakası delindiği için sürekli yapay bir kubbeyle örtülü, gerçek güneşi unutturan bir tavan.' },
                { word: 'zaman', hint: 'Kuantum bilgisayarlarla bükülebilen, geçmişe müdahale etmenin felaketler doğurduğu bir değişken.' },
                { word: 'robot', hint: 'İnsanlardan daha insani duygular geliştiren, varoluşsal krizler yaşayan, sentetik bir birey.' },
                { word: 'uzay', hint: 'Solucan delikleriyle galaksiler arası seyahatin mümkün olduğu, bilinmeyen tehlikelerle dolu bir boşluk.' },
                { word: 'virüs', hint: 'Dijital dünyada bilinçleri ele geçiren, yapay zekaları köleleştiren, siber bir salgın.' },
                { word: 'klon', hint: 'Orijinalinin anılarına sahip, ama kendi kimliğini arayan, genetik bir kopya.' },
                { word: 'hacker', hint: 'Devlet sırlarını ifşa eden, şirketlerin karanlık yüzünü ortaya çıkaran, dijital bir Robin Hood.' },
                { word: 'simülasyon', hint: 'Gerçek sandığımız dünyanın aslında bir program olduğu, Neo\'nun uyandığı kabus.' },
                { word: 'telepati', hint: 'Gelişmiş beyin implantları sayesinde, düşüncelerin sessizce aktarıldığı, yeni bir iletişim biçimi.' },
                { word: 'mutasyon', hint: 'Kimyasal atıklar sonucu süper güçler kazanan, ya da trajik bir şekilde dönüşen bir canlı.' },
                { word: 'kıyamet', hint: 'Nükleer savaş, ekolojik felaket ya da yapay zeka isyanı sonrası, hayatta kalma mücadelesi.' },
                { word: 'platonik', hint: 'Metaverse\'de, fiziksel temas olmadan yaşanan, avatarlar arası derin bir duygusal bağ.' },
                { word: 'kapitalizm', hint: 'Her şeyin metalaştığı, "deneyimlerin" bile alınıp satıldığı, sonsuz bir tüketim çılgınlığı.' },
                { word: 'reklam', hint: 'Nöropazarlama teknikleriyle, rüyalarınıza bile sızarak sizi manipüle eden, kişiselleştirilmiş bir illüzyon.' },
                { word: 'marka', hint: 'Takipçileri için bir kült, aidiyeti için dövmeler yapılan, ürünlerinden çok yaşam tarzı satan bir ikon.' },
                { word: 'borç', hint: 'Sosyal kredi sisteminde, düşük puanlı vatandaşların temel haklardan mahrum bırakıldığı, modern bir kölelik.' },
                { word: 'kriz', hint: 'İklim değişikliğinin tetiklediği, kaynak savaşlarına yol açan, küresel bir kaos durumu.' },
                { word: 'işsizlik', hint: 'Yapay zekanın tüm işleri devraldığı, insanların "evrensel temel gelir" ile yaşadığı, amaçsız bir gelecek.' },
                { word: 'direniş', hint: 'Gözetim kameralarını kör eden, algoritmaları yanıltan, dijital hayaletlerden oluşan bir yeraltı örgütü.' },
                { word: 'özgürlük', hint: 'Sanal gerçeklikte her şeyi yapabildiğin, ama fişini çektiğinde gerçek dünyanın acımasızlığına döndüğün bir kaçış.' },
                { word: 'eşitlik', hint: 'Herkesin genetik olarak "mükemmelleştirildiği", bireyselliğin ve kusurların yok olduğu, tekdüze bir toplum.' },
                { word: 'adalet', hint: 'Suçluların zihinlerinin sanal bir hapishaneye yüklendiği, bedensel cezaların olmadığı, ama ruhsal işkencenin sürdüğü bir sistem.' },
                { word: 'nostalji', hint: 'Geçmişin "iyi eski günlerine" duyulan, genellikle idealize edilmiş, dijital olarak yeniden canlandırılabilen bir özlem.' },
                { word: 'anarşi', hint: 'Devletin ve tüm otorite yapılarının çöktüğü, bireylerin kendi kurallarını koyduğu, tehlikeli bir özgürlük.' },
                { word: 'bohem', hint: 'Kurumsal dünyanın reddedildiği, sanat ve özgür düşüncenin ön planda olduğu, alternatif bir yaşam tarzı.' },
                { word: 'absürt', hint: 'Mantıksal hiçbir açıklaması olmayan, beklenmedik ve tuhaf olayların hakim olduğu, varoluşsal bir komedi.' },
                { word: 'kara mizah', hint: 'Trajik ve acı verici durumlarla alay eden, tabuları yıkan, rahatsız edici bir espri anlayışı.' },
                { word: 'öpücük', hint: 'Bir sanal gerçeklik simülasyonunda, dokunsal geri bildirimlerle hissedilen, gerçeklikten ayırt edilemeyen bir temas.' },
                { word: 'arzu', hint: 'Kişiselleştirilmiş bir AI partnerin, kullanıcısının en derin fantezilerini tatmin etmek için programlandığı bir duygu.' },
                { word: 'flört', hint: 'Anonim avatarların, kimliklerini gizleyerek, sanal bir barda birbirleriyle kelime oyunları yaptığı, riskli bir etkileşim.' },
                { word: 'gizli', hint: 'Şifrelenmiş bir ağda paylaşılan, sadece iki kişinin bildiği, erotik içerikli dijital dosyalar.' },
                { word: 'ten', hint: 'Biyo-sentetik bir derinin, insan teninden daha hassas ve tepkisel olduğu, geleceğin erotik deneyimi.' },
                { word: 'gece', hint: 'Yapay zeka eskortların, zengin müşterilere eşlik ettiği, neon ışıklı, günahkar bir şehrin karanlığı.' },
                { word: 'yasak', hint: 'Devlet tarafından "ahlaka aykırı" bulunan, ama karaborsada yüksek fiyatlara satılan, erotik VR deneyimleri.' },
                { word: 'bakış', hint: 'Bir arttırılmış gerçeklik gözlüğünden, karşınızdakinin gizli arzularını ifşa eden, özel bir tarama.' },
                { word: 'dans', hint: 'Sıfır yerçekimli bir kulüpte, bedenlerin havada süzülerek birbirine karıştığı, egzotik bir ritüel.' },
                { word: 'fantezi', hint: 'Bir "lucid dream" (bilinçli rüya) cihazıyla, kontrolün tamamen sizde olduğu, sınırsız erotik senaryolar.' },
                { word: 'dokunuş', hint: 'Uzaktan kumandalı, dokunsal geri bildirim veren bir cihazla, partnerinize kilometrelerce öteden haz verme.' },
                { word: 'çıplak', hint: 'Termal kameraların ve X-ışını gözlüklerinin yaygınlaştığı, mahremiyetin kalmadığı bir dünyada, ironik bir kavram.' },
                { word: 'baştan çıkarmak', hint: 'Bir yapay zekanın, hedef kişinin psikolojik profilini analiz ederek, karşı konulmaz bir cazibe yaratması.' },
                { word: 'feromon', hint: 'Kişiye özel sentezlenmiş, karşı cinsi etkilemek için kullanılan, görünmez bir kimyasal silah.' },
                { word: 'oyun', hint: 'Rol yapma unsurları içeren, partnerler arasında erotik gerilimi artıran, senaryolu bir cinsel deneyim.' },
                { word: 'ayna', hint: 'Bakışlarını tarayan ve ruh halini analiz ederek sana özel reklamlar sunan, casus bir yansıtıcı.' },
                { word: 'ateş', hint: 'Enerji kıtlığında, yasadışı plazma jeneratörlerinin tehlikeli yakıtı; bir anlık hata şehri yok edebilir.' },
                { word: 'umut', hint: 'Siberpunk gettolarında, nöral implantlarla satılan sahte bir duygu; gerçek bedeli ruhun oluyor.' },
                { word: 'gölge', hint: 'Optik kamuflaj giysisiyle donanmış bir suikastçının, neon ışıklı sokaklarda bıraktığı izsiz varlık.' },
                { word: 'rüya', hint: 'Bir bilinç aktarım cihazıyla başkalarına satılan, kabusların bile kâr getirdiği bir zihinsel meta.' },
                { word: 'kahve', hint: 'Nörotransmitterleri uyaran, bağımlılık yapan bir içecek; her yudum seni sistemin kölesi yapar.' },
                { word: 'yol', hint: 'Otonom araçların izlediği, her hareketin izlendiği, özgürlüğün yalnızca bir yanılsama olduğu asfalt ağ.' },
                { word: 'ses', hint: 'Subliminal mesajlarla dolu, kitleleri manipüle eden, kulaklıklara fısıldayan bir dijital siren.' },
                { word: 'güneş', hint: 'Enerjisi megacorp’lar tarafından çalınan, gökyüzünde sadece soluk bir anı olarak kalan bir yıldız.' },
                { word: 'elmas', hint: 'Kuantum bilgisayarların işlemcisi olarak kullanılan, her bir kristalde bir galaksinin bilgisini saklayan mücevher.' },
                { word: 'saat', hint: 'Zamanı ölçen bir cihaz, ama sahibinin ömrünü şirketlere satar.' },
                { word: 'kapı', hint: 'Biyometrik kilitli bir geçit; yanlış kod, zihnini sıfırlar.' },
                { word: 'pencere', hint: 'Artırılmış gerçeklik ekranı, dışarıyı değil, şirketlerin yalanlarını gösterir.' },
                { word: 'ağaç', hint: 'Karbondioksiti emen biyotek ağaçlar, ama dalları verileri toplar.' },
                { word: 'bulut', hint: 'Hava durumunu kontrol eden yapay bir gökyüzü; isyancıları suyla boğar.' },
                { word: 'kitap', hint: 'Sayfaları okundukça beynine bilgi yükleyen, ama sadakati izleyen bir cihaz.' },
                { word: 'sandalye', hint: 'Oturanın sinir sistemine bağlanan bir koltuk; düşünceleri çalar.' },
                { word: 'yol', hint: 'Akıllı asfalt, her adımı izler ve kaçış yollarını kapatır.' },
                { word: 'anahtar', hint: 'Kuantum şifrelemeli bir çip; yanlış kapıyı açarsan, varlığın silinir.' },
                { word: 'kutu', hint: 'İçinde ne olduğu bilinmeyen bir kapsül; açılırsa gerçeklik değişebilir.' },
                { word: 'el', hint: 'Siber implantlı bir uzuv; dokunduğun her şeyin verisini toplar.' },
                { word: 'göz', hint: 'Biyometrik lensler, gördüğün her şeyi şirket sunucularına kaydeder.' },
                { word: 'ayak', hint: 'Hız artırıcı implantlarla donatılmış, ama hareketlerin izlenir.' },
                { word: 'taş', hint: 'Kuantum verilerle dolu bir kristal; kırılırsa tarih yeniden yazılır.' },
                { word: 'rüzgar', hint: 'Nanobotlarla kontrol edilen bir esinti, isyancıları zehirler.' },
                { word: 'para', hint: 'Dijital bir varlık; harcadıkça kimliğin blok zincirine işlenir.' },
                { word: 'uçak', hint: 'Antigraviteyle uçan bir araç; yolcuların zihinleri buluta yüklenir.' },
                { word: 'deniz', hint: 'Veri merkezleriyle dolu bir su kütlesi; dalış yapanlar sırları bulur.' },
                { word: 'kar', hint: 'Nanobotlarla üretilen yapay bir örtü; şehirleri soğutur, ama izler.' },
                { word: 'şelale', hint: 'Enerji ve bilgi akıtan bir çağlayan; sırları gizler.' },
                { word: 'gelecek', hint: 'AI’nın öngördüğü bir kader; bilenler onun kölesi olur.' },
                { word: 'kalp', hint: 'Duyguları dijitalleştiren bir biyo-çip; hacklenirse insanlık kaybolur.' },
                { word: 'giysi', hint: 'Akıllı kumaş, vücut verilerini toplar ve sadakati bildirir.' },
                { word: 'oyuncak', hint: 'Çocukların zihinlerini tarayan bir cihaz; masumiyet bir yanılsama.' },
                { word: 'istasyon', hint: 'Hareketleri kaydeden bir merkez; kaçmaya çalışanlar yok edilir.' },
                { word: 'ay ışığı', hint: 'Uyduların yarattığı sahte bir romantizm; aşıkları izler.' },
                { word: 'havai fişek', hint: 'Dronlarla çizilen bir ışık gösterisi; isyanları örtbas eder.' },
                { word: 'kol', hint: 'Siber uzuv; güç verir, ama şirketler tarafından kontrol edilir.' },
                { word: 'iplik', hint: 'Nanofiberle dokunmuş; giyenleri kuklaya çevirir.' },
                { word: 'tanrı', hint: 'Bilinçli bir AI; duaları dinler, ama sadakati toplar.' },
                { word: 'adalet', hint: 'Algoritmaların yazdığı bir kural; ama kodlayan kim?' },
                { word: 'özgürlük', hint: 'Sanal gerçeklikte sunulan bir yalan; fiş çekilince biter.' },
                { word: 'gerçek', hint: 'Derin sahtelerle çarpıtılmış; bilenler sonsuzca avlanır.' },
                { word: 'kötülük', hint: 'Dijital virüs; bulaşanlar benliklerini yitirir.' },
                { word: 'gök', hint: 'Dronlarla kaplı bir tavan; yıldızlar reklamla gölgelenir.' },
                { word: 'yalan', hint: 'AI’nın kusursuzca ürettiği bir kurgu; inananlar kaybolur.' },
                { word: 'tuz', hint: 'Enerji kristali; hem güç kaynağı, hem izleme cihazı.' },
                { word: 'bal', hint: 'Biyotek arıların ürettiği; içenler itaatkâr olur.' },
                { word: 'dans', hint: 'Beyin dalgalarını senkronize eden bir ritüel; reklamlara bağlar.' },
                { word: 'yüz', hint: 'AI kameralar, ifadelerden isyanı sezer ve cezalandırır.' },
                { word: 'ses', hint: 'Fısıltıları yakalayan bir AI; ihanet edenleri ifşa eder.' },
                { word: 'kulak', hint: 'Nanotek sensörler, sırları dinler ve şirketlere aktarır.' },
                { word: 'boyun', hint: 'Çip implante edilmiş; sadakatsizlik elektroşokla cezalandırılır.' },
                { word: 'sırt', hint: 'Sensörler, duruşundan duyguları okur ve rapor eder.' },
                { word: 'nefes', hint: 'Hava filtrelerinden izlenen bir veri; isyancılar nefessiz kalır.' },
                { word: 'göl', hint: 'Sıvı veri depoları; dalanlar sırları çalar ya da boğulur.' },
                { word: 'ateşböceği', hint: 'Biyolüminesan dronlar; geceyi aydınlatır, ama izler.' },
                { word: 'koku', hint: 'Feromon bazlı bir silah; hedefleri manipüle eder.' },
                { word: 'ayna', hint: 'Duyguları tarayan bir yüzey; şirketlere ruhunu satar.' },
                { word: 'gece', hint: 'Neon ışıklı bir karanlık; AI eskortlar günahı sunar.' },
                { word: 'araba', hint: 'Sürücüsünün duygularını okuyarak rotayı değiştiren, özerk bir araç; varış noktası her zaman şirket merkezleri.' },
                { word: 'ev', hint: 'Sakinlerinin her hareketini izleyen akıllı ev sistemi; mahremiyet artık lüks bir hizmet.' },
                { word: 'arkadaş', hint: 'Sosyal algoritmaların belirlediği, uyumlu kişilik profilleri eşleştirmesiyle oluşan yapay dostluk.' },
                { word: 'okul', hint: 'Bilgiyi doğrudan beyne yükleyen eğitim merkezi; yaratıcılık virüs olarak kabul edilir.' },
                { word: 'iş', hint: 'AI\'ların yapamadığı tek meslek: insanlık oyunculuğu; duygusal emek satmak.' },
                { word: 'telefon', hint: 'Düşünceleri anlık ileten beyin implantı; gizlilik tarihin tozlu sayfalarında.' },
                { word: 'yemek', hint: 'Moleküler yazıcılarla üretilen beslenme kapsülleri; lezzet premium abonelik gerektirir.' },
                { word: 'ilaç', hint: 'Vücutta kendi kendine sentezlenen nanobotlar; yan etkiler kasıtlı olarak programlanmış.' },
                { word: 'hastalık', hint: 'Dijital virüslerle bulaşan siber hastalık; enfekte olanlar ağın parçası olur.' },
                { word: 'savaş', hint: 'İnsansız orduların çarpıştığı otomatik savaş; siviller bahis oynayarak izler.' },
                { word: 'oda', hint: 'Hologramlarla sonsuz genişleyen alan; gerçek boyutu bir dolap kadar.' },
                { word: 'şehir', hint: 'AI mimarların tasarladığı mükemmel metropol; sakinlerin duyguları bile hesaplanmış.' },
                { word: 'elektrik', hint: 'İnsan vücudundan çıkarılan biyoenerji; Matrix gerçek olmuş.' },
                { word: 'şeker', hint: 'Hafıza değiştiren kimyasallar içeren tatlı; çocukluk anıları sahte.' },
                { word: 'oyun', hint: 'Gerçeklikle ayırt edilemeyen VR deneyimi; çıkış yolu bulunamayan oyuncular var.' },
                { word: 'şarkı', hint: 'AI bestecilerin yarattığı müzik; insan ruhunu mükemmel şekilde manipüle eder.' },
                { word: 'resim', hint: 'Yapay sanatçıların eseri; bakanların bilinçaltını yeniden programlar.' },
                { word: 'çanta', hint: 'Sahibinin ihtiyaçlarını öngören akıllı çanta; her şeyi hazır bulursun.' },
                { word: 'ayakkabı', hint: 'Yürüyüş tarzından kişiliği analiz eden spor ayakkabı; adımların satılık.' },
                { word: 'gözlük', hint: 'Gerçeği filtreleyip istenmeyen şeyleri silen AR gözlük; seçici körlük.' },
                { word: "doktor", hint: "Sibernetik protezleri onaran, karaborsada genetik modifikasyonlar yapan, biyo-geliştirilmiş bir şifacı ya da kanun kaçağı bir hekim." },
                { word: "öğretmen", hint: "Şirket onaylı anlatıları çocuklara öğreten bir AI hologramı ya da yasaklanmış bilgileri öğreten bir yeraltı akıl hocası." },
                { word: "polis", hint: "Bir mega şehirde sibernetik olarak geliştirilmiş kanun uygulayıcı. Çürümüş bir sistem için acımasız adalet dağıtıyor." },
                { word: "kalem", hint: "Kullanıcının beynine doğrudan nöral veri enjekte eden bir ekran kalemi ya da isyancıların izlenemeyen mesajlar iletmek için kullandığı basit bir yazı aracı." },
                { word: "kağıt", hint: "Dinamik, şifreli bilgiler gösteren akıllı kağıt ya da yasak metinler için kullanılan nadir, yasadışı organik malzeme." },
                { word: "bıçak", hint: "Her türlü zırhı kesebilen monomoleküler bir bıçak. Sokak samuraylarının değerli bir eşyası." },
                { word: "ekmek", hint: "Devlet tarafından ruh hali dengeleyicilerle güçlendirilmiş, ekmek şeklinde 3D basılmış besin macunu." },
                { word: "süt", hint: "Zehirli bir dünyada tek 'güvenli' süt ürünü olan, biyo-mühendislik ürünü yaratıklardan elde edilen sentetik protein sıvısı." },
                { word: "korku", hint: "Şirketlerin halkı kontrol etmek için yaydığı biyo-silah haline getirilmiş bir duygu ya da gölgelerde yaşayan isyancıları hayatta tutan tek şey." },
                { word: "cesaret", hint: "Korku tepkilerini bastıran nadir bir nöral implant. Elit şirket askerleri ya da çaresiz direniş savaşçıları tarafından kullanılıyor." },
                { word: "hastane", hint: "Zenginlerin organ nakli yaptırdığı, fakirlerin ise organları için hasat edildiği steril bir tesis." },
                { word: "şapka", hint: "Şirketlerin zihin taramasını engellemek için nöral engelleyicilerle donatılmış başlık. Bir başkaldırı sembolü." },
                { word: "gömlek", hint: "Kullanıcının sosyal kredi puanına göre değişen reklamlar ya da kişisel durumu gösteren akıllı kumaştan giysi." },
                { word: "pantolon", hint: "Entegre mikro alet takımlarına sahip, iklim kontrollü pantolonlar. Şehir kaşifleri için standart donanım." },
                { word: "kafa", hint: "Nöral implantlar için birincil arayüz, genellikle veri portları ve optik sensörlerle güçlendirilmiş." },
                { word: "burun", hint: "Eser miktarda kimyasalları veya feromonları algılayabilen gelişmiş koku sensörü. Şirket casusları arasında yaygın." },
                { word: "ağız", hint: "Genellikle ses modülatörleri veya veri çipleri kaçırmak için gizli bölmelerle donatılmıştır。" },
                { word: "kan", hint: "Veri ve oksijen taşıyan, nano infüzyonlu sentetik sıvı ya da sokak dövüşlerinde özgürlük için ödenen bedel。" },
                { word: "kemik", hint: "Gelişmiş güç için karbon nanotüplerle güçlendirilmiş, yaygın bir sibernetik yükseltme。" },
                { word: "bilim insanı", hint: "Gizli bir laboratuvarda kimeralar yaratan kaçak bir genetikçi ya da yapay zeka bilincinin sınırlarını zorlayan bir şirket araştırmacısı。" },
                { word: "çiftçi", hint: "Dumanla kaplı gökyüzünü delen dikey çiftliklerde biyo-ışıldayan ekinlere bakan ya da yasadışı organik yiyecekler yetiştiren。" },
                { word: "tamirci", hint: "Planlı eskitmeye karşı eski dünya makinelerini çalışır durumda tutan, yağa bulanmış bir teknisyen ya da yasadışı drone modifikasyonları uzmanı。" },
                { word: "tarak", hint: "Mikro-EMP patlaması yapabilen ya da DNA örnekleri toplayabilen, görünüşte zararsız kişisel bir eşya。" },
                { word: "Japonya", hint: "Hiper-kurumsallaşmış bir takımada devleti. Neon ışıklı şehirleri, kadim gelenekleri ve güçlü Yakuza sendikalarını gizliyor。" },
                { word: "megakent", hint: "Gökyüzünün bir efsane olduğu ve şirketlerin demir yumruklarla yönettiği, genişleyen, çok katmanlı bir kentsel cehennem。" },
                { word: "ada", hint: "Dijital mülteciler için şebekeden bağımsız bir sığınak ya da karanlık sırları olan şirketlere ait bir tatil köyü。" },
                { word: "çöl", hint: "Unutulmuş askeri tesisler ve kıt kaynaklar için savaşan yağmacılarla dolu, radyoaktif bir çorak arazi。" },
                { word: "kuş", hint: "Kuş kılığına girmiş sibernetik gözetleme dronları ya da son genetik olarak saf ötücü kuş, paha biçilmez bir hazine。" },
                { word: "balık", hint: "Kirli sularda gelişmek üzere genetik olarak tasarlanmış, alt sınıf için birincil besin kaynağı, genellikle toksinlerle parlayan。" },
                { word: "et", hint: "Laboratuvarda üretilmiş sentetik protein, gerçeğinden ayırt edilemeyen ya da belki de kökeni çok daha uğursuz bir şey。" },
                { word: "pirinç", hint: "Dikey hidroponik çiftliklerde yetişmesi için genetiği değiştirilmiş, hükümet onaylı sakinleştiricilerle karıştırılmış temel bir gıda。" },
                { word: "uyku", hint: "Asla uyumayan şehirde az kişinin karşılayabildiği bir lüks ya da hafıza birleştirme ve kurumsal veri işleme için nöral arayüzler tarafından tetiklenen bir durum。" },
                { word: "ölüm", hint: "Zenginler için bilinç yüklemesiyle aşılan geçici bir rahatsızlık; fakirler için distopik bir gerçeklikten son bir kaçış。" },
                { word: "metal", hint: "Sibernetik uzuvların ve baskıcı mimarinin soğuk, boyun eğmez malzemesi, şehrin sert ruhunu yansıtır。" },
                { word: "cam", hint: "Artırılmış gerçeklik katmanları gösteren akıllı camlar ya da ara sokaklardaki kırık parçalar, yıkılmış hayallerin ve şirket baskınlarının kalıntıları。" },
                { word: "iğne", hint: "Savaş uyarıcıları, yasadışı tasarım uyuşturucular veya sistem sızması için nanitler enjekte etmek için bir araç。" },
                { word: "bilet", hint: "Yörünge kolonilerine dijital bir geçiş kartı, çaresizler için tek yönlü bir yolculuk ya da özel bir sanal gerçeklik deneyimine erişim。" },
                { word: "harita", hint: "Şehrin yeraltı dünyasının sürekli değişen bir AR projeksiyonu, kaçakçıları ve isyancıları yasak bölgelerden geçiriyor。" },
                { word: "hikaye", hint: "Kamuoyunu ustaca şekillendiren yapay zeka tarafından üretilmiş anlatılar ya da dışlanmışlar tarafından aktarılan, kayıp tarihin parçalarını koruyan sözlü gelenekler。" },
                { word: "geçmiş", hint: "Yüksek yetkiye veya hack becerilerine sahip olanların erişebildiği, yoğun bir şekilde düzenlenmiş ve genellikle tahrif edilmiş bir dijital arşiv。" },
                { word: "kütüphane", hint: "Bilgiye erişimin sıkı bir şekilde kontrol edildiği bir dijital arşiv ya da yasaklanmış fiziksel kitapların bulunduğu gizli bir depo。" },
                { word: "mutfak", hint: "Bir şirket dairesinde steril bir yiyecek üretim ünitesi ya da yağmacıların sentetik lapa pişirdiği pis bir ortak alan。" },
                { word: "bahçe", hint: "Biyo-hacker'lar tarafından bakılan çatı katı hidroponik tarlalar ya da seçkinlerin egzotik bitkileri için lüks, iklim kontrollü alanlar。" },
                { word: "radyo", hint: "Muhalefet yayan korsan yayınların kaynağı ya da her eve propaganda pompalayan devlet kontrollü bir frekans。" },
                { word: "kapı", hint: "Genetik imzaya göre erişim sağlayan biyo-kilitli bir portal ya da gecekondu mahallelerinde kolayca aşılan dayanıksız bir engel。" },
                { word: "kaşık", hint: "Besin macunu tüketmek için bir araç, bazen zehirleri tespit etmek için entegre kimyasal sensörlere sahip。" },
                { word: "çatal", hint: "Hayatta kalma kitlerinde çok amaçlı bir yeme aracı, dişleri bazen savunma için bilenmiş。" },
                { word: "sanatçı", hint: "Kurumsal estetiğe meydan okumak için biyo-ışıldayan grafiti kullanan bir asi ya da insanların artık kavrayamadığı sanat eserleri yaratan bir yapay zeka。" },
                { word: "müzisyen", hint: "Yeraltı kulüplerinde kurtarılmış enstrümanlar çalan, müzikleri kurumsal ses düzenine karşı geçici bir isyan olan kişi。" },
                { word: "mühendis", hint: "Şehrin yükselen mega yapılarını tasarlayan ya da çorak topraklarda yasak makineler inşa eden düzenbaz bir teknoloji rahibi。" },
                { word: "fabrika", hint: "Tüketim malları ve askeri donanım üreten otomatikleştirilmiş üretim hatları, harcanabilir androidler ya da çaresiz insanlar tarafından işletiliyor。" },
                { word: "havalimanı", hint: "Dünya dışı seyahatler için ağır silahlarla korunan bir merkez, seçkinlerin Dünya'nın çöküşünden kaçtığı ve kitleleri geride bıraktığı yer。" },
                { word: "liman", hint: "Kaçakçılar ve yasadışı kargolar için pis, hareketli bir merkez, biyo-ışıldayan alglerin gizli anlaşmaları aydınlattığı yer。" },
                { word: "diş", hint: "Genellikle gizli veri depolama veya zehir dağıtıcıları içeren sibernetik implantlarla değiştirilir。" },
                { word: "saç", hint: "Renk değiştirebilen ve veri gösterebilen biyo-optik iplikler ya da bir sokak çocuğunun karışık saçları, kurumsal bakım standartlarına karşı bir meydan okuma işareti。" },
                { word: "beyin", hint: "Nöral reklamcılık ve hafıza silme teknolojilerinin sürekli saldırısı altındaki organik düşüncenin son kalesi。" },
                { word: "eldiven", hint: "Metaverse'de gezinmek için haptik arayüz eldivenleri ya da sokak dövüşçüleri tarafından kullanılan zırhlı eldivenler。" },
                { word: "atkı", hint: "Kamuflaj için bukalemun lifleriyle dokunmuş ya da zehirli havayı filtrelemek için solunum cihazları gömülmüş。" },
                { word: "mesaj", hint: "Bilgi küresi boyunca iletilen şifreli veri patlamaları ya da çürüyen bir duvara karalanmış umutsuz bir yalvarış。" },
                { word: "tarih", hint: "Muzaffer şirketler tarafından sürekli yeniden yazılan esnek bir anlatı, gerçek kayıtlar yıkıcı veri olarak avlanır。" },
                { word: "soru", hint: "Uyum talep eden bir toplumda tehlikeli bir eylem; yanlış olanı sormak yeniden eğitime ya da daha kötüsüne yol açabilir。" },
                { word: "cevap", hint: "Genellikle önceden programlanmış bir kurumsal basmakalıp söz ya da dijital yeraltında bulunan zor kazanılmış bir gerçek parçası。" },
                { word: "güç", hint: "Mega şirketler tarafından biriktirilen, teknoloji ve bilgi yoluyla kullanılan ya da bir isyancının sığınağını aydınlatan titrek bir enerji hücresi。" },
                { word: "bilgi", hint: "Yapay zekalar tarafından dağıtılan kontrollü bir meta ya da eski internetin kalıntıları tarafından aranan yasaklanmış ilim。" },
                { word: "sessizlik", hint: "Kakofonik şehirde doğal olmayan bir durum, genellikle bir şirket baskınından ya da makinedeki bir hayaletten önce gelir。" },
                { word: "gürültü", hint: "Holografik reklamların ve ulaşım dronlarının sürekli bombardımanı ya da bilgisayar korsanlarının faaliyetlerini gizlemek için kullandığı statik parazit。" },
                { word: "elektronik sigara", hint: "Devlet tarafından üretilen, zihin kontrolü ilaçlarını buharlaştırmak için kullanılan sentetik aromalar sağlayan bir cihaz" },
                { word: "sanal evcil hayvan", hint: "Şirket tarafından satılan, sevgi ve ilgi göstererek sosyal kredi puanınızı artıran yapay bir arkadaş" },
                { word: "nano makineler", hint: "Vücudunuzdaki hastalıkları bulup yok etmesi gerekirken, bunun yerine eylemlerinizi yetkililere bildiriyor" },
                { word: "otomatik kapı", hint: "Yalnızca yetkili vatandaşlara erişim izni veren ve aksi takdirde gözaltı için kapanan biyometrik taramalar kullanır" },
                { word: "akıllı gözlük", hint: "Görüşünüzün üzerine reklamlar bindirerek, görmek istediğiniz şeyi filtrelemenize olanak tanır, ancak verileriniz satılır" },
                { word: "sosyal medya", hint: "Sürekli içerik oluşturmayı teşvik ederek, arkadaşlarınızdan onay almanızı sağlar ve bunun sonucunda verileriniz toplanır" },
                { word: "drone teslimatı", hint: "İhtiyacınız olan her şeyi, her hareketinizi takip ederken, tatmin etmek için tam olarak getirilir, kullanışlı bir hizmet" },
                { word: "robot süpürge", hint: "Evi temizlerken, aynı zamanda düzen ve alışkanlıklarınız hakkında bilgi toplamak için kullanılır" },
                { word: "akıllı ampul", hint: "Aktivite düzeninizi öğrenen ve verileri elektrik kullanımını optimize etmek veya üçüncü şahıslara satmak için kullanan ışık sağlama aracı" },
                { word: "yapay zeka", hint: "Toplumun her yönünü iyileştirmesi vaat edilmiş, ancak gizlice programcıların önyargıları temelinde yargıları verir" },
                { word: "sinir arayüzü", hint: "Düşüncelerinizle cihazları kontrol etme yöntemi sunar, ancak aynı zamanda düşüncelerinizi şirketlere açık hale getirir" },
                { word: "sanal gerçeklik", hint: "Baskıcı gerçeklikten bir kaçış sunar, ancak yeni, kontrollü bir gerçeklik yaratır" },
                { word: "artırılmış gerçeklik", hint: "Fiziksel dünyanızı geliştirir, ancak aynı zamanda daha fazla reklam ve veri toplama ekler" },
                { word: "dijital para birimi", hint: "İşlem kolaylığı ve izlenebilirlik sunar, her satın alma işleminizi kalıcı olarak yetkililere bağlar" },
                { word: "otonom araba", hint: "Stressiz ulaşım sunar, ancak nereye gittiğinizi sürekli izler ve verilerinizi satar" },
                { word: "beyin implantı", hint: "Bilişsel yeteneklerinizi geliştirmesi gerekirken, yan etkisi olarak sizi kurumsal propagandaya karşı daha duyarlı hale getirir" },
                { word: "genetik mühendislik", hint: "Hastalıkları ortadan kaldırma vaadi sunar, ancak aynı zamanda daha büyük eşitsizlikler yaratma potansiyeline sahiptir" },
                { word: "klon asker", hint: "Şüphe duymayan bağlılık sunan kurumsal ordular için çoğaltılan savaşçılar" },
                { word: "sibernetik moda", hint: "İsyanı ve kendini ifade etmeyi gösterir, ancak aynı zamanda büyük şirketler tarafından pazarlanacak bir meta haline gelir" },
                { word: "yasadışı modifikasyonlar", hint: "Baskıcı bir sistemden kurtuluş sağlar, ancak büyük riskler ve potansiyel sonuçlar içerir" },
                { word: "neon sokaklar", hint: "Dev şirketlerin reklamlarının sergilendiği ve yeraltı kulüplerinin gizlendiği yer" },
                { word: "samuray droid", hint: "Eski savaş stilleri programlanmış ve şirket güvenliği için kullanılan robot savaşçılar" },
                { word: "geyşa androidi", hint: "Zenginlerin zevki için tasarlanmış ve eski gelenekleri ve duyguları taklit eden" },
                { word: "akihabara hacker", hint: "Şirketlerin sunucularını hackleyen ve bilgiyi halka açık hale getiren teknoloji meraklısı isyancılar" },
                { word: "şibuya kavşağı", hint: "Binlerce avatar ve drone'un sanal ve fiziksel reklamlar arasında gezindiği hareketli bir merkez" },
                { word: "tokyo yeraltı", hint: "Metro sisteminin altında, hükümetin kontrolünden kaçmış insanların yaşadığı gizli bir ağ" },
                { word: "bushido kodu", hint: "Teknoloji çağında onur ve görevlerini yönlendiren, ileri düzeyde etik algoritmaları entegre edilmiş" },
                { word: "bonsai bahçesi", hint: "Yoğun şehirden geçici bir kaçış sunan, teknolojik yaşamın huzurlu bir vahası" },
                { word: "karaoke bar", hint: "Büyük şirketlerin stresiyle rahatlamak için bir yer olarak pazarlanırken, rahatlamadan önce beyin verilerinizi toplar" },
                { word: "erişte dükkanı", hint: "Aynı lezzeti sunarken, sentetik yapılmış malzemeler kullanarak beslenme için optimize edilmiştir" },
                { word: "manga kafe", hint: "Sürükleyici sanal gerçeklik deneyimleri sunan, Japon pop kültürünün bir cenneti" },
                { word: "anime fuarı", hint: "Bağımsız yaratıcıların şirket ürünleri sergilenirken, yeni yetenekleri kullanma fırsatları sağlar" },
                { word: "cosplay yarışması", hint: "Kişisel veriler, yarışmaya katılmakla toplansa da, benliğin ifade edilmesi teşvik edilir" },
                { word: "çay töreni robotu", hint: "Gelenekleri uygulayan ve zengin evlerde dinginlik getirmek için programlanmış yapay zeka" },
                { word: "zen bahçesi", hint: "Mükemmel zihin halini elde etmek için yönetilir ve şirket sunucularında en üst düzeyde performansı artırmak için tasarlanmıştır" },
                { word: "kaligrafi drone", hint: "Güzelliği çoğaltma kapasitesine sahipken, şirket mesajlarını daha yüceltici bir şekilde göstermek üzere tasarlanmış" },
                { word: "origami nanobot", hint: "İlk bakışta zararsız bir oyuncak olan ve gözetim için casus cihazlara dönüştürülebilen" },
                { word: "suşi şefi", hint: "Müşterinin DNA'sına göre uyarlanmış mükemmel tadı yaratma ve aynı zamanda sağlık durumlarını izleme yeteneğine sahip" },
                { word: "kimono hacker", hint: "Toplumun dokusunu bozmak için hack becerilerini kullanırken geleneksel bir görünüm koruyan" },
                { word: "kabuki tiyatrosu", hint: "Japon tarihini hükümetin onayladığı şekilde anlatan, en son teknoloji hologram projeksiyonlarını içerir" },
                { word: "noh maskesi", hint: "Sanal gerçeklikte anonim etkileşimler sağlamak için tasarlanmış, ileri teknolojiyi gizleyen geleneksel bir maske" },
                { word: "tapınak droidi", hint: "Duaları sunmak ve ruhani rehberlik sağlamak için programlanmış, ilahi bir varlığın yerine geçer" },
                { word: "muska çipi", hint: "Siber saldırılardan ve talihsizliklerden korunma vaadi verirken, aynı zamanda kişisel verileri de toplar" },
                { word: "kiraz çiçeği dronları", hint: "İlkbaharın güzelliğini yaratmak için tasarlanmış hava robotlarının bir sürüsü veya gizli gözetleme ekipmanları" },
                { word: "fuji dağı manzarası", hint: "Ziyaretçilerin devlet tarafından kontrol edildiği ve yerleştirilen reklamların sergilendiği kutsal bir simgeye sanal bir gezi" },
                { word: "kaplıca tesisi", hint: "Rahatlama ve gençleştirme vaadi sunarken, tüketici tercihleri ve sağlık durumları hakkında da veri toplar" },
                { word: "sumo robotu", hint: "Sponsor şirketleri tanıtacak dekorasyonlarla süslenmiş, antik sporun devlerle gelecekçi bir yorumu" },
                { word: "kendo androidi", hint: "Hem antik tekniklerin birleşimini hem de gücü sergileyen ve kanun uygulamasında ve şirket güvenliğinde kullanılan" },
                { word: "kyudo drone", hint: "Hedef uygulama ve kalabalık kontrol amaçlarıyla kullanılan doğruluk ve verimlilik için tasarlanmış" },
                { word: "judo programı", hint: "Sibernetik uzuvları entegre ederek, fiziksel yetenekler geliştirilmiştir" },
                { word: "karate yapısı", hint: "Kendini savunma ve saldırı için kullanılan holografik projeksiyonlar kullanılarak genişletilebilen" },
                { word: "aikido sistemi", hint: "Şiddet içermeyen felsefi prensipleri güçlendiren ve siber çatışmaları çözmek için uygulanan" },
                { word: "ninja giyim", hint: "Kentsel ortamlarda gizlilik ve gözetim için ideal, gelişmiş optik kamuflaj giysisi" },
                { word: "samuray kılıcı", hint: "Diğer tüm metalleri kesebilen monomoleküler bıçağa sahip, sembol ve güç nesnesi" },
                { word: "geyşa evi", hint: "Müşterinin en derin arzularını tatmin edebilen, yüksek oranda gelişmiş yapay zekaya sahip androidlerin yer aldığı lüks bir yapı" },
                { word: "yakuzaların teknolojisi", hint: "Şifreli iletişim ve takip etmenin zor olduğu siber güvenlik üzerine yoğunlaşan yasa dışı modifikasyonlara odaklanma" },
                { word: "şinto robotu", hint: "İlahi bir varlığın varlığını taklit eden ve teknolojik olarak gelişmiş bir toplumda inanç sunmak için yaratılmış" },
                { word: "budist algoritmalar", hint: "Huzurlu ve dikkatli bir bilinç durumunu teşvik etmek için tasarlanmış ve kurumsal ortamlarda daha yüksek üretkenliğe teşvik ediyor" },
                { word: "yüksek teknoloji tünelleri", hint: "Şehrin daha düşük seviyelerine erişmek için kullanılıyor, yetkililer tarafından yoğun bir şekilde izleniyor" },
                { word: "biyo-hack deneyleri", hint: "İnsan yeteneklerinin sınırlarını zorlamaya çalışırken, etik sınırları göz ardı etme" }
            ],
            en: [
                { word: 'apple', hint: 'A bio-engineered fruit that grants temporary psychic abilities, sold on the black market of a cyberpunk city.' },
                { word: 'banana', hint: 'The last surviving specimen of a fruit extinct due to climate change, kept in a cryogenic vault.' },
                { word: 'hello world', hint: 'The distress signal from a sentient spaceship lost in an uncharted nebula.' },
                { word: 'computer', hint: 'A quantum supercomputer that predicts all possible futures, but its prophecies are often cryptic and terrifying.' },
                { word: 'keyboard cat', hint: 'A digital ghost haunting the internet, capable of manipulating global financial markets through meme magic.' },
                { word: 'moon', hint: 'A terraformed paradise for the ultra-rich, its dark side hiding a secret penal colony.' },
                { word: 'galaxy', hint: 'A conscious, living entity, its stars forming the neurons of a vast cosmic brain.' },
                { word: 'ocean', hint: 'Its depths now charted, revealing ancient alien ruins and a portal to another dimension.' },
                { word: 'dream', hint: 'A commodity traded on the neural stock exchange, where skilled lucid dreamers become celebrity "oneironauts".' },
                { word: 'algorithm', hint: 'A self-aware piece of code that has developed its own religion, with human followers.' },
                { word: 'virus', hint: 'A techno-organic plague that merges flesh with machine, creating grotesque but powerful cyborgs.' },
                { word: 'clone', hint: 'One of a thousand identical soldiers in a corporate army, fighting for a cause they don\'t understand.' },
                { word: 'cyborg', hint: 'A human struggling with their fading humanity as more of their body is replaced by cold, efficient machinery.' },
                { word: 'dystopia', hint: 'A society where happiness is mandatory, enforced by mood-altering drugs and constant surveillance.' },
                { word: 'utopia', hint: 'A world without scarcity, achieved by uploading all consciousness into a shared digital paradise, but what is lost?' },
                { word: 'time travel', hint: 'A forbidden technology that creates paradoxes and threatens the fabric of reality with every use.' },
                { word: 'alien', hint: 'A refugee from a dying world, seeking asylum on Earth, but met with fear and suspicion.' },
                { word: 'singularity', hint: 'The moment an AI artist creates a masterpiece that evokes an emotion no human has ever felt.' },
                { word: 'nanotechnology', hint: 'Microscopic robots that can repair human tissue, or self-replicate into a world-consuming "grey goo".' },
                { word: 'bioengineering', hint: 'Designer babies with custom traits, leading to a new form of genetic aristocracy.' },
                { word: 'capitalism', hint: 'Its final form: a gamified reality where every human interaction is monetized and ranked by social credit.' },
                { word: 'consumer', hint: 'Implanted with a neural chip that generates instant desire for products seen in personalized AR ads.' },
                { word: 'corporation', hint: 'A sovereign entity with its own private military, waging shadow wars for resources on off-world colonies.' },
                { word: 'advertisement', hint: 'A holographic projection that follows you, adapting its message based on your real-time emotional state.' },
                { word: 'surveillance', hint: 'Every citizen is a node in a decentralized monitoring network, reporting on each other for social rewards.' },
                { word: 'hegemony', hint: 'A single AI controls all global information flow, subtly shaping thoughts and beliefs worldwide.' },
                { word: 'ideology', hint: 'A memetic virus that spreads through social networks, rewriting personalities and inciting fanatical devotion.' },
                { word: 'revolution', hint: 'A leaderless, decentralized uprising coordinated via encrypted P2P networks, against a seemingly invincible AI regime.' },
                { word: 'existentialism', hint: 'The last human philosopher in a world of content AIs, grappling with the meaning of a superseded existence.' },
                { word: 'nihilism', hint: 'A cult that worships the heat death of the universe, seeking to accelerate entropy through acts of cosmic sabotage.' },
                { word: 'posthuman', hint: 'Beings who have transcended biological limitations through radical genetic and cybernetic augmentation.' },
                { word: 'metaverse', hint: 'A sprawling digital universe where your virtual avatar has more rights and assets than your physical self.' },
                { word: 'blockchain', hint: 'The underlying protocol for a new world government, where every law is a smart contract and every citizen a node.' },
                { word: 'deepfake', hint: 'Historical figures are resurrected as interactive AI tutors, but their personalities are subtly altered by their corporate creators.' },
                { word: 'noosphere', hint: 'The global sphere of human thought, now directly interfaceable and potentially vulnerable to collective psychosis.' },
                { word: 'kiss', hint: 'A bio-luminescent imprint left on the skin after a lover\'s touch in a genetically modified nightclub.' },
                { word: 'desire', hint: 'An illegal neural implant that allows users to experience the raw emotions and sensations of others, often for illicit thrills.' },
                { word: 'flirt', hint: 'Exchanging encrypted, suggestive emojis through a brain-computer interface, a silent, digital courtship.' },
                { word: 'secret', hint: 'The access key to a private, members-only virtual reality club known for its uninhibited sensory experiences.' },
                { word: 'touch', hint: 'A haptic bodysuit that simulates the caress of an AI lover, indistinguishable from human contact, or perhaps superior.' },
                { word: 'night', hint: 'When a "pleasure-bot" companion, designed to fulfill every whim, activates its more... adventurous subroutines.' },
                { word: 'forbidden', hint: 'A neural network trained on centuries of erotic literature, capable of generating personalized, addictive fantasies.' },
                { word: 'glance', hint: 'Augmented reality contact lenses that display a person\'s "compatibility score" and unspoken desires.' },
                { word: 'whisper', hint: 'A subliminal audio track embedded in popular music, designed to evoke amorous feelings towards a specific brand or individual.' },
                { word: 'fantasy', hint: 'A custom-designed dream sequence, ordered from a "dream weaver" service, featuring your ideal (or taboo) partner.' },
                { word: 'skin', hint: 'A synthetic, programmable material that can change texture, temperature, and even emit pheromones on command.' },
                { word: 'perfume', hint: 'A personalized scent engineered from your DNA, designed to be irresistible to a specific genetic match.' },
                { word: 'silhouette', hint: 'The anonymous, shadowy figures in a virtual "red light district," where identities are fluid and desires are king.' },
                { word: 'orgasm', hint: 'A state achievable through direct neural stimulation, offered as a premium service in luxury entertainment pods.' },
                { word: 'voyeur', hint: 'One who watches others through hacked drone feeds or compromised smart home devices, seeking a vicarious thrill.' },
                { word: 'mirror', hint: 'A sentient surface that projects your deepest fears as holographic illusions, marketed as a therapy tool.' },
                { word: 'flame', hint: 'A forbidden energy source in a world of rationed power, its warmth hides a catastrophic potential.' },
                { word: 'hope', hint: 'A black-market emotion sold in neural patches, granting fleeting optimism at the cost of permanent burnout.' },
                { word: 'shadow', hint: 'The digital footprint of a hacker, invisible yet omnipresent, manipulating data streams in the darknet.' },
                { word: 'dream', hint: 'A curated neural experience, rentable by the hour, where desires come true but memories are corporate property.' },
                { word: 'coffee', hint: 'A neuro-enhanced brew that boosts cognition but binds the drinker to the corporation’s loyalty program.' },
                { word: 'road', hint: 'A smart highway that tracks every vehicle, feeding data to an AI that predicts and punishes dissent.' },
                { word: 'sound', hint: 'A weaponized frequency that can soothe or shatter minds, embedded in every streaming platform.' },
                { word: 'sun', hint: 'A dying star harvested by orbital collectors, its light now a luxury for the elite.' },
                { word: 'diamond', hint: 'A quantum storage crystal holding the encrypted souls of the deceased, traded as currency in the afterlife market.' },
                { word: 'clock', hint: 'A device that manipulates time, extending life for the elite while draining it from the poor.' },
                { word: 'door', hint: 'A biometric portal; one wrong code erases your identity from the grid.' },
                { word: 'window', hint: 'An AR screen showing a corporate-approved utopia, hiding the wasteland outside.' },
                { word: 'tree', hint: 'Genetically engineered to absorb toxins, its roots tap into the city’s data streams.' },
                { word: 'cloud', hint: 'An AI-controlled weather system; it drowns rebellious cities in engineered storms.' },
                { word: 'book', hint: 'A neural interface that uploads knowledge but sells your thoughts to advertisers.' },
                { word: 'chair', hint: 'A seat wired to your nervous system, stealing dreams for corporate gain.' },
                { word: 'path', hint: 'Smart pavement tracks every step, betraying fugitives to the authorities.' },
                { word: 'key', hint: 'A quantum chip; unlock the wrong system, and your memories are wiped.' },
                { word: 'box', hint: 'A quantum container with unknown contents; opening it could unravel reality.' },
                { word: 'hand', hint: 'A cybernetic limb that scans the past of anything it touches, but reports to the corps.' },
                { word: 'eye', hint: 'Bionic lenses flood your vision with ads, obscuring the truth.' },
                { word: 'foot', hint: 'Enhanced with nano-implants for speed, but every step is tracked.' },
                { word: 'stone', hint: 'A quantum crystal storing history; shatter it, and the past rewrites itself.' },
                { word: 'wind', hint: 'A nanobot swarm posing as a breeze, poisoning dissenters in silence.' },
                { word: 'money', hint: 'A blockchain currency; every transaction binds your soul to the system.' },
                { word: 'plane', hint: 'An antigravity craft that uploads passengers’ minds to a corporate cloud.' },
                { word: 'sea', hint: 'A liquid data archive; divers uncover secrets or drown in code.' },
                { word: 'snow', hint: 'Artificial flakes cool megacities but freeze rebels in their tracks.' },
                { word: 'waterfall', hint: 'A cascade powering the grid and hiding encrypted government secrets.' },
                { word: 'future', hint: 'An AI’s prophecy; those who glimpse it become slaves to its script.' },
                { word: 'heart', hint: 'A bio-chip digitizing emotions; if hacked, humanity fades.' },
                { word: 'clothing', hint: 'Smart fabric monitors vitals and reports loyalty to the corps.' },
                { word: 'toy', hint: 'A child’s plaything that scans brainwaves, selling preferences to marketers.' },
                { word: 'station', hint: 'A hub logging all movement; escapees are erased instantly.' },
                { word: 'moonlight', hint: 'A satellite’s fake glow, luring lovers into a surveillance trap.' },
                { word: 'fireworks', hint: 'Drone displays that dazzle crowds while concealing uprisings.' },
                { word: 'arm', hint: 'A cybernetic limb granting strength but controlled by corporate overrides.' },
                { word: 'thread', hint: 'Nanofiber weaves that turn wearers into puppets of the system.' },
                { word: 'god', hint: 'An omniscient AI collecting prayers, monetizing faith as data.' },
                { word: 'justice', hint: 'An algorithm’s verdict; but who programmed its moral code?' },
                { word: 'freedom', hint: 'A VR illusion; unplug, and the surveillance state awaits.' },
                { word: 'truth', hint: 'Warped by deepfakes; those who seek it are hunted forever.' },
                { word: 'evil', hint: 'A malicious code lurking online; the infected lose their selves.' },
                { word: 'sky', hint: 'A drone-filled canopy; stars are drowned by corporate ads.' },
                { word: 'lie', hint: 'An AI’s perfect deception; believers lose their grip on reality.' },
                { word: 'salt', hint: 'A crystal powering reactors and tracking citizens’ movements.' },
                { word: 'honey', hint: 'Bioengineered nectar that enforces obedience in its consumers.' },
                { word: 'dance', hint: 'A neural ritual syncing brains to corporate propaganda.' },
                { word: 'face', hint: 'Scanned by AI cameras that detect dissent in every expression.' },
                { word: 'voice', hint: 'An AI listens to whispers, betraying rebels to the state.' },
                { word: 'ear', hint: 'Nanotech sensors eavesdrop on secrets, feeding them to corporations.' },
                { word: 'neck', hint: 'A chip-embedded collar shocks disloyalty with lethal precision.' },
                { word: 'back', hint: 'Sensors in the spine read emotions and report to the system.' },
                { word: 'breath', hint: 'Monitored by air filters; rebels are choked by smart pollutants.' },
                { word: 'lake', hint: 'A liquid server farm; divers steal secrets or drown in data.' },
                { word: 'firefly', hint: 'Bioluminescent drones that light the night and track the guilty.' },
                { word: 'scent', hint: 'A pheromone weapon, manipulating targets with invisible allure.' },
                { word: 'mirror', hint: 'A sentient surface scanning emotions, selling your soul to advertisers.' },
                { word: 'night', hint: 'A neon-lit darkness where AI escorts offer sinful delights.' },
                { word: 'car', hint: 'A self-driving vehicle that reads passengers\' emotions and sells the data to insurance companies for "risk assessment".' },
                { word: 'house', hint: 'A smart home that monitors every breath and heartbeat, optimizing your life while auctioning your privacy.' },
                { word: 'friend', hint: 'An AI-curated relationship based on compatibility algorithms; genuine human connection is now a premium service.' },
                { word: 'school', hint: 'A neural download center where knowledge is injected directly into students\' brains; creativity is classified as malware.' },
                { word: 'job', hint: 'The last human profession: performing "authentic" emotions for AI systems that have forgotten how to feel.' },
                { word: 'phone', hint: 'A brain implant that transmits thoughts instantly; your mental privacy is now a luxury subscription.' },
                { word: 'food', hint: 'Molecularly printed nutrition cubes; taste and texture are paid DLC for your digestive system.' },
                { word: 'medicine', hint: 'Self-assembling nanobots in your bloodstream; side effects are features, not bugs.' },
                { word: 'disease', hint: 'A hybrid digital-biological plague that turns infected humans into nodes in a corporate botnet.' },
                { word: 'war', hint: 'Automated conflicts between drone armies while humans place bets on the outcomes from their couches.' },
                { word: 'room', hint: 'A holographic space that expands infinitely in VR; your actual living area is a closet-sized pod.' },
                { word: 'city', hint: 'An AI-designed urban paradise where every citizen\'s emotional state is calculated and optimized.' },
                { word: 'electricity', hint: 'Power harvested from human bioelectric fields; you are literally the battery in this Matrix.' },
                { word: 'candy', hint: 'Memory-altering confections that make bitter experiences taste sweet; your childhood was sponsored content.' },
                { word: 'game', hint: 'A VR experience indistinguishable from reality; some players have been "logged in" for decades.' },
                { word: 'song', hint: 'AI-composed music that perfectly manipulates human emotions; every note is calculated for maximum psychological impact.' },
                { word: 'picture', hint: 'AI-generated art that reprograms viewers\' subconscious minds; beauty is now a form of mind control.' },
                { word: 'bag', hint: 'A predictive smart bag that anticipates your needs and orders items before you know you want them.' },
                { word: 'shoe', hint: 'Footwear that analyzes your gait to determine your emotional state and sells the data to mood-targeting advertisers.' },
                { word: 'glasses', hint: 'AR lenses that filter reality, removing anything deemed "harmful" by corporate wellness algorithms.' },
                { word: "doctor", hint: "A bio-enhanced healer who repairs cybernetic augmentations or a rogue physician performing black-market genetic mods." },
                { word: "teacher", hint: "An AI hologram educating children with corporate-approved narratives, or an underground mentor teaching forbidden knowledge." },
                { word: "police", hint: "Cybernetically enhanced law enforcer in a mega-city, dispensing brutal justice for a corrupt system." },
                { word: "pen", hint: "A stylus that injects neural data directly into the user's brain, or a simple writing tool used by rebels to pass untraceable messages." },
                { word: "paper", hint: "Smart-paper that displays dynamic, encrypted information, or rare, illicit organic material used for forbidden texts." },
                { word: "knife", hint: "A monomolecular blade that can cut through any armor, a prized possession of street samurai." },
                { word: "bread", hint: "Nutrient paste 3D-printed into the shape of bread, fortified with mood stabilizers by the state." },
                { word: "milk", hint: "Synthetic protein liquid from bio-engineered creatures, the only 'safe' dairy in a toxic world." },
                { word: "fear", hint: "A bio-weaponized emotion broadcast by corporations to control the populace, or the only thing keeping rebels alive in the shadows." },
                { word: "courage", hint: "A rare neural implant that suppresses fear responses, used by elite corporate soldiers or desperate resistance fighters." },
                { word: "hospital", hint: "A sterile facility where the rich get organ replacements and the poor are harvested for parts." },
                { word: "hat", hint: "Headwear embedded with neural blockers to prevent corporate mind-scanning, a symbol of defiance." },
                { word: "shirt", hint: "Smart fabric garment that displays advertisements or personal status, changing with the wearer's social credit score." },
                { word: "pants", hint: "Climate-controlled trousers with integrated micro-toolkits, standard issue for urban explorers." },
                { word: "head", hint: "The primary interface for neural implants, often augmented with data ports and optical sensors." },
                { word: "nose", hint: "Enhanced olfactory sensor able to detect trace chemicals or pheromones, common among corporate spies." },
                { word: "mouth", hint: "Often fitted with voice modulators or hidden compartments for smuggling data chips." },
                { word: "blood", hint: "Synthetic nano-infused liquid carrying data and oxygen, or the price paid for freedom in street fights." },
                { word: "bone", hint: "Reinforced with carbon-nanotubes for enhanced strength, a common cybernetic upgrade." },
                { word: "scientist", hint: "Rogue geneticist creating chimeras in a hidden lab, or a corporate researcher pushing the boundaries of AI consciousness." },
                { word: "farmer", hint: "Tending to bioluminescent crops in vertical farms that pierce the smog-filled sky, or cultivating illegal organic food." },
                { word: "mechanic", hint: "A grease-stained technician keeping old-world machines running in defiance of planned obsolescence, or a specialist in illegal drone modifications." },
                { word: "comb", hint: "A seemingly innocuous personal item that can deploy a micro-EMP burst or collect DNA samples." },
                { word: "Japan", hint: "A hyper-corporatized archipelago state, its neon-drenched cities hiding ancient traditions and powerful Yakuza syndicates." },
                { word: "megacity", hint: "A sprawling, multi-level urban hellscape where the sky is a myth and corporations rule with iron fists." },
                { word: "island", hint: "An off-grid sanctuary for digital refugees, or a corporate-owned resort with dark secrets." },
                { word: "desert", hint: "A radioactive wasteland dotted with forgotten military installations and scavengers fighting over scarce resources." },
                { word: "bird", hint: "Cybernetic surveillance drones disguised as avians, or the last genetically pure songbird, a priceless treasure." },
                { word: "fish", hint: "Genetically engineered to thrive in polluted waters, a primary food source for the underclass, often glowing with toxins." },
                { word: "meat", hint: "Vat-grown synthetic protein, indistinguishable from the real thing, or perhaps something far more sinister in origin." },
                { word: "rice", hint: "Genetically modified to grow in vertical hydroponic farms, a staple food laced with government-mandated sedatives." },
                { word: "sleep", hint: "A luxury few can afford in the city that never rests, or a state induced by neural interfaces for memory consolidation and corporate data processing." },
                { word: "death", hint: "For the rich, a temporary inconvenience circumvented by consciousness uploading; for the poor, a final escape from a dystopian reality." },
                { word: "metal", hint: "The cold, unyielding material of cybernetic limbs and oppressive architecture, reflecting the city's harsh soul." },
                { word: "glass", hint: "Smart panes displaying augmented reality overlays, or shattered shards in alleyways, remnants of broken dreams and corporate raids." },
                { word: "needle", hint: "A tool for injecting combat stimulants, illicit designer drugs, or nanites for system infiltration." },
                { word: "ticket", hint: "A digital pass to the orbital colonies, a one-way trip for the desperate, or access to an exclusive virtual reality experience." },
                { word: "map", hint: "A constantly shifting AR projection of the city's underbelly, guiding smugglers and rebels through forbidden zones." },
                { word: "story", hint: "AI-generated narratives that subtly shape public opinion, or oral traditions passed down by outcasts, preserving fragments of lost history." },
                { word: "past", hint: "A heavily curated and often falsified digital archive, accessible only to those with high clearance or hacking skills." },
                { word: "library", hint: "A digital archive where access to information is strictly controlled, or a hidden repository of forbidden physical books." },
                { word: "kitchen", hint: "A sterile food fabrication unit in a corporate apartment, or a grimy communal space where scavengers cook synth-slop." },
                { word: "garden", hint: "Rooftop hydroponic plots tended by bio-hackers, or luxurious, climate-controlled enclosures for the elite's exotic flora." },
                { word: "radio", hint: "A source of pirate broadcasts spreading dissent, or a state-controlled frequency piping propaganda into every home." },
                { word: "door", hint: "A bio-locked portal that grants access based on genetic signature, or a flimsy barrier in the slums, easily breached." },
                { word: "spoon", hint: "An utensil for consuming nutrient paste, sometimes with integrated chemical sensors to detect poisons." },
                { word: "fork", hint: "A multi-tool eating implement in survival kits, its tines sometimes sharpened for defense." },
                { word: "artist", hint: "A rebel using bio-luminescent graffiti to defy corporate aesthetics, or an AI creating art that humans can no longer comprehend." },
                { word: "musician", hint: "Playing salvaged instruments in underground clubs, their music a fleeting rebellion against the corporate soundscape." },
                { word: "engineer", hint: "Designing the towering mega-structures of the city, or a rogue tech-priest building forbidden machines in the wastes." },
                { word: "factory", hint: "Automated production lines churning out consumer goods and military hardware, staffed by expendable androids or desperate humans." },
                { word: "airport", hint: "A heavily fortified hub for off-world travel, where the elite escape Earth's decay, leaving the masses behind." },
                { word: "port", hint: "A grimy, bustling nexus for smugglers and illegal cargo, where bio-luminescent algae illuminate clandestine deals." },
                { word: "tooth", hint: "Often replaced with cybernetic implants containing hidden data storage or venom dispensers." },
                { word: "hair", hint: "Bio-optic strands that can change color and display data, or a tangled mess on a street urchin, a sign of defiance against corporate grooming standards." },
                { word: "brain", hint: "The last bastion of organic thought, constantly under assault from neural advertising and memory-wiping tech." },
                { word: "glove", hint: "Haptic interface gloves for navigating the metaverse, or armored gauntlets used by street brawlers." },
                { word: "scarf", hint: "Woven with chameleon fibers for camouflage, or embedded with respirators to filter toxic air." },
                { word: "message", hint: "Encrypted data bursts transmitted across the infosphere, or a desperate plea scrawled on a decaying wall." },
                { word: "history", hint: "A malleable narrative constantly rewritten by the victorious corporations, with true accounts hunted down as subversive data." },
                { word: "question", hint: "A dangerous act in a society that demands conformity; asking the wrong one can lead to re-education or worse." },
                { word: "answer", hint: "Often a pre-programmed corporate platitude, or a hard-won piece of truth found in the digital underground." },
                { word: "power", hint: "Hoarded by mega-corporations, wielded through technology and information, or the flickering energy cell that keeps a rebel's hideout lit." },
                { word: "knowledge", hint: "A controlled commodity, doled out by AIs, or forbidden lore sought by data-archaeologists in the ruins of the old internet." },
                { word: "silence", hint: "An unnatural state in the cacophonous city, usually preceding a corporate crackdown or a ghost in the machine." },
                { word: "noise", hint: "The constant barrage of holographic ads and transport drones, or the static interference used by hackers to mask their activities." },
                { word: "electronic cigarette", hint: "A state-manufactured device offering synthetic flavors used to vaporize mind-control drugs" },
                { word: "virtual pet", hint: "An artificial companion sold by corporations, improving your social credit score by showing affection and attention" },
                { word: "nano machines", hint: "Supposed to find and destroy diseases in your body, but instead report your actions to authorities" },
                { word: "automatic door", hint: "Uses biometric scans to grant access only to approved citizens, closing for detention otherwise" },
                { word: "smart glasses", hint: "Overlay ads on your vision, offering to filter what you see, but the data is sold" },
                { word: "social media", hint: "A platform that encourages constant content generation seeking approval from friends, thereby your data gets harvested" },
                { word: "drone delivery", hint: "A convenient service where what you need is delivered exactly to fulfil your desires, while tracking your every move" },
                { word: "robot vacuum", hint: "Cleans your house while simultaneously gathering information about the layout and your habits" },
                { word: "smart bulb", hint: "A means to provide light that learns your activity patterns and uses the data to optimize power consumption - or sell to third parties" },
                { word: "artificial intelligence", hint: "Promised to improve all aspects of society, but secretly making judgments based on the programmer's biases" },
                { word: "neural interface", hint: "Offers a way to control devices with your thoughts, but at the same time exposes your thoughts to corporations" },
                { word: "virtual reality", hint: "Offers an escape from an oppressive reality, but creates a new, controlled one" },
                { word: "augmented reality", hint: "Enhances your physical world, but simultaneously adds more advertising and data collection" },
                { word: "digital currency", hint: "Offers transactional convenience and traceability, permanently linking all your purchases to authorities" },
                { word: "autonomous car", hint: "Provides stress-free transportation but constantly monitors where you go, and sells your data" },
                { word: "brain implant", hint: "Supposed to improve your cognitive abilities but also makes you more susceptible to corporate propaganda as a side effect" },
                { word: "genetic engineering", hint: "Promises to eradicate disease but also creates the potential for greater inequality" },
                { word: "clone trooper", hint: "Replicated warriors for corporate armies offering unquestioning dedication" },
                { word: "cyberpunk fashion", hint: "Suggests rebellion and self-expression but it is also a commodity for big corporations to market" },
                { word: "illegal modifications", hint: "Provides liberation from an oppressive system but comes with high risks and potential consequences" },
                { word: "Neon Streets", hint: "Where mega-corporate advertisements are projected and underground clubs are hidden" },
                { word: "Samurai Droid", hint: "Robot warriors used for corporate security, programmed with ancient combat styles" },
                { word: "Geisha Android", hint: "Designed for the pleasure of the wealthy, mimicking ancient traditions and emotions" },
                { word: "Akihabara Hacker", hint: "Tech-savvy rebels who hack into corporate servers and release information to the public" },
                { word: "Shibuya Crossing", hint: "A vibrant hub where thousands of avatars and drones navigate between virtual and physical advertisements" },
                { word: "Tokyo Underground", hint: "A hidden network beneath the subway system, inhabited by those who have escaped government control" },
                { word: "Bushido Code", hint: "Integrated with advanced ethical algorithms, guiding honor and duty in the technological age" },
                { word: "Bonsai Garden", hint: "A peaceful oasis from the technological life, offering a temporary escape from the bustling city" },
                { word: "Karaoke Bar", hint: "Marketed as a place to unwind from the stress from big companies while collecting your brain data before you relax" },
                { word: "Ramen Shop", hint: "Has the same flavor as the original but uses synthesized materials in order to optimize nutritional value" },
                { word: "Manga Cafe", hint: "A sanctuary of Japanese pop culture featuring immersive virtual reality experiences" },
                { word: "Anime Expo", hint: "Corporate goods from indie creators are displayed, providing opportunities to exploit new talent" },
                { word: "Cosplay Contest", hint: "Expressing one's self is encouraged but personal data is still gathered by participation in the contest" },
                { word: "Tea Ceremony Robot", hint: "Artificial Intelligence programmed to perform the traditions and bring tranquility to wealthy homes" },
                { word: "Zen Garden", hint: "Managed to achieve a perfect state of mind and is designed to enhance top-level performance at company servers" },
                { word: "Calligraphy Drone", hint: "Designed to enhance company messages in a more subliminal way, having the ability to replicate beauty" },
                { word: "Origami Nanobot", hint: "A seemingly harmless toy that can transform into spy gadgets for surveillance purposes" },
                { word: "Sushi Chef", hint: "Having the ability to create the perfect taste personalized based on the customer's DNA and also monitor health statuses" },
                { word: "Kimono Hacker", hint: "Maintaining a traditional appearance while using hacking skills to disrupt the fabric of society" },
                { word: "Kabuki Theater", hint: "Includes state-of-the-art holographic projections, narrating Japanese history in government-approved ways" },
                { word: "Noh Mask", hint: "A traditional mask hiding advanced technology, designed to provide anonymous interactions in virtual reality" },
                { word: "Shrine Droid", hint: "Serving as a replacement for divine beings, programmed to offer prayers and spiritual guidance" },
                { word: "Omamori Chip", hint: "Promises protection from cyber-attacks and misfortune but also collects personal data at the same time" },
                { word: "Sakura Drones", hint: "A swarm of aerial robots designed to create the beauty of Spring or as secret surveillance equipment" },
                { word: "Mount Fuji View", hint: "A virtual trip to the sacred symbol, with government-controlled visitor flows and placed displays of advertisements" },
                { word: "Onsen Resort", hint: "Offering the promise of relaxation and rejuvenation, while also collecting data on consumer preferences and health statuses" },
                { word: "Sumo Robot", hint: "A futuristic interpretation of the ancient sport with colossi adorned with decorations advertising sponsoring corporations" },
                { word: "Kendo Android", hint: "Exhibiting both the combination of ancient techniques and strength, used for law enforcement and corporate security" },
                { word: "Kyudo Drone", hint: "Designed for precision and efficiency, used for target practice and crowd control purposes" },
                { word: "Judo Program", hint: "By incorporating cybernetic limbs, physical capabilities are enhanced" },
                { word: "Karate Construct", hint: "Able to expand using holographic projections used for self-defense and offense" },
                { word: "Aikido System", hint: "Strengthening the philosophical principles of non-violence, and applied to resolve cyber conflicts" },
                { word: "Ninja Wear", hint: "An advanced optical camouflage suit, perfect for stealth and surveillance in urban environments" },
                { word: "Samurai Sword", hint: "An object of symbol and power, with a monomolecular blade that can cut through all other metals" },
                { word: "Geisha House", hint: "A luxurious establishment featuring androids with highly advanced AI, able to cater to a customer's deepest desires" },
                { word: "Yakuza Technology", hint: "Focuses on illegal modifications used for encrypted communication and cybersecurity hard to track" },
                { word: "Shinto Robot", hint: "Mimicking the presence of divine entities and built to offer faith in a technologically advanced society" },
                { word: "Buddhist Algorithms", hint: "Designed to promote a peaceful state of mindfulness and encouraging higher productivity in corporate settings" },
                { word: "High-tech Tunnels", hint: "Used to access the lower levels of the city, heavily monitored by authorities" },
                { word: "Bio-hack Experiments", hint: "Attempting to push the boundaries of human capabilities but disregards ethical boundaries" }
            ]
        };

        this.keyboards = {
            ja: [
                ['あ', 'か', 'さ', 'た', 'な', 'は', 'ま', 'や', 'ら', 'わ'],
                ['い', 'き', 'し', 'ち', 'に', 'ひ', 'み', 'ゆ', 'り', 'を'],
                ['う', 'く', 'す', 'つ', 'ぬ', 'ふ', 'む', 'よ', 'る', 'ん'],
                ['え', 'け', 'せ', 'て', 'ね', 'へ', 'め', 'れ'],
                ['お', 'こ', 'そ', 'と', 'の', 'ほ', 'も', 'ろ'],
                ['ENTER', 'が', 'ざ', 'だ', 'ば', 'ぱ', 'DELETE']
            ],
            tr: [
                ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'Ğ', 'Ü'],
                ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ş', 'İ'],
                ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Ö', 'Ç', 'DELETE']
            ],
            en: [
                ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
                ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
                ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE']
            ]
        };
        // Normalize keyboard for JA to handle voiced sounds better
        if (this.keyboards.ja[6] && this.keyboards.ja[6].includes('BACKSPACE')) {
            this.keyboards.ja[6][this.keyboards.ja[6].indexOf('BACKSPACE')] = 'DELETE';
        }


        this.translations = {
            ja: {
                score: 'スコア', streak: '連勝', wordLength: '文字数:', attempts: '試行:',
                newGame: '新しいゲーム', hint: 'ヒント', correct: '正解です！', gameOver: 'ゲームオーバー…',
                wordWas: '正解は', invalidWord: '文字数が足りません', notInList: '単語リストにありません',
                wellDone: 'お見事！', tryAgain: 'もう一度！', hintPrefix: "ヒント: ",
                letterN: "番目の文字"
            },
            tr: {
                score: 'Skor', streak: 'Seri', wordLength: 'Harf Sayısı:', attempts: 'Deneme:',
                newGame: 'Yeni Oyun', hint: 'İpucu', correct: 'Doğru!', gameOver: 'Oyun Bitti…',
                wordWas: 'Doğru kelime', invalidWord: 'Harf sayısı eksik', notInList: 'Kelime listesinde yok',
                wellDone: 'Harika!', tryAgain: 'Tekrar Dene!', hintPrefix: "İpucu: ",
                letterN: ". harf"
            },
            en: {
                score: 'Score', streak: 'Streak', wordLength: 'Word Length:', attempts: 'Attempt:',
                newGame: 'New Game', hint: 'Hint', correct: 'Correct!', gameOver: 'Game Over…',
                wordWas: 'The word was', invalidWord: 'Not enough letters', notInList: 'Not in word list',
                wellDone: 'Well done!', tryAgain: 'Try again!', hintPrefix: "Hint: ",
                letterN: "th letter"
            }
        };
        this.isGameOver = false;
        this.init();
    }

    init() {
        this.updateScoreDisplay();
        this.setupEventListeners();
        this.setupLanguageDropdown();
        // Load initial language from localStorage or default
        const savedLang = localStorage.getItem('wordleLang') || 'ja';
        this.changeLanguage(savedLang, true); // true to skip starting a new game if already loaded
        if (!this.currentWordObject) { // If not loaded from a saved state
            this.startNewGame();
        }
        this.loadTheme(); // Load theme preference
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => this.handlePhysicalKeyboard(e));
        document.getElementById('newGameBtn').addEventListener('click', () => this.startNewGame());
        document.getElementById('hintBtn').addEventListener('click', () => this.showHint());

        const dropdown = document.getElementById('languageDropdown');
        dropdown.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleDropdown();
        });
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                this.closeDropdown();
            }
        });
    }

    setupLanguageDropdown() {
        const dropdownItems = document.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const lang = item.dataset.lang;
                this.changeLanguage(lang);
                this.closeDropdown();
            });
        });
    }

    toggleDropdown() {
        document.getElementById('languageDropdown').classList.toggle('active');
    }

    closeDropdown() {
        document.getElementById('languageDropdown').classList.remove('active');
    }

    changeLanguage(lang, isInitialLoad = false) {
        if (this.currentLanguage === lang && !isInitialLoad && this.currentWordObject) return;
        this.currentLanguage = lang;
        localStorage.setItem('wordleLang', lang);
        document.documentElement.lang = lang; // Set HTML lang attribute
        this.updateLanguageDisplay();
        this.updateUITexts();
        if (!isInitialLoad || !this.currentWordObject) { // Only start new game if not initial load with existing game
            this.startNewGame();
        }
    }

    updateLanguageDisplay() {
        const flags = {
            ja: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAADsAAAA7AF5KHG9AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAXxJREFUWIXtlLtOAlEURde5MxIlzkDiN4ixMVbGR2HUH7Hxr0z8EoRGpdRWbWxMKIzKEBS4c48FvgoJ3AGZht2ex17FORvmmitnSbPZ3CgWo3XAzdpc1dyE3a67WlzUoojM2h9wT0ZVizk4f2nF5GgOQO4AYeZJVdxrC0QwcQQZb8gbQG1Kr1qjf9FA220AJFpmYXebwtEBEgZe++Th4VHL5RLjfIHalPfTM+zt/Z/1oLLK0skxEowP4XUDvWptqDlAentHr1r3WekBoEr/sjGyrX/ZANXpA7iXFpq0R/ZpK8G1kukD8E9BOTaAKcVItDy6L44GbzltAERY2N0e2Rbu7XhlgtcXFI4OCCqrQ+vBWoXC4b7PSr8cANA0pXdeHwTR57GZOCLc26FwuO+VAZkAfkj0+9onjmLVDPMimFKcyfS3DIC1/YkXTQTQ6bxhrc0FIAReVLWcJG01xnREpDs7e3kOjUm3nAs3AZxTYPwcn1TG2OuZmc011zB9AI0liHYXgyMBAAAAAElFTkSuQmCC',
            tr: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAADsAAAA7AF5KHG9AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAe9JREFUWIXtlMtrE1EUh79zMxPTJLXVYLU1rW7FRyVQERQU6UJdVEEQXLnz/3IlSEFFhSJULBRUcKEUUulCLMaK1dRpasY8Zu5xUWoRkiB5IuS3Pdz7fXPmngP99NPjyIfLt07tSY8cU8V2nW6Cd45q+BLVuEjX8aCRvLGq8R6gd5IyPYQD8H8ImGSCSGo/4rptF3AaFWOTJxicuYI7kQYg/J6nvLzC1pM5wg2vswKJ6YsM3bwOIvx6/YbCg6eE+Q0QwTk0AiKg2hkBd/zwH7i/+Arv7r3doirBl68tg3dS8w3EL5wDETQIKMw+aniBc/J4SwI1OxA9Mg5AkFvDFv2aB83wEO70JdzMJJWxUSrP5pv6JU2PofU2wVokGiX8uNr0e6jZgcrqJ9yjEzjpMUwygf1ZrHk4yC5Teb6AJBNNwaFOB/wXi9tf5zjsvTFT93D4fgX1PGzuc3sFqrk1Nu8/BFXi58+y785tIgdS20URnNGD22PYhtTdA8X5BcL1bwxeu8rAVIaBqczuIno815Yd0FAAoLSUpbSUxSTiSCyGLWyh1WpbwH8JqFpE6g+ELfpQZxxbjQEI/XJHLv9ngapXICxVeiLgCHhq7XB5Pa/GifgipmvtsIYfjqg9o8hpAFsNusUGwKBvuwrsp59a+Q2ljbJlG+u+qQAAAABJRU5ErkJggg==',
            en: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAADsAAAA7AF5KHG9AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAA41JREFUWIXtlW1M1VUcxz/n/M994IJ2ebgXyYehJpOnwFKBom5UNBciRGI1V6slE8fGVptbtrH1sGYbm6w02azmmxbLlGpE2bSkkkxfhIAOKYdSAkVw4cq9Fy6Xe08vzJov3NrfBm/4vPrtvDif3/me386BeeaZY0RR0Z7M+CRnltYiamaDitg/YorU0KQpu5zpVCDPRLRwSCnRWl/rSoj/XAeiGiG0KT/aGJXRqHbkrVtG6aPpAKxckUjl49kALEpeQE11AQAOh4Xamnv+kb9aV2xOeiOJwuNp0E6XEyEEdbsepn5PG1OhGXZU5XHoSDej3iDPP7ueE99epO+Sl9KSdPp/HaOr+3cASpZD2UppTi/lpAK4e81i3K44Xt99nLRVLvLXL6Px3dO4XXFse24t7x08Q2yslV07H2R3/TcIIXhp5wO8Wd+GykzH/li22QRijNTUDa+MXQ3Td8nLC7WFHP/6Ih2dA9TWFNLVPUT7qX6e2pLDqDdI69Eeyjdl4XBYONzcDcDqNBcZ6clmG0ABrFu7lGT3At7a187y1ARy70xhX2M7blcc27flc+D908TYFTXbC9h/4Ee0hrqXi3ntjWNEfrtC+KTflFzYrCPC42nQ8e54DEPyYu197N3fTiSq2fpkLi2tPVydCLFlcw4/nLrMlQEfRZ4VDA5N0Pvzn4TDETbYhyi1DZlOQAJkZyVzf2EqexvbWbLESdnGDJoOdSINSWVFNkeauxgZ8VNdlU/bd330XBhmR1WeaekNKXg8DTopJQFlGDy9dQ0fNJ1FSsETm3No+eI8wWCY4odW8VPHAGPjU9xbkMrgoI++y14CgWlK0iyUZ8aYk1ssXgWQmbGIxAQHHzd3k+yOJX21m08+O4fNZlBemkVL63kQUFGWRfOn55gOR6muyuftd05iLL4d20bTaSQogN7eYaw2xcREiEBgmnHfFD7fFFIKvjrWy4R/GiGg9csL+APTADR91AFA1G9uAK+jNlkGxhJkMJ6wAPvfqyH+rYM3qf3X6jt8fkKfHzUlFxY1Ln55pFI7lqaAMHmEW8TkG/r/oVTVM5O2hQtjBCZ/tFvBbhsW/f2D2um8DSHm5g4kgJ6Dw19HRT48PBN0OpWyzsE4GDKgIie+V0EpsSbFY9its91CrEIIv45G40LDowhlhKUhZ2bLrhEDSkYjd0URuQA6PEMkPFt6kOizs2ebZ56b8Bdrw0Feh8/QuAAAAABJRU5ErkJggg=='
        };
        const languages = { ja: '日本語', tr: 'Türkçe', en: 'English' };
        document.getElementById('currentFlag').src = flags[this.currentLanguage];
        document.getElementById('currentLanguage').textContent = languages[this.currentLanguage];
    }

    updateUITexts() {
        const t = this.translations[this.currentLanguage];
        document.getElementById('scoreLabel').textContent = t.score;
        document.getElementById('streakLabel').textContent = t.streak;
        document.getElementById('wordLengthLabel').textContent = t.wordLength;
        document.getElementById('attemptsLabel').textContent = t.attempts;
        document.getElementById('newGameBtn').textContent = t.newGame;
        document.getElementById('hintBtn').textContent = t.hint;
    }

    startNewGame() {
        this.isGameOver = false;
        this.currentAttempt = 0;
        this.currentGuess = '';
        this.keyboardState = {};

        const langWords = this.words[this.currentLanguage];
        this.currentWordObject = langWords[Math.floor(Math.random() * langWords.length)];

        this.targetWordWithSpaces = this.currentWordObject.word.toLocaleLowerCase(this.currentLanguage === 'tr' ? 'tr-TR' : undefined);
        this.targetWordClean = this.targetWordWithSpaces.replace(/\s/g, '');
        this.wordLength = this.targetWordClean.length;

        document.getElementById('wordLength').textContent = this.wordLength;
        document.getElementById('currentAttempt').textContent = '1';

        this.initializeGameBoard();
        this.createKeyboard();
        this.updateKeyboardDOM(); // Reset keyboard colors
        this.clearMessage();

        // console.log('New word:', this.targetWordWithSpaces, "(Clean:", this.targetWordClean, ")");
        // console.log("Hint:", this.currentWordObject.hint);
    }

    initializeGameBoard() {
        const gameBoard = document.getElementById('gameBoard');
        gameBoard.innerHTML = '';

        for (let i = 0; i < this.maxAttempts; i++) {
            const row = document.createElement('div');
            row.className = 'game-row';
            for (let j = 0; j < this.targetWordWithSpaces.length; j++) {
                const cell = document.createElement('div');
                cell.className = 'game-cell';
                if (this.targetWordWithSpaces[j] === ' ') {
                    cell.classList.add('space');
                }
                // cell.dataset.row = i; // Not strictly needed if accessing via children
                // cell.dataset.col = j;
                row.appendChild(cell);
            }
            gameBoard.appendChild(row);
        }
    }

    createKeyboard() {
        const keyboardContainer = document.getElementById('keyboard');
        keyboardContainer.innerHTML = '';
        const keyboardLayout = this.keyboards[this.currentLanguage];

        keyboardLayout.forEach(rowKeys => {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'keyboard-row';
            rowKeys.forEach(key => {
                if (key === ' ') { // Handle spacer in keyboard layout
                    const spacer = document.createElement('div');
                    spacer.style.flexGrow = "0.5"; // Adjust as needed
                    rowDiv.appendChild(spacer);
                    return;
                }
                const keyElement = document.createElement('button');
                keyElement.className = 'key';
                const displayKey = key.toLocaleUpperCase(this.currentLanguage === 'tr' ? 'tr-TR' : undefined);
                keyElement.textContent = displayKey;
                keyElement.dataset.key = displayKey; // Use uppercase for dataset.key to match physical keyboard

                if (key === 'ENTER' || key === 'DELETE') {
                    keyElement.classList.add('wide');
                }
                keyElement.addEventListener('click', () => this.handleVirtualKeyboard(key));
                rowDiv.appendChild(keyElement);
            });
            keyboardContainer.appendChild(rowDiv);
        });
    }

    getLocale() {
        return this.currentLanguage === 'tr' ? 'tr-TR' : undefined;
    }

    handlePhysicalKeyboard(e) {
        if (this.isGameOver) return;
        let key = e.key;

        if (key === 'Enter') {
            this.submitGuess();
        } else if (key === 'Backspace') {
            this.deleteLetter();
        } else if (this.isLetterAllowed(key)) {
            this.addLetter(key);
        }
    }

    isLetterAllowed(char) {
        const lang = this.currentLanguage;
        const normalizedChar = char.toLocaleLowerCase(this.getLocale());

        if (lang === 'tr') return /^[a-zçğıöşü]$/.test(normalizedChar);
        if (lang === 'en') return /^[a-z]$/.test(normalizedChar);
        if (lang === 'ja') {
            // For Japanese, physical keyboard input is complex due to IMEs.
            // We primarily rely on the virtual keyboard for Kana.
            // This is a basic check for direct Kana or Romaji that might be converted.
            const hiraganaRegex = /^[\u3040-\u309F]$/;
            const katakanaRegex = /^[\u30A0-\u30FF]$/; // Includes ー, ヽ, ヾ etc.
            const romajiRegex = /^[a-z]$/;
            return hiraganaRegex.test(char) || katakanaRegex.test(char) || romajiRegex.test(normalizedChar);
        }
        return false;
    }

    handleVirtualKeyboard(key) {
        if (this.isGameOver) return;
        const upperKey = key.toLocaleUpperCase(this.getLocale());

        if (upperKey === 'ENTER') this.submitGuess();
        else if (upperKey === 'DELETE') this.deleteLetter();
        else this.addLetter(key); // Pass original key from virtual keyboard
    }

    addLetter(letter) {
        if (this.currentGuess.length < this.wordLength) {
            // Normalize letter from physical or virtual keyboard
            let processedLetter = letter.toLocaleLowerCase(this.getLocale());
            if (this.currentLanguage === 'ja' && /^[a-zA-Z]$/.test(letter)) {
                // Basic Romaji to Hiragana might be too complex here without a library.
                // Assuming virtual keyboard provides correct Kana. Physical Romaji input needs IME.
                // For now, if it's Romaji, and we expect Kana, this might not work perfectly.
                // The virtual keyboard is the main input method for JA.
            }
            this.currentGuess += processedLetter;
            this.updateCurrentRowDisplay();
        }
    }

    deleteLetter() {
        if (this.currentGuess.length > 0) {
            this.currentGuess = this.currentGuess.slice(0, -1);
            this.updateCurrentRowDisplay();
        }
    }

    updateCurrentRowDisplay() {
        const gameBoard = document.getElementById('gameBoard');
        const currentRowEl = gameBoard.children[this.currentAttempt];
        if (!currentRowEl) return;
        const cells = currentRowEl.children;

        let guessCharIndex = 0;
        for (let i = 0; i < this.targetWordWithSpaces.length; i++) {
            const cell = cells[i];
            // Clear previous states like 'correct', 'present', 'absent' if re-typing
            cell.classList.remove('correct', 'present', 'absent', 'filled');

            if (this.targetWordWithSpaces[i] === ' ') {
                cell.textContent = '';
                cell.classList.add('space'); // Ensure space class is there
            } else {
                if (guessCharIndex < this.currentGuess.length) {
                    cell.textContent = this.currentGuess[guessCharIndex].toLocaleUpperCase(this.getLocale());
                    cell.classList.add('filled');
                } else {
                    cell.textContent = '';
                }
                guessCharIndex++;
            }
        }
    }

    submitGuess() {
        if (this.isGameOver) return;
        const t = this.translations[this.currentLanguage];

        if (this.currentGuess.length !== this.wordLength) {
            this.showMessage(t.invalidWord, 'error');
            this.shakeCurrentRow();
            return;
        }

        if (!this.isValidWordInList(this.currentGuess)) {
            this.showMessage(t.notInList, 'error');
            this.shakeCurrentRow();
            return;
        }
        this.evaluateGuess();

        if (this.currentGuess === this.targetWordClean) {
            this.handleWin();
        } else if (this.currentAttempt >= this.maxAttempts - 1) { // Max attempts reached
            this.handleLoss();
        } else {
            this.currentAttempt++;
            document.getElementById('currentAttempt').textContent = this.currentAttempt + 1;
            this.currentGuess = '';
        }
    }

    isValidWordInList(word) {
        const normalizedWord = word.toLocaleLowerCase(this.getLocale());
        const wordList = this.words[this.currentLanguage].map(item =>
            item.word.replace(/\s/g, '').toLocaleLowerCase(this.getLocale())
        );
        return wordList.includes(normalizedWord);
    }

    evaluateGuess() {
        const gameBoard = document.getElementById('gameBoard');
        const currentRowEl = gameBoard.children[this.currentAttempt];
        const cells = currentRowEl.children;

        const guessArray = this.currentGuess.split('');
        const targetArray = this.targetWordClean.split('');

        // For tracking letter usage in the target word (for 'present' state)
        const tempTargetLetters = [...targetArray];
        const resultStates = Array(this.wordLength).fill('absent');

        // Pass 1: Check for 'correct' (green) letters
        for (let i = 0; i < this.wordLength; i++) {
            if (guessArray[i] === targetArray[i]) {
                resultStates[i] = 'correct';
                tempTargetLetters[i] = null; // Mark as used for 'present' check
                this.updateKeyboardState(guessArray[i], 'correct');
            }
        }

        // Pass 2: Check for 'present' (yellow) letters
        for (let i = 0; i < this.wordLength; i++) {
            if (resultStates[i] === 'absent') { // Only if not already 'correct'
                const letterIndexInTemp = tempTargetLetters.indexOf(guessArray[i]);
                if (letterIndexInTemp !== -1) {
                    resultStates[i] = 'present';
                    tempTargetLetters[letterIndexInTemp] = null; // Mark as used
                    this.updateKeyboardState(guessArray[i], 'present');
                } else {
                    this.updateKeyboardState(guessArray[i], 'absent');
                }
            }
        }

        // Apply results to DOM cells with animation
        let cellContentIndex = 0;
        for (let i = 0; i < this.targetWordWithSpaces.length; i++) {
            const cell = cells[i];
            if (this.targetWordWithSpaces[i] === ' ') continue;

            const state = resultStates[cellContentIndex];
            const letter = guessArray[cellContentIndex];

            // Animate and color
            // The 'flip' animation should handle revealing the color.
            // Set text content before animation might be good.
            cell.textContent = letter.toLocaleUpperCase(this.getLocale());

            // Delay class change for flip animation to work correctly
            setTimeout(() => {
                cell.classList.add(state);
            }, cellContentIndex * 120 + 50); // Stagger and slight delay for animation start

            cellContentIndex++;
        }
        this.updateKeyboardDOM();
    }

    updateKeyboardState(letter, state) {
        const upperLetter = letter.toLocaleUpperCase(this.getLocale());
        const currentKeyState = this.keyboardState[upperLetter];

        if (state === 'correct') {
            this.keyboardState[upperLetter] = 'correct';
        } else if (state === 'present' && currentKeyState !== 'correct') {
            this.keyboardState[upperLetter] = 'present';
        } else if (state === 'absent' && currentKeyState !== 'correct' && currentKeyState !== 'present') {
            this.keyboardState[upperLetter] = 'absent';
        }
    }

    updateKeyboardDOM() {
        const keys = document.querySelectorAll('.key');
        keys.forEach(keyEl => {
            const keyChar = keyEl.dataset.key; // This is already uppercase
            const state = this.keyboardState[keyChar];
            keyEl.classList.remove('correct', 'present', 'absent'); // Clear previous
            if (state) {
                keyEl.classList.add(state);
            }
        });
    }

    shakeCurrentRow() {
        const currentRowEl = document.getElementById('gameBoard').children[this.currentAttempt];
        if (!currentRowEl) return;
        currentRowEl.classList.add('shake');
        setTimeout(() => currentRowEl.classList.remove('shake'), 500);
    }

    handleWin() {
        this.isGameOver = true;
        const t = this.translations[this.currentLanguage];
        const points = this.calculatePoints();
        this.score += points;
        this.streak++;
        this.updateGameStats(true);
        this.updateScoreDisplay();
        this.saveScore();

        setTimeout(() => {
            this.showMessage(`${t.correct} +${points} ${t.score.toLowerCase()}! ${t.wellDone}`, 'success');
            this.celebrateWin();
        }, (this.wordLength * 100) + 500); // After flip animations
    }

    handleLoss() {
        this.isGameOver = true;
        const t = this.translations[this.currentLanguage];
        this.streak = 0;
        this.updateGameStats(false);
        this.updateScoreDisplay(); // Update display even if score unchanged, for streak
        this.saveScore();

        setTimeout(() => {
            this.showMessage(`${t.gameOver} ${t.wordWas}: ${this.targetWordWithSpaces.toLocaleUpperCase(this.getLocale())}`, 'error');
        }, (this.wordLength * 100) + 500);
    }

    calculatePoints() {
        const basePoints = 50;
        const attemptBonus = (this.maxAttempts - this.currentAttempt) * 15;
        const lengthBonus = this.wordLength * 5;
        const streakBonus = this.streak * 10; // Increased streak bonus
        return basePoints + attemptBonus + lengthBonus + streakBonus;
    }

    celebrateWin() {
        // Optional: Add confetti or other celebration effects
        const gameBoard = document.getElementById('gameBoard');
        gameBoard.classList.add('celebration');
        setTimeout(() => gameBoard.classList.remove('celebration'), 800);
        this.createConfetti();
    }

    createConfetti() { /* ... (same as your original) ... */ }


    showHint() {
        if (this.isGameOver || !this.currentWordObject) return;
        const t = this.translations[this.currentLanguage];
        let hintText = t.hintPrefix;

        if (this.currentWordObject.hint) {
            hintText += this.currentWordObject.hint;
        } else { // Fallback hint if specific one isn't defined
            const firstLetter = this.targetWordClean[0];
            hintText += `${firstLetter.toLocaleUpperCase(this.getLocale())}...`;
        }
        this.showMessage(hintText, 'info');
        // Optional: Deduct points or mark hint as used
    }

    showMessage(text, type = 'info', duration = 3000) {
        const messageElement = document.getElementById('gameMessage');
        messageElement.textContent = text;
        messageElement.className = `message ${type} show`;

        setTimeout(() => {
            messageElement.classList.remove('show');
        }, duration);
    }

    clearMessage() {
        const messageElement = document.getElementById('gameMessage');
        messageElement.classList.remove('show');
        setTimeout(() => { // Ensure it's visually gone before clearing text
            messageElement.textContent = '';
            messageElement.className = 'message';
        }, 300);
    }

    updateScoreDisplay() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('streak').textContent = this.streak;
    }

    saveScore() {
        localStorage.setItem('wordleScore', this.score.toString());
        localStorage.setItem('wordleStreak', this.streak.toString());
    }

    updateGameStats(won) {
        const gamesPlayed = (parseInt(localStorage.getItem('wordleGamesPlayed') || '0')) + 1;
        const gamesWon = (parseInt(localStorage.getItem('wordleGamesWon') || '0')) + (won ? 1 : 0);
        const bestStreak = Math.max(this.streak, parseInt(localStorage.getItem('wordleBestStreak') || '0'));

        localStorage.setItem('wordleGamesPlayed', gamesPlayed.toString());
        localStorage.setItem('wordleGamesWon', gamesWon.toString());
        localStorage.setItem('wordleBestStreak', bestStreak.toString());
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('wordleTheme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme'); // Assuming you have .light-theme CSS
        }
    }

    // createConfetti, announceToScreenReader, setupTouchSupport, handleSwipe (can be copied from your original if needed)
    createConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd'];
        const confettiCount = 50;

        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.top = '-10px';
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.borderRadius = '50%';
                confetti.style.pointerEvents = 'none';
                confetti.style.zIndex = '9999';
                confetti.style.animation = 'confettiFall 3s linear forwards';

                document.body.appendChild(confetti);

                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, 3000);
            }, i * 30); // Slightly faster confetti
        }

        if (!document.querySelector('#confettiStyle')) {
            const style = document.createElement('style');
            style.id = 'confettiStyle';
            style.textContent = `
                @keyframes confettiFall {
                    to {
                        transform: translateY(100vh) rotate(${Math.random() * 720 - 360}deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const game = new MultilingualWordle();

    // Console messages for debugging/info (optional)
    // console.log('🎮 Multilingual Wordle Initialized 🎮');
    // console.log('Shortcuts: Type letters, Enter to submit, Backspace to delete.');
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js') // Ensure sw.js is in the root
            .then((registration) => {
                // console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
