import React from "react"
//import Prism from "prismjs";


export default class ExternalContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            url: 'https://raw.githubusercontent.com/corda/samples/release-V4/cordapp-example/workflows-java/src/main/java/com/example/flow/ExampleFlow.java',
            content: ""
        }
    }

    componentDidMount() {
        this.loadData(this.state.url);
    }

    loadData = (url) => {
        fetch(url)
            .then(function (response) {
                return response.text();
            })
            .then(function (data) {
                this.setState({ content: data })
                //Prism.highlightAll();
            }.bind(this))
            .catch(function (err) {
                console.log("Error loading url: ", url, err.stack);
            });
    }

    render() {
        return (
            <pre>
                <code className='java'>
                    {this.state.content}
                </code>
            </pre>
        )
    }
} 

//<div dangerouslySetInnerHTML={{__html: this.state.content}}/>