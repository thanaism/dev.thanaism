---
layout: post
title: Terraform導入で詰まったポイント
image: ../../img/matthew-bennett-YWWgHw4PY24-unsplash.jpg
author: [Thanai]
date: 2021-08-04T23:00:00.000+09:00
draft: true
tags:
  - Terraform
excerpt: Bicepとは勝手が違う
---

## AzureでのIaC

TerraformといえばIaC、IaCといえばInfrastructure as Codeのことだ。

IaCのメリットだとか、そういう語り尽くされた内容については今さら私が述べることもあるまい。

私が業務で使うクラウドはもっぱらAzureだが、AzureでのIaCとなると`az`コマンドにも組み込まれているMSならではのBicepなのか、それともawsなどでも広く使われているマルチプラットフォーム対応のTerraformなのかという問題がある。

Bicepに関しては、しばらく触ってみてそれなりに使えるようになったのだが、デファクトのTerraformを知らないままでは居心地が悪い。しかして今回の導入に至った次第だ。

## 少し触ってみて感じた違い

まず、参照関係の解決が大きく異なるので、よい書き方がガラッと変わる印象をもった。

Bicepの場合、デプロイには`az deployment group create -f file.bicep`のようなコマンドで**単一のBicepファイル**を指定する。

そのため、1つのBicepファイルに参照先をキッチリ記述していく必要がある。

対してTerraformでは、`*.tf`ファイルが含まれるディレクトリ上で`terraform apply`コマンドを叩く。

このとき、ディレクトリ内（サブディレクトリを除く）に含まれる`*.tf`ファイルはデプロイのすべて対象となり、参照関係を明示的に記述するのは外部のstateファイルやmoduleに限る。

そのため、ファイル分割でのボトルネックが異なってくる印象を受けた。

Terraformでは、たとえばAzureなら、resource groupとvirtual networkの定義ファイルは同一ディレクトリ内にあるのならば、気軽に分割できる。

## stateファイルの有無

Terraformにはstateファイルという仕組みがある。

たとえばvirtual networkをデプロイするとする。このとき、virtual networkのresource IDは実際にデプロイするまで確定しない。

stateファイルには
