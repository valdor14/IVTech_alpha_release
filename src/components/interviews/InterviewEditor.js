import React, { useState, useEffect } from "react";
import axios from "axios";
import ErrorMessage from "../misc/ErrorMessage";
import domain from "../../util/domain";
import { useTranslation } from "react-i18next";
import ErrorPage from "../misc/ErrorPage";
import "./Interview.scss"

function InterviewEditor({ getInterviews, setInterviewEditorOpen, editInterviewData }) {
  const [editorTitle, setEditorTitle] = useState("");
  const [editorDescription, setEditorDescription] = useState("");
  const [editorSolution, setEditorSolution] = useState("");
  const [editorTags, setEditorTags] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorStatus, setErrorStatus] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (editInterviewData) {
      setEditorTitle(editInterviewData.title ? editInterviewData.title : "");
      setEditorDescription(
        editInterviewData.description ? editInterviewData.description : ""
      );
      setEditorSolution(editInterviewData.solution ? editInterviewData.solution : "");
      setEditorTags(editInterviewData.tags ? editInterviewData.tags : "");
    }
  }, [editInterviewData]);

  async function saveInterview(e) {
    e.preventDefault();

    const interviewData = {
      title: editorTitle ? editorTitle : undefined,
      description: editorDescription ? editorDescription : undefined,
      solution: editorSolution ? editorSolution : undefined,
      tags: editorTags ? editorTags : undefined,
    };

    try {
      if (!editInterviewData) await axios.post(`${domain}/interviews/`, interviewData);
      else
        await axios.put(
          `${domain}/interviews/${editInterviewData._id}`,
          interviewData
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

    getInterviews();
    closeEditor();
  }

  function closeEditor() {
    // closing the forms
    setInterviewEditorOpen(false);
    setEditorSolution("");
    setEditorDescription("");
    setEditorTitle("");
    setEditorTags("");
  }

  return (
    <div>
      {errorStatus && (
        <ErrorPage
          status={errorStatus} />
      )}
    <div className='interview-editor'>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          clear={() =>  { setErrorMessage(null); setErrorStatus(null)}}
        />
      )}
      <form className='form' action='' onSubmit={saveInterview}>
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
        <label htmlFor='editor-solution'>{t("Solution")}</label>
        <textarea
          id='editor-solution'
          name=''
          value={editorSolution}
          onChange={(e) => {
            setEditorSolution(e.target.value);
          }}></textarea>

        <label htmlFor='editor-description'>{t("Tags")}</label>
        <input
          id='editor-tags'
          type='text'
          value={editorTags}
          onChange={(e) => {
            setEditorTags(e.target.value);
          }}
        />
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

export default InterviewEditor;
