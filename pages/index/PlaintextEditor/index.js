import React from "react";
import PropTypes from "prop-types";
import css from "./style.css";

export default class PlaintextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      updatedValue:
        sessionStorage.getItem(this.props.file.name) || this.props.value,
      unsavedValue:
        sessionStorage.getItem(this.props.file.name) || this.props.value
    };
    this.saveFile = this.saveFile.bind(this);
  }

  componentDidMount() {
    this.CKEditor = require("@ckeditor/ckeditor5-react");
    this.ClassicEditor = require("@ckeditor/ckeditor5-build-classic");
    this.setState({
      loading: false
    });
  }

  togglePreview() {
    this.setState({});
  }

  saveFile() {
    sessionStorage.setItem(this.props.file.name, this.state.updatedValue);
  }

  render() {
    return this.CKEditor ? (
      <div className={css.editor}>
        <this.CKEditor
          editor={this.ClassicEditor}
          data={sessionStorage.getItem(this.props.file.name)}
          onChange={(event, editor) => {
            const data = editor.getData();
            this.setState({ updatedValue: data });
          }}
        />
        <button className={css.button} onClick={this.saveFile}>
          Save
        </button>
      </div>
    ) : (
      <div className={css.editor}> Loading editor ...</div>
    );
  }
}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  value: PropTypes.string
};
