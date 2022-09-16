---
layout: post
title: ステーキング対応のトークンをつくる
image: ../../img/alexandre-debieve-FO7JIlwjOtU-unsplash.jpg
author: [Thanai]
date: 2022-09-16T02:00:00.000+09:00
draft: false
tags:
  - solidity
  - programming
excerpt: 普通のERC20とERC721にちょっと細工をする
---

# FTが貯まるステーキングNFTを作りたい

そんな要望をAbyssCryptoの代表[なおきち](https://twitter.com/naokichipocket)からもらった。  
ちなみにAbyssCryptoというのは私がエンジニアとして手伝っている水産業を振興するNFTプロジェクトだ。

ステーキング、つまりNFTを保有し続けるとそれに応じてFT（通貨）が貯まる設計にしたい。

これには大きく2つほど実現手段が考えられると思う。

1. サーバーを立て、定期処理でNFTの所有者情報を取得し、運営者がNFTの各保有者にFTをTransferする
2. コントラクトで動的に残高を変動させられるようにする

1つ目のやり方は、コントラクトを変更しなくても対応可能だが、定期的に発生するガス代をすべて運営者が負担する必要がある。
テストネットならこれでもいいが、メインネットへのデプロイを考えているなら現実的ではない。

2つ目のやり方はこれから紹介するやり方だ。
コードは[GitHubにUPしている](https://github.com/thanaism/solidity-ideas)ので、見たい方は参考にしてほしい。

# 設計の概要

最終目標としてFT（ERC20）の`totalSupply()`と`balanceOf()`が動的な値を返せばよい。

まず、`balanceOf()`のほうから考えていこう。

## balanceOfの前提条件

大前提となるのは、  
`ステーキングによる蓄積額`＝`最後にNFTがTransferされてからの経過日数`✕`1日あたりの蓄積額`  
である。

したがって、FTコントラクトが`各トークンの最終Transfer日時`および`各ユーザーが所有するNFTの全tokenId`を知れる必要がある。

これらの情報を得るには、通常ならコントラクトの`Transfer`イベントを調べる必要があり、これは他のコントラクトから直接知ることができない。

これを理解するには、スマートコントラクトの取引情報の保存先がstorageとeventの2通りあることを知っている必要がある。

**storageは他のコントラクトから直接取得することができ、eventはできない。**
ただし、eventは保存にかかるガス代がstorageに比べて圧倒的に安い。

そのため、他のコントラクトから利用する予定のない取引情報はeventに保存するのが通常である。
ERC721のような標準規格は、必要なら自分で拡張することが前提のため、当然、最低限のstorageしか使っていない。

たとえば、ERC721には`ownerOf()`があり、**トークンIDから所有者**を調べることができるが、**所有者からトークンID**は直接調べることができない。
内部実装としてはtokenIdからownerを引けるハッシュマップ`mapping(uint256 => address)`を持っている。

今回のケースでは追加で、ownerからtokenId[]を引けるハッシュマップ`mapping(address => uint256[])`を持つことになる。

また、最終Transfer日時の保存用に`mapping(uint256 => uint256)`も必要になる。

## balanceOfの実装

実装はシンプルだ。ユーザーの所有する全トークンに対して、ステーキング額を積算する処理を実装すればよい。

```sol
function balanceOf(address account) public view virtual override returns (uint256) {
    uint256 alpha = 0;
    // 対象ユーザーの所有する全トークンを取得する
    uint256[] memory tokens = IStakingNFT(nft).getUserTokens(account);
    for (uint256 i = 0; i < tokens.length; i++) {
        // 各トークンが最後にTransferされた日時を取得する
        uint256 lastTransfer = IStakingNFT(nft).lastTransfer(tokens[i]);
        // ステーキング額を計算し、積算する
        uint256 duration = (block.timestamp - lastTransfer) / (1 days);
        alpha += duration * daily;
    }
    // ERC20本来のbalanceにステーキング積算額と調整用（※）の値を差し引きして返す
    return _balances[account] + alpha - adjustment[account];
}
```

ここで、最後のretrunに`adjustment[account]`が差し引かれていることに注目したい。

FTのTransferが行われた際に整合性を取るために存在している。

`balanceOf()`で計算しているステーキング額`alpha`は、コントラクトのストレージに記録されていない値である。

したがって、ステーキングのみで100ETHを貯めたユーザーが他のユーザーに50ETHをTransferしようとすると、残高不足となる。
ERC20本来の残高である`_balances[account]`は0のままなので、単純に引くと残高がマイナスになってしまうのだ。

Solidityの整数はuintであり負の値を許容しないので、Transferによりマイナス側に**はみ出た値**を別の場所に記録しておく必要がある。
そのためのmappingが`adjustment`となる。

この`adjustment`の具体的計算は以下のようになる。

```sol
if (_balances[from] <= amount) {
    /*
      Transferするamountがbalanceを超過する場合（マイナスが発生する場合）に
      超過する分をadjustmentに記録しておく
    */
    adjustment[from] += amount - _balances[from];
    _balances[from] = 0;
} else {
    _balances[from] -= amount;
}
_balances[to] += amount;
```

burnの処理でも同様に`adjustment`に記録すればよい。
場合によっては、`adjustment`が膨れ上がってオーバーフローしないように、`adjustment`をうまく消し込む対策も必要かもしれない。
今回の実装では`uint256`を使い切ることはそうそう発生しないと考えてガス代削減のためにもその処理は割愛した。

## ステーキング後にNFTをTransferする場合の対策

ここまで、**現在所有するNFTに対しての**ステーキングに応じて動的にbalanceを返却するロジックを実装した。

しかし、このままだと**過去に所有していたNFT**のステーキングが消し飛ぶ問題がある。

そこで、NFTがTransferされたタイミングで、それまでのステーキング額を`_balances[account]`に足して永続化することを考える。


具体的には、以下のようなメソッドをFT側に実装し、NFT側の`_beforeTokenTransfer`内で呼び出してやればよい。

```sol
function preserveStaking(address account) external onlyOwner {
    require(account != address(0), 'ERC20: mint to the zero address');
    uint256 amount = _alpha(account);
    unchecked {
        _balances[account] += amount;
    }
}
```

ここで、`_mint()`関数を使用していないのは、`_mint()`だと`_totalSupply`も同時に変動してしまうからである。
動的だったステーキング額を永続化するだけで、総量は変化しないことに注意する必要がある。

以上で、`balanceOf()`の骨子は説明できた。細部の実装はGitHubの`contracts/StakingV2.sol`を参照してほしい。

## totalSupply

さて、`balanceOf`の骨子が説明できたので、`totalSupply`についても説明しておく。

処理としてはほとんど`balanceOf`と同じになる。
異なるのはユーザー単位ではなく、NFTコレクション全体のステーキング額を計算すればよい点だ。

そのため、NFTコントラクト側には`今発行している全tokenIdのリスト`を保持しておく必要がある。

```sol
function totalSupply() public view virtual override returns (uint256) {
    uint256 alpha = 0;
    // NFTコレクション内の全tokenIdのリストを取得する
    uint256[] memory tokenIds = IStakingNFT(nft).getTokenIds();
    // 以下、balanceOfと同様
    for (uint256 i = 0; i < tokenIds.length; i++) {
        uint256 duration = (block.timestamp - IStakingNFT(nft).firstTransfer(tokenIds[i])) /
            (1 days);
        alpha += duration * daily;
    }
    return _totalSupply + alpha - totalSupplyAdjustment;
}
```

`totalSupplyAdjustment`は`burn()`が走ったときに`adjustment`と同様の理由で必要になる。

# 全tokenIdのリストがあれば各ユーザーのtokenIdのリストは不要なのでは？

かかるガス代の定量的な比較はしていないのだが、`全tokenIdのリスト`と`ownerOf()`を組み合わせれば、
`各ユーザーが所持するtokenIdのリスト`は生成可能である。

GitHubリポジトリにある`StakingV2.sol`ではその実装を行っていないが、本番デプロイをするなら比較検討する価値はあるだろう。

# 追記予定

おそらく今回のステーキング対応セットについては、テストネット版リリース等を経て、これから実際に使っていくことになると思うので、
なにかしら続報があれば追記することとしたい。