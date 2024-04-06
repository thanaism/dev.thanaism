---
layout: post
title: JMESPathノック
image: ../../img/header/2021/05/cd632fcd.jpg
author: [Thanai]
date: 2021-05-18T19:00:00.000+09:00
draft: false
tags:
  - JMESPath
excerpt: ノックせよという電波を受信した
---

## 基本のおさらい

[以前書いた記事](https://dev.thanaism.com/2021/03/jsonpath/)があるのでそちらを参考に。

## JMESPathノック

Azure CLIを使っていて実際に使ったパターンを記載していこうかな、と。

もともとはTwitterで**1000本**ノックという電波を受信したことによる。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">JMESPath 1000本ノック</p>&mdash; よこち(yokochi) (@akira6592) <a href="https://twitter.com/akira6592/status/1393048344461680645?ref_src=twsrc%5Etfw">May 14, 2021</a></blockquote>

が、さすがに1000本を一気には無理なので`Done is better than perfect.`の精神で最初は数が少なくても仕方がないと自分に言い聞かせることにした。

もし、「**こんなパターンもよく使うよ！**」的なのがあればTwitterでも他の連絡手段でもいいのでぜひ教えていただきたい。

### 元データ1

お題が増えたらデータは拡充するとして、なにごともまずはシンプルに。

無駄を削ぎ落し本質を見ることはいつだって大切。

```json
[
  {
    "name": "foo",
    "value": 100
  },
  {
    "name": "bar",
    "value": 200
  },
  {
    "name": "baz",
    "value": 300
  },
  {
    "name": "qux",
    "value": 100
  }
]
```

### `name`だけの配列

<details><summary>解答</summary><div>

```bash
$ echo $INPUT | jp "[*].name"
[
  "foo",
  "bar",
  "baz",
  "qux"
]
```
</div></details>

### `name`が`baz`の`value`

<details><summary>解答</summary><div>

```bash
$ echo $INPUT | jp "[?name=='baz'].value"
[
  300
]
```

`name`がuniqueであることが保証されているなら、以下で配列から値にできる。

```bash
$ echo $INPUT | jp "[?name=='baz'].value|[0]"
300
```
</div></details>

### `value`が`200`の`name`

<details><summary>解答</summary><div>

数値をフィルタリングする際は`to_number()`を使わないとエラーが出るため注意。

```bash
$ echo $INPUT | jp -u "[?value==to_number('200')].name|[0]"
bar
```
</div></details>

### `b`を含む`name`の配列

<details><summary>解答</summary><div>

`contains()`はそれなりに使用頻度が高そう。自身を指定する場合は`@`を使う。プログラミングでいうとこの`foreach`文の各要素のイメージ。

```bash
$ echo $INPUT | jp "[?contains(@.name,'b')].name"
[
  "bar",
  "baz"
]
```
</div></details>

## なにかあれば追記

追記するつもりだけど、そこまで高度なクエリが必要にならないでござる。
