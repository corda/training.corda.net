import React, { useState, useEffect } from "react";
/*import { graphql, useStaticQuery } from "gatsby";*/
import styled from '@emotion/styled';
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/github";


/**
 * @param props = {
 *     url: {string}
 *     lineStart: {number}, the first line to include. Enumeration starts at 1.
 *     lineEnd: {number}, the last line to include. Enumeration starts at 1.
 *     language: {string}, recognised language name, e.g. "java"
 * }
 */

const ExternalContent = (props) => {
  /*  Taken from the gatsby react hydration sample, we could query github during static build to allow for data/code
      inclusion in the static build. However, as we are only looking for the code at the moment, we are skipping this and
      just put a link to the source as static content (previewSource).
  */

  /*
  const externalData = useStaticQuery(graphql`
    query {
      github {
        repository(name: "gatsby", owner: "gatsbyjs") {
          id
          nameWithOwner
          url
        }
      }
    }
  `)
  */


  const prettyGithubRegex = /github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+\//gm;
  const headSpaceRegex = /^([ ]+)/m;

  const prettyUrl = props.prettyUrl || (props.url
      .replace("raw.githubusercontent.com", "github.com")
      .replace(prettyGithubRegex, (match, p1, p2, offset) => {
          return match + "blob/";
      })
      + "#L" + props.lineStart + "-L" + props.lineEnd);

  const fileName = props.url.split("/").pop();

  const previewSource = `loading source from ${prettyUrl}`;
  const [source, setSource] = useState(previewSource);


  // Helper for stateful update, following the hydration guide https://www.gatsbyjs.org/docs/data-fetching/#fetching-data-at-client-side-runtime
  useEffect(() => {
    fetch(props.url)
      .then(response => response.text())
      .then(resultData => {
        const sourceCropped = resultData
          .split("\n")
          .slice(props.lineStart - 1, props.lineEnd);
        const minHeadSpaceCount = Math.min.apply(Math, sourceCropped
          .map(line => headSpaceRegex.exec(line))
          .map(match => match == null ? 0 : match[1].length));
        const sourceReindented = sourceCropped
          .map(line => line.substring(minHeadSpaceCount))
          .join("\n");

        setSource(sourceReindented);
      })
  }, [headSpaceRegex, props.url, props.lineStart, props.lineEnd])

  const Pre = styled.pre`
    text-align: left;
    margin: 0 0!important;
    padding: 0.5em;
    overflow: scroll;
  `;

  const Line = styled.div`
    display: table-row;
  `;

  const LineNo = styled.span`
    display: table-cell;
    text-align: right;
    padding-right: 1em;
    user-select: none;
    opacity: 0.5;
  `;

  const LineContent = styled.span`
    display: table-cell;
  `;


  const CodeblockWrapper = styled.div`
    border: 1px solid #DEE2E7;
    border-radius: 4px;
    margin-bottom: 1.45rem;
  `;

  const CodeblockHeader = styled.div`
    display: flex;
    border-bottom: 1px solid #DEE2E7;
    padding: 10px;
    -webkit-box-pack: end;
    -webkit-justify-content: flex-end;
    -ms-flex-pack: end;
    justify-content: flex-end;
  `;

  const CodeblockHeaderName = styled.span`
    flex: auto;
  `

  const CodeblockHeaderButton = styled.button`
    background-color: transparent;
    border-radius: 4px;
    border-width: 0;
    color: #424855;
    display: inline-flex;
    justify-content: center;
    height: 28px;
    min-width: 76px;
    padding: 0 12px;
    font-family: 'Source Sans Pro',sans-serif;
    font-size: 13px;
    line-height: 1.54;
    font-weight: 600;
    outline: 0;
    -webkit-text-decoration: none;
    text-decoration: none;
    white-space: nowrap;

    &:hover {
      background-color: #F4F6F8;
      color: #424855;
      cursor: pointer;
    }
  `

  return(
    <CodeblockWrapper>
      <CodeblockHeader>
        <CodeblockHeaderName>{fileName}</CodeblockHeaderName>
        <CodeblockHeaderButton href="{prettyUrl}" onClick={ () => window.open(prettyUrl)}>View code on Github</CodeblockHeaderButton>
      </CodeblockHeader>
      <Highlight {...defaultProps} theme={theme} code={source} language={props.language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Pre className={className} style={style}>
            {tokens.map((line, i) => (
              <Line key={i} {...getLineProps({ line, key: i })}>
                <LineNo>{i + 1}</LineNo>
                <LineContent>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </LineContent>
              </Line>
            ))}
          </Pre>
        )}
      </Highlight>
    </CodeblockWrapper>
  )
}

export default ExternalContent
