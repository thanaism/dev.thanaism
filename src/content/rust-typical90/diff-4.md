---
layout: post
title: 競プロ典型90問の★4をRustで解く
image: ../img/emre-153_VPk1NZQ-unsplash.jpg
author: [Thanai]
date: 2021-05-08T01:00:00.000+09:00
draft: false
tags:
  - Rust
  - typical90
  - online judge
excerpt: 頑張ってできるだけ自力で解く
---

## はじめに

最近、Rustをはじめたので[競プロ典型90問](https://atcoder.jp/contests/typical90)を解くという試みです。

今回の記事は★4です。[★2](https://dev.thanaism.com/rust-typical90/diff-2)と[★3](https://dev.thanaism.com/rust-typical90/diff-2)の記事もあります。

参考までに、普段はPythonを使っていて、この記事の作成時点では**緑**コーダーです。

よりよいコードがあれば[GitHub](https://github.com/thanaism/online-judge/tree/master/rust/src/bin)にPRを送っていただければ助かります。

**★4はまだ出題に解くのが追いついていない状況です。**追いつけるようにがんばります。

## #3 Longest Circular Road

問題は[こちら](https://atcoder.jp/contests/typical90/tasks/typical90_c)です。

木の直径を求める問題です。BFSを2回やれば解くことが[できます](https://algo-logic.info/tree-diameter/)。

Rustだと関数を作る際に書く分量が多いのでちょっと億劫になりますが、さすがにBFSを2回ベタ書きしたら天罰が下りそうなので関数に切り出しました。

また、Rustでは関数定義は`main`関数の後ろに書いても問題ありません。関数へのベクタの渡し方に注意が必要です。
渡したベクタを関数から抜けたあとにも利用するので、*mutable borrows*にする必要があるでしょう。

```rust
use proconio::{input,marker::Usize1};
use std::collections::VecDeque;

fn main(){
    input!{n:usize}
    let mut g=vec![vec![];n];
    for _ in 1..n{
        input!{x:Usize1,y:Usize1}
        g[x].push(y);
        g[y].push(x);
    }
    let mut d=vec![1<<30;n];
    bfs(&g,&mut d,0usize);
    let mut u:usize=0;
    let m=d.iter().max().unwrap();
    for i in 0..n{
        if &d[i]==m {u=i}
    }
    let mut d=vec![1<<30;n];
    bfs(&g,&mut d,u);
    println!("{}",1+d.iter().max().unwrap());
}

fn bfs(g:&Vec<Vec<usize>>,d:&mut Vec<isize>,s:usize){
    let mut q:VecDeque<usize>=VecDeque::new();
    d[s]=0;
    q.push_back(s);
    while q.len()>0{
        let i=q.pop_front().unwrap();
        for j in g[i].iter(){
            if d[*j]==1<<30{
                q.push_back(*j);
                d[*j]=d[i]+1;
            }
        }
    }
}
```

## #8 AtCounter

問題は[こちら](https://atcoder.jp/contests/typical90/tasks/typical90_h)。

耳DPというやつらしいですね。Rustだと多次元配列が面倒ですが、AtCoderで利用可能なクレートにはnumpyの`ndarray`的なものが利用できるやつもあるみたいです。次の機会はそれを使おうかしら。

あとRustでは数字リテラルに任意の個数`_`を挿入できます。`1_000_000_007`みたいに書くと桁数え間違いが減っていいです。

```rust
use proconio::{input, marker::Chars};
fn main() {
    input!{ n:usize, s:Chars }
    let mut dp = vec![vec![0_i128; 8]; n+1];
    let atcoder = "atcoder ".chars().collect::<Vec<char>>();
    dp[0][0] = 1;
    const MOD: i128 = 1_000_000_007;
    for j in 0..8 {
        for i in 0..n {
            if s[i]==atcoder[j] {
                dp[i+1][j+1] += dp[i][j]%MOD;
            }
            dp[i+1][j] += dp[i][j]%MOD;
        }
    }
    println!("{}",dp[n][7]%MOD);
}
```

## #12 Red Painting

問題は[こちら](https://atcoder.jp/contests/typical90/tasks/typical90_l)。

DSUをソラで実装できてかなり満足の問題でした。ただ、借用まわりのコンパイルエラーがつらかったです。

関数の引数で`mut p: &mut Vec<i64>`と書く部分で、最初の`mut`はなぜ必要なのかまだよくわかってません。このあたりは追い追いですかねー。

```rust
use proconio::{input, marker::Usize1};
fn main() {
    input! { (h, w): (usize, usize), q: usize }
    let mut p = vec![-1i64; h * w];
    let mut c = vec![0; h * w];
    for _ in 0..q {
        input! { t: usize }
        if t == 1 {
            input! { (r1,c1):(Usize1,Usize1) }
            let idx1 = w * r1 + c1;
            c[idx1] = 1;
            let di: Vec<i64> = vec![-1, 0, 1, 0];
            let dj: Vec<i64> = vec![0, 1, 0, -1];
            for k in 0..4 {
                let ni = r1 as i64 + di[k];
                let nj = c1 as i64 + dj[k];
                if ni >= 0 && ni < h as i64
                && nj >= 0 && nj < w as i64 {
                    let idx2 = w * ni as usize + nj as usize;
                    if c[idx2] == 1 { unite(idx1, idx2, &mut p) }
                }
            }
        } else {
            input! {
                (r1, c1): (Usize1, Usize1),
                (r2, c2): (Usize1, Usize1)
            }
            let idx1 = w * r1 + c1;
            let idx2 = w * r2 + c2;
            let ans;
            if same(idx1, idx2, &mut p)
            && c[idx1] == 1 && c[idx2] == 1 { ans = "Yes"; }
            else { ans = "No" }
            println!("{}", ans);
        }
    }
}

fn root(x: usize, p: &mut Vec<i64>) -> usize {
    if p[x] < 0 { return x; }
    p[x] = root(p[x] as usize, p) as i64;
    p[x] as usize
}
fn same(x: usize, y: usize, mut p: &mut Vec<i64>) -> bool {
    root(x, &mut p) == root(y, &mut p)
}
fn unite(x: usize, y: usize, mut p: &mut Vec<i64>) {
    let mut rx = root(x, &mut p);
    let mut ry = root(y, &mut p);
    if rx == ry { return; }
    if rx > ry { std::mem::swap(&mut rx, &mut ry) }
    p[ry] += p[rx];
    p[rx] = ry as i64;
}
```

## おわりに

まだ全然解けていませんが、問題の追加に追いつけるようにしたいと思います。
