---
layout: post
title: Installing Terraform on WSL and Upgrading
image: ../../img/header/2021/08/50d20199.jpg
author: [Thanai]
date: 2021-08-16T19:00:00.000+09:00
draft: false
tags:
  - Terraform
excerpt:
---

## This article shows you

How to install and upgrade Terraform on WSL2 (Ubuntu 20.04).

The Japanese version is on [the blog][0] of the company I work for.

[0]: https://techblog.ap-com.co.jp/entry/2021/08/17/061558

## Installing Terraform on WSL2

There are two ways to do this: using homebrew or downloading the binaries directly.

If you are using a Mac, you are probably familiar with homebrew.

Unlike apt, it does not require `sudo`.  
(This time, I'll leave the installation of homebrew itself to the official page.

In addition, you can use **tfenv**, which is a package manager for Terraform, or not.

Personally, I recommend using tfenv because Terraform updates quickly.

### When not using tfenv

If you use homebrew, you only need the following command.

```sh
brew install terraform
```

If you want to download the binaries directly, do the following.

`wget` and `unzip` are required, if not, install them.

```sh
sudo apt update && sudo apt upgrade -y
sudo apt install wget unzip
```

Download the binary; the URL is different for each version, so check the [official download page][1] or [release notes][2] and change it accordingly.

[1]: https://www.terraform.io/downloads.html
[2]: https://github.com/hashicorp/terraform/releases

```sh
wget https://releases.hashicorp.com/terraform/1.0.4/terraform_1.0.4_linux_amd64.zip -O terraform.zip
unzip terraform.zip
sudo mv terraform /usr/local/bin
rm terraform.zip
```

### When using tfenv

If you use homebrew, you only need the following command.

```sh
brew install tfenv
tfenv install latest
tfenv use latest
terraform -v
```

If you want to download the binaries directly, do the following.

```sh
git clone https://github.com/tfutils/tfenv.git ~/.tfenv
sudo ln -s ~/.tfenv/bin/* /usr/local/bin
tfenv --version

tfenv install latest
tfenv use latest
terraform -v
```

In the above example, we put the symbolic sync in `/usr/local/bin`, but you can also add `~/.tfenv/bin` to your `PATH`.

## Upgrading Terraform in WSL2

### When not using tfenv

You will need to manually download the latest binary again (if you are using homebrew, you can do a `brew upgrade terraform`).

### When using tfenv

If you want to upgrade to the latest stable version, it is the same as during installation.

```sh
tfenv install latest
tfenv use latest
terraform -v
```

If you want to use the specified version, check the available versions.  
To check an older version, you can use `head -n 20` instead, or remove `| head`.

```sh
tfenv list-remote | head
```

Install the version you are looking for.

```sh
tfenv install 1.0.2
tfenv use 1.0.2
terraform -v
```

You can check the installed version as follows;

```sh
tfenv list
```

## In closing

Have a happy Terraform life!
