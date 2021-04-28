---
layout: post
title: CodePenの埋め込みに対応させてみた
image: ../../img/paul-hanaoka-w2DsS-ZAP4U-unsplash.jpg
author: [Thanai]
date: 2021-04-28T00:00:00.000+09:00
draft: false
tags:
  - programming
  - Gatsby
excerpt: ちょっとずつ機能を追加
---

## Zenn記事に触発される

[こちらの記事](https://zenn.dev/sprout2000/articles/60cc8f1aa08b4b)を読んで、自分のブログにも適用させたくなった。

元の記事そのものもReact Hooksを簡単に紹介する感じの記事で面白いのでフロントエンドまわりに興味があるなら読んでみるとよいかも。

## CodePenとは

で**CodePenとはなんぞや**という話だが、下のような埋め込み式のプレビュー付きエディタのサービス。

https://codepen.io/examples/pen/ojNoKZ

## 導入方法

忘れないうちに手順を書いておこう。

と思ったが、[プラグイン](https://www.gatsbyjs.com/plugins/@weknow/gatsby-remark-codepen/)がもうあったのでnpmでインストールするだけだった。

```bash
npm i -S @weknow/gatsby-remark-codepen
```

当然ながら、`npm install --save`でもよい。個人的には、短く書くオプションがあるときは可能な限りそちらを使いたい派。

Azureの`az`コマンドでも`--location`ではなく`-l`、`--resource-group`ではなく`-g`を必ず使う。

ちなみに、`--name`は`-n`、`--parameters`は`-p`、`--output`は`-o`である。これだけで何十文字も節約できている！（それを紹介するのにこの文章を打つ無駄は考えていないタイプ）

閑話休題。

あとは、`gatsby-config.js`に下記を追加。

```json
// In your gatsby-config.js
plugins: [
  {
    resolve: "gatsby-transformer-remark",
    options: {
      plugins: [
        {
          resolve:"@weknow/gatsby-remark-codepen",
          options: {
            theme: "dark",
            height: 400
          }
        }
      ]
    }
  }
];
```

普通にわかるかもしれないが、公式ページを鵜呑みにすると陥りやすいポイントとしては、上記をそのまま追記するとたぶん失敗する。

というのも`gatsby-transformer-remark`系のプラグインは普通に作ると他にもいろいろ導入されているはずなので、ちゃんと既存のものとマージする形で書き加える必要がある（あたりまえ体操）。

Markdownには、JSXを書くのではなく、単にURLをそのまま書くだけでembedされる。

これ以上シンプルなことはない。素晴らしい。

## 片手落ち

ちなみに肝心の埋め込みたいCodePenオブジェクトは今のところない（ガクッ）。
