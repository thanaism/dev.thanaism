---
layout: post
title: 転職して最初の1ヶ月が過ぎた
image: ../../img/sebastian-pena-lambarri-YV593oyMKmo-unsplash.jpg
author: [Thanai]
date: 2021-01-31T15:00:00.000Z
draft: false
tags:
  - job
excerpt: 何はともあれ記録していく
---

# 怒涛の1ヶ月が過ぎた

なにはともあれ転職して最初の1ヶ月が過ぎた。といっても最初の2週間は研修だったので、本務としてはまだ週間しか経っていない。

扱う技術の範囲としてはクラウド、その中でもK8sという感じだ。
チームの方々は経験の浅い自分の取り扱いに苦慮しているとは思うが、そんな雰囲気も出さず非常に丁寧に接してもらっている。申し訳ないレベルである。

一刻も早く業務に通用するレベルの知識を身につけて知識以上の付加価値を生んでいかねばなー、と感じる次第。
現状、もらっている給料に見合うだけのバリューは間違いなく発揮できていないので、いわば借金返済生活である。

自分はどちらかというと「その教育コストも含んだうえでの採用判断の責任は企業側だろう」という考えに寄った人間かと思っていたが、これは環境起因だったかもしれない。
転職1ヶ月にしてすでに企業に対するロイヤルティという概念に腹落ちしている自分がいる。

# K8sとは？

