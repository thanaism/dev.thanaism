---
layout: post
title: Gatsby v2 から v5 へのアップグレード
image: ../../img/ales-nesetril-Im7lZjxeLhg-unsplash.jpg
author: [Thanai]
date: 2024-03-20T02:00:00.000+09:00
draft: false
tags:
  - programming
excerpt: 重い腰をようやく上げた
---

## 創業4年、当ブログで変わらず愛されてきたGatsby v2

このブログをたてたのは、私がまだエンジニアになる前、2020年のことだった。

当時の私は、Reactもよく分かっていなかったし、GraphQLなんてまるで理解していなかった。

理解していなかったくせに、なんとなく流行の技術が含まれてそうだということを察知したミーハー根性により、Gatsbyを使ってブログをたてたのであった。

お察しの通り、エンジニア経験もない人間がたてたnodejs環境がまともに更新されるわけもなく、インストール当初のパッケージのままずっと運用されてきた次第である。

## Apple Siliconでビルドが通らない

時は流れ、2023年に私はM1 MacBook Proを手に入れた。

すると、dev serverがそもそも立ち上がらなくなった。しかし、当時の私はそこそこ忙しい生活を送っていたのでブログを書く時間もあまりなく、そのまま放置していたら今日を迎えたわけである。

相変わらず忙しい日々を送ってはいるものの、このままでは毎年なんのためにドメイン料金を払っているのかとなってしまうので、一念発起して重い腰をあげることにした。


## いざアップグレード

どうやら最新のGatsby v5はM1に対応しているらしい。ということで、アップグレードすることにした。

v2 -> v3 -> v4 -> v5 という感じでアップグレードすることになるかと思っていたら、v2 -> v5 に一気にアップグレードしている人々のブログが散見されたので、私もその作戦を決行することにした。

https://sora.fukui.jp/gatsby-update-v5/

まずは、乱暴に全てのパッケージを最新にしてみる。

```bash
npm i -g npm-check-updates
ncu -u
```

当然、そのままでは依存関係がぶっ壊れるので`--legacy-peer-deps`をつけてupdateする。

```bash
npm update --legacy-peer-deps
```

キャッシュをクリアしてから、dev serverを立ち上げる。

```bash
npx gatsby clean
npx gatsby develop
```

`@emotion/core`がdeprecatedになっているので、`@emotion/react`に置き換える。

```bash
npm uninstall @emotion/core
npm install @emotion/react
```

各コンポーネントのimportも置き換える。

```diff
- import { css } from '@emotion/core';
+ import { css } from '@emotion/react';
```

さらに、graphqlのクエリでsortやaggregationまわりがdeprecatedになっているので、置き換える。

https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v4-to-v5/#graphql-schema-changes-to-sort-and-aggregation-fields

```diff
- allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
+ allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
```

これでだいたいdev serverが立ち上がるようになった。

あと、react-helmetがdeprecatedになっていたので、`export const Head = () =>`に置き換えた。

https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/

## --legacy-peer-depsを外す

書くと長くなるので端折るが、ここからは地道な作業。

`--legacy-peer-deps`を外してinstallを行い、警告が出ているパッケージをひとつずつ修正した。

いくつかのpluginがv5に対応していなさそうで、それらの解決が困難だったのでいったん利用箇所ごと削除することにした。

- SNSシェアボタンがReact18に対応していないので削除
- Feed自動生成のプラグインのoptionが変わったようだが面倒なので機能ごと削除
- その他、`gatsby-remark-abbr`だとかの使っていないプラグインを削除

## いざ、Netlifyでデプロイ

ローカルで無事ビルドも通るようになったので、いざNetlifyでデプロイしたら、普通にこけた。

なんでかなーと思ってビルド設定を見ると、なんとnode12で動いていた。そりゃ通らんわということでnode20を使用するように変更。

これで無事、本番ビルドとデプロイが通った。

## 未解決事項

### author.yamlの紐付け

`author.yaml`を読み込んだ内容と`frontmatter.author`をmappingする仕組みがあったのだが、どうもうまく動かなかった。

graphQLのクエリでallAuthorYamlを取得すると、`author.yaml`の内容が取得できるのだが、`frontmatter.author`の内容が取得できなかった。

そもそも著者は私しかいないので、`author.tsx`テンプレートを元に`createPages`する処理をまるごと`gatsby-node.js`から削除した。

### gatsby-plugin-imageの導入

warnが出ているが修正箇所が多そうなのでいったんスキップ

## おわりに

当時はわからなかったReactも今ではかなり理解が進んだが、今回はgraphQLを倒すには至らなかったのが少し残念ではある。
サーバーサイド作るのめちゃ大変そうで採用しないから、プロダクトで使う機会ないのよね。

（と言いつつ、ShopifyのAPIがgraphQLなので、EC事業に絡んでいる身としては本当はもっと理解しておきたいのだが……。）

ま、兎にも角にも、ようやくブログが更新できるようになったので、また気が向いたときにいろいろ書いていこうと思う。
