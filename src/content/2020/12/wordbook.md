---
layout: post
title: エンジニアなら知っておきたい単語リスト
image: ../../img/header/2020/12/a285aa6d.jpg
author: [Thanai]
date: 2020-12-16T17:00:00.000Z
draft: false
tags:
  - programming
excerpt: 知らなかった単語を備忘録としてストック
---

### サイロ化

- 組織の縦割り化が進んで他部門への横展開が出来ていない状態

### ピザ2枚ルール

- ジェフ・ベゾス「社内のすべてのチームは2枚のピザを食べるのにピッタリな人数でなければいけない」

### RACI図

- プロジェクトのタスクをResponsible/Accountable/Consulted/Informedという4つの責任型に分類可視化した図。
- 各担当者の責任の所在を明確化する

### デリゲーションポーカー

- 管理者とメンバーとの間で権限委譲のあり方について7段階に分けてすり合わせることの可能なカードゲーム

### プロジェクト憲章

- プロジェクトの責任者や目的、ニーズなどを定める文書

### インセプションデッキ

- プロジェクトの全体像を端的に伝えるための文書。
- アジャイルサムライの著者がその雛形を流布した。当該プロジェクトに関する5つのWHYと5つのHOWを定義する

### オンボーディング・デック

- Googleやメルカリなどで用いられている。
- 組織への新規参入者が早期に成果を発揮できるように、当該組織に関する内容をまとめた手引書のようなもの

### OKR

- Objectives and Key Resultsの略で、Intelで発祥し、GoogleやFacebookも取り入れている。
- 組織として達成したい定性的な目標（Objectives）をまず設定する。
- 加えて、それら目標の実現度を評価にあたり特に重要と思われる定量的な指標（Key Results）を3個ほど掲げるという手法。
- 特徴として、目標は最大でも4半期程度の短期的なものとし、指標は実現可能性が10段階評価で5程度の自信があるものとする。
- また、6割から7割程度の達成度でそのミッションを成功とみなす。
- KPIのような現状把握ではなく、組織としての方向性を短いサイクルで適切に軌道修正していくための手法といえる

### ペアプログラミング

- ドライバーとナビゲーターに分かれ、30分から1時間程度に細分化された機能を、1サイクルごとに役割を交代しながら実装していく手法

### モブプログラミング

- ペアプログラミングをチーム全体など、さらに多い人数で行う手法

### E2E

- End to Endテストを指す。単体テストに対する、システム全体の結合テスト

### Serverspec

- サーバーの自動テストを実現するツール。
- パッケージのインストール状況や指定したポートへのアクセス可否などを事前にテストスクリプトを用意することで自動化する

### feature toggle

- ブランチを切るのではなく、開発中の機能への遷移を制限・管理していく手法。
- カナリアリリース（一部ユーザーのみに機能開放）などの手法と相性が良い

### SLI/SLO/Error Budget

- Service Level IndicatorおよびService Level Objective。
- 目標のサービスレベルと現状を可視化することで、その差分の範囲におけるエラーを許容する考え方

### SRE

- Site Reliability Engineeringの略で、Googleが提唱したエンジニアの役割。
- システムの信頼性に焦点を置いており、上記のError Budgetの考え方などを取り入れている。
- Googleの解説では、`class SRE implements DevOps`と述べられており、DevOpsで定義される抽象的なメソッドの実装部分を担うものだと解釈することができる

### APM

- Application Performance Managementの略。
- アプリケーションやシステムの応答時間をモニタリングしたりなど、ユーザー体験の毀損要因がどこにあるのかを明瞭化するために実施する

### fault injection

- ソースコードや利用環境に故意的に異常を埋め込んだ際の挙動をテストする手法。
- トラブル発生時の対処などを策定するのに有用

### chaos engineering

- Netflixが導入したことで注目されるようになった障害対策の手法。
- 上記のfault injectionにも通じるが、一種の避難訓練的な手法。
- ここでいうカオスは、カオス理論でいうところのカオスであり、分散システムにおける局所的な瑕疵が全体にカオス的な影響を及ぼすといったことを指している。
- また、カオスエンジニアリングは本番環境でテストを行うものであり、あくまでマイクロサービス化が普及しているシステムに対して有効に働くもの。
- 日本のようにモノリシックなサービスが依然として台頭している環境においては、普及に時間がかかるものと想定される

### セキュア コーディング

- 悪意のある攻撃者やマルウェア等による攻撃に耐え得る、堅牢なプログラムを書くこと。

### データの世紀

- 石油の世紀と言われる20世紀に対して、21世紀をデータの世紀とする捉え方

### メトリクス

- metrics（評価尺度）
- 活動を定量化し、その定量化データを管理指標として使えるように加工したもの。

### MLOps

- 機械学習の基盤整備

### DataOps

- データ利用の基盤整備

### ETL

- Extract/Transform/Load
- 抽出/変換/格納

### IaC

- Infrastructure as Code

### BIツール

- Business Intelligence Toolの略
- 企業に蓄積された大量のデータを集めて分析し、迅速な意思決定を助けるのためのツール

### PoC

- Proof of Concept
- 新しい技術や理論、原理、手法、アイディア、などに対し、実現可能か、目的の効果や効能が得られるか、などを確認するために実験的に行う検証工程
- 概念実証ともいう
- 理論や計算などによる検証ではなく、製品やシステムの簡易版を作り、実際に使うことで具体的な検証を行うことが特徴

### [ナーチャリング](https://www.weblio.jp/content/%E3%83%8A%E3%83%BC%E3%83%81%E3%83%A3%E3%83%AA%E3%83%B3%E3%82%B0)