上でいきなりK8sとか書いたので、なんだそれはと思った人もいるかもしれない。
最近、Twitterに「140秒でわかる」シリーズをあげているので、[K8sの回](https://twitter.com/okinawa__noodle/status/1352407276108214273?s=20)を見ればちょっとはわかるかも。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/140%E7%A7%92%E3%81%A7%E3%82%8F%E3%81%8B%E3%82%8BKubernetes?src=hash&amp;ref_src=twsrc%5Etfw">#140秒でわかるKubernetes</a> 今日は娘が手伝ってくれています😂<br><br>昨晩届いたばかりのLogicool StreamCamを試しに使って撮りました📷 <a href="https://t.co/7TxFIobnvo">pic.twitter.com/7TxFIobnvo</a></p>&mdash; タナイ (@okinawa__noodle) <a href="https://twitter.com/okinawa__noodle/status/1352407276108214273?ref_src=twsrc%5Etfw">January 22, 2021</a></blockquote>

K8sは**クラウド界のLinux**と言われている。要するに今アツい存在。もとはGoogleが開発していて、今はCNCFに移管されている。
2016 年ごろ開発元に近いGCPが先陣を切り、2018年にはAzureとAWSが続くことで主要3大クラウドすべてでマネージドK8sがGA（ベータ版を終えた正式版がリリース）されている。
ちなみに、CNCFというのはCloud Native Computing Foundationの略。とにかく、ちゃんと時流に乗っているシロモノというわけ。

つまりK8sを勉強すれば、

- 最新トレンドが理解でき、
- 会社の事業にも貢献でき、
- 自分自身の人材価値も高まる

というまさに一石二鳥どころか一石三鳥、当然だがやる気もわく。

これまでのように他の業界では絶対に役に立たないようなクソどうでもいい設備の仕様だとか、そういう無駄なものに貴重な脳のリソースを割く必要がない。

# とはいえ知識も経験も足りない

入社前にAZ-900は取得したものの、これまで何年も業界で経験を積んだエンジニアに比べれば自分はまだハナクソのような存在である。

とにかく今必要なのは圧倒的に勉強。説明力とか折衝力とか、仮に私にそういった秀でたポイントがもしあったとしても、そういう付加価値的なものは盤石な基礎があってこそ役に立つものであって、基礎がない現時点では完全な宝の持ち腐れである。

たしかに私は学習意欲があり、飲み込みが早く、コミュニケーションも円滑に行うことができる超優秀なサイコー人材であることは間違いないが、自らに不足する部分を冷静に判断し謙虚に努力を行うことができる人格者でもあるのだ。

冗談は大概にして、せっかくなのでどんなことを勉強したのか、というのが未経験スタートにおいて実はロードマップ的な知見になる気がしたので記録しておくことにする。
往々にして、いったん自分ができるようになってしまったことは後から思い出そうとしても何がどうして出来なかったとか忘れてしまうのが人間の性である。

# 入って1ヶ月間で勉強したトピック

まず、箇条書きに。

- Vim
- PowerShell
- Azure
- Docker
- Kubernetes
- sed
- awk
- DevOps
- JMESPath
- L4/L7

ざっとこんな感じだろうか。細々としたところとか、あんまり業務に密接したところは守秘義務上あんまりよくない気がするのではしょっている。
全部について書くと一生書き終わらないのでかいつまんで。けっこうな勢いで本を読んでいるのだが、まったく追いついている感じがしない（素人がちょっと本読んで追いつければ世話ないので当たり前だが、世の中の8割ぐらいのことはマトモな本を1冊通すとそこそこ上のポジションに行ける気がする。）

## Vim

自分のなかでパラダイムシフトが起こったのがこれ。クラウドだとかサーバー関連やるのにターミナル上でおちおちテキストも満足に編集できないようじゃウスノロと思われても仕方ないので自主的に vimmer への道を志した。

めちゃくちゃ役に立ったのが[実践Vim](https://amzn.to/36tpyia)という本。

<table><tr><td style="border:0px;">
    <a href="https://amzn.to/36tpyia" target="_blank"><img src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B00HWLJI3U&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=dev00d-22&language=ja_JP" ></a>
</td></tr></table>

これを1冊だいたい通したら、もうVim以外のエディタは使いたくないという気持ちになった。今も、VS CodeにVimのプラグインを入れて書いている。
あとは、面白そうなサイトとして[VIMATE](https://vimate.jp/)というのがある。最近できたサイトっぽいのだが、vim初心者が楽しんでvimコマンドを覚えられるようなゲームが提供されている。

ちなみに私はVimmer診断初級編でレジェンドまでやっておいた。負けず嫌いなので。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">よっしゃ30秒切ったわ。レジェンドや。<br><br>Vimmer診断初級編<br>タイム : 29秒でした！<br><br>あなたの診断結果は...<br>Vimmerの中のレジェンドと呼ばれています。Vimの事なら大体知っています。Vim以外のエディタを見下す傾向があります。<a href="https://twitter.com/hashtag/Vim?src=hash&amp;ref_src=twsrc%5Etfw">#Vim</a> <a href="https://twitter.com/hashtag/VIMATE?src=hash&amp;ref_src=twsrc%5Etfw">#VIMATE</a><br> <a href="https://t.co/o8RQAJ3ZQK">https://t.co/o8RQAJ3ZQK</a></p>&mdash; タナイ (@okinawa__noodle) <a href="https://twitter.com/okinawa__noodle/status/1353366337628770304?ref_src=twsrc%5Etfw">January 24, 2021</a></blockquote>

## PowerShell

Azure PowerShellを扱うために。テキストベースのBashと違ってPSはオブジェクトで結果が返る。コマンドも馴染みがないのでつらさがある。
とりあえず、[PowerShell実践ガイドブック](https://amzn.to/3aj7xnF)という本を買ったのだがかなり良かった。まだ全部は読めていないが序盤だけでもだいぶ概要がつかめるようになっている。

<table><tr><td style="border:0px;">
    <a href="https://amzn.to/3aj7xnF" target="_blank"><img src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07D73G2X7&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=dev00d-22&language=ja_JP" ></a>
</td></tr></table>

## Docker/K8s

このあたりはメインなので色々と本を買った。

[Kubernetes完全ガイド](https://amzn.to/3ahyxUJ)、[実践コンテナ開発入門](https://amzn.to/2MaZUrF)、[しくみがわかるKubernetes](https://amzn.to/2Mcf5kp)の 3 冊だ。

<table><tr>
  <td style="border:0px;">
    <a href="https://amzn.to/3ahyxUJ" target="_blank"><img src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B08FZX8PYW&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=dev00d-22&language=ja_JP" ></a>
  </td>
  <td style="border:0px;">
    <a href="https://amzn.to/2MaZUrF" target="_blank"><img src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07GP1Q3VT&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=dev00d-22&language=ja_JP" ></a>
  </td>
  <td style="border:0px;">
    <a href="https://amzn.to/2Mcf5kp" target="_blank"><img src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07L94XGPY&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=dev00d-22&language=ja_JP" ></a>
  </td>
</tr></table>

## JMESPath

awsでもAzureでも、CLIで出力のjsonをパースするのに使える。
業界的にはjqというライブラリのほうが有名らしく、そっちにパイプでぶん投げることが多いらしいが、JMESPathはPythonに慣れていると非常にわかりやすい文法でもあるので、チュートリアル等々を通じてだいたい覚えた。

くわしくは[公式](https://jmespath.org/tutorial.html)を見てくれ。

# おわりに

とにかく毎日の時間が足りないし、もっともっと勉強したいという気持ちがある。そしてそれがとても楽しい。

今まで知らなかった世界に触れられるし、それが自分の信条と合致する領域だというのが何よりよい。

やっぱり、「**こんなことやってなんのためになる？**」とか「**はあ？バッカじゃねえの**」みたいなことばっかりだと、いくらそれが将来的な昇進とかに結びついていたとしても、心身の拒絶反応（＝過大なストレス）に繋がり、いずれ死ぬことになる。

で、そういう拒絶反応が何に対して生じるか、というのは本当に人それぞれなので自分に合った環境をどうにかして維持できるよう最大限努力することが大事だな、と思った次第。

いったん手にしてしまえば楽しんでやっている人に、そうでない人は敵わないはずなのであとはおのずとよいサイクルへ入っていくだろう、という予測も込めて。
