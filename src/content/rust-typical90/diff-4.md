---
layout: post
title: 競プロ典型90問の★4をRustで解く
image: ../img/emre-153_VPk1NZQ-unsplash.jpg
author: [Thanai]
date: 2021-05-21T02:00:00.000+09:00
draft: false
tags:
  - typical90
  - Rust
  - online judge
excerpt: 頑張ってできるだけ自力で解く
---

## はじめに

最近、Rustをはじめたので[競プロ典型90問](https://atcoder.jp/contests/typical90)を解くという試みです。

今回の記事は★4です。[★2][2]と[★3][3]の記事もあります。

[2]: https://dev.thanaism.com/rust-typical90/diff-2
[3]: https://dev.thanaism.com/rust-typical90/diff-3

参考までに、普段はPythonを使っていて、この記事の作成時点では**緑**コーダーです。

よりよいコードがあれば[GitHub](https://github.com/thanaism/online-judge)にPRを送っていただければ助かります。

<s>★4はまだ出題に解くのが追いついていない状況です。追いつけるようにがんばります。</s>  
追いつきました。

## #3 Longest Circular Road

問題は[こちら](https://atcoder.jp/contests/typical90/tasks/typical90_c)です。

木の直径を求める問題です。BFSを2回やれば解くことが[できます](https://algo-logic.info/tree-diameter/)。

Rustだと関数を作る際に書く分量が多いのでちょっと億劫になりますが、さすがにBFSを2回ベタ書きしたら天罰が下りそうなので関数に切り出しました。

また、Rustでは関数定義は`main`関数の後ろに書いても問題ありません。関数へのベクタの渡し方に注意が必要です。
渡したベクタを関数から抜けたあとにも利用するので、*mutable borrows*にする必要があるでしょう。

<details><summary>AC code</summary><div>

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

</div></details>

## #8 AtCounter

問題は[こちら](https://atcoder.jp/contests/typical90/tasks/typical90_h)。

耳DPというやつらしいですね。Rustだと多次元配列が面倒ですが、AtCoderで利用可能なクレートにはnumpyの`ndarray`的なものが利用できるやつもあるみたいです。次の機会はそれを使おうかしら。

あとRustでは数字リテラルに任意の個数`_`を挿入できます。`1_000_000_007`みたいに書くと桁数え間違いが減っていいです。

<details><summary>AC code</summary><div>

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

</div></details>

## #12 Red Painting

問題は[こちら](https://atcoder.jp/contests/typical90/tasks/typical90_l)。

DSUをソラで実装できてかなり満足の問題でした。ただ、借用まわりのコンパイルエラーがつらかったです。

関数の引数で`mut p: &mut Vec<i64>`と書く部分で、最初の`mut`はなぜ必要なのかまだよくわかってません。このあたりは追い追いですかねー。

<details><summary>AC code</summary><div>

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

</div></details>

## #26 Independent Set on a Tree

問題は[こちら](https://atcoder.jp/contests/typical90/tasks/typical90_z)。

**木は二部グラフ**、覚えましたし。  
想定解はDFSでしたが、自分はBFSのほうが書きやすいのでBFSで書きました。

任意の頂点を1つ取り、その頂点からの最短距離が奇数のものと偶数のもので分けています。

<details><summary>AC code</summary><div>

```rust
use proconio::{input,marker::Usize1};
fn main() {
    input!{
        n:usize,
        l:[(Usize1,Usize1);n-1]
    }
    let mut connected = vec![vec![];n];
    for &(a,b) in &l {
        connected[a].push(b);
        connected[b].push(a);
    }
    let mut dist = vec![-1i32;n];
    bfs(&connected,&mut dist);
    let mut odd = Vec::new();
    let mut even = Vec::new();
    for i in 0..n {
        if dist[i]&1==1 { odd.push((i+1).to_string()) }
        else { even.push((i+1).to_string()) }
        let p = |x:Vec<String>|println!("{}",x.join(" "));
        if odd.len()==n/2 { p(odd); break; }
        if even.len()==n/2 { p(even); break; }
    }
}

fn bfs(connected: &Vec<Vec<usize>>, dist: &mut Vec<i32>) {
    let mut q = std::collections::VecDeque::new();
    q.push_back(0);
    dist[0] = 0;
    while q.len()>0 {
        let i = q.pop_front().unwrap();
        for &j in &connected[i] {
            if dist[j]==-1 {
                dist[j] = dist[i]+1;
                q.push_back(j);
            }
        }
    }
}
```

</div></details>

## #28 Cluttered Paper

問題は[こちら](https://atcoder.jp/contests/typical90/tasks/typical90_ab)。

imos法の問題ですね。2次元のものは存在は知っていたもののはじめて実装しました。

こういう系の問題、配列外参照でよくバグらせてたのですが、この程度のサイズならある程度ガバなサイズで取ってしまうのがバグらせ防止にいいかもと思いました。MLEするようなサイズじゃないですし、10%くらいおまけしたろの精神で今後はやっていこうと思います。

ちなみに2次元imos法は、グリッドグラフなら左上と右下が`+1`ですが、今回は座標軸なので左下と右上が`+1`にしています。  
累積和を取る順番を工夫すれば逆でもうまくやれるのかもしれませんが、バグらせたくないので一旦は覚えてしまいます。

<details><summary>AC code</summary><div>

```rust
fn main() {
    proconio::input!{
        n: usize,
        l: [(usize,usize,usize,usize); n]
    }
    let mut imos = vec![vec![0i32;1100];1100];
    for &(x1,y1,x2,y2) in &l {
        imos[x1][y1] += 1;
        imos[x2][y1] -= 1;
        imos[x2][y2] += 1;
        imos[x1][y2] -= 1;
    }
    for i in 0..1010 {
        for j in 0..1010 {
            imos[i+1][j] += imos[i][j];
        }
    }
    for i in 0..1010 {
        for j in 0..1010 {
            imos[i][j+1] += imos[i][j];
        }
    }
    let mut ans = vec![0;n+1];
    for i in 0..1010 {
        for j in 0..1010 {
            let k = imos[i][j] as usize;
            ans[k] += 1;
        }
    }
    for i in 1..=n {
        println!("{}",ans[i]);
    }
}
```

</div></details>

## #34 There are few types of elements

問題は[こちら](https://atcoder.jp/contests/typical90/tasks/typical90_ah)。

やっと追いつきました。いかにも尺取り法という感じの問題ですね。

$a_i$が大きいので、`HashMap`で管理していきます。ここで注意なのはRustの`HashMap`は`IndexMut`トレイトを実装していません。

C++的なノリで`dic[&key] += 1`というような書き方はできません。しかし、これをするために`entry API`の実装がありますのでそちらを使います。

具体的には、`*dic.entry(key).or_insert(default_value) += 1`というような書き方をします。さらに便利なことに、これはPythonの`defaultdict`的な挙動をします。つまり、キーに対応する値がない場合は指定した値を挿入し、ある場合はそのまま返します。

いちいち場合分けを書く必要はありません。詳しくは[いい記事](https://qiita.com/hystcs/items/75183bcf38bf95cc2ce0)があったのでそちらを参照してください。

<details><summary>AC code</summary><div>

```rust
fn main() {
    proconio::input!{
        (n,k):(usize,usize),
        a:[usize;n]
    }
    let mut right = 0;
    let mut ans = 0;
    let mut cnt = 0;
    let mut dic = std::collections::HashMap::new();
    for left in 0..n {
        while right<n {
            if *dic.entry(a[right]).or_insert(0)==0 {
                if cnt==k { break }
                else { cnt+=1 }
            }
            *dic.entry(a[right]).or_insert(0) += 1;
            right += 1;
        }
        ans = ans.max(right-left);
        if *dic.entry(a[left]).or_insert(0)==1 { cnt -= 1 }
        *dic.entry(a[left]).or_insert(0) -= 1;
    }
    println!("{}",ans);
}
```

</div></details>

## #42 Multiple of 9

問題は[こちら](https://atcoder.jp/contests/typical90/tasks/typical90_ap)。

Rustだから記述で詰まるというポイントはないように思います。素直に書けばOKでしょう。

想定解は`dp[0]=1`としていましたが、自分は最初に1から9までに1ずつ加算するという考えでやってしまってます。

<details><summary>AC code</summary><div>

```rust
fn main(){
    proconio::input!{ k:usize }
    let mut ans = 0;
    const MOD:usize = 1_000_000_007;
    if k%9==0 {
        let mut dp = vec![0;k+1];
        for i in 1..=9 { dp[i]=1 }
        for i in 1..=k {
            for j in 1..=9 {
                if i>=j { dp[i]+=dp[i-j]; }
            }
            dp[i]%=MOD;
        }
        ans = dp[k];
    }
    println!{"{}",ans};
}
```

</div></details>

## #43 Maze Challenge with Lack of Sleep

問題は[こちら](https://atcoder.jp/contests/typical90/tasks/typical90_aq)。

01BFSは知っていたし、それを使いそうなのも分かりましたが、方向ごとに配列を用意するとか思い付けないですね。

これで発想を覚えたので次からは悩まず済むでしょう。

<details><summary>AC code</summary><div>

```rust
use proconio::{input,marker::*};
const INF:i64 = 1<<60;
fn main(){
    input!{
        h:i64,w:i64,
        start:(Usize1,Usize1),
        goal:(Usize1,Usize1),
        grid:[Chars;h]
    }
    let di = vec![-1,0,1,0];
    let dj = vec![0,1,0,-1];
    let mut dist = vec![vec![vec![INF;4];1100];1100];
    let mut que = std::collections::VecDeque::new();
    let sx = start.0;
    let sy = start.1;
    for sz in 0..4 {
        dist[sx][sy][sz] = 0;
        que.push_back((sx,sy,sz));
    }
    while que.len()>0 {
        let (i,j,k) = que.pop_front().unwrap();
        for nz in 0..4 {
            let ni = i as i64 + di[k];
            let nj = j as i64 + dj[k];
            let mut now = dist[i][j][k];
            if k!=nz { now += 1 }
            if ni>=0 && ni<h && nj>=0 && nj<w {
                let nx = ni as usize;
                let ny = nj as usize;
                if grid[nx][ny]=='.' && dist[nx][ny][nz]>now {
                    dist[nx][ny][nz] = now;
                    if k!=nz { que.push_back((nx,ny,nz)) }
                    else { que.push_front((nx,ny,nz))}
                }
            }
        }
    }
    let mut ans = INF;
    let gx = goal.0;
    let gy = goal.1;
    for gz in 0..4 { ans = ans.min(dist[gx][gy][gz]) }
    println!("{}",ans);
}
```

</div></details>

## おわりに

問題の追加に合わせて、追記していこうと思います。
