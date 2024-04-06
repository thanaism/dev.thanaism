---
layout: post
title: Springの@Autowiredでインターフェースを指定するのはなんでなの
image: ../../img/header/2021/11/5ca2587b.jpg
author: [Thanai]
date: 2021-11-29T19:00:00.000+09:00
draft: false
tags:
  - java
  - programming
excerpt: Javaのアノテーションなんもわからん
---

## Spring解体新書

速習系の書籍なので、書籍の通りやればWebアプリケーションは完成します。

完成するんですが、私の性格が災いしており、理解できないところがあるとそのままにできなくて一生進みません。

いま見ている本はセクション名の通り[これ](https://amzn.to/3ldoLcv)です。コンパクトにまとまっていて、手早くSpring Bootに触れるには、いい本であると思います。

<a href="https://www.amazon.co.jp/%E5%BE%8C%E6%82%94%E3%81%97%E3%81%AA%E3%81%84%E3%81%9F%E3%82%81%E3%81%AESpring-Boot-%E5%85%A5%E9%96%80%E6%9B%B8%EF%BC%9ASpring-%E8%A7%A3%E4%BD%93%E6%96%B0%E6%9B%B8%EF%BC%88%E7%AC%AC2%E7%89%88%EF%BC%89-Spring%E8%A7%A3%E4%BD%93%E6%96%B0%E6%9B%B8-ebook/dp/B08XPBPH9C?adgrpid=122732831641&hvadid=506552069182&hvdev=c&hvqmt=e&hvtargid=kwd-819482650989&hydadcr=1790_10144708&jp-ad-ap=0&keywords=spring+%E8%A7%A3%E4%BD%93%E6%96%B0%E6%9B%B8&qid=1638000350&sr=8-1&linkCode=li3&tag=thanaism-22&linkId=83736ba516faf66a744c4beb09dc3bdd&language=ja_JP&ref_=as_li_ss_il" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B08XPBPH9C&Format=_SL250_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=thanaism-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=thanaism-22&language=ja_JP&l=li3&o=9&a=B08XPBPH9C" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

## なぜか`@Autowired`で実装側のクラスでなくインターフェースを指定している

本の中では、Userオブジェクトに対するDB処理を実装するのに（MVCに則り？）層別に管理しています。

上から順番に、

1. ユーザーの`/home`へのリクエストを受け取って、
1. `HomeController`がテンプレートエンジンを呼び出して、
1. `UserService`が表示する`User`に関する操作を受け持ち、
1. `UserDao`は`@Autowired`されたinterfaceとして経由され、
1. `UserDaoJdbcImpl`に実際のDB操作が記述されており、
1. DB(H2)のデータに到達する

みたいな感じです。

Springでは、アノテーションに`@Autowired`をつけるとフレームワークがよしなにインスタンス管理をしてくれます。便利ですね。

このときSpringがやっていることに対する私の理解は、以下です。

1. まずアプリケーションのビルドを開始します。
1. Springのフレームワークがプロジェクト内のソースコードを捜査してアノテーションが付与されている変数やらクラスやらを認知します。
1. メソッド等の呼び出しに応じてSpringがインスタンスの生成・管理を行います。
1. インターフェースが`@Autowired`されている場合、それを実装しているクラスのインスタンスが自動で紐づけられます。

よくわからないのは、**なぜ実装しているクラスではなくインターフェース側に紐づけるか**です。

## 実装しているクラスが単一の場合はわからんでもない

たとえば、今回の書籍の例では`UserService`内に`@Autowired`で規定された`UserDao`インターフェースがあります。

```java
@Service
public class UserService {

    @Autowired
    @Qualifier("UserDaoJdbcImpl2")
    UserDao dao;
 // 以下ではダメなのか
 // UserDaoJdbcImpl2 dao;
```

このとき、`@Qualifier`がない場合はインターフェースを経由するメリットがありそうです。

具体的には、`UserService`のソースを書き換えずに`UserDao`の実装側で内容をコントロールできます。

というのも、そのインターフェースを実装するクラスがひとつだけの場合、Springがそれをよしなに判別してその実装クラスに紐づけてくれるからです。

一方で、`@Qualifier`を付ける場合には`UserService`内に実装側のクラス名が含まれてしまうため、インターフェースを経由していても結局`UserService`側の書き換えが必要になりそうです。

インターフェースを経由することで得られるメリットがピンと来ていません。

## アノテーションの使い分けもよくわからない

`@Component`とか`@Repository`とか、SpringでよしなにDIしてもらうためにアノテーションを付けますが、内容に違いはあるのでしょうか。

GitHubで[Repositoryのソース][1]を見てみましたが、どうやら`@Repository`は`@Component`のエイリアスとなっており、実装内容の違いがなさそうです。

[1]: https://github.com/spring-projects/spring-framework/blob/f88344db03bcc6e40cc434bda00434acb0e8f0c6/spring-context/src/main/java/org/springframework/stereotype/Repository.java

もしそうであれば、DIのためのアノテーションは`@Component`のみを使ってもよいのでしょうか？

私はまだJavaのソースの追い方がよくわかっていないので間違っているのかもしれませんが、このあたりの動作原理とか使う上での思想的な理由付けがいまいち理解できていません。

## もしかしたら

時間がなくて追い切れていないですが、以前に読みかけだった[ドメイン駆動設計入門](https://amzn.to/3E712ly)に思想面での理由付けなどが書かれていた記憶がおぼろげながらあります。

<a href="https://www.amazon.co.jp/%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E9%A7%86%E5%8B%95%E8%A8%AD%E8%A8%88%E5%85%A5%E9%96%80-%E3%83%9C%E3%83%88%E3%83%A0%E3%82%A2%E3%83%83%E3%83%97%E3%81%A7%E3%82%8F%E3%81%8B%E3%82%8B%EF%BC%81%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E9%A7%86%E5%8B%95%E8%A8%AD%E8%A8%88%E3%81%AE%E5%9F%BA%E6%9C%AC-%E6%88%90%E7%80%AC-%E5%85%81%E5%AE%A3-ebook/dp/B082WXZVPC?adgrpid=127999638665&gclid=Cj0KCQiAkZKNBhDiARIsAPsk0Whrr2n1rvC9_NbTr7OX1jEajd0uFeKW8QwDJAxQjZEUONMajPg9ZPUaAppbEALw_wcB&hvadid=553739972583&hvdev=c&hvlocphy=1009060&hvnetw=g&hvqmt=e&hvrand=6749316737183630326&hvtargid=kwd-335163852621&hydadcr=27263_11561109&jp-ad-ap=0&keywords=%E5%AE%9F%E8%B7%B5%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E9%A7%86%E5%8B%95%E8%A8%AD%E8%A8%88&qid=1638181852&s=books&sr=1-4&linkCode=li3&tag=thanaism-22&linkId=8e1b390078aa758635636e63658a606d&language=ja_JP&ref_=as_li_ss_il" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B082WXZVPC&Format=_SL250_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=thanaism-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=thanaism-22&language=ja_JP&l=li3&o=9&a=B082WXZVPC" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

この本自体はC#をメインに紹介されていますが、どっちもSIerがよく使うオブジェクト指向言語という感じなので、いま読めば必要性がより身近に感じられるのかもしれないと思っています。

よくわからなくても、さらっとなめておくと必要な時にアクセスできるインデックスが自分の中にできるので、いま現在の必要性が薄いと感じる範囲でも積極的な学習は怠らないようにしたいな、と感じました。

## いまはお気持ちですが

ちょっとお気持ちだけのオチがない記事ですが、謎が解けたらまた書きます。

もし読者にJavaとかオブジェクト指向に自信ニキの方がいたらTwitterのリプライでもDMでもいいので教えてください。よろしくお願いします。
