---
layout: post
title: AzureのIDとアクセスの管理
image: ../../img/rigel-oufkOSyYcXE-unsplash.jpg
author: [Thanai]
date: 2021-03-30T23:00:00.000Z
draft: false
tags:
  - Azure
excerpt: AZ-500での比重が大きそうなので
---

## AZ-500の試験範囲はIDとアクセス管理は30%が占める

[Learn](https://docs.microsoft.com/en-us/learn/certifications/exams/az-500)を見るとAZ-500の試験範囲は下記のように記述がある。

> - IDとアクセスの管理 (30-35%)
> - プラットフォーム保護の実装をする (15-20%)
> - セキュリティ運用を管理する (25-30%)
> - データおよびアプリケーションの保護 (20-25%)

`IDとアクセスの管理`の比重が大きい。つまりここをやればだいたい合格できそう。

## IDとアクセスの管理の範囲

Azure AD Premium P1/P2あたりで出てくる権限・アクセス管理のあたりは、機能が豊富で有料サービスなだけあってMSとしては推しのポイントなのではないか。

Docsをいろいろあさってみると、具体的には以下のような要素があるようだ。

- Multi-Factor Authentication(MFA)
- access review
- conditional access
- Identity Protection
- Privileged Identity Management(PIM)

## さらっと見ただけだと覚えられなさそうなポイント

- アクセスレビューを放置して期限内の処理を怠った場合は[どうなるのか？](https://docs.microsoft.com/ja-jp/azure/active-directory/privileged-identity-management/pim-how-to-start-security-review#upon-completion-settings)
- MFA認証には、`disabled`、`enabled`、`enforced`の3種類があるが[違いはなにか？](https://docs.microsoft.com/ja-jp/azure/active-directory/authentication/howto-mfa-userstates)
- `レガシ認証`の存在を[認知しているか？](https://docs.microsoft.com/ja-jp/azure/active-directory/conditional-access/block-legacy-authentication#legacy-authentication-protocols)
- Identity Protectionを管理するのに必要なAzure ADロールはなにか？
- `Global administrator`と`Security administrator`の違いはなにか？
- PIMにおける`eligible`と`active`の違いはなにか？`justification`とは何を指すのか？

## 追記できたらする

Docsを読んで理解できてないなー、と思ったところがあったら随時追記する運用にしたい。

いったん終わり。
