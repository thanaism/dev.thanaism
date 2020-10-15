import { graphql, Link, StaticQuery } from 'gatsby';
import React from 'react';
import { css } from '@emotion/core';
import { FixedObject } from 'gatsby-image';

import config from '../../website-config';

interface SiteNavSymbolProps {
  logo?: {
    childImageSharp: {
      fixed: FixedObject;
    };
  };
}

// SiteNavSymbolがサイト左上のロゴ
export const SiteNavSymbol = () => (
  <StaticQuery
    query={graphql`
      query GetSiteSymbol {
        logo: file(relativePath: { eq: "img/thanaism-symbol.png" }) {
          childImageSharp {
            fixed(quality: 100, width: 400) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    // tslint:disable-next-line:react-this-binding-issue
    render={(data: SiteNavSymbolProps) => (
      <Link className="site-nav-logo" css={SiteNavLogoStyles} to="/">
        {data.logo ? (
          <img src={data.logo.childImageSharp.fixed.src} alt={config.title} />
        ) : (
          config.title
        )}
      </Link>
    )}
  />
);

const SiteNavLogoStyles = css`
  position: relative;
  z-index: 100;
  flex-shrink: 0;
  display: inline-block;
  margin-right: 32px;
  padding: 12px 0;
  color: #fff;
  font-size: 1.7rem;
  line-height: 1.8rem;
  font-weight: bold;
  letter-spacing: -0.5px;
  text-transform: none;

  :hover {
    text-decoration: none;
  }

  img {
    display: block;
    width: auto;
    height: 21px;
  }
`;
