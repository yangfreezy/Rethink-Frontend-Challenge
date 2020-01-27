import React, { Component } from "react";
import PropTypes from "prop-types";
import { PrefillEmbed, PrefillLang } from "react-codepen-prefill-embed";

export default class JSPreviewer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <PrefillEmbed
        embedHeight="600"
        themeId="31205"
        editable
        defaultTabs={["js"]}
        scripts={[
          "https://unpkg.com/react@16.8.6/umd/react.development.js",
          "https://unpkg.com/react-dom@16.8.6/umd/react-dom.development.js"
        ]}
        stylesheets={["https://unpkg.com/normalize.css@8.0.1/normalize.css"]}
      >
        <PrefillLang lang="js">{this.props.value}</PrefillLang>
      </PrefillEmbed>
    );
  }
}

JSPreviewer.propTypes = {
  value: PropTypes.string
};
