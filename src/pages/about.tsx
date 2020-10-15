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
                <h5>
                  My very first attempt using Gatsby
                  <br />
                  from WordPress: <a href="https://thanaism.com">thanaism.com</a>
                </h5>
                <blockquote>
                  「それがお前が<b>“向こう側(WordPress)”</b>で得た力か!」
                  <br />
                  「だが足りない、足りないぞ!!」
                  <br />
                  「お前に足りないものは、それは――」
                  <br />
                  「情熱、思想、理念、頭脳、気品、優雅さ、勤勉さ!」
                  <br />
                  「そして何よりも ―― <b>速 さ が 足 り な い !!</b>」<br />
                </blockquote>
                <p>
                  WordPressはプラグインの更新とか頻繁にあってめんどくさいし、表示も重いです。
                  なんかもうモダンって感じもしません。
                  なによりエディタがちゃんとMarkdownをサポートしていないのが本当にしんどい。
                  何かいいツールはないものかと探していました。
                  そしてついに見つけあてた爆速かつMarkdown対応のGatsbyに引っ越すことにしました。
                  Gatsbyってやつはマジで最高で、とりあえずデプロイするだけなら数分で終えることができます。
                  めっちゃ手軽。
                  WordPressよ、さようならって感じです。
                </p>
                <p>
                  画像とかAmazon商品リンクバナーとかを受け入れるちゃんとした体制がまだ整っていないので、WordPress側の記事はぼちぼち移行していこうと思います。
                </p>
                <p>
                  Gatsbyの機能はまだちゃんと見れていませんが、とにかく<code>.md</code>対応が最高です。
                  vscodeでMarkdownPreview見ながら素早く編集できますし、投稿するのも<code>git push</code>すれば一発で終わります。
                </p>
                <p>
                  そして、独自ドメインにこだわらないなら、完全無料です。
                  私はWordPressで使ってたドメインからサブドメインを切ってきてますが、そのうちこっちがドメインを乗っ取ることになろうかと思います。
                </p>
                <p>
                  <u>
                    本サイトは、Amazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。
                  </u>
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
