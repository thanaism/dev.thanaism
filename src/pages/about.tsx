import React from 'react';
import { Helmet } from 'react-helmet';

import { css } from '@emotion/core';

import { Footer } from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import { PostFullContent } from '../components/PostContent';
import { Wrapper } from '../components/Wrapper';
import IndexLayout from '../layouts';
import {
  inner,
  outer,
  SiteArchiveHeader,
  SiteHeader,
  SiteMain,
  SiteNavMain,
} from '../styles/shared';
import { NoImage, PostFull, PostFullHeader, PostFullTitle } from '../templates/post';
import { colors } from '../styles/colors';

const PageTemplate = css`
  .site-main {
    margin-top: 64px;
    padding-bottom: 4vw;
    background: #fff;
  }

  @media (prefers-color-scheme: dark) {
    .site-main {
      /* background: var(--darkmode); */
      background: ${colors.darkmode};
    }
  }
`;

const About: React.FC = () => (
  <IndexLayout>
    <Helmet>
      <title>About</title>
    </Helmet>
    <Wrapper css={PageTemplate}>
      <header className="site-archive-header no-image" css={[SiteHeader, SiteArchiveHeader]}>
        <div css={[outer, SiteNavMain]}>
          <div css={inner}>
            <SiteNav isHome={false} />
          </div>
        </div>
      </header>
      <main id="site-main" className="site-main" css={[SiteMain, outer]}>
        <div css={inner}>
          <article className="post page" css={[PostFull, NoImage]}>
            <PostFullHeader className="post-full-header">
              <PostFullTitle className="post-full-title">About</PostFullTitle>
            </PostFullHeader>

            <PostFullContent className="post-full-content">
              <div className="post-content">
                <h2>WordPressブログから移行しました</h2>
                <p>
                  記事の移行はしていませんが、以前のブログは
                  <a href="https://thanaism.com">thanaism.com</a>に残してあります。
                </p>
                <h2>当ブログについて</h2>
                <p>
                  クラウドエンジニアの<a href="https://twitter.com/okinawa__noodle">タナイ</a>
                  が運営するブログです。<br></br>
                  業務ではAzureがメインですが、趣味の競プロに関する記事が多いかもしれません。
                </p>
                <p>
                  このブログは、ReactベースのSSGであるGatsbyで動いています。<br></br>
                  <a href="https://github.com/thanaism/dev.thanaism">GitHubリポジトリはこちら</a>。
                </p>
                <h2>著者について</h2>
                <p>
                  北海道から東京のIT企業にフルリモートで働くエンジニアです。<br></br>
                  日系大手製造業からクラウドエンジニアに転職しています。
                </p>
                <ul>
                  <li>
                    <a href="https://twitter.com/okinawa__noodle">Twitter</a>
                  </li>
                  <li>
                    <a href="https://note.com/hifu_pong">note</a>
                  </li>
                  <li>
                    <a href="https://github.com/thanaism">GitHub</a>
                  </li>
                  <li>
                    <a href="https://qiita.com/thanai">Qiita</a>
                  </li>
                  <li>
                    <a href="https://zenn.dev/thanai">Zenn</a>
                  </li>
                  <li>
                    <a href="https://techblog.ap-com.co.jp/archive/author/thanaism">
                      会社ブログへの投稿一覧
                    </a>
                  </li>
                </ul>
                <h3>過去のメディア掲載歴・受賞歴など</h3>
                <ul>
                  <li>
                    2021/09/09　
                    <a href="https://qiita.com/official-campaigns/engineer-festa/2021">
                      #Qiitaエンジニアフェスタ
                    </a>{' '}
                    マイクロソフト賞{' '}
                    <a href="https://qiita.com/chomado/items/1218a5070e2844441276#-swa--%E5%84%AA%E7%A7%80%E8%B3%9Ethanai-%E3%81%95%E3%82%93">
                      SWA 優秀賞
                    </a>
                  </li>
                  <li>
                    2021/09/08　
                    <a href="https://mainichi.jp/articles/20210908/ddm/012/020/131000c">
                      毎日新聞 朝刊6面
                    </a>
                  </li>
                  <li>
                    2021/07/08　
                    <a href="https://mainichi.jp/premier/business/articles/20210703/biz/00m/020/022000c">
                      毎日新聞 経済プレミア 電子版
                    </a>
                  </li>
                  <li>
                    2021/01/29　
                    <a href="https://business.nikkei.com/atcl/gen/19/00222/012900005/?P=1">
                      日経ビジネス 電子版
                    </a>
                  </li>
                  <li>
                    2020/11/12　
                    <a href="https://www.nhk.jp/p/nw9/ts/V94JP16WGN/episode/te/3KXZ44MN37/">
                      NHK ニュースウォッチ９
                    </a>
                  </li>
                  <li>
                    2020/11/01　
                    <a href="https://www.nikkei.com/article/DGXMZO65479880W0A021C2000000/">
                      日経マネー 電子版
                    </a>
                  </li>
                  <li>
                    2020/05/22　
                    <a href="https://note.com/lab_lancers/n/nfb037435adbb">
                      #私の新しい働き方
                    </a>{' '}
                    noteコンテスト 優秀賞
                  </li>
                </ul>
                <p>
                  反響のあったツイートなど含め、
                  <a href="https://twitter.com/i/events/1439932140594946053?s=20">
                    こちらのモーメント
                  </a>
                  にもまとまっています。
                </p>
                <h2>商品リンクについて</h2>
                <p>
                  本サイトは、Amazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。
                </p>
              </div>
            </PostFullContent>
          </article>
        </div>
      </main>
      <Footer />
    </Wrapper>
  </IndexLayout>
);

export default About;
