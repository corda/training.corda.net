import React from "react"
//import Prism from "prismjs";

export default class ExternalContent extends React.Component {
    /**
     * @param props = {
     *     url: {string}
     *     lineStart: {number}, the first line to include. Enumeration starts at 1.
     *     lineEnd: {number}, the last line to include. Enumeration starts at 1.
     *     codeType: {string}, recognised language name, e.g. "java"
     * }
     */
    constructor(props) {
        super(props)
        const prettyGithubRegex = /github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+\//gm;
        const prettyUrl = props.prettyUrl || (props.url
            .replace("raw.githubusercontent.com", "github.com")
            .replace(prettyGithubRegex, (match, p1, p2, offset) => {
                return match + "blob/";
            })
            + "#L" + props.lineStart + "-L" + props.lineEnd);
        this.state = {
            url: props.url,
            prettyUrl: prettyUrl,
            lineStart: props.lineStart,
            lineEnd: props.lineEnd,
            codeType: props.codeType,
            content: ""
        }
    };

    componentDidMount() {
        const { url, lineStart, lineEnd } = this.state;
        this.loadData(url, lineStart, lineEnd);
    };

    loadData = (url, lineStart, lineEnd) => {
        const headSpaceRegex = /^([ ]+)/m;

        return fetch(url)
            .then(function (response) {
                return response.text();
            })
            .then(function (data) {
                const croppedLines = data
                    .split("\n")
                    .slice(lineStart - 1, lineEnd);
                const minHeadSpaceCount = Math.min.apply(Math, croppedLines
                    .map(line => headSpaceRegex.exec(line))
                    .map(match => match == null ? 0 : match[1].length));
                const reindented = croppedLines
                    .map(line => line.substring(minHeadSpaceCount))
                    .join("\n");
                this.setState({
                    content: reindented
                });
                //Prism.highlightAll();
            }.bind(this))
            .catch(function (err) {
                console.error("Error loading url: ", url, err.stack);
            });
    };

    render() {
        return (
            <div>
                <pre>
                    <code className={this.state.codeType}>
                        {this.state.content}
                    </code>
                </pre>
                <a href={this.state.prettyUrl }>View code in situ</a>
            </div>
        );
    };
}

//<div dangerouslySetInnerHTML={{__html: this.state.content}}/>
