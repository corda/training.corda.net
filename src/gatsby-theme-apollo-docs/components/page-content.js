import PropTypes from 'prop-types';
import React, {useRef, useState} from 'react';
import SectionNav from './section-nav';
import styled from '@emotion/styled';
import useMount from 'react-use/lib/useMount';
import {HEADER_HEIGHT} from 'gatsby-theme-apollo-docs/src/utils';
import {ReactComponent as SlackLogo} from '../assets/slack.svg';
import {ReactComponent as IconSupportSVG} from "../../assets/ic-support.svg";
import {PageNav, breakpoints, colors} from 'gatsby-theme-apollo-core';
import {withPrefix, useStaticQuery} from 'gatsby';
import FeedbackBox from '../../FeedbackBox'
import {ReactComponent as IconClockSVG} from "../../assets/fa-clock-light.svg";
import { graphql } from 'gatsby';

const Wrapper = styled.div({
  display: 'flex',
  alignItems: 'flex-start'
});

const InnerWrapper = styled.div({
  flexGrow: 1,
  width: 0
});

const BodyContent = styled.div({
  // style all anchors with an href and no prior classes
  // this helps avoid anchors with names and styled buttons
  'a[href]:not([class])': {
    color: colors.primary,
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline'
    },
    code: {
      color: 'inherit'
    }
  },
  [['h1', 'h2', 'h3', 'h4', 'h5', 'h6']]: {
    ':not(:hover) a svg': {
      visibility: 'hidden'
    },
    code: {
      whiteSpace: 'normal'
    },
    'a.anchor': {
      ':hover': {
        opacity: colors.hoverOpacity
      },
      svg: {
        fill: colors.primary
      },
      '&.before': {
        top: 'auto'
      }
    }
  },
  '*:not(style) +': {
    [['h2', 'h3', 'h4']]: {
      marginTop: 56
    }
  },
  img: {
    display: 'block',
    maxWidth: '100%',
    margin: '0 auto'
  },
  '.mermaid svg': {
    maxWidth: '100%'
  }
});

const Aside = styled.aside({
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  width: 240,
  maxHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
  marginTop: -36,
  padding: '40px 0',
  marginLeft: 40,
  position: 'sticky',
  top: HEADER_HEIGHT,
  [breakpoints.lg]: {
    display: 'none'
  },
  [breakpoints.md]: {
    display: 'block'
  },
  [breakpoints.sm]: {
    display: 'none'
  }
});

const AsideHeading = styled.h4({
  fontWeight: 600
});

const AsideLinkWrapper = styled.h5({
  display: 'flex',
  marginBottom: 0,
  ':not(:last-child)': {
    marginBottom: 16
  }
});

const AsideLinkInner = styled.a({
  display: 'flex',
  alignItems: 'center',
  color: colors.text2,
  textDecoration: 'none',
  ':hover': {
    color: colors.text3
  },
  svg: {
    width: 20,
    height: 20,
    marginRight: 6,
    fill: 'currentColor'
  }
});

function AsideLink(props) {
  return (
    <AsideLinkWrapper>
      <AsideLinkInner target="_blank" rel="noopener noreferrer" {...props} />
    </AsideLinkWrapper>
  );
}

const EditLink = styled.div({
  display: 'none',
  marginTop: 48,
  justifyContent: 'flex-end',
  [breakpoints.lg]: {
    display: 'flex'
  },
  [breakpoints.md]: {
    display: 'none'
  },
  [breakpoints.sm]: {
    display: 'flex',
    marginTop: 24
  }
});

const SVGIconWrapper = styled.div`
  width: 20px;
  margin-right: 6px;
`

const SVGIconWrapper2 = styled.div`
  width: 20px;
  margin-right: 12px;
`

const IconSupport = () => {
  return (
    <SVGIconWrapper>
      <IconSupportSVG/>
    </SVGIconWrapper>
  )
}

