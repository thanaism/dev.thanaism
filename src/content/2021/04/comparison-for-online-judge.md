---
layout: post
title: 言語ごとの競プロ基本処理シンタックスまとめ
image: ../../img/header/2021/04/5f7bcc1f.jpg
author: [Thanai]
date: 2021-04-29T10:00:00.000+09:00
draft: false
tags:
  - programming
  - online judge
excerpt: RustとPythonとJavaScriptと一部Java
---

※2021/5/2に追記しました。

## 競技プログラミングに頻出の処理

どんな言語であろうと基本処理は**1秒も悩むことなくソラで書きたい**。
その状態に至るまで、何度も同じような処理について調べるのは効率が悪いので、自分用にまとめておく。

ABCのC問題くらいまでは基本的な処理のオンパレードなので新しい言語の練習にとてもよいと思っている。

実は以前にも同じようなテーマで[少し書いた](https://dev.thanaism.com/2020/10/comparing-programming-languages/)が、当時はRustを入れていなかったので、書き直す。

そして今回のために（！）、CSSを少しいじって**コードブロックに言語タブを追加**した。これでコードブロックごとにどの言語かをいちいち書かなくてもよくなった。前から気になっていたけどようやくできて満足。

Gatsbyでの実装方法が気になる方は[こちら](https://www.lekoarts.de/en/blog/language-tabs-for-gatsbys-code-blocks)を参考に。

## 入出力

### 1行読み込み

標準入力からの1行読み取り

```rust
let mut line = String::new();
std::io::stdin().read_line(&mut line).unwrap();
```

```py
line = input()
```

```js
const input = require('fs').readFileSync('/dev/stdin', 'utf8');
const line = input.split`\n`[0];
```

jsはnext lineではなくfirst lineを取り出すコードになっている。

### 文字列の空白区切り

空白区切りでミュータブルな動的配列に格納

```rust
let mut vec:Vec<&str> = line.split_whitespace().collect();
```

```py
vec = list(line.split())
```

```js
let vec = line.split` `;
```

### 整数へのパース

```rust
// iter()はvecの所有権をmoveしない
let mut vecInt1:Vec<isize> = vec.iter().map(|x|x.parse().unwrap()).collect();

// into_iter()はvecの所有権をmoveする
let mut vecInt2:Vec<isize> = vec.into_iter().map(|x|x.parse().unwrap()).collect();
println!("{:?}",vec);  // コンパイルエラー
```

```py
vec_int = list(map(int,vec))

# リスト内包表記
vec_int = [int(s) for s in vec]
```

```js
let vecInt = vec.map(x => parseInt(x));

// parseIntは第2引数を取る関数のため以下はエラーとなる
let vecInt = vec.map(parseInt);
```

Rustの`iter()`と`into_iter()`については、[この記事](https://dawn.hateblo.jp/entry/2017/07/24/165933)が参考になりそう。

### Java

Javaの場合は以下のようになる。`next`や`nextInt`、`nextLine`などがあるので適宜利用する。  
ただし、Javaの`Scanner`は重いので巨大な入力を受け取る場合は自前で軽量な実装を行う必要が出てくる。

```java
import java.util.Scanner;
public class Main {
  public static void main(String[] args) {
    Scanner input = new Scanner(System.in);
    String str = input.next();
    int a = input.nextInt();
    System.out.println(str);
    System.out.println(a);
    input.close();
  }
}
```

## 数値操作

### min/max

（2021/5/2：Rustの小数型`min()`メソッドについて追記）

```rust
let large = std::cmp::max(0,100);
let small = std::cmp::min(0,100);
let largest = std::cmp::max(0,100,200);  // コンパイルエラー

// 3値以上の比較はiter()のメソッドを利用する
let smallest = [0,100,200].iter().min();

// 小数型は少し変わる
let x: f64 = 0.5;
let y = x.min(0.2);
assert_eq!(y,0.2);
```

```py
large = max(0,100)
largest1 = max([0,100,200])

# tupleの()は省略できるので以下も有効
largest2 = max(0,100,200)
```

```js
let large = Math.max(0, 100);
let largest1 = Math.max(0, 100, 200);

// applyを利用して第2引数の配列を展開
let largest2 = Math.max.apply(null, [0, 100, 200]);

// スプレッド構文を利用する
let largest3 = Math.max(...[0, 100, 200]);
```

`apply()`メソッドに関してよくわからない場合は[MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)を参照してほしい。

### abs

Rustは型まわりが厳密なので多少厳しくなる。

```rust
let n = -100isize.abs();  // 型指定が必要
```

```py
n = abs(-100)
```

```js
let n = Math.abs(-100);
```

### べき乗

Rustでは`pow()`の引数は**必ず**`u32`型なので注意すること（計算結果は元の数値型に準ずる）。

```rust
let n = 10isize.pow(5u32);
assert_eq!(n,100000);
```

```py
n = 10**5
assert n==100000
```

```js
let n = Math.pow(10, 5);
require('assert').equal(n, 100000);
```

## 配列操作

### 先頭・末尾に追加

当然だが、先頭への追加は$O(N)$かかるので、配列ではなくdouble-ended queueを利用することが望ましい。

```rust
let mut vec = vec![2,3];

vec.push(4);
assert_eq!(vec, [2,3,4]);

vec.insert(0,1);
assert_eq!(vec, [1,2,3,4]);
```

```py
vec = [2,3]

vec.append(4)
assert vec==[2,3,4]

vec.insert(0,1)
assert vec==[1,2,3,4]
```

```js
const assert = require('assert');
let vec = [2, 3];

vec.push(4);
assert.deepEqual(vec, [2, 3, 4]);

vec.unshift(1);
assert.deepEqual(vec, [1, 2, 3, 4]);
```

jsで通常の`assert.equal()`は、単にアドレス比較しかしないので、配列の**中身**の等価性を確かめたい場合は`deepEqual()`を利用すること。

### double-ended queue

両端キューは競技プログラミングでは必須だ。BFSで使うため300点クラスの問題でも必要になる。

```rust
use std::collections::VecDeque;
let mut deque1: VecDeque<isize> = VecDeque::new();

// 参照渡しのiter()ではなく値渡しのinto_iter()を使う
let mut deque2: VecDeque<_> = vec![2,3].into_iter().collect();

deque1.push_front(2);
deque1.push_back(3);
deque1.push_back(4);
deque2.push_back(4);
assert_eq!(deque1,deque2);

let a = deque1.pop_front();
let b = deque1.pop_back();

// 取り出した値はOption型なので使用する際はunwrap()が必要
assert_eq!(a,Some(2));
assert_eq!(b,Some(4));
```

```py
from collections import deque
q = deque()
q.appendleft(1)
q.append(2)
q.append(3)
assert q==deque([1,2,3])
a = q.popleft()
b = q.pop()
assert a==1
assert b==3
```

```js
// 標準ライブラリにないっぽいので自前で実装してください
```

### set

重複判定をするために必要。配列では$O(N)$かかるため、これを$O(1)$で行いたいシーンで利用する。

```rust
let mut s = std::collections::HashSet::new();
s.insert(1) // Set {1};
s.insert(1) // Set {1};
s.insert(5) // Set {1, 5};
```

```py
s = set()
s += {1}  # Set {1}
s += {1}  # Set {1}
s += {5}  # Set {1, 5}
```

```js
s = new Set();
s.add(1); // Set {1}
s.add(1); // Set {1}
s.add(5); // Set {1, 5}
```

### dict

```rust
let mut d1 = std::collections::HashMap()::new();

let vec = vec![("a",1),("b",2),("c",3)];
let mut d2:std::collections::HashMap<_,_> = vec.into_iter().collect();
```

```py
d1 = {}
d2 = dict()
```

```js
let d1 = {};
let d2 = new Object();
```

## 文字列操作

### 条件に一致する文字列を抽出する

この[問題](https://atcoder.jp/contests/zone2021/tasks/zone2021_a)で利用したが、Rustだと`matches()`メソッドが使える。便利だ（2021/5/2追記）。

```rust
let s = "x123x456x789x0x".to_string();
assert_eq!("xxxxx",s.matches("x").collect::<String>());
```

## な、長い……

他にも各データ構造のメソッドなどまとめておきたいが、かなり時間がかかりそうなのでひとまず打ち止め。

よく考えたらダイクストラするのにヒープなども必要だったがやむを得ない。

必要になった断面で都度足し加えていくことにする。
