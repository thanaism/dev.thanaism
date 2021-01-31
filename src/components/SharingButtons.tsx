import React from 'react';
// import { useStaticQuery, graphql } from 'gatsby';
import { 
  FacebookShareButton, 
  FacebookIcon, 
  LineShareButton, 
  LineIcon,
  LinkedinShareButton, 
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon
} from 'react-share';

export interface SharingButtonsProps {
    title: string;
    url: string;
}

const SharingButtons: React.FC<SharingButtonsProps> = ({ title, url }) => {
  return (
    <>
      <span>You can share this article with </span>
      <FacebookShareButton url={url}>
        <FacebookIcon size={30} round />
      </FacebookShareButton>

      <LineShareButton url={url} >
        <LineIcon size={30} round />
      </LineShareButton>

      <LinkedinShareButton url={url} >
        <LinkedinIcon size={30} round />
      </LinkedinShareButton>

      <TwitterShareButton title={title} via="okinawa__noodle" url={url} >
        <TwitterIcon size={30} round />
      </TwitterShareButton>
    </>
  );
};

export default SharingButtons;