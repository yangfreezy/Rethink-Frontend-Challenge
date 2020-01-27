import React, { Component } from "react";
import PropTypes from "prop-types";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";

export default class JSPreviewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: this.props.value
    };
  }

  render() {
    return (
      <Editor
        value={this.state.code}
        onValueChange={code => this.setState({ code })}
        highlight={code => highlight(code, languages.js)}
        padding={20}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12
        }}
      />
    );
  }
}

JSPreviewer.propTypes = {
  value: PropTypes.string,
  file: PropTypes.object
};
