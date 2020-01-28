import React, { Component } from "react";
import PropTypes from "prop-types";

import JSEditor from "../JSEditor";

import css from "./../style.css";

export default class JSPreviewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editor: false,
      code: sessionStorage.getItem(this.props.file.name) || this.props.value
    };
    this.loadEditor = this.loadEditor.bind(this);
  }

  loadEditor() {
    this.setState({ editor: true });
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
      <JSEditor file={this.props.file} value={this.state.value} />
    );
  }
}

JSPreviewer.propTypes = {
  value: PropTypes.string,
  file: PropTypes.object
};
