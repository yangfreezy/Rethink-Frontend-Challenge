import React from "react";
import PropTypes from "prop-types";
import stripHtml from "string-strip-html";

import css from "./style.css";

import PlaintextPreviewer from "../PlaintextPreviewer";

export default class PlaintextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: sessionStorage.getItem(this.props.file.name) || this.props.value,
      preview: false
    };
    this.saveFile = this.saveFile.bind(this);
    this.togglePreview = this.togglePreview.bind(this);
  }

  componentDidMount() {
    this.CKEditor = require("@ckeditor/ckeditor5-react");
    this.ClassicEditor = require("@ckeditor/ckeditor5-build-classic");
  }

  saveFile() {
    sessionStorage.setItem(this.props.file.name, this.state.value);
  }

  togglePreview() {
    this.setState({ preview: true });
  }

  render() {
    return this.CKEditor && !this.state.preview ? (
      <div className={css.editor}>
        <this.CKEditor
          editor={this.ClassicEditor}
          data={sessionStorage.getItem(this.props.file.name)}
          onChange={(event, editor) => {
            const data = editor.getData();
            this.setState({ value: stripHtml(data) });
          }}
        />
        <div className={css.buttonContainer}>
          <button className={css.backButton} onClick={this.togglePreview}>
            Back
          </button>
          <button className={css.button} onClick={this.saveFile}>
            Save
          </button>
        </div>
      </div>
    ) : (
      <PlaintextPreviewer
        file={this.props.file}
        value={stripHtml(this.state.value)}
      />
    );
  }
}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  value: PropTypes.string
};
