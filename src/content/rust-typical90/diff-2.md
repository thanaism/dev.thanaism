---
layout: post
title: 競プロ典型90問の★2をRustで解く
image: ../img/pacto-visual-cWOzOnSoh6Q-unsplash.jpg
author: [Thanai]
date: 2021-05-21T00:00:00.000+09:00
draft: false
tags:
  - typical90
  - Rust
  - online judge
excerpt: Rust入門をかねて解いていく
---

## はじめに

最近、Rustを使い始めました。

せっかくなので[競プロ典型90問](https://atcoder.jp/contests/typical90)をRustで解いていこうと思います。

今回の記事は★2です。[★3][3]と[★4][4]の記事もあります。

[3]: https://dev.thanaism.com/rust-typical90/diff-3
[4]: https://dev.thanaism.com/rust-typical90/diff-4

参考までに、普段はPythonを使っていて、この記事の作成時点では**緑**コーダーです。

よりよいコードがあれば[GitHub](https://github.com/thanaism/online-judge)にPRを送っていただければ助かります。

## #4 Cross Sum

問題は[こちら](https://atcoder.jp/contests/typical90/tasks/typical90_d)。

前処理をするために、0で初期化したベクタを生成します。  
最初にパッと思いついたのは以下の2通りです。

```rust
let mut vec: Vec<usize> = (0..n).map(|\_|0).collect();
let mut vec: Vec<usize> = std::iter::repeat(0).take(n).collect();
```

Pythonだと `-(-a//b)`とも書けます。

しかし、以下の方法があることを知りました。`vec!`マクロ、覚えていきましょう。

```rust
let mut vec = vec![0usize; n];
```

<details><summary>AC code</summary><div>

```rust
fn main(){
    proconio::input!{
        h:usize,
        w:usize,
        a:[[usize;w];h]
    }
    let mut r=vec![0usize;h];
    let mut c=vec![0usize;w];
    for i in 0..h{
        for j in 0..w{
            r[i]+=a[i][j];
            c[j]+=a[i][j];
        }
    }
    for i in 0..h{
        let mut l:Vec<String>=vec![];
        for j in 0..w{
            l.push((r[i]+c[j]-a[i][j]).to_string());
        }
        println!("{}",l.join(" "));
    }

}
```

</div></details>

## #10 Score Sum Queries

問題は[こちら](https://atcoder.jp/contests/typical90/tasks/typical90_j)。

累積和ですね。また`vec!`マクロを使います。

タプルを使って、`let (l,r)=lr[i];`のように2つ一気に束縛をしています。

<details><summary>AC code</summary><div>

```rust
fn main(){
    proconio::input!{
        n:usize,
        cp:[(usize,usize);n],
        q:usize,
        lr:[(usize,usize);q]
    }
    let mut one=vec![0usize;n+1];
    let mut two=vec![0usize;n+1];
    for i in 0..n{
        if cp[i].0==1{
            one[i+1]=cp[i].1+one[i];
            two[i+1]=two[i];
        }else{
            one[i+1]=one[i];
            two[i+1]=cp[i].1+two[i];
        }
    }
    for i in 0..q{
        let (l,r)=lr[i];
        println!("{} {}",one[r]-one[l-1],two[r]-two[l-1]);
    }
}
```

</div></details>

## #22 Cubic Cake

問題は[こちら](https://atcoder.jp/contests/typical90/tasks/typical90_v)。

Rustは`gcd()`がないので自分で実装します。関数の定義は戻り値などの型をちゃんと指定する必要があったり、（今回は必要ないですが、）読み取り値をグローバル変数に入れて参照させたりが（たぶん）できないので面倒ではあります。

<details><summary>AC code</summary><div>

```rust
fn main(){
    proconio::input!{
        a:isize, b:isize, c:isize
    }
    let d = gcd(gcd(a,b),c);
    println!("{}",a/d+b/d+c/d-3);
}

fn gcd(x:isize,y:isize)->isize{
    if y==0 {x} else {gcd(y,x%y)}
}
```

</div></details>

## #24 Select + / - One

問題は[こちら](https://atcoder.jp/contests/typical90/tasks/typical90_x)。

各項で最低限必要な操作回数は$|A_i-B_i|$です。$K$回ちょうどという条件があるため、回数が余ったらいったん足して元に戻すという偶数回の操作をすることで以降は現状維持できます。

Python等の他の言語とは違い、`abs()`メソッドが後置です。また、対象は負の数がある`int`か`float`のみ。`uint`には当たり前ですが対応していません（そもそも負の数がありません）。

<details><summary>AC code</summary><div>

```rust
fn main(){
    proconio::input!{
        n:usize, k:isize,
        a:[isize;n],
        b:[isize;n]
    }
    let mut d=0;
    for i in 0..n{
        d+=(a[i]-b[i]).abs();
    }
    println!("{}",if d<=k && (k-d)%2==0{"Yes"}else{"No"});
}
```

</div></details>

## #27 Sign Up Requests

問題は[こちら](https://atcoder.jp/contests/typical90/tasks/typical90_aa)。

Pythonでいうところの`set`である`HashSet`を使います。  
ちなみにRustでは、アクセスに$log(N)$かかることを代償に昇順で格納される`BTreeSet`というデータ構造も標準ライブラリに搭載されています。名前の通り中身は**B木**です。

<details><summary>AC code</summary><div>

```rust
fn main(){
    proconio::input!{
        n:usize,
        s:[String;n]
    }
    let mut d = std::collections::HashSet::new();
    for i in 0..n{
        if !d.contains(&s[i]){ println!("{}",i+1) }
        d.insert(&s[i]);
    }
}
```

</div></details>

## #33 Not Too Bright

問題は[こちら](https://atcoder.jp/contests/typical90/tasks/typical90_ag)。

まんまと引っかかりました。問題文はよく読みましょう。

さて、除算に関するテクは[以前に記事にしました](https://dev.thanaism.com/2021/04/div/)が、今回は切り上げ除算ですね。

これは、`(a+b-1)/b`です。Pythonだと`-(-a//b)`とも書けます。

<details><summary>AC code</summary><div>

```rust
fn main() {
  proconio::input!{ (h,w):(i32,i32) }
  let mut ans;
  if h==1 { ans=w }
  else if w==1 { ans=h }
  else { ans=((h+1)/2)*((w+1)/2) }
  println!("{}",ans);
}
```

</div></details>

## おわりに

問題の追加に合わせて、追記していこうと思います。
