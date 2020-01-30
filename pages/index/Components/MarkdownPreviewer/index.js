import React, { useState } from "react";
import marked from "marked";
import PropTypes from "prop-types";

import css from "./../style.css";

const MarkdownPreviewer = props => {
  const [preview, setPreview] = useState(false);

  return (
    <div className={css.editor}>
      {!preview ? (
        <div className={css.container}>
          <div>{sessionStorage.getItem(props.file.name)}</div>
          <button className={css.button} onClick={setPreview}>
            Preview
          </button>
        </div>
      ) : (
        <div className={css.container}>
          <div dangerouslySetInnerHTML={{ __html: marked(props.value) }} />
          <button className={css.button} onClick={setPreview.bind(this, false)}>
            Back
          </button>
        </div>
      )}
    </div>
  );
};

MarkdownPreviewer.propTypes = {
  value: PropTypes.string,
  file: PropTypes.object
};

export default MarkdownPreviewer;
