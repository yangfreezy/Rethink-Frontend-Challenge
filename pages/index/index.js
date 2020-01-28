import React, { useState, useEffect } from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import path from "path";
import classNames from "classnames";

import { listFiles } from "./list-files";

import {
  MarkdownPreviewer,
  PlaintextPreviewer,
  JSPreviewer
} from "./Components/index";

import IconPlaintextSVG from "./assets/icon-plaintext.svg";
import IconMarkdownSVG from "./assets/icon-markdown.svg";
import IconJavaScriptSVG from "./assets/icon-javascript.svg";
import IconJSONSVG from "./assets/icon-json.svg";

import css from "./style.css";

const TYPE_TO_ICON = {
  "text/plain": IconPlaintextSVG,
  "text/markdown": IconMarkdownSVG,
  "text/javascript": IconJavaScriptSVG,
  "application/json": IconJSONSVG
};

function FilesTable({ files, activeFile, setActiveFile }) {
  return (
    <div className={css.files}>
      <table>
        <thead>
          <tr>
            <th>File</th>
            <th>Modified</th>
          </tr>
        </thead>
        <tbody>
          {files.map(file => (
            <tr
              key={file.name}
              className={classNames(
                css.row,
                activeFile && activeFile.name === file.name ? css.active : ""
              )}
              onClick={() => setActiveFile(file)}
            >
              <td className={css.file}>
                <div
                  className={css.icon}
                  dangerouslySetInnerHTML={{
                    __html: TYPE_TO_ICON[file.type]
                  }}
                ></div>
                {path.basename(file.name)}
              </td>

              <td>
                {new Date(file.lastModified).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

FilesTable.propTypes = {
  files: PropTypes.arrayOf(PropTypes.object),
  activeFile: PropTypes.object,
  setActiveFile: PropTypes.func
};

function Previewer({ file }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    (async () => {
      setValue(await file.text());
    })();
  }, [file]);

  return (
    <div className={css.preview}>
      <div className={css.title}>{path.basename(file.name)}</div>
      <div className={css.content}>
        {sessionStorage.getItem(file.name) || value}
      </div>
    </div>
  );
}

Previewer.propTypes = {
  file: PropTypes.object
};

const REGISTERED_PREVIEWERS = {
  "text/markdown": MarkdownPreviewer,
  "text/plain": PlaintextPreviewer,
  "text/javascript": JSPreviewer,
  "application/json": JSPreviewer
};

function PlaintextFilesChallenge() {
  const [files, setFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);

  useEffect(() => {
    const files = listFiles();
    setFiles(files);
  }, []);

  const Previewer = activeFile ? REGISTERED_PREVIEWERS[activeFile.type] : null;

  return (
    <div className={css.page}>
      <Head>
        <title>Rethink Engineering Challenge</title>
        <script
          defer
          src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"
        ></script>
      </Head>
      <aside>
        <header>
          <div className={css.tagline}>Rethink Engineering Challenge</div>
          <h1>Plaintext: Why So Plain</h1>
          <div className={css.description}>
            Let{"'"}s have fun with files and JavaScript. What could be more fun
            than rendering and editing plaintext? Not much, as it turns out.
          </div>
        </header>

        <FilesTable
          files={files}
          activeFile={activeFile}
          setActiveFile={setActiveFile}
        />

        <div style={{ flex: 1 }}></div>

        <footer>
          <div className={css.link}>
            <a href="https://rethink.software">Rethink Software</a>
            &nbsp;—&nbsp;Frontend Engineering Challenge
          </div>
          <div className={css.link}>
            Questions? Feedback? Email{" "}
            <a href="mailto:will@rethink.software">will@rethink.software</a>
          </div>
        </footer>
      </aside>

      <main className={css.editorWindow}>
        {activeFile && (
          <>
            {Previewer && (
              <div className={css.preview}>
                <div className={css.title}>
                  {path.basename(activeFile.name)}
                </div>
                <Previewer
                  file={activeFile}
                  value={sessionStorage.getItem(activeFile.name)}
                />
              </div>
            )}
          </>
        )}

        {!activeFile && (
          <div className={css.empty}>Select a file to view or edit</div>
        )}
      </main>
    </div>
  );
}

export default PlaintextFilesChallenge;
