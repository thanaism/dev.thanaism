---
layout: post
title: PySimpleGUIでDrawTextしても何も表示されない問題の解決
image: ../../img/header/2020/09/cb724e49.jpg
author: [Thanai]
date: 2020-09-25T0:00:00.000Z
draft: false
tags:
  - programming
excerpt: PySimpleGUIをmacOSで使用すると文字列が表示されないエラーに関して
redirect_from:
  - /200925_pysimplegui/
  # note: trailing slashes are required
---

## エラーの発端

Python で手早く GUI を作れるライブラリである PySimpleGUI では、さまざまなユースケースを想定した[demo ファイルが準備されている。](https://github.com/PySimpleGUI/PySimpleGUI/tree/master/DemoPrograms)

しかし、こと Graph を使用する demo ファイルにおいて、mac のローカル環境で使用してみても表示されるべき文字が一切表示されないという状況に苦しんだ。

コード自体はおかしくないものだから、`DrawText`を`draw_text`にしたり、本質的でない試行を繰り返してしまった。

## 原因

まず、前提として PySimpleGUI は tkinter という標準モジュールのラッパーである。

macOS の Python で使用される tkinter のバージョンは 8.5 であるが、このバージョンは macOS との相性が悪く、PySimpleGUI に限らず随所で文字が表示されないトラブルを発生させている悪名高きバージョンなのである。

## 対策

tkinter のバージョンを 8.6 にアップデートする。
**ただし、公式でサポートされている手法はない。**

### macOS で tkinter を 8.6 にアップデートする方法

gist に[tkinter8.6 をパッケージした Python3.8.1](https://gist.github.com/iexa/2ac761bfd96ab78988b76c030d54a5b8)のインストールファイルをアップロードしてくれている天才がいるので、その方法に従う。

#### 手順

以下は、すでに homebrew でインストールしてある Python を tkinter8.6 対応の Python3.8.1 に置換するというのが前提である。

- 既存 Python のアンインストール

```bash
brew uninstall python
```

- brew のキャッシュ削除

```bash
brew cleanup
```

- brew のアップデート

```bash
brew update
```

- Python パッケージを brew 配下にダウンロード

```bash
FRMPTH="/usr/local/Homebrew/Library/Taps/homebrew/homebrew-core/Formula/python.rb"; rm $FRMPTH; curl -L -o $FRMPTH https://gist.github.com/iexa/2ac761bfd96ab78988b76c030d54a5b8/raw/python-with-tcl.rb
```

- ダウンロードしたパッケージを使用してインストール

```bash
HOMEBREW_NO_AUTO_UPDATE=1 brew install --build-from-source python
```

- インストール結果の確認（8.6 と出れば成功）

```bash
$ python3 -c "import tkinter;print(tkinter.TkVersion)"
8.6
```

### 付随する問題

上記の方法で Python を再インストールすると、グローバルの pip 自体や、pip に入っているパッケージのインタプリタ設定がバグると思われる。

私の場合はグローバル pip には powerline-status だけを入れていたので、再インストールした。

- シンボリックリンク周りを貼り直す

```bash
$ brew unlink python && brew link python
```

- 下記を打つとインタプリタの設定がバグって pip を更新できない

```bash
$ pip3 install --upgrade pip3
bad interpreter: /usr/local/opt/python@3.8/bin/python3.8: no such file or directory
```

- このように更新する（インタプリタ設定も直る）

```bash
$ python3 -m pip install --upgrade pip
```

## 対策完了

これで、無事すべての問題が解決されたはずだ。

今回は、非常に無駄な時間を過ごしてしまった。このような事故を二度と繰り返してはならない。同じような誰かの助けになれば幸いである。
