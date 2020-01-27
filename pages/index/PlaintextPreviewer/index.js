import React, { Component } from "react";
import PropTypes from "prop-types";
import css from "./style.css";
import PlaintextEditor from "./../PlaintextEditor";

export default class PlaintextComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: sessionStorage.getItem(this.props.file.name) || this.props.value,
      editor: false
    };
    this.loadEditor = this.loadEditor.bind(this);
  }

  componentDidMount() {
    this.CKEditor = require("@ckeditor/ckeditor5-react");
    this.ClassicEditor = require("@ckeditor/ckeditor5-build-classic");
    this.setState({
      editor: false
    });
  }
  async loadEditor() {
    await this.setState({ editor: true });
    this.forceUpdate();
  }

  render() {
    return !this.state.editor ? (
      <div className={css.editor}>
        <div>
          {sessionStorage.getItem(this.props.file.name) || this.props.value}
        </div>
        <button className={css.button} onClick={this.loadEditor}>
          Edit
        </button>
      </div>
    ) : (
      <PlaintextEditor file={this.props.file} value={this.state.value} />
    );
  }
}

PlaintextComponent.propTypes = {
  file: PropTypes.object,
  value: PropTypes.string,
  children: PropTypes.array
};
