---
layout: post
title: Androidのパターンロックが何通り存在するのかを求めるプログラム
image: ../../img/lucas-favre-ylE8yffKxk8-unsplash.jpg
author: [Thanai]
date: 2021-11-02T19:00:00.000+09:00
draft: false
tags:
  - programming
excerpt: 共線性の判定には外積を使おう
---

## Androidのパターンロック

パターンロックがどういうもので、どういうルールに則っているかは[このページ](http://www.3s-sys.co.jp/blog/2017/04/19/1239/)を参考にしてください。

上記ページでパターンが何通りあるかは記載されていますが、コードは汚いので未公開ということになっており、せっかくなので私も作って公開しようと思いました。

やることは、言ってしまえば、3x3の点の中から4点以上を結んでロック用のパターンを作るだけです。

だけなんです、が。

ここで気を付けるべきなのは、**未使用の点を追い越して次の点に結ぶことはできません**。なぜなら未使用の点を追い越すことは、その点を通過する（＝使用する）ことになるからです。

そんなわけで、実現不可能なパターンを含めて3x3の9点をどの順番に結ぶかなので、高々$9!$通りを調べれば済みます。

$9!=362880$しかないので、各パターンが実現可能かを高速に調べることができれば計算時間は2秒以内に収まりそうです
（競技プログラミングをやっていると、計算量オーダーからおおむねの実行時間を見積もることができるようになっていいですね）。

## 実装のポイント

要するに、**追い越しが発生するか**がイイ感じに判定できればよいです。

3x3のグリッドであれば、追い越しが発生しうるラインがタテ・ヨコ・ナナメの3パターン11本にとどまるので根性の実装をすればよいです。

が、それではダサいので一般化します。

### 共線性の判定

3点が同一直線状にあるかを調べる、つまり**共線性**(collinearity)の判定をしたいです。

共線性の判定には**外積**を使用します。

具体的には、3つの点、$A, B, C$において、$\vec{AB}\times\vec{BC}=0$であればよいです。

### 追い越しの判定

さらに付け加えるなら、今回は単なる共線条件だけでなく追い越しかどうかも判定が必要です。

つまり、3点の位置関係を調べたくなります。共線条件を満たしているなら、$B$が$A$と$C$の間に位置するには下記の2条件を満たせばよいでしょう。

- $|\vec{AC}|\gt|\vec{BC}|$
- $|\vec{AC}|\gt|\vec{AB}|$

これは、挟む側の2端点がなす長さのほうが、間に挟まる点と端点がなす長さよりも大きいということを言っているだけです。

### 競プロでも使えそう

ちょっと前のABCの[C問題][1]でこのあたりの知識が使えそうなものがありました。

[1]: https://atcoder.jp/contests/abc224/tasks/abc224_c

逆にこれは共線条件を《満たさない》ものを数える問題でした。

## 実際の実装

一応3x3以外にも適用可能なように拡張していますが、順列全探索なので容易に計算量が爆発します。

```py
from itertools import permutations


class Grid:

    def __init__(self, row_size, col_size):
        self.row_size = row_size
        self.col_size = col_size
        self.calc_between()

    def calc_between(self):
        """2点(i,j)を結ぶ直線状にある点(k)をリスト化する"""
        n = self.row_size * self.col_size
        self.between = [[[] for _ in range(n)] for _ in range(n)]
        for k in range(n):
            for i in range(n):
                for j in range(n):
                    if k == i or k == j:
                        continue
                    if self.is_between(k, i, j):
                        self.between[i][j].append(k)

    def to_pos(self, i):
        """インデックスを座標に直す"""
        return (i // self.col_size, i % self.col_size)

    def is_between(self, k, i, j):
        """点(k)が点(i,j)の間にあるかを返す：インデックス渡し"""
        a, b, c = map(self.to_pos, (i, j, k))
        return (
            Grid.squared_distance(a, b) > Grid.squared_distance(a, c)
            and Grid.squared_distance(a, b) > Grid.squared_distance(b, c)
            and Grid.is_collinear(a, b, c)
        )

    def squared_distance(a, b):
        """2点間の距離の2乗を返す：座標渡し"""
        return (b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2

    def is_collinear(a, b, c):
        """3点が同一直線状にあるかを返す：座標渡し"""
        return (a[0] - b[0]) * (c[1] - b[1]) - (a[1] - b[1]) * (c[0] - b[0]) == 0


def main():
    # 条件を標準入力から受け取り
    row_size, col_size, pattern_length = map(int, input().split())

    n = row_size * col_size
    g = Grid(row_size, col_size)
    ans = 0

    for p in permutations(range(n), pattern_length):
        used = [False] * n
        ok = True
        for i in range(pattern_length - 1):
            pre = p[i]
            nxt = p[i + 1]
            for mid in g.between[pre][nxt]:
                if not used[mid]:
                    ok = False
            if not ok:
                break
            used[pre] = True
        if ok:
            ans += 1

    print(ans)

if __name__=='__main__':
    main()
```

## おわりに

もっとエレガントに実装できるぞ！とかあれば[Twitter](https://twitter.com/okinawa__noodle)でﾌﾟｷﾞｬｰしてもらえると幸いです。
