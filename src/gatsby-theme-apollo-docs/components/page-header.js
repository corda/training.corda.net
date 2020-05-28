import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import {colors} from 'gatsby-theme-apollo-core';
import { Helmet } from "react-helmet"

const Heading = styled.h1({
  ':not(:last-child)': {
    marginBottom: 8
  }
});

const Subheading = styled.h3({
  color: colors.text2
});

export default function PageHeader(props) {
  return (
    <div className="header-wrapper">
      <Heading>{props.title}</Heading>
      {props.description && <Subheading>{props.description}</Subheading>}
      <Helmet>
        <meta name="description" content={props.description}/>
      </Helmet>
    </div>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string
};
