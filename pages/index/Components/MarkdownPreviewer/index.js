import React, { Component } from "react";
import marked from "marked";
import PropTypes from "prop-types";

import css from "./../style.css";

export default class MarkdownPreviewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preview: false
    };
    this.togglePreview = this.togglePreview.bind(this);
  }

  togglePreview() {
    this.setState({ preview: !this.state.preview });
  }

  render() {
    return (
      <div className={css.editor}>
        {!this.state.preview ? (
          <div className={css.container}>
            <div>{sessionStorage.getItem(this.props.file.name)}</div>
            <button className={css.button} onClick={this.togglePreview}>
              Preview
            </button>
          </div>
        ) : (
          <div className={css.container}>
            <div
              dangerouslySetInnerHTML={{ __html: marked(this.props.value) }}
            />
            <button className={css.button} onClick={this.togglePreview}>
              Back
            </button>
          </div>
        )}
      </div>
    );
  }
}

MarkdownPreviewer.propTypes = {
  value: PropTypes.string,
  file: PropTypes.object
};
