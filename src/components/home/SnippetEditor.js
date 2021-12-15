import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SnippetEditor.scss";
import ErrorMessage from "../misc/ErrorMessage";
import domain from "../../util/domain";
import { useTranslation } from "react-i18next";
import ErrorPage from "../misc/ErrorPage";

function SnippetEditor({ getSnippets, setSnippetEditorOpen, editSnippetData }) {
  const [editorTitle, setEditorTitle] = useState("");
  const [editorDescription, setEditorDescription] = useState("");
  const [editorCode, setEditorCode] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorStatus, setErrorStatus] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (editSnippetData) {
      setEditorTitle(editSnippetData.title ? editSnippetData.title : "");
      setEditorDescription(
        editSnippetData.description ? editSnippetData.description : ""
      );
      setEditorCode(editSnippetData.code ? editSnippetData.code : "");
    }
  }, [editSnippetData]);

  async function saveSnippet(e) {
    e.preventDefault();

    const snippetData = {
      title: editorTitle ? editorTitle : undefined,
      description: editorDescription ? editorDescription : undefined,
      code: editorCode ? editorCode : undefined,
    };

    try {
      if (!editSnippetData) await axios.post(`${domain}/snippet/`, snippetData);
      else
        await axios.put(
          `${domain}/snippet/${editSnippetData._id}`,
          snippetData
        );
    } catch (err) {
      if (err.response) {
        if (err.response.data.errorMessage) {
          setErrorMessage(err.response.data.errorMessage);
          setErrorStatus(err.response.status);
        }
      }
      return;
    }

    getSnippets();
    closeEditor();
  }

  function closeEditor() {
    // closing the forms
    setSnippetEditorOpen(false);
    setEditorCode("");
    setEditorDescription("");
    setEditorTitle("");
  }

  return (
    <div>
      {errorStatus && (
        <ErrorPage
          status={errorStatus} />
      )}
    <div className='snippet-editor'>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          clear={() =>  { setErrorMessage(null); setErrorStatus(null)}}
        />
      )}
      <form className='form' action='' onSubmit={saveSnippet}>
        <label htmlFor='editor-title'>{t("Title")}</label>
        <input
          id='editor-title'
          type='text'
          value={editorTitle}
          onChange={(e) => {
            setEditorTitle(e.target.value);
          }}
        />
        <label htmlFor='editor-description'>{t("Description")}</label>
        <input
          id='editor-description'
          type='text'
          value={editorDescription}
          onChange={(e) => {
            setEditorDescription(e.target.value);
          }}
        />
        <label htmlFor='editor-code'>{t("Code")}</label>
        <textarea
          id='editor-code'
          name=''
          value={editorCode}
          onChange={(e) => {
            setEditorCode(e.target.value);
          }}></textarea>
        <button className='btn-save' type='submit'>
          {t("Save")}
        </button>
        <button className='btn-cancel' type='button' onClick={closeEditor}>
          {t("Cancel")}
        </button>
      </form>
    </div>
    </div>
  );
}

export default SnippetEditor;
