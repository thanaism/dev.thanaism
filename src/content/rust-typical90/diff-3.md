---
layout: post
title: 競プロ典型90問の★3をRustで解く
image: ../img/timothy-meinberg-AL2-t0GrSko-unsplash.jpg
author: [Thanai]
date: 2021-05-01T15:00:00.000+09:00
draft: false
tags:
  - Rust
  - typical90
  - online judge
excerpt: 知見を忘れないうちにストックする
---

## はじめに

最近、Rustをはじめたので[競プロ典型90問](https://atcoder.jp/contests/typical90)を解くという試みです。

今回の記事は★3です。★2は前回、[別の記事](https://dev.thanaism.com/rust-typical90/diff-2)に書きました。  
参考までに、普段はPythonを使っていて、この記事の作成時点では**緑**コーダーです。

よりよいコードがあれば[GitHub](https://github.com/thanaism/online-judge/tree/master/rust/src/bin)にPRを送っていただければ助かります。

## #2 Encyclopedia of Parentheses

問題は[こちら](https://atcoder.jp/contests/typical90/tasks/typical90_b)。

bit全探索ですね。Rustでは単純に数字をインクリメントするfor文は`0..n`を使います。

Pythonとやり方が似ていますが、`0..=n`というように末尾を含む場合も`=`で記載できるのが便利です。
これ、Pythonにも導入してほしいですね。

あとはRustの鬼門、文字列操作ですがmutableな文字列には`String`が使えます。

```rust
fn main() {
    proconio::input!{
        n:isize
    }
    for i in 0..1<<n {
        let mut r=0;
        let mut l=0;
        let mut f=true;
        let mut s="".to_string();
        for j in 0..n {
            if i>>(n-j-1)&1 == 1{
                r+=1;
                s+=")";
            }else{
                l+=1;
                s+="(";
            }
            if r>l {f=false}
        }
        if r==l && f {
            println!("{}",s);
        }
    }
}
```

## #14 We Used to Sing a Song Together

問題は[こちら](https://atcoder.jp/contests/typical90/tasks/typical90_n)。

貪欲で解けます。こういうのは絵に描くといいですね。書かないと頭がバグる場合があります。

Rustにおいてmutableな配列は`.sort()`でソートできることを覚えておけばよいです。

下記はあえてメソッドチェーンで処理していますが、今回は単純なforで回すほうがシンプルに書けると思います。  
あくまで勉強がてら、という感じです。

```rust
fn main() {
    proconio::input! {
        n:usize,
        mut a:[i64;n],
        mut b:[i64;n],
    }
    a.sort();
    b.sort();
    let ans: i64 = (0..n)
        .map(|i| (a[i] - b[i]).abs())
        .collect::<Vec<_>>()
        .iter()
        .sum();
    println!("{}", ans);
}
```

```rust
// 普通のforで書く場合
let mut ans = 0isize;
for i in 0..n{ ans+=(a[i]-b[i]).abs(); }
println!("{}",ans);
```

## #16 Minumum Coins

問題は[こちら](https://atcoder.jp/contests/typical90/tasks/typical90_p)。

硬貨の枚数が最大で9999枚のため、$O(N^2)$が許されます。Rustは速いのでこういうシーンは安心ですね。

また、`min()`関数は、`std::cmp`の中にあります。

さらに、答えの初期化に$N$の最大値である$10^9$を使いますが、ここで`1<<30`は$1073741824$であるため代替できます。これはRustに限った話ではないですが、地味に簡単に書けていい感じになりますので好きです。

```rust
fn main(){
    proconio::input!{
        n:usize,
        a:usize, b:usize, c:usize
    }
    let mut ans = 1<<30;
    for i in 0..10000{
        for j in 0..10000{
            let d = n-a*i-b*j;
            if d%c==0{
                ans=std::cmp::min(ans,i+j+d/c);
            }
        }
    }
    println!("{}",ans);
}
```

## #18 Statue of Chokudai

問題は[こちら](https://atcoder.jp/contests/typical90/tasks/typical90_r)。

こういう問題文、クスッとなるので好きです。さて、アルゴリズムではなく数学の問題ですね。

実装面で誤差に気をつけるくらいで、問題としては高校生でも解析的に解くことのできる内容です。  
ABCでもたまにこういう数学知識だけの問題が出ることがありますね。

Rustでの三角関数は、`abs()`とかと同じで**後置**であることに注意する必要があるでしょう。  
また、$\pi$は`std::f64::consts`の中にいます。

今回は、入力をクエリごとに受け取るのではなく、ベクタへ一気に格納してしまっています。

for文で`for i in &e`としていますが、このコードでは別に所有権がムーブしてもあとから参照しないので`for i in e`でも問題ありません。

参照戻しなども混乱しやすいですが、Rustではプリミティブ型には`Copy`トレイトが実装されていることを把握しておくのがよいでしょう。

```rust
use std::f64::consts::PI;
fn main() {
    proconio::input! {
        t:f64,
        l:f64, x:f64, y:f64,
        q:i64,
        e:[f64;q]
    }
    let l = l / 2.0;
    for i in &e {
        let rad = 2.0 * PI * i / t;
        let dy = -l * rad.sin();
        let dz = l * (1.0 - rad.cos());
        let dx = (x * x + (y - dy) * (y - dy)).sqrt();
        let deg = dz.atan2(dx) * 180.0 / PI;
        println!("{}", deg);
    }
}
```

## #20 Log Inequality

問題は[こちら](https://atcoder.jp/contests/typical90/tasks/typical90_t)。

これも数学ですね。

べき乗のシンタックスを知らない場合$O(N)$ですが、知っている場合はほぼ$O(1)$のようなものです（内部実装は調べてませんが、厳密にはおそらく$O(logN)$とかのはず）。

`pow()`の引数は必ず`u32`型であることだけ覚えておけば問題ないでしょう。

```rust
fn main(){
    proconio::input!{
        a:i128, b:u32, c:i128,
    }
    println!("{}",if a<c.pow(b) {"Yes"} else {"No"});
}
```

## おわりに

問題が追加されたら、あわせて追記していこうと思います。

まだ解けていませんが、★4の記事もいずれ書きたいと思っています。
