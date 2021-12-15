import React, { useState, useEffect } from "react";
import axios from "axios";
import ErrorMessage from "../misc/ErrorMessage";
import domain from "../../util/domain";
import { useTranslation } from "react-i18next";
import ErrorPage from "../misc/ErrorPage";
import "./Mentor.scss"

function MentorEditor({ getMentors, setMentorEditorOpen, editMentorData }) {
  const [editorTitle, setEditorTitle] = useState("");
  const [editorDescription, setEditorDescription] = useState("");
  const [editorImage, setEditorCode] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorStatus, setErrorStatus] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (editMentorData) {
      setEditorTitle(editMentorData.title ? editMentorData.title : "");
      setEditorDescription(
        editMentorData.description ? editMentorData.description : ""
      );
      setEditorCode(editMentorData.image ? editMentorData.image : "");
    }
  }, [editMentorData]);

  async function saveMentor(e) {
    e.preventDefault();

    const mentorData = {
      title: editorTitle ? editorTitle : undefined,
      description: editorDescription ? editorDescription : undefined,
      image: editorImage ? editorImage : undefined,
    };

    try {
      if (!editMentorData) await axios.post(`${domain}/mentors/`, mentorData);
      else
        await axios.put(
          `${domain}/mentors/${editMentorData._id}`,
          mentorData
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

    getMentors();
    closeEditor();
  }

  function closeEditor() {
    // closing the forms
    setMentorEditorOpen(false);
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
    <div className='mentor-editor'>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          clear={() =>  { setErrorMessage(null); setErrorStatus(null)}}
        />
      )}
      <form className='form' action='' onSubmit={saveMentor}>
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
        <label htmlFor='editor-image'>{t("Image")}</label>
        <textarea
          id='editor-image'
          name=''
          value={editorImage}
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

export default MentorEditor;
