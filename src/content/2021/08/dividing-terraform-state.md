---
layout: post
title: Terraformのstate移動とrename
image: ../../img/header/2021/08/e5195f5b.jpg
author: [Thanai]
date: 2021-08-05T19:00:00.000+09:00
draft: false
tags:
  - Terraform
excerpt: Terraformといえばstate管理
---

## Bicepと違ってstate管理必須なTerraform先輩

業務で使うのがもっぱらAzureというのもあって、これまでstate管理のいらないBicep先生をメインで使ってきたわけですが、Terraformから逃げているわけにもいかず最近少しずつ始めています。

こういうのってまずは小規模かつモノリシックにはじめるワケですが、Terraformの場合わりとすぐにDRYにしたくなったり、ライフサイクルの違いなどからスコープを分離したくなったり、といった壁にぶち当たります。

てなわけで、モノリシックなstateを分離する方法を忘れないうちに書くことにしました。

## 参考記事

あまりやりたいことをそのものズバリで書いている記事が見つけられませんでしたが、以下の2記事を参考にしました。

- [Terraformのリソースを別のtfstateファイルに移動する](https://www.karakaram.com/moving-terraform-resources-to-another-tfstate-file/)
- [リモートのtfstateを書き換えずに安全にterraform state mv後のplan差分を確認する手順](https://qiita.com/minamijoyo/items/b4d70787556c83f289e7)

## 今回の説明範囲

これまで同一のstateファイルで管理していたリソース群から、一部だけを別のstateファイルへ切り出す方法について説明します。

下記2通りがありますが、両方とも説明します。

1. ファイルAをファイルA1とファイルA2に分けたいパターン
1. ファイルAの一部をファイルBに移動させたいパターン

また、単純にstateのリソース名を変更したいケースの説明も含みます。

## 手順

### ①stateをリモートからローカルに一時的に変更する

チーム開発でIaCファイルを管理する場合、tfファイルを管理するリポジトリとは別に、秘匿情報の含まれるstateファイルをクラウドストレージに載せてリモートで管理していることがほとんどだと思います。

この場合、リモートのstateはリポジトリのmainに準拠している状態が正となります。

これから実行する切り離し作業によって、まだmainにmergeされていない変更がリモートに影響を及ぼすことを避けるため、まずはstate管理をリモートからローカルへ一時的に変更します。

具体的には、tfファイルのbackend情報をoverrideするのがよいでしょう。

※Terraformでは`*_override.tf`あるいは`override.tf`という名称のファイルは、実行時に[上書き情報として処理される][1]ようになっています。

[1]: https://www.terraform.io/docs/language/files/override.html

また、リモートからローカルへのstate移動は**以下2通りの方法が考えられます**。

#### `-reconfigure`を使用する方法

まず、リモートのstateファイルをpullします。

```sh
terraform state pull > terraform.tfstate
```

その後、backendをリモートからローカルに変更します。
元ファイルを書き換えずに実行するための仕組みが上述のoverride機能です。

```sh
cat << EOF > override.tf
terraform {
  backend "local" {
    path = "terraform.tfstate"
  }
}
EOF
```

override用のファイルが無事に作成出来たら、変更を適用します。

```sh
terraform init -reconfigure
```

上記の`-reconfigure`フラグにより、pullしてきたstateファイルを変更せずにそのまま使う形でinitされます。

#### `-migrate-state`を使用する方法

こちらはpullの作業を自動で実行させる形になります。まず、`override.tf`については上記と同様に作成してください。

その後、リモートのstateをそのまま引き継ぐ形で変更を適用します。

```sh
terraform init -migrate-state
```

その後、プロンプトで実行してよいか聞かれるため、`yes`を入力します。具体的には下記のようなプロンプトです。

```
Initializing the backend...
Backend configuration changed!

Terraform has detected that the configuration specified for the backend
has changed. Terraform will now check for existing state in the backends.


Terraform detected that the backend type changed from "azurerm" to "local".
Do you want to copy existing state to the new backend?
  Pre-existing state was found while migrating the previous "azurerm" backend to the
  newly configured "local" backend. No existing state was found in the newly
  configured "local" backend. Do you want to copy this state to the new "local"
  backend? Enter "yes" to copy and "no" to start with an empty state.

  Enter a value: yes
```

ローカルへの移動が終わったら、`terraform plan`を叩いて、差分が生じていないことを確認しておきましょう。

### ②ローカルのstateファイルから`state mv`する

現在のstateファイルに含まれている管理対象を以下のコマンドで確認できます。

```sh
terraform state list
```

ここから一部のstateを移動します。移動先は仮に`tmp.tfstate`としましょう。

```sh
terraform state mv -state-out=tmp.tfstate \
<target_identifier_before> <target_identifier_after>
```

この際、移動と同時に**対象のidentifierを変更することもできます**。  
変更しない場合は、`<target_identifier_before>`と`<target_identifier_after>`を同一にしてください。

また、stateの移動はさせずに同一ファイル内で単にrenameしたい場合は、`-state-out=tmp.tfstate`を外して実行します。

※対象のidentifierを変更した場合は、tfファイルから対応するリソースの識別名を変更するのを忘れないでください。

例）
旧：`resource "azurerm_application_gateway" "appgw-old" {`
新：`resource "azurerm_application_gateway" "appgw-new" {`

#### ファイルAをファイルA1とファイルA2に分けたいパターン

stateの移動に関しては、この時点で終わりです。

stateが期待通り移動していることを`terraform state list`で確認しておくのがよいでしょう。

#### ファイルAの一部をファイルBに移動させたいパターン

すでに紹介した手順の通りにファイルBのstateをリモートからローカルに移動してください。

次に、作成した`tmp.tfstate`からファイルBの`terraform.tfstate`へ再度stateを移動します。

```sh
terraform state mv -state=tmp.tfstate -state-out=terraform.tfstate \
<target_identifier_before> <target_identifier_after>
```

### ③変更をリモートに反映する

tfコードの変更がmainブランチにマージされたら、リモートのstateにも変更を反映します。

まず、`override.tf`を削除します。

```sh
rm override.tf
```

その後、backendをリモートに再変更します。

```sh
terraform init -migrate-state
```

#### 参考

以下の方法は**推奨されません**が、手動介入が必要になった場合に使用できます。  
`-migrate-state`を使わずに実行する方法になります。

その場合は、まず元のリモートにあるstateを参照している状態に戻します。

```sh
terraform init -reconfigure
```

その後、ローカルのstateをpushします。

```sh
terraform state push terraform.tfstate
```

エラーチェックで弾かれる場合、`--force`フラグを使用できますが、非推奨です。

```sh
terraform state push --force terraform.tfstate
```

### ④編集したtfファイルを用いて差分を確認する

stateファイルの移動が終わったら、tfファイル側を編集して`terraform plan`します。

想定通りstateの移動とtfファイルの編集ができていれば差分は発生しません。

## おわりに

以上でstateの移動についての説明は終わりです。
