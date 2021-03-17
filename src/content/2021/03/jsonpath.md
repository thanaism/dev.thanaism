---
layout: post
title: JSONPathとJMESPathとjq
image: ../../img/david-clode-KMrYZp6ismc-unsplash.jpg
author: [Thanai]
date: 2021-03-15T17:00:00.000Z
draft: true
tags:
  - programming
  - Kubernetes
excerpt: とりあえずこの3つを全部使いこなせたらかっこよくね？
---

<!-- prettier-ignore-start -->

## jsonパーサー多すぎ問題

インフラとかクラウドやってるとコマンドでjsonをチョキチョキする機会はそれなりに多いと思うのだけど、ツールによって組み込みのパーサーが違うっていう問題がある。

たとえばAzure CLIだと`JMESPath`で、これはPython書く人にとってはわりと分かりやすくて好き。

一般的にはbash環境なら、`jq`がデファクトな印象を受ける。

ただ、jqはたとえば[このページ](https://www.techscore.com/blog/2019/09/30/jq-%E3%81%A8-jmespath-%E3%82%92%E5%90%8C%E6%99%82%E3%81%AB%E8%A6%9A%E3%81%88%E3%82%8B/)とかでも言及されてるけど、インストールが必要なので環境によっては使えなかったりする問題がある。



<!-- prettier-ignore-end -->