- nurturing（育成する、養育する）
- 潜在顧客から見込み顧客へ、見込み顧客から既存顧客へ引き上げていくこと

### [リテンション](https://www.elite-network.co.jp/dictionary/retention.html)

- retention（保持、維持）
- マーケティング領域において既存顧客の維持を指す

### インハウス

- 社内、企業内、組織内を指す

### カスタマージャーニー

- ペルソナの動き（行動・思考・感情）を時系列で見える化したもの
- 複雑化している顧客の行動を捉え、マーケティング成果の改善のために行う
- 可視化した資料をカスタマージャーニーマップと呼ぶ

### DMP

- Data Management Platform
- インターネット上に蓄積された様々な情報データを管理するためのプラットフォーム

### [バンディットアルゴリズム](https://blog.albert2005.co.jp/2017/01/23/%E3%83%90%E3%83%B3%E3%83%87%E3%82%A3%E3%83%83%E3%83%88%E3%82%A2%E3%83%AB%E3%82%B4%E3%83%AA%E3%82%BA%E3%83%A0%E3%80%80%E5%9F%BA%E6%9C%AC%E7%B7%A8/)

- 単なる最適腕識別を行うA/Bテストとは異なり、累積報酬の最大化を目的としたアルゴリズム
- 有限の試行回数の中で優れたアーム（選択肢）を多く引くように探索と活用を同時並行に実施する

### [コーホート分析](https://www.synergy-marketing.co.jp/glossary/cohort-analysis/)

- 同じ時期に生まれた人の生活様式や、行動、意識などからくる消費の動向を分析・調査をすること
- 同時期に同様の体験をして成長するため、物に対する価値観など、共通の行動や意識を指し示すことが多い
- 年齢を重ねて、時代が経過しても、意識に共通性が見られることもある

### [ケイパビリティ](https://www.ashita-team.com/jinji-online/category1/8123)

- 事業戦略の文脈において、製品や市場など単体を指すものではなく、事業全体のプロセスについての強みを指す
- 組織を横断的に眺めた時に、他社と比較して強みがある部分全体

### [プロセスマイニング](https://home.kpmg/jp/ja/home/insights/2019/05/what-is-process-mining.html)

- 業務プロセスの処理パターンをイベントログデータの蓄積により可視化し、改善ポイントを具体的に特定することで業務効率化を支援する手法

### [NPS](https://www.nttcoms.com/service/nps/summary/)

- Net Promoter Score
- 顧客ロイヤルティを測る指標
- 今まで計測が難しかった「企業やブランドに対してどれくらいの愛着や信頼があるか」を数値化する
- 企業の顧客との接点における顧客体験の評価・改善に生かされている

### CRM

- Customer Relationship Management
- 顧客管理システム

### SFA

- Sales Force Automation
- 営業支援システム

### [共感マップ](https://nijibox.jp/blog/empathymap/)

- ペルソナが置かれている状況や感情を深く理解するために使われるフレームワーク

### クローズドクエッション

- Yes/Noで答えることのできる質問

### ペイン

- Pain（痛み）
- しばしば顧客のニーズとペインという形で対比的に用いられる

### [OOUI](https://www.cresco.co.jp/blog/entry/10582/)

- Object Oriented User Interface
- オブジェクト指向ユーザーインターフェース
- タスクベースのUIと対比的に捉えられる（動作を先に選択するか、対象を選択してから動作を選ぶか）

### ワークショップ

- ある主題での（参加者が知識を分け合う）研究集会

### [バックログアイテム](https://junhiguchi.hatenablog.jp/entry/20190725/1564015238)

- PBI（Product Backlog Item）とも
- 今後のリリースで実装するプロダクトのフィーチャ・機能・要求・要望・修正をすべて一覧にしている
- プロダクトバックログアイテムには、詳細・並び順・見積り・価値の属性がある
- プロダクトバックログアイテムには、「完成」時にそれを確認するためのテスト記述も含まれていることが多い

### [VPC](https://www.profuture.co.jp/mk/column/7431)

- Value Proposition Canvas
- 自社の製品やサービスと顧客のニーズとのずれを解消するためのフレームワーク
- 誰に何を提供するのか/顧客のニーズは何か/顧客に提供できる価値は何かを段階的に記入していく
- この方法によって提供価値と顧客ニーズのギャップを可視化できる

### スパン・オブ・コントロール

- 企業内でマネージャーとなっているものが直接に管理している部下の人数や業務の領域のこと

### eNPS

- Employee Net Promoter Score
- 従業員ロイヤルティ（職場に対する愛着・信頼の度合い）

### ChatOps

- チャットベースのシステム運用

### タレントマネジメントシステム

- 個人情報・スキル・経験値などの社員の情報をデータ化し一元管理するシステム

### iPaaS

- Integration Platform as a Service
- オンプレやクラウドベースのアプリケーションを相互に接合し統合的に管理するツール

### CTO/CDO

- Chief Technical Officer / Chief Data(Degital) Officer
- 最高技術責任者 / 最高データ(デジタル)責任者

### シフトレフト

- 開発ライフサイクルの早い段階でテスト活動を行うこと
- 特にセキュリティ問題について早期に対処・対策を講じる開発・運用のポリシー

### 境界防御モデル/ゼロトラストモデル

- 旧来型のイントラネットに適用される境界防御モデルからゼロトラストモデルへの移行が推奨されている
- 考え方としては`Trust but verify`から`Verify but never trust`
- 旧来型の境界防御モデルでは一度侵入を許してしまったウイルスが内部で拡散することに対する防御手段がない

### シャドーIT

- 会社が許可・認知していないITツールやサービスを従業員が利用していること
- しばしばシャドーITを経由した情報漏洩リスクへの対策が必要となる
