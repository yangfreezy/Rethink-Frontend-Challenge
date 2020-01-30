import React, { useState } from "react";
import PropTypes from "prop-types";

import CodeEditor from "../CodeEditor";

import css from "./../style.css";

const CodePreviewer = props => {
  const [editor, setEditor] = useState(false);
  const code = sessionStorage.getItem(props.file.name) || props.value;

  const loadEditor = () => {
    setEditor(true);
  };

  return !editor ? (
    <div className={css.editor}>
      <div className={css.previewContainer}>{code}</div>
      <button className={css.button} onClick={loadEditor}>
        Edit
      </button>
    </div>
  ) : (
    <CodeEditor file={props.file} value={code} />
  );
};

CodePreviewer.propTypes = {
  value: PropTypes.string,
  file: PropTypes.object
};

export default CodePreviewer;
