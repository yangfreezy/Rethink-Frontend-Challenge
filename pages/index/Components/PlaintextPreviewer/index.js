import React, { useState } from "react";
import PropTypes from "prop-types";

import PlaintextEditor from "./../PlaintextEditor";

import css from "./../style.css";

const PlaintextPreviewer = props => {
  const [editor, setEditor] = useState(false);
  const value = sessionStorage.getItem(props.file.name) || props.value;

  return !editor ? (
    <div className={css.editor}>
      <div className={css.previewContainer}>{value}</div>
      <button className={css.button} onClick={setEditor.bind(this, true)}>
        Edit
      </button>
    </div>
  ) : (
    <PlaintextEditor file={props.file} value={value} />
  );
};

PlaintextPreviewer.propTypes = {
  file: PropTypes.object,
  value: PropTypes.string
};

export default PlaintextPreviewer;
