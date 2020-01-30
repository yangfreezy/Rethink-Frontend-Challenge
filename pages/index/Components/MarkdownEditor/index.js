import React, { useState } from "react";
import PropTypes from "prop-types";
import marked from "marked";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";

import css from "./../style.css";

const MarkdownEditor = props => {
  const [editor, setEditor] = useState(false);
  const [markup, setMarkup] = useState(false);
  const [previewer, setPreviewer] = useState(true);
  const [value, setValue] = useState(
    sessionStorage.getItem(props.file.name) || props.value
  );

  const loadPreviewer = () => {
    setValue(sessionStorage.getItem(props.file.name));
    setPreviewer(true);
    setEditor(false);
    setMarkup(false);
  };

  const loadEditor = () => {
    setEditor(true);
    setMarkup(false);
    setPreviewer(false);
  };

  const loadMarkup = () => {
    setValue(sessionStorage.getItem(props.file.name));
    setEditor(false);
    setMarkup(true);
    setPreviewer(false);
  };

  const saveFile = value => {
    sessionStorage.setItem(props.file.name, value);
    setValue(value);
    loadPreviewer();
  };

  let content;

  if (previewer) {
    content = (
      <div className={css.editor}>
        <div className={css.previewContainer}>
          {sessionStorage.getItem(props.file.name)}
        </div>
        <div className={css.buttonContainer}>
          <button className={css.button} onClick={loadEditor}>
            Edit
          </button>
          <button className={css.button} onClick={loadMarkup}>
            Preview
          </button>
        </div>
      </div>
    );
  }

  if (editor) {
    content = (
      <div className={css.editor}>
        <div className={css.editor}>
          <Editor
            value={value}
            onValueChange={value => setValue(value)}
            highlight={value => highlight(value, languages.js)}
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
          <div className={css.buttonContainer}>
            <button className={css.button} onClick={loadPreviewer}>
              Back
            </button>
            <button className={css.button} onClick={saveFile.bind(this, value)}>
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
  if (markup) {
    content = (
      <div className={css.editor}>
        <div className={css.container}>
          <div
            dangerouslySetInnerHTML={{
              __html: marked(value)
            }}
          />
          <div className={css.buttonContainer}>
            <button className={css.button} onClick={loadPreviewer}>
              Back
            </button>
            <button className={css.button} onClick={loadEditor}>
              Edit
            </button>
          </div>
        </div>
      </div>
    );
  }

  return content;
};

MarkdownEditor.propTypes = {
  file: PropTypes.object,
  value: PropTypes.string
};

export default MarkdownEditor;
