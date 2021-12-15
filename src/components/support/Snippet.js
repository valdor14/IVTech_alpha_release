import axios from "axios";
import React from "react";
import domain from "../../util/domain";
import "./Snippet.scss";
import { useTranslation } from "react-i18next";

// destructuring props into snippet
function Snippet({ snippet, getSnippets, editSnippet }) {

  const { t } = useTranslation();

  async function deleteSnippet() {
    if (window.confirm("Do you want to delete this snippet?")) {
      await axios.delete(`${domain}/snippet/${snippet._id}`);
      getSnippets();
    }
  }

  async function featureSnippet() {
    await axios.post(`${domain}/support/${snippet._id}`);
      getSnippets();
  } 

  return (
    <div className='snippet'>
      {snippet.title && <h2 className='title'>{snippet.title}</h2>}
      {snippet.description && (
        <p className='description'>{snippet.description}</p>
      )}
      {snippet.code && (
        <pre className='code'>
          <code>{snippet.code}</code>
        </pre>
      )}
      <button className='btn-edit' onClick={() => editSnippet(snippet)}>
        {t("Edit")}
      </button>
      <button className='btn-delete' onClick={deleteSnippet}>
        {t("Delete")}
      </button>
      <button className='btn-feature' onClick={featureSnippet}>
        {t("AddRemove")}
      </button>
    </div>
  );
}

export default Snippet;
