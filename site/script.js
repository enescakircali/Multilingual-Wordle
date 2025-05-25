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
                { word: 'せなか', hint: '背中に埋め込まれたセンサーが、姿勢から感情を読み取り、企業に報告する。' }
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
                { word: 'gece', hint: 'Neon ışıklı bir karanlık; AI eskortlar günahı sunar.' }
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
                { word: 'night', hint: 'A neon-lit darkness where AI escorts offer sinful delights.' }
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
        } else if (this.currentAttempt >= this.maxAttempts -1) { // Max attempts reached
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