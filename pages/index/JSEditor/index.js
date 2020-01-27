import React, { Component } from "react";
import PropTypes from "prop-types";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";
import JSPreviewer from "../JSPreviewer";

import css from "./style.css";

export default class JSEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preview: false,
      code: sessionStorage.getItem(this.props.file.name) || this.props.value
    };
    this.saveFile = this.saveFile.bind(this);
    this.togglePreview = this.togglePreview.bind(this);
  }

  togglePreview() {
    this.setState({ preview: true });
  }

  saveFile() {
    sessionStorage.setItem(this.props.file.name, this.state.code);
    this.togglePreview();
  }

  render() {
    return !this.state.preview ? (
      <div className={css.editor}>
        <div className={css.codeEditor}>
          <Editor
            value={this.state.code}
            onValueChange={code => this.setState({ code })}
            highlight={code => highlight(code, languages.js)}
            padding={20}
            style={{
              fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
              Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
              fontSize: 16,
              width: 600,
              border: 5
            }}
          />
        </div>
        <div className={css.buttonContainer}>
          <button className={css.button} onClick={this.togglePreview}>
            Back
          </button>
          <button className={css.button} onClick={this.saveFile}>
            Save
          </button>
        </div>
      </div>
    ) : (
      <JSPreviewer file={this.props.file} value={this.state.value} />
    );
  }
}

JSEditor.propTypes = {
  value: PropTypes.string,
  file: PropTypes.object
};
