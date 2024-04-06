---
layout: post
title: WindowsでIntelliJ IDEAを使うときだけコンソールの色がバグる
image: ../../img/header/2021/11/d016f69a.jpg
author: [Thanai]
date: 2021-11-29T14:00:00.000+09:00
draft: false
tags:
  - java
  - programming
excerpt: コマンドプロンプトが影響を及ぼすなんて思いもしなかった
---

## IntelliJ IDEAって便利ですね

[IntelliJ IDEA][1]をWindowsで使うときだけConsoleの色がバグる。Macではこの問題が起こらない、なぜ。

そういう記事です。

基本的に他の言語を使うときはもっぱらVSCodeでNeovim拡張を入れて使っているのだけど、ことJavaに関しては[以前の記事][2]でも書いた通り[IntelliJ IDEA][1]を使っています。

[1]: https://www.jetbrains.com/ja-jp/idea/
[2]: https://dev.thanaism.com/2021/11/trying-java/

とても便利なんだけど、コンソール（ターミナル？）がバグって困っています。

## コマンドプロンプトの設定が原因

どうもIntelliJのコンソールの背景色は、コマンドプロンプトの設定（レジストリ値）に影響を受けるようです。

以前、なんだかの理由でコマンドプロンプトの背景色を変えていた経緯があり、それが悪さをしていたのが原因でした。

解決策としては、`HKEY_CURRENT_USER\Console`のレジストリをフォルダごと削除します。

これに伴いコマンドプロンプトの見た目に関連する設定がすべてリセットされますが、規定値で何の問題もない、というか、この際まとめて規定値に戻しておきたいので全て消しました。

より削除範囲を限定したい場合は、`HKEY_CURRENT_USER\Console\ScreenColors`のキーのみを削除しても同様の結果になるようです。

## 検索の仕方

今回、しばらくIntelliJ IDEA側の設定をいろいろいじってもどうも直らなくて、途方に暮れていました。

このような見当違いで時間を浪費している場合、解決策そのものよりも、解決に至った手法のほうを記録すべきなんじゃないかと最近思い始めました。

てなわけで、いちおう書いておきます。

困ったときは英語で検索ということで、以下のように検索。

```
intellij console color bug windows
```

すると上のほうに、[ぽい候補][3]がありました。

[3]: https://intellij-support.jetbrains.com/hc/en-us/community/posts/206314599-My-Terminal-tab-has-weird-background-color-Any-ideas-how-to-fix-this

> My Terminal tab has weird background color. Any ideas how ...

この質問エントリの回答に紐づいていた別のエントリを見て解決しました。

[Console colors incorrect -- affected by a Windows registry key][4]

[4]: https://youtrack.jetbrains.com/issue/IDEA-145236

## おわりに

名状できないけどなんかおかしいんだよなー、ということを英語で検索するときは、

- bug
- incorrect
- weird

あたりを今後の候補に入れることにします。
