---
layout: post
title: 数弱でも除算を理解する
image: ../../img/header/2021/04/23b85dfc.jpg
author: [Thanai]
date: 2021-04-18T15:00:00.000+09:00
draft: false
tags:
  - online judge
  - programming
excerpt: 切り捨て、切り上げ、真に大きい最小の整数、真に小さい最大の整数
---

## JSC2021のA問題で2WAした

屈辱の2WAである。さすがにA問題で2WAするなど思ってもいなかった。

ケアレスミスで1WAはわかる。人間誰でもミスはするのだから。でも2WAはいけない。

この問題で求められたのは、**`a/b`より真に小さい最大の整数**を求めることである。

## 整数除算はいつもこんがらがる

私は曲がりなりにも旧帝大理系院卒であるが、いわゆる数弱（数学知識や計算能力に乏しい人間）であり整数除算はいつもバグり散らかす。

AtCoderのビギナー向けコンテンツに「切り上げ除算は`(a+b-1)//b`だ」的なことが書いてあったときも、なぜそうなるのかすぐには理解できず自分を呪った。

そして例にもれず今回も苦渋をなめるに至ったので、忘れないうちにブログにストックしておこうと思い立った。

当然ながらA問題を2WAした事実を全世界に向けて公開など本当はしたくないが、恥を捨て二度と同じ過ちを繰り返さぬよう深く刻み込むのだ。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">切り捨て：a//b<br>切り上げ：(a+b-1)//b<br>a/bより真に小さい最大の整数：(a-1)//b<br>a/bより真に大きい最小の整数：(a+b)//b<br><br>昨日のA問題みたいなの数弱すぎてメチャクチャいつも悩むんだけど、これで合ってるか？</p>&mdash; タナイ (@okinawa__noodle) <a href="https://twitter.com/okinawa__noodle/status/1383658458663116804?ref_src=twsrc%5Etfw">April 18, 2021</a></blockquote>

## 使いそうな4パターン

今回の問題に準拠してまずは`a`と`b`が正の整数とする。自分の中で整理がついたら実数範囲まで拡張して考える。

- 切り捨て：`a//b`
- 切り上げ：`(a+b-1)//b`
- `a/b`より真に大きい最小の整数：`(a+b)//b`
- `a/b`より真に小さい最大の整数：`(a-1)//b`

もちろん、混乱したら場合分けを使って書くのでもよいが、混乱しているので大抵はそうしてもなおバグり散らかすのが私だ。

忘れないように、どうしてそうなるのかも書いておく。いつもわからなくなるので。

### 切り捨て

これは言わずもがな`a//b`。非負数であれば特に気にせずやってしまっていいはず。

非負数の場合は言語によって異なるかも。

### 切り上げ

まず、愚直に場合分けするケース。

- `a%b==0`のとき、つまり割り切れる場合は、`a//b`である。
- `a%b!=0`のとき、つまり割り切れないとき、`a//b+1`である。

ここまでは、少し考えるとわかる。これを場合分けなく実装したい。

すべてを`a//b+1`すなわち`(a+b)//b`で処理すると、割り切れる場合にのみ求めたい値より1大きくなってしまう。
であれば、**ほんの少しだけ値を小さくしてあげればよいのではないか**、というのが発想となる。

たとえば、ごく小さい正の値`x`を用いて、`(a+b-x)//b`というような形とすれば1大きくなる問題は解決される。

しかし、注意すべき点として、割り切れない値である場合に、`x`を引いてしまうことによって元の`a//b+1`の示す整数値より1以上小さくなるような反作用は回避せねばならない。
評価式が`a//b`以下になってはいけないということである。

不等式を書けば以下のようになる。

$$\frac{a}{b}\lt\frac{a+b-x}{b}\lt\frac{a+b}{b}=\frac{a}{b}+1$$

つまり、割り切れない場合の条件としては$x\lt{b}$であればよい。ただし、割り切れる場合は、そもそも`a//b`でよかったのだから、$x\le{b}$でも成り立つ。

ここで、`b`は正の整数であり$1\le{b}$である。よく考えると、$x\le1$であれば条件を満たすことがわかる。

- $b>1$の場合、$b>x$であり割り切れるかに関係なく条件を満たす
- $b=1$の場合、分母が1となりこれは必ず割り切れるため、条件は$x\le{b}$で満足する

したがって、最終的な結論は、`(a+b-1)//b`となる。

### `a/b`より真に小さい最大の整数

よく考えるとこれは**切り上げから1を引いた数**である。すなわち場合分けをするのであれば、

- `a%b==0`のとき、`a//b-1`
- `a%b!=0`のとき、`a//b`

となる。場合分けをしない場合は先ほどの式から1を引けばよく、`(a-1)//b`となる。

### `a/b`より真に大きい最小の整数

これも、同様にして**切り下げに1を足した数**である。すなわち、`(a+b)//b`である。

## 最後に

これを書いている途中にも何度もバグりかけた。本当に数弱をなんとかしてほしい。