const TopInfoBar = styled.div`
  display: inline-flex;
  margin-bottom: 20px;
`

export default function PageContent(props, {data} ) {
  const contentRef = useRef(null);
  const [imagesToLoad, setImagesToLoad] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  // fetch extra data (readingtime). This is a bit hacky:
  // We are using a static query to get a list of all reading times (build time!), to then filter down to the reading time we are actually looking for. This will run once for each page (potential build slowdown)! The field is being added by the "gatsby-remark-reading-time" plugin.
  // Since the only field passed by the template to identify the page by it's path is the githubURL, we use this as identifier.
  const extraData = useStaticQuery(
    graphql`
      {
        allFile {
          nodes {
            relativePath
            childMdx {
              fields {
                readingTime {
                  minutes
                }
              }
            }
          }
        }
      }
    `
  );

  // We might see an error on readme.md and other .md files, hence we try
  const readingTime = () => {
    try {
      return extraData.allFile.nodes.filter(node => "https://github.com/corda/training.corda.net/tree/master/docs/content/" + node.relativePath == props.githubUrl)[0].childMdx.fields.readingTime.minutes;
    } catch (error) {
      if (props.pathname != "/readme/") {    
        console.log("warn: error mapping extraData for " + props.pathname +":");
        console.log(error);
      }
      return 0;
    }
  }
  


  useMount(() => {
    if (props.hash) {
      // turn numbers at the beginning of the hash to unicode
      // see https://stackoverflow.com/a/20306237/8190832
      const hash = props.hash.toLowerCase().replace(/^#(\d)/, '#\\3$1 ');
      try {
        const hashElement = contentRef.current.querySelector(hash);
        if (hashElement) {
          hashElement.scrollIntoView();
        }
      } catch (error) {
        // let errors pass
      }
    }

    let toLoad = 0;
    const images = contentRef.current.querySelectorAll('img');
    images.forEach(image => {
      if (!image.complete) {
        image.addEventListener('load', handleImageLoad);
        toLoad++;
      }
    });

    setImagesToLoad(toLoad);
  });

  function handleImageLoad() {
    setImagesLoaded(prevImagesLoaded => prevImagesLoaded + 1);
  }

  const pageIndex = props.pages.findIndex(page => {
    const prefixedPath = withPrefix(page.path);
    return (
      prefixedPath === props.pathname ||
      prefixedPath.replace(/\/$/, '') === props.pathname
    );
  });

  const slackLink = (
    <AsideLink href="https://slack.corda.net/">
      <SlackLogo /> Discuss on Slack
    </AsideLink>
  );

  return (
    <Wrapper>
      <InnerWrapper>
        <BodyContent ref={contentRef} className="content-wrapper">
          <TopInfoBar>
            <SVGIconWrapper2>
              <IconClockSVG/>
            </SVGIconWrapper2>
            Reading Time: {Math.ceil(readingTime())} min
          </TopInfoBar>
          {props.children}
        </BodyContent>
        <EditLink>{slackLink}</EditLink>

        <PageNav
          prevPage={props.pages[pageIndex - 1]}
          nextPage={props.pages[pageIndex + 1]}
        />
        <FeedbackBox/>
      </InnerWrapper>
      <Aside>
        <AsideHeading>{props.title}</AsideHeading>
        {props.headings.length > 0 && (
          <SectionNav
            headings={props.headings}
            contentRef={contentRef}
            imagesLoaded={imagesLoaded === imagesToLoad}
          />
        )}
        {slackLink}
      </Aside>
    </Wrapper>
  );
}

PageContent.propTypes = {
  children: PropTypes.node.isRequired,
  pathname: PropTypes.string.isRequired,
  githubUrl: PropTypes.string,
  pages: PropTypes.array.isRequired,
  hash: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  graphManagerUrl: PropTypes.string.isRequired,
  headings: PropTypes.array.isRequired,
  spectrumUrl: PropTypes.string
};
