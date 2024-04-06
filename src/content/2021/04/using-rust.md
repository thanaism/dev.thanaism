---
layout: post
title: 最も愛されているプログラミング言語Rustをやっていく
image: ../../img/header/2021/04/75871e71.jpg
author: [Thanai]
date: 2021-04-24T00:00:00.000+09:00
draft: false
tags:
  - programming
  - online judge
excerpt: 逆に最も嫌われている言語ランキング1位はVBAらしい

---

## なぜRustなのか

最近、巷では競プロ典型90問というすばらしい企画が始まった。せっかくなら新しい取り組みとしてRustで解いていこうと思った。

なぜか？だってRust使えたらかっこいいじゃん。

### Rustは最も愛されている言語

以前からもそう言われていたようだが、[この記事](https://earthly.dev/blog/brown-green-language/)によれば最新の調査においてもRustは最も愛されているプログラミング言語だと紹介されている。

優れているからこそ愛されるのだ。Rustをやろう。

### 最も愛されていない言語はVBA

ちなみに、二度と使いたくない（don't want to continue to use）言語の1位はVBAらしい。

前職のJTCではアプリケーションのインストール行為が禁じられていたため、私も選択の権利なくVBAを利用していた人間のひとりだ。その流れでVBAで副業をやっていたりした経緯もあってTwitterのフォロワー各位にもVBA愛好者がそれなりに多く、あまり忌憚なき発言をすると反感を買いそうではあるが、このランキングについてはむべなるかなという感想しかない。

どちらにせよVBAは競プロではサポートされていない言語なので今回は忘れる。Rustをやろう。

### Rustは高速で競プロにも向いている

Rustは高速らしい。正直に言ってしまえば、PythonあるいはPyPyで想定アルゴリズムを書いても間に合わないような問題に手を付けるほどのレベルに私はまだない。

とはいえ速いに越したことはない。Rustをやろう。

### Rustは静的型付けのコンパイル言語

Rustは静的型付けのコンパイル言語で、なんとも本格的ではないか。私はPythonも好きだが、スクリプト言語は硬派な人たちからオモチャ扱いされる側面もある。

コンパイル言語もしっかり使える状態でこそスクリプト言語の価値もより深く理解できるだろう。Rustをやろう。

### Rustはむずかしい

ただし、Rustは比較的に難しい言語である。それこそVBAしかやっていなかった頃の私が仮に使おうとしていたらコンパイルを通すことすら困難なレベルだったかもしれない。

ただ、敷居が高ければ高いほど使える自分になっていくのは楽しい。Rustをやろう。

### 参考

[競プロ典型90問](https://atcoder.jp/contests/typical90)に関しては、以下のツイートやリンクを参考にしてほしい。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/%E7%AB%B6%E3%83%97%E3%83%AD%E5%85%B8%E5%9E%8B90%E5%95%8F?src=hash&amp;ref_src=twsrc%5Etfw">#競プロ典型90問</a> の常設ジャッジが公開されました。<br>現在、4/20 までに公開されている 19 問すべてに提出できる状態となっています。皆さん是非ご活用ください！！！<br>リンク：<a href="https://t.co/x709ar4Mna">https://t.co/x709ar4Mna</a> <a href="https://t.co/hniuzunjR4">pic.twitter.com/hniuzunjR4</a></p>&mdash; E869120@公開アカウント (@e869120) <a href="https://twitter.com/e869120/status/1384451787478888450?ref_src=twsrc%5Etfw">April 20, 2021</a></blockquote>

## 解きながら慣れていく

[初日の問題](https://atcoder.jp/contests/typical90/tasks/typical90_a)は、以下のような内容だ。

> 左右の長さが$L$[cm]のようかんがあります。$N$個の切れ目が付けられており、左から$i$番目の切れ目は左から$A_i$[cm]の位置にあります。
>
> あなたは$N$個の切れ目のうち$K$個を選び、ようかんを$K+1$個のピースに分割したいです。そこで、以下の値を**スコア**とします。
>
> - $K+1$個のピースのうち、最も短いものの長さ（cm単位）
>
> スコアが最大となるように分割する場合に得られるスコアを求めてください。

制約の詳しい値はリンクで確認してもらえればと思うが、$O(N^2)$が間に合わないということがわかっていればよい。

## Pythonの場合

まずは手に馴染んだ言語で処理の内容を確認していく。

いわゆる決め打ち2分探索という解き方らしく、実装は軽い。

```py
n,l=map(int,input().split())
k=int(input())
a=[*map(int,input().split())]

def is_ok(x,k):
    b=0
    m=0
    for i in a:
        if i-b>=x and l-i>=x:
            b=i
            m+=1
    return m>=k

ok=0
ng=l+1
while abs(ok-ng)>1:
    mid=(ok+ng)//2
    if is_ok(mid,k):
        ok=mid
    else:
        ng=mid
print(ok)
```

特筆すべき点はないが、しいて言うなら**めぐる式**の2分探索にしているくらいだろうか。

新しい言語をやるときは、すでに書ける言語でACしてから書き直せば、解法のミスと実装のミスを分離できるのでいいだろう。

## Rustの場合

では、Rustで書いていこう。Rustでは必ず`main`関数が必要になる。ソースファイルの拡張子は`.rs`で、Rustでは特に`クレート`と呼ぶ。

```rust
fn main() {}
```

### 入力受け取りがすでに関門

次に入力を受け取ろう。Rustは学習曲線がアレと言われるだけあって、この時点から難易度が高い。

[この記事](https://qiita.com/tanakh/items/0ba42c7ca36cd29d0ac8)が参考になるだろう。

```rust
let mut line = String::new();  // 格納のためのバッファを用意
let mut scan = std::io::stdin();  // 標準入力を開く
let _ = scan.read_line(&mut line);  // 1行読み込む
let vec: Vec<&str> = line.split_whitespace().collect();  // 空白区切りでベクタにする
let n: isize = vec[0].parse().unwrap(); // ベクタから値を取り出し変数にバインド
let l: isize = vec[1].parse().unwrap();
let _ = scan.read_line(&mut line);  // 次の1行を読み込む
let a: Vec<isize> = list.split_whitespace().map(|x|x.parse().unwrap()).collect(); // intにパースしてベクタに格納
```

この時点で、生半可な理解だとコンパイルすら通せないレベルの地雷がたくさん埋め込まれている。

たとえば、**可変借用**の`&mut`や、`Result`あるいは`Option`**列挙型**を処理する`unwrap()`、イテレータまわりの処理などだ。

このあと部分的には説明を挟んでいく予定だが、体系的な導入を望む場合は最近リリースされた[Microsoft Learn](https://docs.microsoft.com/ja-jp/learn/paths/rust-first-steps/)のラーニングパスがわかりやすい。想定時間が**5時間17分**のパスのため、1日あればRustの導入を終えることができる。

#### 型を確認しながら実装する

Rustではガベージコレクタを使わない安全なメモリ管理を実現するために、文字列まわりが他の言語に比べて特に難解になっている。

最初のうちは以下のような関数を用いて、いま扱っている対象の型を逐一確認しながら実装するのがよいだろう。

```rust
fn print_type_of<T>(_: T) {
    println!("{}", std::any::type_name::<T>());
}
```

#### 暗号に見える`&mut`

Rustでは安全性の確保のため、変数が既定でimmutableである。mutableにするには、変数宣言で明示的に`let mut`と書く必要がある。

そして、関数で変数を受け取るときは明確に`借用`する必要がある。これはRustの`所有権`システムによる制約であり、この所有権管理によりメモリ安全性を確保することができる。

さらに借用には読み取り専用の`immutable borrows`と変更を許容する`mutable borrows`がある。同じ変数への同時アクセスがないことをコンパイル時に保証するために、借用においても明示的な記述が必要である。

つまり、先述の`.read_line(&mut line)`は、変数`line`をmutable borrowさせるための記述となる。

#### `unwrap`の必要性

Rustでは、標準関数において戻り値を列挙型とする関数型的なアプローチがなされている。

エラー処理を例外ではなく戻り値で処理するという思想であり、「処理が成功したらその結果、失敗したらエラー」が入っているような列挙型`Result<T, E>`でラップして返している。あるいは、戻り値が存在しない場合を考慮した列挙型`Option<T>`もある。`Option`では、戻り値がある場合に`Some(T)`としてラップされて返ってくる。

したがって、競プロの入出力のように「与えられる入力の正しさが保証される」ような場合には、単純にそのラップを剥がすだけでよい。そうでない場合は`パターンマッチング`の仕組みを利用してエラーハンドリングを行うことになる。

### `proconio::input`マクロを利用する

とはいえ入出力がしんどいのは競プロ的には楽しみを削ぐので、`proconio::input`マクロを利用するのが定番である。
これを用いると下記のようにシンプルに記述できてしまう。

```rust
proconio::input! {
    n: isize,
    l: isize,
    k: isize,
    mut a: [isize; n]
}
```

とても便利とはいえ、内部でやっていることを自力で記述できないレベルだと他の部分でコンパイルすら通せなくなる可能性は高い。面倒でも最初のうちは自力で入力処理を書くのがよい勉強になる。

### 残りの部分の処理

Rustの説明をしていると一生書き終わらない気がしてきたので、残りは一気に掲載する。

```rust
fn main() {
    proconio::input! {
        n: isize,
        l: isize,
        k: isize,
        mut a: [isize; n]
    }
    a.sort();
    let mut ok = 0;
    let mut ng = l + 1;
    while (ng - ok).abs() > 1 {
        let mid = (ok + ng) / 2;
        if is_ok(&a, l, k, mid) {
            ok = mid;
        } else {
            ng = mid;
        }
    }
    println!("{}", ok);
}

fn is_ok(a: &Vec<isize>, l: isize, k: isize, mid: isize) -> bool {
    let mut x = 0;
    let mut y = 0;
    for i in a {
        if i - x >= mid && l - i >= mid {
            x = *i;
            y += 1;
        }
    }
    y >= k
}
```

個人的には、なんてことのない処理をしている`is_ok`関数を書くのにすら、借用まわりの仕様があやふやだとコンパイルすら通せないのがRustの敷居の高さと思う。

ここでは関数にベクタをimmutableに借用させているが、そのベクタを`for`ループで回した際の`i`もまた参照なのである。そのため、変数`x`に`i`をバインドするには`*i`として参照戻しを行わなくてはならない。

あくまでここでの`i`は`int`の参照型であって`int`型ではないので、型がそろっていないのだ。Rustでは**暗黙の型変換は行われない**。

## まとめ

一度に書くにはあまりにもボリューミーな概念が多いため、この記事はこの程度で終わりにする。

もう少しドリルダウンしていくつか別に記事を書いていこうと思う。とにかくRustは簡単に理解させてくれないところが面白い。こういう難解なものに対峙するとワクワクする。
