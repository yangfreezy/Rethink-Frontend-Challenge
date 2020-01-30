import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Editor from "react-simple-code-editor";
import marked from "marked";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";

import css from "./../style.css";

const MarkdownEditor = props => {
  const [editor, setEditor] = useState(false);
  const [markupPreviewer, setMarkupPreviewer] = useState(false);
  const [previewer, setPreviewer] = useState(true);
  const [value, setValue] = useState(
    sessionStorage.getItem(props.file.name) || props.value
  );

  useEffect(() => {
    setValue(sessionStorage.getItem(props.file.name) || "");
    setEditor(false);
  }, [props.file.name]);

  const loadPreviewer = () => {
    setValue(sessionStorage.getItem(props.file.name));
    setPreviewer(true);
    setEditor(false);
    setMarkupPreviewer(false);
  };

  const loadEditor = () => {
    setEditor(true);
    setMarkupPreviewer(false);
    setPreviewer(false);
  };

  const loadMarkupPreview = () => {
    setValue(sessionStorage.getItem(props.file.name));
    setEditor(false);
    setMarkupPreviewer(true);
    setPreviewer(false);
  };

  const saveFile = () => {
    sessionStorage.setItem(props.file.name, value);
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
          <button className={css.button} onClick={loadMarkupPreview}>
            Preview
          </button>
        </div>
      </div>
    );
  }

  if (editor) {
    content = (
      <div className={css.editor}>
        <div className={css.codeEditor}>
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
        </div>
        <div className={css.buttonContainer}>
          <button className={css.button} onClick={loadPreviewer}>
            Back
          </button>
          <button className={css.button} onClick={saveFile.bind(this, value)}>
            Save
          </button>
        </div>
      </div>
    );
  }
  if (markupPreviewer) {
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
