---
layout: post
title: ディスプレイサイズと解像度によるドットサイズの変化
image: ../../img/dominik-lange-Lej_oqHljbk-unsplash.jpg
author: [Thanai]
date: 2021-01-16T01:00:00.000Z
draft: false
tags:
  - gadget
excerpt: 1ドットあたりのサイズを揃えるために
---

## 今のディスプレイとdpi(ppi)を揃えたい

今年に入ってフルリモート前提の仕事に就いたので、ディスプレイまわりのベストプラクティスを鋭意検討中です。

もともとはMac miniに27インチのフルHDディスプレイを2枚接続して[縦＋横でデュアルの環境](https://note.com/hifu_pong/n/n84fd9e623482)にしていました。

Macを1台だけで使うならこれでなんの文句もないわけですが、日中は会社PCに繋ぎ変えないといけないっていうのが派手に（地味に、ではなく）ストレスです。

で、このあたりの模索については別途どこかで記事にするとして、なにはともあれ、もしディスプレイを追加で購入する場合に、既存のディスプレイとの調和性がなにより重要になってきます。

具体的には、**画素1ドットあたりのサイズ**を今とあまり変えたくないです。単位は異なりますが、いわゆるppiの値を一定に保ちたいということですね。

## 27インチのフルHDを基準に考える

兎にも角にも、今持っているものを基準に、世の中で売られているディスプレイがどんなものかを羅列していきます。

ちなみに**27**インチの**16:9**ディスプレイは**縦33.6cm**、**横59.8cm**、**対角68.6cm**です。**82ppi**。1inch＝2.54cm。

あくまで実寸ではなく、数値上です。24インチとして売られているディスプレイも、正確には23.8インチかもしれないし、そのあたりは考えるのを放棄しています。参考商品はそのサイズのモニタを自分が買うならをこれっていうのを想定した暫定チョイスたち。

### 先に表で

マイナーな商品はわかりませんが、メジャーどころのメーカーのラインナップにある範囲で自分の購入しうるサイズをまとめてます。

| inch/res. | 1920x1080 | 2560x1080 | 2560x1440 | 3440x1440 |
| :-------: | :-------: | :-------: | :-------: | :-------: |
| **23.8**  |   93ppi   |     -     |     -     |     -     |
|  **27**   |   82ppi   |     -     |  109ppi   |     -     |
|  **29**   |     -     |   96ppi   |     -     |     -     |
| **31.5**  |   70ppi   |     -     |   93ppi   |     -     |
|  **34**   |     -     |   82ppi   |     -     |  109ppi   |

### 34インチ 2560x1080

27インチのフルHDをppiを変えずにそのまま横に33%伸ばしたサイズ。**縦33.6cm**、**横79.6cm**。

<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=dev00d-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B07XVR3XN2&linkId=7160894e652f1a6ad42e212a0a0a2d6b"></iframe>
<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=dev00d-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B08LPVWYZS&linkId=2016a8a8653401adf9f46de4e17f3dff"></iframe>

ここで実は罠ポイントがあります。値段が高い方のLGモニターはusb-c対応と記載されてますが、取扱説明書を調べても給電の**上限W数が書いてありません**。この系統の廉価ゲーミングモニタはusb-pdによる給電を謳いながら実は最大15Wだったりするので、能力不足なことが多いです。

たとえば、私が支給されている業務PCの純正アダプタ給電量は45Wで、15W程度では明らかに不足します。ケーブル1本の環境を作りたい人にとってはけっこうな罠になるので要注意です。ちなみに当該モニタの標準消費電力は30Wで最大でも40Wと書いてあるので、usb-pd給電量はかなり残念なことになっているだろうと推測されますね……（だからマニュアルにも記載していないんだと思います）。

ということで、ゲームもしないし応答速度もどうでもいい私は、買うなら安い方をチョイスする気がしてます。

### 34インチ 3440X1440

上記とサイズは変わらず解像度だけ向上して**109ppi**になったサイズ。
フルHD27インチからブラウザのズーム表示を75%にしたのと同じ比率変化のはずです。

<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=dev00d-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B07XYWTJW5&linkId=7a8507ffb7035b57513f1121aa130c18"></iframe>
<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=dev00d-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B088HD6R5P&linkId=3169e98b9581603b9d4f2970e7fbd851"></iframe>
<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=dev00d-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B07WY7CVK2&linkId=d68afd8bc14f643592d9e1e1edc4303f"></iframe>

LGのAmazon限定モデルは**スピーカー非搭載**みたいです。IO-DATAは**ADSパネル**。一応usb-c対応みたいですが、給電上限は取説まで調べてません。

### 31.5インチ 2560x1440

27インチより大きい16:9だとこのサイズ。**93ppi**。**縦39.2cm**、**横69.7cm**、**対角80.0cm**。
ブラウザのズーム表示90%よりほんのちょっと小さいくらい（正確には88%）のはず。

<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=dev00d-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B088HBN5SJ&linkId=5d8aa1902217bd600401555eb5326f49"></iframe>
<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=dev00d-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B07WC8D2PJ&linkId=60e96894a8106191eeb51c7a29db490f"></iframe>
<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=dev00d-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B0816PPCHZ&linkId=bc0cde9049ed429cb85017d6c55729ad"></iframe>

LGは安いしスタンドにチルトと高さの調整機構もあり。ACERは加えて**スイベル**調整とDVIに対応しています。IO-DATAはスタンドが貧弱でチルトのみです。IPSじゃなくて**ADS液晶**（性能は大差ないらしいが）で、HDMIが3個つなげます（必要性は感じませんが……）。

### 29インチ 2560x1080

こちらは23インチのフルHDを横に伸ばしたものに相当。**96ppi**。**縦28.6cm**、**横67.9cm**。
27インチと比較して、縦が5cm短くなります。リンク貼りませんが、LGの最廉価モデルで3万円前後だと思います。

### 23.8インチ 1920x1080

こちらもよく見かけるサイズ。**縦29.6cm**、**横52.7cm**、**対角60.5cm**。
27インチと比較して縦が4cm短いです。こちらも31.5インチWQHDと同じくズーム90%相当ですね。

27インチをすでに2台持ってる自分としては、もし買うとしたらusb-pdがしっかりしてて、かつデイジーチェーン対応のを2台買うとかじゃないとメリットを見いだせてません。

<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=dev00d-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B07GBY2M8V&linkId=cdd8f07973b2f33d1d7969c8ed470c22"></iframe>

私が大好きDELLの**P2419HC**は、usb-pdが**65Wまで**、**デイジーチェーン**も対応、スタンドは**チルト**(上下傾き)・**ピボット**（縦横回転）・**スイベル**（左右首振り）にすべて対応ということで、まあ隙がありません。モニターを1枚も持っていない状況でこれから買うのでも検討すべき1台だと思います。

## いまの時点での考え

いっちゃん最初に導入したモニタが27インチだったことで、私の目が**クソデカ画素**に慣れてしまっている影響が大きいのですが、こうしてブラウザのズーム表示とかで模擬的に検証してみると実は23.8インチのクラスタがベストなんじゃないかという気もなんとなくしてきました。

ブラウザ表示を75%にすると無理ではないにしろ表示がかなり小さいので、34インチ3440x1440のウルトラワイドは表示領域的な魅力はさることながらちょっと扱いに困りそうです。

特に画面分割のことを考えると横3440pxってわりと持て余しそう。cpuを無駄に消費して負荷をあげてしまうのもバッドプラクティスな気がするので単に解像度が高いほうがいいというわけでもない気がします。

### ウルトラワイドにおける画面分割

外部のソフトを追加するならちょっと話も変わりますが、素の状態だと画面って4分割までなんですよね。

となるとウルトラワイドで画面分割すると、現状の1920を2分割した910pxから、2560を2分割した**1280px**になるわけですね。

この1280pxっていうのがちょうどよさそうなのがなかなかにウルトラワイドの魅力的なとこですね。

ChromeのDevToolを開きながらウィンドウサイズを調整すると幅を把握できるので、イメージが湧きやすいかもしれません。

ウルトラワイド34インチの2560x1440でも、16:9の31.5インチ2560x1440でも幅方向のピクセル数としては同じになるので、フルHD拡張ベースのウルトラワイド買うなら、画素サイズが少し小さめの16:9WQHDのほうが表示領域的には縦方向におトクかなー、なんて思ったり、悩みは尽きません。

## 最後に

一番ラクなのは全部買ってしまうことですが(笑)、そんなお金は当然ながらありません。ていうかお金があってもそういう使い方はしないか。

とりあえず、調べて記録しておきたいことはだいたい書けたので、今日のところはこれで終わりにしておきます。
