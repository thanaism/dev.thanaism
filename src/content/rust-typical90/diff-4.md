---
layout: post
title: 競プロ典型90問の★4をRustで解く
image: ../img/emre-153_VPk1NZQ-unsplash.jpg
author: [Thanai]
date: 2021-05-01T23:00:00.000+09:00
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

## おわりに

まだ全然解けていませんが、問題の追加に追いつけるようにしたいと思います。
