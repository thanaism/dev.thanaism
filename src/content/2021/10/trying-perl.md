---
layout: post
title: Perlチャレンジ
image: ../../img/header/2021/10/8fc22bbe.jpg
author: [Thanai]
date: 2021-10-06T23:00:00.000+09:00
draft: false
tags:
  - Perl
excerpt: コードゴルフといえばPerlですしおすし
---

## ずぶの素人

拙者、Perlは完全にはじめてでござる。

## お題

[会社の人が紹介してた問題][1]を解くことにする。

[1]: https://github.com/io-cloud/sannyu_test#%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0

内容としては、以下のような感じ。

- カンマ区切りの文字列を受け取る
- 各文字列を3桁の数字・3桁かつゾロ目の数字・それ以外で場合分け
- 場合に応じて文字列にprefixを付けて改行区切りで出力
- 言語は自由

## まずはRubyで解く

まずはテキトーにRubyで解いた。

```rb
puts gets.split(?,).map{ |s| /^\d{3}$/ !~ s ? "unmatch pattern: #{s}" : /^(\d)\1\1$/ =~ s ? "zorome: #{s}" : s }
```

1週間くらい前にRubyを始めたばかりなので、そんなに短く書けなかった。もっと短くできるんだろうとは思う。

## Perlを学ぶ

### 入力

Perlは記号による組み込み変数がいくつもあるようで、入力の区切り文字は`$/`に入っている（デフォルトは改行）。

で、C++でいうところの`cin`みたいなことをやるのが以下。いきなりすごい。

```perl
<>
```

### 出力

入力の`<>`に対して、出力は普通に`print`。

文字列のくくりにはシングルクォートとダブルクォート両方が使えるが、ダブルクォートの場合は変数展開などが有効になるらしい。

変数は宣言なしでグローバルスコープとして使用でき、先頭に`$`をつけることで変数になる。

ちなみに、行末には`;`が必要っぽい。

```perl
$str = 'hoge';
print $str
```

### split

文字列のsplitは区切り文字を正規表現で指定できる。引数を渡す際に括弧`()`はつけなくてよい。

Perlでは配列変数は`@`を付けて表現する。

```perl
@a = split(/ +/, 'hoge   fuga  piyo');
# @a = ('hoge', 'fuga', 'piyo')

@b = split / +/, 'hoge   fuga  piyo'
# @b = ('hoge', 'fuga', 'piyo')
```

### カンマ区切りを受け取って改行区切りで出力

とりあえず、加工する前段階として入出力にチャレンジ。

出力の区切り文字は`$,`という変数で指定する。

したがって、先ほどの入力の区切り文字を使い、`$,=$/`のようにして改行を代入できる。

```perl
$,=$/;print split/,/,<>

# input
#>> 123,abc,3333,555,321

# output
#>> 123
#>> abc
#>> 3333
#>> 555
#>> 321
```

### map

次に、各要素を加工するための`map`があるか調べるとちゃんとあった。

基本構文は以下。

```perl
@mapped = map BLOCK @array;
@mapped = map EXPR,@array;
```

とりあえず全部`hoge`に置き換えてみるなら、こんな感じになる。

```perl
@mapped = map 'hoge', @array;
@mapped = map {'hoge'} @array;
```

デフォルト引数が、`$_`で表現される。

Rubyのブロック`{|i|i+2}`における`i`だとか、Pythonのラムダ式`lambda x: x+2`における`x`に相当する感じだと思っておけばいいはず。

```perl
@array = (1, 2, 3, 4);
@mapped = map { $_ + 10 } @array;
# @mapped = (11, 12, 13, 14)

# 以下も可
@array = (1, 2, 3, 4);
sub f{$_+10};
@mapped = map f, @array;
```

Perlでは関数を古風にサブルーチンと呼び、`sub funcName{}`のように定義できる。VBとかFortranを思い出す。

### 正規表現

いろいろあるようなので詳細は省くが、置換した文字列を返すのであれば末尾に`r`の修飾子をつける。

```perl
# 3桁の数字をhogeに置換
s/^\d{3}$/hoge/r
```

単純にマッチしたかを真偽値で返すのならば以下。

```perl
/^\d{3}$/  # true/false
```

### 三項演算子

Perlには三項演算子`?:`がある。普通のif文はCライク。正確にはif**式**っぽいが。

```perl
if (BOOL) {
  # true case
}else{
  # false case
}
```

## まとめ

ということで、これまで学んだ要素を組み合わせると以下のコードが出来上がる。

```perl
$input = <>;
@array = split /,/, $input;
sub convert{
  if (/^(\d{3})$/) {
    if (/^(\d)\1\1$/) {
      "zorome: $_"
    }else{
      $_
    }
  }else{
    "unmatch pattern: $_"
  }
}
@mapped = map convert, @array;
$, = $/;
print @mapped;
```

無駄な要素を省くと以下。

```perl
$,=$/;print map{!/^\d{3}$/?"unmatch pattern: $_":/(.)\1\1/?"zorome: $_":$_}split/,/,<>
```

Rubyよりは短くなった。

```rb
puts gets.split(?,).map{ |s| /^\d{3}$/ !~ s ? "unmatch pattern: #{s}" : /^(\d)\1\1$/ =~ s ? "zorome: #{s}" : s }
```

Rubyをもう少し頑張ってみたけどPerlには敵わず。

```rb
puts gets.split(?,).map{(/^\d{3}$/!~_1 ? "unmatch pattern: ":_1[0]*3==_1 ? "zorome: ":"")<<_1}
```
