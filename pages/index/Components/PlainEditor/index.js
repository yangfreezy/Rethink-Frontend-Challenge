import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";

import css from "./../style.css";

const PlainEditor = props => {
  const [editor, setEditor] = useState(false);
  const [code, setCode] = useState(localStorage.getItem(props.file.name) || "");

  useEffect(() => {
    setCode(localStorage.getItem(props.file.name) || "");
    setEditor(false);
  }, [props.file.name]);

  const loadEditor = () => {
    setCode(localStorage.getItem(props.file.name));
    setEditor(true);
  };

  const saveFile = () => {
    localStorage.setItem(props.file.name, code);
    setEditor(false);
  };

  return !editor ? (
    <div className={css.editor}>
      <div className={css.previewContainer}>
        {localStorage.getItem(props.file.name) || ""}
      </div>
      <button className={css.button} onClick={loadEditor}>
        Edit
      </button>
    </div>
  ) : (
    <div className={css.editor}>
      <div className={css.codeEditor}>
        <Editor
          value={code}
          onValueChange={code => setCode(code)}
          highlight={code => highlight(code, languages.js)}
          padding={20}
          style={{
            width: 600
          }}
        />
      </div>
      <div className={css.buttonContainer}>
        {code !== localStorage.getItem(props.file.name) ? (
          <button
            className={css.button}
            onClick={setCode.bind(this, localStorage.getItem(props.file.name))}
          >
            Reset
          </button>
        ) : (
          <button className={css.button} onClick={setEditor.bind(this, false)}>
            Back
          </button>
        )}
        <button className={css.button} onClick={saveFile}>
          Save
        </button>
      </div>
    </div>
  );
};

PlainEditor.propTypes = {
  value: PropTypes.string,
  file: PropTypes.object
};

export default PlainEditor;
