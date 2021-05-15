---
layout: post
title: 父さんPythonやめてHaskellをやっていこうと思うんだ
image: ../../img/mikhail-vasilyev-NodtnCsLdTE-unsplash.jpg
author: [Thanai]
date: 2021-05-13T23:00:00.000+09:00
draft: false
tags:
  - Haskell
  - programming
excerpt: Pythonはやめません
---

## 関数型を学ぶなら関数型言語でしょ

ということで、巷では数学の圏論を理解しないと無理だとか言われているHaskellに手を出すことにした。

たぶんね、最終的には圏論も理解しなきゃいけないと思うんだけど、最初に最低限**使うだけ**なら圏論とか理解してなくてもいける気がするんだよね。

オブジェクト指向理解しなくてもJavaでもRubyでもHello Worldできるのと一緒で（それよりは敷居が高いだろうけど）。

大抵は実際に使ってみて「なにが嬉しいか」的な体験をもとに理論を学ぶほうが効率がいい気がする。

言語の学習って畢竟なにが便利なのかってモチベーションが大事ですよね、しらんけど。

## すごいHaskellたのしく学ぼう！

巷では[すごいH本](https://amzn.to/3fluUzM)とか誤解を招く呼び方をされている、Haskell入門バイブル的なやつを買ったので、消化できた内容をアウトプットしようと思う。

[![img](//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B009RO80XY&Format=_SL250_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=dev00d-22&language=ja_JP)](https://amzn.to/3fluUzM)

ぶっちゃけ表紙もファンシーだしなめてたのは否めない。
ガーッと読んで「関数型完全に理解した」くらいで終わりにしようと思ってたけど、わりと整理しながらじゃないと後半きびしい感じ。

ということで復習がてら書いていくが、どうも長くなりそうなので、この記事は畳み込みの前あたりでいったん区切る。

### 環境構築

とりあえず`stack`を入れる。コンパイル言語だけどインタラクティブシェルもある。`GHCi`とかいうらしい。

シェルでは、`stack ghci`で呼べて、`Prelude>`のあとに式を入力していく。

```bash
$ stack ghci
...
Prelude>
```

### 関数呼び出し

基本的に`()`は、必要な場合以外は使わない。Haskellではすべての関数はデフォルトでカリー化されている。

```hs
min 9 10
```

### if

Haskellにおいて`if`は**文ではなくて式**。つまり値を持つために網羅的である必要性がありelse節は必須。

```hs
doubleSmallNumber x = if x > 100
                        then x
                        else x*2
```

### リスト

記法はいたって普通。

```hs
[1,2,3,4,5]
```

本では明記されていないが、Haskellでいうところのリストは配列でなく単方向連結リストっぽい。

というのも `[1,2,3,4] ++ [5]`よりも`1:[2,3,4,5]`のほうが高速だと書かれているから。

裏取ってないけどリスト末尾へのpushに$O(N)$、先頭へのappendが$O(1)$ということから間違いないと思われる。

こういうとき、データ構造と計算量が理解できてるかって大きな違いですよね。競プロ万歳。

先頭へのappendをおこなう`:`はcons演算子とも呼ぶとか。インデックスでアクセスする場合は、`[5,6,7,8] !! 2`みたいに書く。

文字列は`[Char]`型で実装されているらしく、`"oden tabe tai" !! 3`とかすると`'n'`が返る。

リスト全体を対象にとった大小比較も可。

### 中置

`div 4 2`はバッククォートを使って`` 4 `div` 2 ``とも書ける。

### range

`[1,2,3,4,5]`は`[1..5]`と書ける。`[5,4,3,2,1]`は`[5,4..1]`と書ける。

これは逆順に限らずstepを指定する書き方で`[1,3,5,7,9]`なら`[1,3..9]`と書ける。

### 無限リスト

Haskellは遅延評価なので`[1..]`のように無限リストを簡単に作れる。

先頭からチョッキンしてくるなら`take 5 [1..]`のようにすればオッケー。

### その他の関数

```hs
Prelude> take 3 $ cycle [1,2]
[1,2,1]

Prelude> take 3 $ repeat 5
[5,5,5]

Prelude> replicate 4 5
[5,5,5,5]
```

### リスト内包表記

例を見たほうがはやい。`,`以降は`述語`と呼ばれており条件節。`,`を重ねていくつも書ける。

```hs
Prelude> [x*5 | x <- [1..5]]
[5,10,15,20,25]

Prelude> [x*5 | x <- [1..5], x*2 > 5]
[15,20,25]

Prelude> [x+y | x <- [1..3], y <- [2..4]]
[3,5,7]

Prelude> [5 | _ <- [1..5]]
[5,5,5,5,5]
```

### タプル

```hs
Prelude> fst (3, 12)
3

Prelude> snd (3, 12)
12
```

### 型のチェック

型は`::`で表現する。

```hs
Prelude> :t 'd'
'd' :: Char

Prelude> :t "hoge"
"hoge" :: [Char]

Prelude> :t ("fuga", True, 235)
("fuga", True, 235) :: Num c => ([Char], Bool, c)
```

### Integer

Haskellでは`Int`は普通のintで、`Integer`はbigint的な実装らしい。

### 型変数

いわゆるジェネリクス的なやつを扱うための`T`みたいなやアレ。Haskellでは小文字の`a,b,c`とかを使うらしい。

```hs
Prelude> :t head
head :: [a] -> a
```

### 型クラス

Rustでいうところのトレイト的なやつだと思う。`=>`で表現されるっぽい。

あと記号オンリーの演算子はデフォルトで中置関数になる。受け渡しをしたい場合は`()`でくくる必要がある。

```hs
Prelude> :t (==)
(==) :: Eq a => a -> a -> Bool
```

### パターンマッチ

このあたりから関数型チックになってくる。関数型は基本的に**文**を使わず**式**をベースにしてコードを紡いでいく。

パターンマッチは`if`を使わない条件分岐の世界観になる。これは再帰表現と相性が良い。

```hs
fact :: Int -> Int
fact 0 = 1
fact n = n * fact (n - 1)
```

### パターンマッチの応用

タプルとパターンマッチの組み合わせは強力になる。またリストに対する`x:xs`といった表現は再帰とさらに相性がよい。

```hs
first :: (a, b, c) -> a
first (x, _, _) = x

-- asパターンを使用するとパターンに名付けができる
firstLetter :: String -> String
firstLetter "" = "DO NOT ENTER EMPTY STRING!"
firstLetter all@(x:xs) = [x] ++ ": " ++ all
```

### ガード

パターンマッチは**構造**によって場合分けをするが、値によって場合分けをしたい場合は**ガード**を使う。

```hs
isYoung :: Int -> String
isYoung age
    | age < 20 = "You're young!"
    | age > 70 = "You're almost dead!"
    | otherwise = "You're old!"
```

### where / let

さらに`where`や`let`を使用すると変数定義も可能。

以下は`Double`で受け取ると小数誤差が出て嫌なので100倍の値で判断している。

```hs
isPriceLow :: Int -> String
isPriceLow price
    | taxed < 220 * 100 = "price is low."
    | taxed > 550 * 100 = "price is high."
    | otherwise = "price is not low."
    where taxed = price * 110
```

`where`は文だが、`let`は式として使える。

`let bindings in expression`の構文で使用する。さらに`;`で区切ることができて、

```hs
let a = 10; let b = 40; let c = 60 in a*b*c
```

のような書き方をする。リスト内包表記の中でも通用する。

### case式

Haskellでは例に漏れず`case`も式である。シンタックスは以下にならう。

わりとコード中のどんなところでも使えるっぽい。

```hs
case expression of pattern -> result
                pattern -> result
                pattern -> result
```

### 再帰

これまで**命令的**なコードの書き方に慣れ親しんできたが、ここでどれだけ**宣言的**なお作法を学べるかが鍵な気がしている。

再帰による自己定義的な書き方は驚くほどコードをシンプルにしてくれる。

```hs
max' :: (Ord a) => [a] -> a
max' [] = error "empty list is not allowed."
max' [x] = x
max' (x:xs) = max x (max' xs)
```

本にはいくつもの関数を再帰で実装した例が紹介されている。

### カリー化関数

複数の引数を受け取る関数に一部の変数だけ渡すと**残りの変数を引数にとる関数を返す**形にするのがカリー化。

他の言語だと明示的にカリー化させる必要があるが、Haskellでは逆にデフォルトがカリー化の挙動を示す。

### 中置関数の部分適用

中置でも片方にだけ値を置けば部分適用になる。`100 / 20`は`(/20) 100`と書けるということ。

### ラムダ式

バックスラッシュに続けてラムダ式を記述できる。

```hs
(\xs -> length xs >15)
```

`(/3)`を`(\x -> x / 3)`と書くようなマヌケな真似をしないようにする。

## つづく

次から畳み込みが畳み掛けてくる。
