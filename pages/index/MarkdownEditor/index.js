import React, { Component } from "react";
import ReactMde from "react-mde";
import PropTypes from "prop-types";
import * as Showdown from "showdown";

import css from "./style.css";
// import "react-mde/lib/styles/css/react-mde-all.css";

export default class MarkdownEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: sessionStorage.getItem(this.props.file.name) || this.props.value,
      tab: "write"
    };
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true
    });
    this.saveFile = this.saveFile.bind(this);
  }

  handleValueChange = value => {
    this.setState({ value });
  };

  handleTabChange = tab => {
    this.setState({ tab });
  };

  saveFile() {
    sessionStorage.setItem(this.props.file.name, this.state.value);
  }

  render() {
    return (
      <div className={css.container}>
        <ReactMde
          layout="horizontal"
          onChange={this.handleValueChange}
          onTabChange={this.handleTabChange}
          value={this.state.value}
          generateMarkdownPreview={markdown =>
            Promise.resolve(this.converter.makeHtml(markdown))
          }
          selectedTab={this.state.tab}
        />
        <button className={css.button} onClick={this.saveFile}>
          Save
        </button>
      </div>
    );
  }
}

MarkdownEditor.propTypes = {
  file: PropTypes.object,
  value: PropTypes.string
};
