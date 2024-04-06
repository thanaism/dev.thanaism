---
layout: post
title: dcを習得するためにMacへ最新版をインストール
image: ../../img/header/2021/07/ae7e76b0.jpg
author: [Thanai]
date: 2021-07-25T14:00:00.000+09:00
draft: false
tags:
  - dc
  - programming
excerpt: 最新版パッケージが2017年なのに驚く
---

## dc知らないで許されるのは小学生までだよね

恥ずかしながら、かくいう私も28歳になるまでdcなどてんで聞いたこともなかった。

さすればdcについて説明する流れに思えるが、世の中には何においても先駆者がいるものだ。

[とても良い記事][1]がZennにあるのでまずは読んできてほしい。

[1]: https://zenn.dev/cympfh/books/programming-dc

## dc = desk calculator

英語版のWikipediaにある[dcのページ][2]を見ると、dcは`desk calculator`の略だということがわかる。

[2]: https://en.wikipedia.org/wiki/Dc_(computer_program)

めっちゃ簡単に言えば**スタックを基本とした逆ポーランド記法の計算機**だ。使い方は先に紹介した記事にある。

## 最新版のインストール

dcはMacにも最初から入っているが、バージョンが1.3なので少々古い。

古くからあるプログラムなので最新版でなくてもよいかと思いきや、最新版が2017年であることに驚く。しかも、バグ取りだけでなく機能追加までされていたりする。

最新パッケージの`NEWS`ファイルを読む限り、1.3から1.4のアップデートにおいて、具体的には以下の変更がある。

> Changes in dc from 1.3 to 1.4:
> Recognize and handle tail recursion.
> Add 'r' and 'R' commands for stack manipulation.
> Finally fix dc to trap interrupts, like the documentation has said it
> should: aborts any executing macros, but does not exit the program.
> Bug fixes.
> Miscellaneous code clean-up.
> Changed to detect directories and generate errors.
> Detects and reports on any output errors; exits non-success.

この中で大事そうなのが`R`コマンドである。冒頭で紹介した記事でも`R`コマンドは使われているし、ここはぜひアップデートしておきたい。

### 最新パッケージのダウンロードとインストール

[このページ][3]からbcの最新版である1.07をダウンロードしてくる（dcはbcのパッケージに含まれる）。

[3]: https://ftp.gnu.org/gnu/bc/

適当なディレクトリに解凍したら、`INSTALL`ファイルに書いてある内容に従う。

具体的には、パッケージの解凍先に移動してから以下のコマンドを打てばよい。

```sh
$ ./configure
$ make
$ make install
```

上記が完了すると`/usr/local/bin`に最新版がインストールされているはずだ。

より詳しいインストールオプションについては、パッケージに同梱の`INSTALL`ファイルを参照してほしい。

## おわりに

ぼちぼちAtCoder Beginner ContestのA問題をdcで解いたりして少しずつ慣れているが、本当にドキュメントが少ない。

しかしdcを使えずしてLinuxをさわっているなんて恥ずかしくて口が裂けても言えないので、ここはしっかり頑張っておく。

**え？dcなんて覚えて何に使えるのかって？**

そりゃコードゴルフすよ。おしまい。
