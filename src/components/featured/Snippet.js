import React from "react";
import "./Snippet.scss";
import { useTranslation } from "react-i18next";

// destructuring props into snippet
function Snippet({ snippet, getSnippets }) {
  const { t } = useTranslation();
  return (
    <div className='snippet'>
      {snippet.author && <h3 className='author'>{t("Author")}: {snippet.author}</h3>}
      {snippet.title && <h2 className='title'>{snippet.title}</h2>}
      {snippet.description && (
        <p className='description'>{snippet.description}</p>
      )}
      {snippet.code && (
        <pre className='code'>
          <code>{snippet.code}</code>
        </pre>
      )}
    </div>
  );
}

export default Snippet;
