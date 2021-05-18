---
layout: post
title: JMESPathノック
image: ../../img/eric-han-WJ6fmN1D-h0-unsplash.jpg
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

az cliを使っていて実際に使ったパターンを記載していこうかな、と。

もともとTwitterで1000本ノックという電波を受信したのだけど、`Done is better than perfect.`ということで最初は数が少なくても仕方がないと自分に言い聞かせることにした。

もし、「こんなパターンもよく使うよ」的なのがあればTwitterでも他の連絡手段でもいいのでぜひ教えていただきたい。

### 元データ1

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

```sh
$ echo $INPUT | jp "[*].name"
[
  "foo",
  "bar",
  "baz",
  "qux"
]
```

### `name`が`baz`の`value`

```sh
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

### `value`が`200`の`name`

数値をフィルタリングする際は`to_number()`を使わないとエラーが出るためクエリできないので注意。

```sh
$ echo $INPUT | jp -u "[?value==to_number('200')].name|[0]"
bar
```

### b`を含む`name`の配列

`contains()`はそれなりに使用頻度が高そう。自身を指定する場合は`@`を使う。プログラミングでいうとこの`foreach`文の各要素のイメージ。

```sh
$ echo $INPUT | jp "[?contains(@.name,'b')].name"
[
  "bar",
  "baz"
]
```

## なにかあれば追記

追記するつもりだけど、そこまで高度なクエリが必要にならないでござる。
