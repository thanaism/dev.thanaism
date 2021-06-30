---
layout: post
title: 競プロ典型90問の★3をRustで解く
image: ../img/timothy-meinberg-AL2-t0GrSko-unsplash.jpg
author: [Thanai]
date: 2021-05-21T01:00:00.000+09:00
draft: false
tags:
  - typical90
  - Rust
  - online judge
excerpt: 知見を忘れないうちにストックする
---

## はじめに

最近、Rustをはじめたので[競プロ典型90問](https://atcoder.jp/contests/typical90)を解くという試みです。

今回の記事は★3です。[★2][2]と[★4][4]の記事もあります。

[2]: https://dev.thanaism.com/rust-typical90/diff-2
[4]: https://dev.thanaism.com/rust-typical90/diff-4

参考までに、普段はPythonを使っていて、この記事の作成時点では**緑**コーダーです。

よりよいコードがあれば[GitHub](https://github.com/thanaism/online-judge)にPRを送っていただければ助かります。

## #2 Encyclopedia of Parentheses

問題は[こちら](https://atcoder.jp/contests/typical90/tasks/typical90_b)。

bit全探索ですね。Rustでは単純に数字をインクリメントするfor文は`0..n`を使います。

Pythonとやり方が似ていますが、`0..=n`というように末尾を含む場合も`=`で記載できるのが便利です。
これ、Pythonにも導入してほしいですね。

あとはRustの鬼門、文字列操作ですがmutableな文字列には`String`が使えます。

<details><summary>AC code</summary><div>

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

</div></details>

## #14 We Used to Sing a Song Together

問題は[こちら](https://atcoder.jp/contests/typical90/tasks/typical90_n)。

貪欲で解けます。こういうのは絵に描くといいですね。書かないと頭がバグる場合があります。

Rustにおいてmutableな配列は`.sort()`でソートできることを覚えておけばよいです。

下記はあえてメソッドチェーンで処理していますが、今回は単純なforで回すほうがシンプルに書けると思います。  
あくまで勉強がてら、という感じです。

<details><summary>AC code</summary><div>

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

</div></details>

## #16 Minumum Coins

問題は[こちら](https://atcoder.jp/contests/typical90/tasks/typical90_p)。

硬貨の枚数が最大で9999枚のため、$O(N^2)$が許されます。Rustは速いのでこういうシーンは安心ですね。

また、`min()`関数は、`std::cmp`の中にあります。

さらに、答えの初期化に$N$の最大値である$10^9$を使いますが、ここで`1<<30`は$1073741824$であるため代替できます。これはRustに限った話ではないですが、地味に簡単に書けていい感じになりますので好きです。

<details><summary>AC code</summary><div>

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

</div></details>

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

<details><summary>AC code</summary><div>

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

</div></details>

## #20 Log Inequality

問題は[こちら](https://atcoder.jp/contests/typical90/tasks/typical90_t)。

これも数学ですね。

べき乗のシンタックスを知らない場合$O(N)$ですが、知っている場合はほぼ$O(1)$のようなものです（内部実装は調べてませんが、厳密にはおそらく$O(logN)$とかのはず）。

`pow()`の引数は必ず`u32`型であることだけ覚えておけば問題ないでしょう。

<details><summary>AC code</summary><div>

```rust
fn main(){
    proconio::input!{
        a:i128, b:u32, c:i128,
    }
    println!("{}",if a<c.pow(b) {"Yes"} else {"No"});
}
```

</div></details>

## #32 AtCoder Ekiden

問題は[こちら](https://atcoder.jp/contests/typical90/tasks/typical90_af)。

C++でいうところのnext_permutationを使う問題ですね。

Rustだと`itertools::Itertools`が使えます。よく使う全列挙の類は以下で利用できます。

- ${}_n\mathrm{P}_r$：`(0..n).permutations(r)`
- ${}_n\mathrm{C}_r$：`(0..n).combinations(r)`
- ${}_n\mathrm{H}_r$：`(0..n).combinations_with_replacement(r)`

<details><summary>AC code</summary><div>

```rust
use itertools::Itertools;
use proconio::{marker::*, *};
fn main() {
    input! {
        n: usize,
        a: [[i32; n]; n],
        m: usize,
        l: [(Usize1, Usize1); m]
    }
    let mut ng = vec![vec![false; n]; n];
    for i in 0..m {
        let (x, y) = l[i];
        ng[x][y] = true;
        ng[y][x] = true;
    }
    let mut ans = 1 << 30;
    for i in (0..n).permutations(n) {
        let mut t = 0;
        let mut ok = true;
        for (j, &k) in i.iter().enumerate() {
            if j < n - 1 {
                let (x, y) = (i[j], i[j + 1]);
                if ng[x][y] {
                    ok = false
                }
            }
            t += a[k][j];
        }
        if ok {
            ans = ans.min(t)
        };
    }
    println!("{}", if ans == 1 << 30 { -1 } else { ans });
}
```

</div></details>

## #38 Large LCM

問題は[こちら](https://atcoder.jp/contests/typical90/tasks/typical90_al)。

うん、Rustには`i128`がある。`i128`で殴ろう。

ちなみに10進数での桁数を知りたい場合は、ざっくり`0.3`掛けるとわかります。

なぜか？底の変換公式から$\log_{10}{x}=\frac{\log_2{x}}{\log_2{10}}$です。分母にもう一度変換公式を使うと、$\log_{10}{x}=\log_2{x}\cdot\log_{10}{2}$となり、$\log_{10}{2}\fallingdotseq0.3$であるからですね。

そして、$127*0.3=38.1$なので、ざっくり$10^{38}$ってことです。つまり、今回の制約であり得る$(10^{18})^2$より大きいので桁が足ります。

<details><summary>AC code</summary><div>

```rust
fn main(){
    proconio::input!{
        a:i128,
        b:i128
    }
    let ans = lcm(a,b);
    if ans>10i128.pow(18u32) {
        println!{"{}","Large"}
    } else {
        println!("{}",ans)
    }
}

fn lcm(x:i128,y:i128)->i128{
    x*y/gcd(x,y)
}

fn gcd(x:i128,y:i128)->i128{
    if y==0 {return x}
    gcd(y,x%y)
}
```

</div></details>

## #44 Shift and Swapping

問題は[こちら](https://atcoder.jp/contests/typical90/tasks/typical90_ar)。

配列操作の時間計算量を認識していないとTLEになる系統の問題は多いですね。

基本のデータ構造の時間計算量は早い段階で理解しておくのがいいでしょう。

<details><summary>AC code</summary><div>

```rust
fn main(){
    proconio::input!{
        n:usize,q:usize,
        mut a:[i64;n],
        l:[(i64,usize,usize);q]
    }
    let mut shift = 0;
    for k in 0..q {
        let t = l[k].0;
        let i = (l[k].1 - 1 + n - shift)%n;
        let j = (l[k].2 - 1 + n - shift)%n;
        if t==1 { a.swap(i,j) }
        if t==2 { shift += 1 }
        if t==3 { println!("{}",a[i]) }
    }
}
```

</div></details>

## #46 I Love 46

問題は[こちら](https://atcoder.jp/contests/typical90/tasks/typical90_at)。

Haskellのインプットフェーズが[ひと区切りついた](https://dev.thanaism.com/2021/05/weekly-report_0517-0523/)ので急に関数型っぽく書いています。

`let mut`を使わずにきれいに記述できると気持ちがいいですね。

<details><summary>AC code</summary><div>

```rust
use itertools::iproduct;
fn main() {
    proconio::input!{
        n:usize,
        a:[usize;n],
        b:[usize;n],
        c:[usize;n]
    }
    let m = |x:Vec<usize>|x.into_iter()
    .fold(vec![0i128;46],|mut v,x|{v[x%46]+=1;v});
    let ma = m(a);
    let mb = m(b);
    let mc = m(c);
    let ans:i128 = iproduct!(0..46,0..46,0..46)
        .filter(|(i,j,k)|(i+j+k)%46==0)
        .fold(0,|acc,(i,j,k)|acc+ma[i]*mb[j]*mc[k]);
    println!("{}",ans);
}
```

</div></details>

## #48 I will not drop out

問題は[こちら](https://atcoder.jp/contests/typical90/tasks/typical90_av)。

手続き的に書くのも芸がないので、できるだけ関数に寄せてみました。

が、Rustで`sort`は式ではなく文みたいです。うーん。

とりあえず`flatten`とか使うとそれっぽいのでヨシ！

<details><summary>AC code</summary><div>

```rust
fn main() {
    proconio::input!{
        (n,k):(usize,usize),
        mut l:[(usize,usize);n]
    }
    let mut q:Vec<usize> = l.into_iter()
        .map(|x|vec![x.0-x.1,x.1])
        .flatten()
        .collect();
    q.sort();
    let ans:usize = q.into_iter().rev().take(k).sum();
    println!("{}",ans);
}
```

</div></details>

## #50 Stair Jump

問題は[こちら](https://atcoder.jp/contests/typical90/tasks/typical90_ax)。

超典型的なDPという感じですね。DPが超苦手な自分でもこれくらいならなんとか分かります。

ある段に到達する経路は、1段前もしくはL段前からしかないので、それを元に漸化式を立てます。

<details><summary>AC code</summary><div>

```rust
fn main() {
    proconio::input!{
        n:usize,
        l:usize
    }
    const MOD:usize = 1_000_000_007;
    let mut dp = vec![0;n+1];
    dp[0] = 1;
    for i in 0..=n {
        if i+l<=n {
            dp[i+l] += dp[i];
            dp[i+l] %= MOD;
        }
        if i+1<=n {
            dp[i+1] += dp[i];
            dp[i+1] %= MOD;
        }
    }
    println!("{}",dp[n]);
}
```

</div></details>

## #52 Dice Product

問題は[こちら](https://atcoder.jp/contests/typical90/tasks/typical90_az)。

直積は、和の積で書けますね。巷で話題の形式的冪級数もそういう話なのかもしれません（そっちはよく分かってないですが）。

ということで、この問題を$O(N)$で解くことが出来ました。

<details><summary>AC code</summary><div>

```rust
fn main(){
  proconio::input!{
    n:usize,
    l:[[usize;6];n]
  }
  let mut ans = 1;
  for i in l.into_iter() {
    ans *= i.iter().sum::<usize>();
    ans %= 1_000_000_007;
  }
  println!("{}",ans);
}
```

</div></details>

## #64 Uplift

問題は[こちら](https://atcoder.jp/contests/typical90/tasks/typical90_bl)。

セグメント木でゴリ押ししてもよいかもしれませんが、さすがにオーバーキルなので差分のみを考えて解きます。

<details><summary>AC code</summary><div>

```rust
use proconio::{input,marker::Usize1};
fn main(){
	input!{
		(n,q):(usize,usize),
		a:[isize;n],
		ls:[(Usize1,Usize1,isize);q]
	}
	let mut d:Vec<isize> = (1..n).map(|i|a[i]-a[i-1]).collect();
	let mut t:isize = (1..n).fold(0,|acc,x|acc+(a[x]-a[x-1]).abs());
	for i in 0..q {
		let (l,r,v) = ls[i];
		if l>0 {
			let d1 = d[l-1].abs();
			d[l-1] += v;
			t += d[l-1].abs()-d1;
		}
		if r+1<n {
			let d1 = d[r].abs();
			d[r] -= v;
			t += d[r].abs()-d1;
		}
		println!("{}",t);
	}
}
```

</div></details>

## #69 Colorful Blocks 2

問題は[こちら](https://atcoder.jp/contests/typical90/tasks/typical90_bq)。

繰り返し二乗法ですね。下記の実装がわりとエレガントで好きな書き方です。

掛ける数を二乗し続けて、ビットが立っていれば実際に掛けていきます。

こうすることでダブリングのように事前にk乗の値を計算しておかなくても解けます。

<details><summary>AC code</summary><div>

```rust
fn main(){
	proconio::input!{
		(n,k):(usize,i128)
	}
	let l = (k-1).max(0);
	let mut m = (k-2).max(0);
	const MOD:i128 = 1000_000_007;
	let mut ans = 1;
	if n<2 {
		for i in 0..n {
			if i==0 { ans = k }
			else if i==1 { ans *= l }
			else { ans *= m }
			ans %= MOD;
		}
	} else {
		let mut x = n-2;
		while x>0 {
			if x&1==1 { ans = ans * m % MOD }
			m = m * m % MOD;
			x >>= 1;
		}
		ans = ans * k % MOD * l % MOD;
	}
	println!("{}",ans);
}
```

</div></details>

## #75 Magic For Balls

問題は[こちら](https://atcoder.jp/contests/typical90/tasks/typical90_bw)。

素因数分解してlog取ればおわりです。

<details><summary>AC code</summary><div>

```rust
use proconio::input;
fn main() {
	input!{n:usize}
	let mut x = n;
	let mut cnt = 0;
	for i in 2..n {
		if i*i>n {break}
		while x%i==0 {
			x /= i;
			cnt += 1;
		}
	}
	if x!=1 {cnt+=1}
	let mut ans = 0;
	let mut i = 1;
	while i<cnt {
		ans += 1;
		i *= 2;
	}
	println!("{}",ans);
}
```

</div></details>

## #76 Cake Cut

問題は[こちら](https://atcoder.jp/contests/typical90/tasks/typical90_bx)。

しゃくとりはdequeで実装すると添字でバグらないためとてもよいです。

これに二分探索を使う発想がありませんでしたが、本当は思いつけないとダメですね。

<details><summary>AC code</summary><div>

```rust
fn main(){
	proconio::input!{
		n:usize,
		a:[usize;n]
	}
	let mut acc = 0;
	let mut que = std::collections::VecDeque::new();
	let total = a.clone().iter().fold(0,|x,i|x+i);
	let mut ok = false;
	for i in 0..2*n {
		que.push_back(a[i%n]);
		acc += a[i%n];
		while acc*10>total {
			let x = que.pop_front().unwrap();
			acc -= x;
		}
		if acc*10==total { ok=true;break }
	}
	println!("{}",if ok {"Yes"} else {"No"});
}
```

</div></details>

## #79 Two by Two

問題は[こちら](https://atcoder.jp/contests/typical90/tasks/typical90_ca)。

蟻本で牛がタイルをひっくり返すだかの問題を見た覚えがあり、左上からやればいいのはすぐに分かりました。

実装はとても軽いので★2でもいいのかな、と思いました。

<details><summary>AC code</summary><div>

```rust
fn main() {
	proconio::input!{
		(h,w):(usize,usize),
		mut a:[[isize;w];h],
		b:[[isize;w];h]
	}
	let mut cnt = 0;
	for i in 0..h-1 {
		for j in 0..w-1 {
			let diff = b[i][j] - a[i][j];
			if diff!=0 { cnt+=diff.abs() }
			for k in 0..2 {
				for l in 0..2 {
					a[i+k][j+l] += diff;
				}
			}
		}
	}
	let mut ans = true;
	for i in 0..h {
		for j in 0..w {
			if a[i][j]!=b[i][j] {
				ans = false;
			}
		}
	}
	if ans {
		println!("{}","Yes");
		println!("{}",cnt);
	} else {
		println!("{}","No");
	}
}
```

</div></details>

## おわりに

問題の追加に合わせて、追記していこうと思います。
