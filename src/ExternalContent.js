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
        this.state = {
            url: props.url,
            lineStart: props.lineStart,
            lineEnd: props.lineEnd,
            codeType: props.codeType,
            content: ""
        }
    }

    componentDidMount() {
        const { url, lineStart, lineEnd } = this.state;
        this.loadData(url, lineStart, lineEnd);
    }

    loadData = (url, lineStart, lineEnd) => {
        return fetch(url)
            .then(function (response) {
                return response.text();
            })
            .then(function (data) {
                this.setState({
                    content: data.slice(lineStart - 1, lineEnd).join('\n')
                });
                //Prism.highlightAll();
            }.bind(this))
            .catch(function (err) {
                console.error("Error loading url: ", url, err.stack);
            });
    }

    render() {
        return (
            <pre>
                <code className='{this.state.codeType}'>
                    {this.state.content}
                </code>
            </pre>
        )
    }
}

//<div dangerouslySetInnerHTML={{__html: this.state.content}}/>
