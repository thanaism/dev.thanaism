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
      <FacebookShareButton url={url}>
        <FacebookIcon size={50} round />
      </FacebookShareButton>

      <LineShareButton url={url} >
        <LineIcon size={50} round />
      </LineShareButton>

      <LinkedinShareButton url={url} >
        <LinkedinIcon size={50} round />
      </LinkedinShareButton>

      <TwitterShareButton title={title} via="okinawa__noodle" url={url} >
        <TwitterIcon size={50} round />
      </TwitterShareButton>
    </>
  );
};

export default SharingButtons;