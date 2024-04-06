---
layout: post
title: overlayfsをさわってみる
image: ../../img/header/2021/06/4f816246.jpg
author: [Thanai]
date: 2021-06-10T19:00:00.000+09:00
draft: false
tags:
  - docker
excerpt: コンテナを使うだけでなく少しでもいいので中身も理解していく
---

## overlayfsが気になったきっかけ

はてブにノミネートされていた[2021年に今更コンテナ入門した僕の最初の一歩][1]という記事タイトルを見て、よくあるdockerコマンドの使い方を説明するだけの初心者向け記事かと思ったらこれが大間違い。Rustでコンテナランタイムを自作するというハイレベルな内容で腰を抜かした。

[1]: https://zenn.dev/utam0k/articles/74d08c9f556534

その記事の中で紹介されていたのが徳永さんの[イラストでわかるDockerとKubernetes](https://amzn.to/35dnvNX)という本。この本の存在自体は以前から認知していたが、他にもコンテナ入門系の書籍は何冊か読んでいたのでスルーしていた。

まだ読んでいる途中ではあるが、なるほど元記事で言及されているとおり**内部の動く仕組み**に言及されていて素晴らしい本だと感じた。

> この本の素晴らしいところは`Docker`の使い方だけではなく、コンテナの仕組みを説明してくれているところでした。

もう察しはついたと思うが、とどのつまり本の中で`overlayfs`についての言及があったのでそこをちゃんと理解したいと思った次第である。

今回は、書籍より少しだけ詳しく`overlayfs`について調べてみる。

## overlayfsとは

コンテナを使うシーンでは往々にして同一のコンテナを複数立ち上げるということをやる。

コンテナの利点に、1つ1つのコンテナが互いに影響を及ぼさない**隔離性**が挙げられるが、とはいえベースが全く同じ複数のコンテナに対して重複する部分を個別に持っているとダブりが多すぎて効率が悪い。

そのため、複数のディレクトリを多層的に重ね合わせて、差分管理を実現するという対応が取られる。

この差分管理に利用するのがLinuxカーネルのイチ機能である`overlayfs`というわけだ。

## どう差分管理するのか

動かす前にザックリと仕組みを理解しておく。

オーバーレイでは、読み取り専用の下層レイヤーの上に読み書き可能な上層レイヤ―を重ね合わせることができる。

このときの下層レイヤーを`lowerdir`、上層レイヤーを`upperdir`と呼ぶ。つまり、実際には複数のディレクトリを指定して重ね合わせることになる。

動きとしては、下層レイヤーに含まれるファイルに書き込みがあった場合、そのファイルを上層レイヤーにコピーしてから書き込みを行う。ファイルを読み取る際には、上層レイヤーのものを優先するというルールで扱うことで、共通部分は保持したまま差分管理が可能となるわけだ。

このような仕組みを**Copy on Write**、略して**CoW**と呼んでいるらしい。

この他に必要なディレクトリとして`overlayfs`が作業を行うための`workdir`と、`lowerdir`と`upperdir`が重ね合わされた結果として利用するための`merged`がある。

## 実際にコマンドを叩く

`overlayfs`には`mount`コマンドを使う。

```sh
mkdir lower upper work merged
sudo mount -t overlay overlay -o lowerdir=lower,upperdir=upper,workdir=work merged
```

`overlay`を2回書いているのが不思議な感じなので、`man mount`してみる。すると、使い方は`mount -t type device dir`とあり、`overlay`タイプを指定し、`merged`をマウント先として`overlay`をマウントしているということがわかる。

ちなみに、以下のように`:`で連結すれば、`lowerdir`の部分に複数のディレクトリをまとめて下層レイヤーとして指定することもできる。

```sh
mkdir lower1 lower2 upper work merged
sudo mount -t overlay overlay -o lowerdir=lower1:lower2,upperdir=upper,workdir=work merged
```

ちなみに`man mount | grep overlay`すると、以下が返る。上記の使い方と同じだ。

```text
Mount options for overlay
    Since Linux 3.18 the overlay pseudo filesystem implements a union mount for other filesystems.
    An overlay filesystem combines two filesystems - an upper filesystem and a lower filesystem.  When a  name  exists
    filesystem  can  even  be  another overlayfs.  The upper filesystem will normally be writable and if it is it must
    A  read-only  overlay of two read-only filesystems may use any filesystem type.  The options lowerdir and upperdir
          mount -t overlay  overlay  \
```

また、単に`mount`コマンドを打つと現在マウントされているもののリストを得ることができる。`mount | grep overlay`すると先ほどマウントした`merged`を含む行が返ってくるはずだ。

```sh
$ mount | grep overlay
overlay on <YOUR-WORKING-DIR>/merged type overlay (rw,relatime,lowerdir=lower/,upperdir=upper/,workdir=work/)
```

さて、`mount`コマンドを打ったあとの流れは書籍でもほぼ同じ内容で解説されているため割愛してもよいのだが、それもあんまりなので書籍より少し詳しい程度に紹介する。

まず、`mount`コマンドの直後では、共有ファイルへの書き込みがないのでどのフォルダの中身も空である。

```sh
$ ls upper/
$ ls lower/
$ ls merged/
```

結合層である`merged`ディレクトリにファイルを新規作成すると上層レイヤーに`newfile.txt`が見えるようになる。

```sh
$ touch merged/newfile.txt
$ ls upper/
newfile.txt
```

一方で下層レイヤーに変更はない。

```sh
$ ls lower/
```

せっかくなので下層レイヤーに直接ファイルを作成してどうなるかも見てみよう。

```sh
$ echo 'lower' > lower/secondfile.txt
$ ls lower/
secondfile.txt
$ ls merged/
newfile.txt  secondfile.txt
```

下層レイヤーに`secondfile.txt`が作成され、`merged`ディレクトリから透過的に見えているのが分かる。

それでは、`merged`ディレクトリを通して`lower`にある`secondfile.txt`をいじってみよう。

```sh
$ echo 'edit from merged' > merged/secondfile.txt
$ cat merged/secondfile.txt
edit from merged
$ cat lower/secondfile.txt
lower
$ cat upper/secondfile.txt
edit from merged
```

このように下層レイヤーのファイルに変更は加えられず、 上層レイヤーにCoWされていることがわかる。

## アンマウントして終了する

挙動を確認できたところで、最後にマウントを解除してハンズオンを終える。

解除には`umount`コマンドを利用する。

```sh
sudo umount ./merged
```

以上で`overlayfs`の簡単な検証を終わりにする。
