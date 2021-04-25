---
layout: post
title: JSONPathとJMESPathとjq
image: ../../img/david-clode-KMrYZp6ismc-unsplash.jpg
author: [Thanai]
date: 2021-03-19T17:00:00.000Z
draft: false
tags:
  - programming
  - Kubernetes
excerpt: とりあえずこの3つを全部使いこなせたらかっこよくね？
---

## jsonパーサー多すぎ問題

インフラとかクラウドやってるとコマンドでjsonをチョキチョキする機会はそれなりに多いと思うのだけど、ツールによって組み込みのパーサーが違うっていう問題がある。

たとえばAzure CLIだと`JMESPath`で、これはPython書く人にとってはわりと分かりやすくて好き。

とはいえ、いろんな場面で使うことも考えると一般的にはbash環境なら、`jq`がデファクトだろうか。

ただ、jqはたとえば[このページ](https://www.techscore.com/blog/2019/09/30/jq-%E3%81%A8-jmespath-%E3%82%92%E5%90%8C%E6%99%82%E3%81%AB%E8%A6%9A%E3%81%88%E3%82%8B/)とかでも言及されてるけど、インストールが必要なので環境によっては使えなかったりする問題がある。

また、Kubernetesをやるなら`JSONPath`がネイティブサポートのため、これも覚えておいたほうがよい。

したがって、少なくともJMESPathとjqとJSONPathの3種類をある程度は使えないと、そもそもクラウド人材として人権がないということになる。

## jsonの基本

押さえておくべきは、jsonにおける`配列`と`オブジェクト`の違いのみだ。

配列はいわずもがな。オブジェクトというのはいわゆるkey-valueで値を格納しているdicみたいなやつを指す。

```js
// 配列
["hoge", "fuga", "piyo"]

// オブジェクト
{"hoge": "1", "fuga": "2", "piyo": "3"}
```

## 環境の準備

ローカルに環境を準備して試してみよう。

### JSONPathのインストール

```bash
pip3 install git+https://github.com/mclarkson/JSONPath.sh#egg=JSONPath.sh
```

```bash
$ echo '{"hoge":"100"}' | JSONPath.sh -b hoge
100
```

### jqのインストール

```bash
sudo apt upgrade && sudo apt install jq
```

```bash
$ echo '{"hoge":"100"}' | jq .hoge
"100"
```

### JMESPathのインストール

```bash
sudo wget https://github.com/jmespath/jp/releases/download/0.1.2/jp-linux-amd64 -O /usr/local/bin/jp && sudo chmod +x /usr/local/bin/jp
```

```bash
$ echo '{"hoge": "100"}' | jp hoge
"100"
```

## 取得クエリの比較

環境の準備が出来たので、さっそく試し打ちをしていく。

### 試し打ち用のjsonの準備

ネットに公開されているJSONPathの[playground](https://jsonpath.com/)からサンプルを引っ張ってこよう。

```json
{
  "firstName": "John",
  "lastName": "doe",
  "age": 26,
  "address": {
    "streetAddress": "naist street",
    "city": "Nara",
    "postalCode": "630-0192"
  },
  "phoneNumbers": [
    {
      "type": "iPhone",
      "number": "0123-4567-8888"
    },
    {
      "type": "home",
      "number": "0123-4567-8910"
    }
  ]
}
```

`test.json`とでも名前を付けて保存しておこう。
以下では、説明に適した部分を適当に抜き出して使うことにする。

### オブジェクト要素の取得

jqの場合はトップレベルの要素にもピリオド`.`が必要。
JSONPathは付けても付けなくてもOK。
JMESPathは付けるとエラーになる。

```bash
# json
$ cat test.json
{"firstName": "John", "lastName" : "Doe"}

# JMESPath
$ cat test.json | jp firstName
"Jhon"

# jq
$ cat test.json | jq .firstName
"Jhon"

# JSONPath
$ cat test.json | JSONPath.sh -b firstName
Jhon
```

### 配列要素の取得

配列の場合もピリオド`.`のルールは同じ。

```bash
# json
$ cat test.json
["John", "doe"]

# JMESPath
$ cat test.json | jp [0]
"Jhon"

# jq
$ cat test.json | jq .[0]
"Jhon"

# JSONPath
$ cat test.json | JSONPath.sh -b [0]
Jhon
```

### チェーン

ピリオド`.`でチェーンが可能。

```bash
# json
$ cat test.json
{
  "firstName": "John",
  "lastName": "doe",
  "phoneNumbers": [
    {
      "type": "iPhone",
      "number": "090-000-0000"
    },
    {
      "type": "home",
      "number": "000-0000-0000"
    }
  ]
}

# JMESPath
$ cat test.json | jp phoneNumbers[0].type
"iPhone"

# jq
$ cat test.json | jq .phoneNumbers[0].type
"iPhone"

# JSONPath
$ cat test.json | JSONPath.sh -b phoneNumbers[0].type
iPhone
```

### 配列のスライス

おなじみの`[s, f)`の半開区間で指定する。  
jqは配列だけでなく文字列もスライスできるが、`[1:4:2]`のようなstepの指定はできない。

```bash
# JMESPath
$ echo '["a", "b", "c", "d", "e"]' | jp [1:4]
[
  "b",
  "c",
  "d"
]

# jq
$ echo '["a", "b", "c", "d", "e"]' | jq .[1:4]
[
  "b",
  "c",
  "d"
]

# JSONPath
$ echo '["a", "b", "c", "d", "e"]' | JSONPath.sh -j [1:4]
[
  "b",
  "c",
  "d"
]

# jq(str)
$ echo '{"foo": "bbarr"}' | jq .foo[1:4]
"bar"
```

### playground

各パーサーのplaygroundも紹介しておく。

- [jq play](https://jqplay.org/)
- [JMESPath](https://jmespath.org/)
- [JSONPath online evaluator](https://jsonpath.com/)

## 発展

さすがにこれだけだと心許ないので、もう少し実践的な例も。

### オブジェクトの配列から共通のkeyで抜き出す

下記のjsonから`first`に対応する値だけを抜き出したいケースはよくありそうだ。

```json
{
  "people": [
    { "first": "James", "last": "d" },
    { "first": "Jacob", "last": "e" },
    { "first": "Jayden", "last": "f" },
    { "missing": "different" }
  ],
  "foo": { "bar": "baz" }
}
```

```bash
# JMESPath
people[*].first
*[*].first|[] # |[]を付けないと配列in配列が返る
```

```bash
# JSONPath
people[*].first
$..first # recursiveに探せて便利
```

```bash
# jq
.people[].first|values # valuesを付けないとnullを含む
```

### 配列から条件に一致する要素だけを得る

以下の配列から3以上のみを抜き出したいとする。

```json
[1, 2, 3, 4, 5, 6]
```

```bash
# jq
[.[]|select(.>=3)]
```

```bash
# JMESPath
[? @>=`3`]
```

```bash
# JSONPath
(書き方わからん、だれか教えて)
```

## 書きかけ

まだまだ多くのパターンや可能性があると思うが、現状必要に迫られているパターンがないので機会に恵まれたときに気が向いたら追記する。
