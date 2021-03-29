---
layout: post
title: Azure StorageのSASとstored access policy
image: ../../img/hiroko-yoshii-9y7y26C-l4Y-unsplash.jpg
author: [Thanai]
date: 2021-03-29T23:00:00.000Z
draft: false
tags:
  - Azure
excerpt: AZ-500の勉強がてら
---

<!-- prettier-ignore-start -->

## SASってなに

SASは、Azure Storageの共有アクセス署名（**Shared Access Signature**）のこと。

URIの末尾に署名を付与する形。[Docs](https://docs.microsoft.com/ja-jp/rest/api/storageservices/create-account-sas)によれば、以下。

> 署名は、SHA256 アルゴリズムを使用して署名対象文字列とキーを計算した後に、Base 64 エンコードを使用してエンコードした HMAC 値です。

## SASの種類

SASにはいくつか種類がある。

<!-- prettier-ignore-end -->

| SAS                 | auth                | scope           |
| :------------------ | :------------------ | :-------------- |
| service SAS         | storage account key | storage account |
| account SAS         | storage account key | single resource |
| user delegation SAS | Azure AD            | single resource |

<!-- prettier-ignore-start -->

MS的にはAzure ADを利用するユーザー委任SASを使うのがベストプラクティスだとしている。

ただし、ユーザー委任SASは`Azure Blob Storage`あるいは`Azure Data Lake Storage Gen2`のみでサポートされる。

## stored access policy とは

日本語版Docsだと**保存されているアクセスポリシー**というダサい訳語があてられている。

これは、サービスSASをさらに制御するための仕組みだ。

機能提供が開始された当初の[MSの記事](https://azure.microsoft.com/en-us/updates/manage-stored-access-policies-for-storage-accounts-from-within-the-azure-portal/)を見ると、こう書いてある。

> A stored access policy provides additional control over service-level SAS on the server side. Establishing a stored access policy serves to group shared access signatures and to provide additional restrictions for signatures that are bound by the policy. You can use a stored access policy to change the start time, expiry time, or permissions for a signature, or to revoke it after it has been issued.

あとからアクセス許可を変更したりできる的なことが書いてある。

## revoking a stored access policy

[Docs](https://docs.microsoft.com/en-us/rest/api/storageservices/define-stored-access-policy)を見ると、"保存されているアクセスポリシー"をあとから変更するには、すでに適用したポリシーを削除するか、署名された識別子を変更して名前を変更するか、有効期限を過去の値にする、と書かれている。

> To revoke a stored access policy, you can delete it, rename it by changing the signed identifier, or change the expiry time to a value in the past.

## 既定で拒否、明示的な許可のシステム

また、アクセスポリシーは明示的な「許可」のシステムであるので、ポリシーが競合を起こすことはなさそうだ。

つまり、一度発行してしまった許可を取り消すには、**その許可自体を変更する必要がある**。あとから"拒否"のポリシーを追加するような運用はできない。

<!-- prettier-ignore-end -->
