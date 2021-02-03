---
layout: post
title: Google Meetのノイズキャンセリング機能は日本では無効なのか？
image: ../../img/david-clode-u5K46PukKAo-unsplash.jpg
author: [Thanai]
date: 2021-02-02T15:00:00.000Z
draft: false
tags:
  - remote work
excerpt: ノイズキャンセルといっても色々ある
redirect_from:
  - /2020/01/noise-canceling-on-google-meet/
---

<!-- prettier-ignore-start -->

## 結論

先に結論をば。

**Google Meetでは、バックグラウンドのホワイトノイズは自動で除去されています。**

なので、マイクのホワイトノイズは気にしなくて大丈夫っぽいです。
気にするべきはタイプ音とか吐息とか、そういう環境音ですね。


## 経緯

Windows標準のボイスレコーダーを使って自分の声を録音してみると、ホワイトノイズが乗っていてめちゃくちゃ気になってました。

自分が使うマイクの候補としてはいろいろあって、

1. ノートPC内臓マイク
1. 外付けwebcam内臓マイク（[Logicool StreamCam](https://amzn.to/3apcuLL)）
1. 据え置きコンデンサマイク（[SONY ECM-PCV80U](https://amzn.to/3tjd8mC)）
1. ヘッドセット（[Logicool G433BK](https://amzn.to/3oHic0w)）

Logicoolの[StreamCam](https://amzn.to/3apcuLL)はなぜか優秀でノイズがまったく乗らないけれど、無指向性のマイクなのでキーボードのタイプ音をゴリゴリ拾ってしまうという嫌な感じがありました。

それで[G433BK](https://amzn.to/3oHic0w)のヘッドセットを購入したわけですが、やっぱりノートPCのジャックに直つなぎなので、めちゃくちゃノイズが乗っています（これは3.5mmジャックを使うなら宿命ですが）。
あー、ダメかー、って思いました。こんなことならやっぱりusb-c接続もある[Jabra Evolve2](https://amzn.to/3rk3puJ)にしておけばよかったと。

誰かがこういうノイズを会議中ずっと発していたら自分だったら気が狂ってしまいます。

<table><tr>
  <td style="border:0px;">
    <a href="https://amzn.to/3oHic0w" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B071GBFYT4&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=dev00d-22&language=ja_JP" ></a>
  </td>
</tr></table>

## Google Meetのノイズキャンセリング

さすがに他の参加者にこのノイズを聞かせるのはちょっと嫌だなー、と思っていたんですが、Zoomとかだとノイズ除去がかかってますよね。あれがあれば別に問題ない。

Google Meetについてググると**日本はノイズキャンセリング対象外**、みたいなのが書いてあったので、ウーン。

https://support.google.com/meet/answer/9919960?co=GENIE.Platform%3DAndroid&hl=ja

> 重要: オーストラリア、ブラジル、インド、日本、ニュージーランド、南アフリカ、アラブ首長国連邦、およびその周辺地域では、ノイズ キャンセル機能はまだご利用いただけません。

とはいえ、他の人でノイズがバチバチ乗っているのもほぼ聞いたことがなく、どうもおかしいな、と。
実際自分の声がどう聞こえているのか、 Google Meetの録画機能でチェックしてみた次第です。

で、結論に戻りますが、ノイキャン効いてました。
上の対象外っていうのは、AI的な自動除去の技術の話みたいです。

いわゆる有料で展開してる[Krisp](https://jp.vcube.com/service/krisp)みたいなやつのことですね。

## おわりに

これで安心してヘッドセットを使うことができます。

**しかし、メカニカルキーボードはうるさい……。**

ちなみに[G433BK](https://amzn.to/3oHic0w)は、本体は軽いし、マイクは（環境音への）ノイキャンついてて、さらに付属品としてUSB-DACも4極→3極2股の変換も付いてるので悪くない選択肢ではあるかなー、と思ってます。

もっと言うとキーボードをタイプとかしないなら[StreamCam](https://amzn.to/3apcuLL)のマイク品質はメチャクチャいいです。
いろんなYouTuberのレビュー動画見ましたが、StreamCamのマイク品質は他のWebcamと一線を画してますね。無指向ではありますが、ただ話すだけだったらこれ1台で全然OK。

<table><tr><td style="border:0px;">
  <a href="https://amzn.to/3apcuLL" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B086R71LGW&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=dev00d-22&language=ja_JP" ></a>
</td></tr></table>


<!-- prettier-ignore-end -->
