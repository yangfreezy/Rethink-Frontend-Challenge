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
  const [code, setCode] = useState(
    sessionStorage.getItem(props.file.name) || ""
  );

  useEffect(() => {
    setCode(sessionStorage.getItem(props.file.name) || "");
    setEditor(false);
  }, [props.file.name]);

  const loadEditor = () => {
    setCode(sessionStorage.getItem(props.file.name));
    setEditor(true);
  };

  const saveFile = () => {
    sessionStorage.setItem(props.file.name, code);
    setEditor(false);
  };

  return !editor ? (
    <div className={css.editor}>
      <div className={css.previewContainer}>
        {sessionStorage.getItem(props.file.name) || ""}
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
        <button className={css.button} onClick={setEditor.bind(this, false)}>
          Back
        </button>
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
