import React from 'react';
import styled from '@emotion/styled';
import {breakpoints} from 'gatsby-theme-apollo-core';
import IconInfo from "./assets/hi-info.svg"
import IconTip from "./assets/hi-tip.svg"
import IconWarn from "./assets/hi-warn.svg"

const HighlightBoxWrapper = styled.div`
  background: #EDEDED;
  display: grid;
  grid-template-columns: 120px auto;
  align-items: center;
  margin: 1.5em 0px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const HighlightBoxIcon = styled.div`
  padding: 20px;
  min-width: 120px;
  min-height: 120px;
  height: 100%;
  align-items: center;
  display: flex;
  img {
    width: 80px;
  }

  ${({ type }) => type==="info" && `
    background: #2F3B59;
  `}

  ${({ type }) => type==="tip" && `
    background: #040D28;
  `}

  ${({ type }) => type==="warn" && `
    background: #ec1d24;
  `}
`;

const HighlightBoxContent = styled.div`
  padding: 20px;

  &::before {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    display: block;
  }

  ${({ type }) => type==="info" && `
    &::before {
      content: "Info!";
      color: #2F3B59;
    }
  `}

  ${({ type }) => type==="tip" && `
    &::before {
      content: "Tip!";
      color: #040D28;
    }
  `}

  ${({ type }) => type==="warn" && `
    &::before {
      content: "Warning!";
      color: #ec1d24;
    }
  `}
`;

const IconImage = ({type}) => {
  let icon=IconInfo; // default

  if (type==="info") icon=IconInfo
  if (type==="tip") icon=IconTip
  if (type==="warn") icon=IconWarn

  return (
    <img src={icon} alt={`${type} icon`} />
  );
}



/*
const Container = styled.div({
  display: 'flex',
  flexShrink: 0,
  width: 240,
  [breakpoints.lg]: {
    width: 'auto',
    marginRight: 0
  },
  [breakpoints.md]: {
    display: 'none'
  }
});
*/

export default function HighlightBox(props) {
  return (
    <HighlightBoxWrapper type={props.type}>
      <HighlightBoxIcon type={props.type}>
        <IconImage type={props.type}/>
      </HighlightBoxIcon>

      <HighlightBoxContent type={props.type}>
        {props.children}
      </HighlightBoxContent>
      
    </HighlightBoxWrapper>
  );
}
