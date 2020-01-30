import React, { useState } from "react";
import PropTypes from "prop-types";
import stripHtml from "string-strip-html";

import PlaintextPreviewer from "../PlaintextPreviewer";

import css from "./../style.css";

const PlaintextEditor = props => {
  const CkEditor = require("@ckeditor/ckeditor5-react");
  const ClassicEditor = require("@ckeditor/ckeditor5-build-classic");
  const [preview, setPreview] = useState(false);
  const [text, setText] = useState(
    sessionStorage.getItem(props.file.name) || props.value
  );

  const saveFile = () => {
    sessionStorage.setItem(props.file.name, text);
    setPreview(true);
  };

  return CkEditor && !preview ? (
    <div className={css.editor}>
      <CkEditor
        editor={ClassicEditor}
        data={sessionStorage.getItem(props.file.name) || props.value}
        onChange={(event, editor) => {
          const data = editor.getData();
          setText(stripHtml(data));
        }}
      />
      <div className={css.buttonContainer}>
        <button className={css.button} onClick={setPreview.bind(this, true)}>
          Back
        </button>
        <button className={css.button} onClick={saveFile}>
          Save
        </button>
      </div>
    </div>
  ) : (
    <PlaintextPreviewer file={props.file} value={stripHtml(text)} />
  );
};

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  value: PropTypes.string
};

export default PlaintextEditor;
