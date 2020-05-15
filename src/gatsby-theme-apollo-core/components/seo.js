import PropTypes from 'prop-types';
import React from 'react';
import {Helmet} from 'react-helmet';

export default function SEO(props) {
  const {title, description, siteName, twitterCard, children, favicon} = props;
  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:description" content={description} />
      <meta name="twitter:card" content="https://www.r3.com/wp-content/uploads/2019/08/R3_Master-Logo-White.jpg" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <link rel="icon" href={favicon} />
      {children}
    </Helmet>
  );
}

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  siteName: PropTypes.string.isRequired,
  twitterCard: PropTypes.string,
  children: PropTypes.node,
  favicon: PropTypes.string
};

SEO.defaultProps = {
  twitterCard: 'summary',
  favicon: 'https://docs.corda.net/images/favicon.ico'
};
