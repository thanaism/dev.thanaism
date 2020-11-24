import React from 'react';
// import { useStaticQuery, graphql } from 'gatsby';
import { Facebook, Twitter } from 'react-sharingbuttons';

export interface SharingButtonsProps {
    title: string;
    url: string;
}

const SharingButtons: React.FC<SharingButtonsProps> = ({ title, url }) => {
  return (
    <>
      <Facebook url={url} />
      <Twitter url={url} shareText={title} />
    </>
  );
};

export default SharingButtons;