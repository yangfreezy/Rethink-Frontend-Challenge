import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";

import CodePreviewer from "../CodePreviewer";

import css from "./../style.css";

const CodeEditor = props => {
  const [preview, setPreview] = useState(false);
  const [code, setCode] = useState(
    sessionStorage.getItem(props.file.name) || props.value
  );

  useEffect(() => {
    setCode(sessionStorage.getItem(props.file.name) || props.value);
  }, [props.file.name]);

  const togglePreview = () => {
    setPreview(true);
  };

  const saveFile = () => {
    sessionStorage.setItem(props.file.name, code);
    togglePreview();
  };

  return !preview ? (
    <div className={css.editor}>
      <div className={css.codeEditor}>
        <Editor
          value={code}
          onValueChange={code => setCode(code)}
          highlight={code => highlight(code, languages.js)}
          padding={20}
          style={{
            color: `#000a41`,
            fontFamily: `SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier,
                monospace`,
            fontSize: 16,
            width: 600,
            border: 5
          }}
        />
      </div>
      <div className={css.buttonContainer}>
        <button className={css.button} onClick={togglePreview}>
          Back
        </button>
        <button className={css.button} onClick={saveFile}>
          Save
        </button>
      </div>
    </div>
  ) : (
    <CodePreviewer file={props.file} value={code} />
  );
};

CodeEditor.propTypes = {
  value: PropTypes.string,
  file: PropTypes.object
};

export default CodeEditor;
