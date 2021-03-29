---
layout: post
title: 環境設定の備忘メモ
image: ../../img/muneer-ahmed-ok-oMrqk8Aod1Y-unsplash.jpg
author: [Thanai]
date: 2021-03-26T15:00:00.000Z
draft: false
tags:
  - programming
  - lifehack
excerpt: 毎回探している気がするので
---

<!-- prettier-ignore-start -->

## 環境設定についてまとめておく

どうせ大した回数やらないと思って記録していなかったらわりと痛い目を見たので記録しておく。

## HP製のPC

### バッテリーを80%充電にする

BIOSから`Maximize my battery health`に類する設定を選択する。

### Fキーをfnキー押下なしで使用する

これもBIOSで。`Hotkey`あるいは`Action Key`あたりの名称。

## キーバインド

### USキーボードの使用

`Win`+`S`→`言語の設定`

`優先する言語`の`日本語`を**クリックすると（重要）**`オプション`ボタンが出現する。

### keyhac

Windowsの場合はkeyhacを使用する。keyhac本体リンクは下記READMEへ。

[GitHub](https://github.com/thanaism/fakeymacs)に設定ファイルをUPしてある。

[ChangeKey](https://forest.watch.impress.co.jp/library/software/changekey/)で以下をスワップする。

- CapsLockとRCtrl
- PrintScreenとInsert（Keychron K2にInsertキーがないため）

Vimを使っているとコピペに`Shift/Ctrl`+`Insert`はよく使うので。

`"*p`とかでもいいのだが、妙に慣れないので上記の方がよく使う。もうちょっと使うコマンドを最適化できればいいのだが。

## インストール関係

### aptとapt-get、updateとupgrade

いつもどっちかわからなくなる。

- aptはapt-getの設計上のミスを克服している
- 基本的にaptを使用する
- updateはリストの更新
- upgrageは実際にパッケージを更新

### NeoVim

WSL側は以下で。Win側は[公式インストーラー](https://neovim.io/)で（chocolateyとかscoopにいつまでも手が出ない）。

```bash
sudo apt update && sudo apt install neovim -y
```

### WSL

ちょくちょく変わるので[公式](https://docs.microsoft.com/ja-jp/windows/wsl/install-win10)を見る。

### VSCode拡張

とりあえず明示的に入れるのが必要そうな拡張機能（他のは勝手に入るやろの精神）。

- vscodevim
- VSCode Remote Development
- Markdown Preview Enhanced

vscodevimでNeoVimを有効にする（exコマンドの利用上必須）。

### フォント

[HackGenNerd](https://github.com/yuru7/HackGen)を利用する。Powerline対応。

### Terminal

[Windows Terminal](https://docs.microsoft.com/ja-jp/windows/terminal/get-started)をインストールする。

設定ファイルは以下を最低限に。

```json
"multiLinePasteWarning": false, 

// defaults部分
  "cursorShape": "filledBox",             
                
// WSL部分
"name": "Ubuntu-20.04",
"fontFace": "HackGenNerd",
"fontSize": 13,
```

### Docker Desktop

[公式ページ](https://docs.docker.jp/docker-for-windows/install.html)のインストーラーを利用。

### Powerline

```bash
sudo apt update && sudo apt install python3 -y
pip install powerline-status
```

`.bashrc`に以下を追記。

```bash
# setting for powerline
export PATH="$HOME/.local/bin:$PATH"
export POWERLINE_COMMAND=powerline
export POWERLINE_CONFIG_COMMAND=powerline-config
powerline-daemon -q
POWERLINE_BASH_CONTINUATION=1
POWERLINE_BASH_SELECT=1
. ~/.local/lib/python3.8/site-packages/powerline/bindings/bash/powerline.sh
```

### Git

Macはデフォルトバージョンが古いのでhomebrewで最新版をインストールして、PATHの先頭にインストールパスを追加する。

エイリアスは最低限以下を設定しておく。

```bash
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
```

### MS Docs

自作の拡張機能[MS Docs lang switching extension](https://chrome.google.com/webstore/detail/ms-docs-lang-switching-ex/cnjicflfhpockfnlaapkbclbnfaocpdb?hl=ja&authuser=1)を入れる。

## その他

気付いたら追記していく。

<!-- prettier-ignore-end -->
