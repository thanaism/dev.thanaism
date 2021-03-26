---
layout: post
title: gatsby-remark-link-cardの導入失敗
image: ../../img/david-clode-brgKHpVpVYI-unsplash.jpg
author: [Thanai]
date: 2021-03-04T17:00:00.000Z
draft: false
tags:
  - Gatsby
excerpt: 見栄えを整えようとしたが面倒になった
---

<!-- prettier-ignore-start -->

## ブログにリンクカードを導入したい

noteとかQiitaとかだと、URLからリンクカードが生成されてイケてるので、簡単にできるのならやってしまおうかと思ったのが発端。

とはいえ、たとえばAmazonのアフィリエイトリンクとかはOGP情報がなく、また別のやり方が必要だったりして今この瞬間にどうしても実装したいというわけではないレベル。

ちなみにAmazonリンクの場合、アフィリエイト用のAPIをうまく使ってReact要素を生成したりする必要があって、それだとMarkdownにReact要素を埋め込む方法になってしまい可搬性が損なわれるのでそれはそれで微妙だなあと思っていたり。

イメージとしては以下のようなReact要素を埋め込む感じね。

```jsx
<Amazon shortUrl="https://amzn.to/3rgQBpj" />
```

`shortUrl`からASINを取得してアフィリエイト用APIからOGP情報に相当する内容を生成してカードとしてセットするようなイメージになるんだと思う。実際、[似たようなことをやっている人](https://blog.chick-p.work/gatsby-component-amazon/)もいる。

ぶっちゃけReact要素を使わない縛りをやめればなんでもできるようになるので、あきらめてReact要素としてMarkdownに埋め込んでおいて、別媒体に貼るときには見えなくなるって運用がいいのかなと考えたりもしている。そもそもMarkdownパースするときにHTMLタグ認識できずに素のテキストとして出力しちゃうようなサービスを今後わざわざ好んで使うことは考えづらいし。

あとは動作原理的のイメージがつくとはいえ、「おそらくできるけど時間はかかりそう」な感じのモジュールではあることは否めない。

さて、だいぶ話は脱線してしまったが、今回はそんな難しいものではなくて、プラグインでサク―ッと普通のOGPをリンクカードにしましょう、というのが本題。

## ちょっと面倒な感じになったのでいったんパス

まず試したことは以下。

```bash
npm install --save gatsby-remark-link-card
```

とりあえず、モジュールを入れて`gatsby-config.json`をいじる。

```json
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-link-card`,
          options: {
            //...
          }
        }
      ]
    }
  }
];
```

ここまではいいが、いざ`npx gatsby build`をかけると以下を起点に大量のエラーが出る。

```
error while loading shared libraries: libXcursor.so.1: cannot open shared object file: No such file or directory
```

おそらくWSL2の環境でやってるので、モジュールが利用する`puppeteer`でGUIアプリを利用できなかったりすることに起因するのかなと。

いろいろやれば解決できる気がするが、優先度低いので勇退することを決めた。こういうのを聡明な判断という。

## 人生哲学のコーナー

しかし、今回のエラーで登場するpuppeteerとか以前Pythonスクレイピングの本で出てきたので一発で「なるほどねー」という感じになっている。

クラウドエンジニアの道を選んだゆえに転職前に勉強していた開発系の知識とかあんまり役に立たないかと思ってたけどそんなことは全然ないね。

むしろ、業務のメインの内容なんて少なからず時間を投資するんだから絶対できるようになるわけで、キワの部分こそやっておくのが自分の強みになるよなあと感じる。

たとえば、フロントエンドの勉強をガチでやってるならバックエンドエンジニアを本業にしたり、vice versaね。

こういうのを研究だと学際領域って言ったりするけど、学問分野じゃない場合はなんていうのかな。掛け合わせで希少人材に！みたいな文言は使い古されているのであまり使いたくないのよねー。

ということで、AzureだけじゃなくてぼちぼちReactも勉強していこうと思います。

ちなみに[実践Vim](https://amzn.to/3e4wLd7)を読んでからありとあらゆるテキスト編集がVimになった。今もvscodeのターミナルを全画面表示にしてVimで編集している。インフラに近しい領域で働くのにVim使えませんなんて言ったら打ち首獄門のうえ磔にされそうなので[実践Vim](https://amzn.to/3e4wLd7)は本当に読んでおいてよかった。


<!-- prettier-ignore-end -->
