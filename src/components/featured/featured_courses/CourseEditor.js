import React, { useState, useEffect } from "react";
import axios from "axios";
import ErrorMessage from "../../misc/ErrorMessage";
import domain from "../../../util/domain";
import { useTranslation } from "react-i18next";
import ErrorPage from "../../misc/ErrorPage";
import "./Course.scss"

function CourseEditor({ getCourses, setCourseEditorOpen, editCourseData }) {
  const [editorTitle, setEditorTitle] = useState("");
  const [editorDescription, setEditorDescription] = useState("");
  const [editorFilePath, setEditorCode] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorStatus, setErrorStatus] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (editCourseData) {
      setEditorTitle(editCourseData.title ? editCourseData.title : "");
      setEditorDescription(
        editCourseData.description ? editCourseData.description : ""
      );
      setEditorCode(editCourseData.filePath ? editCourseData.filePath : "");
    }
  }, [editCourseData]);

  async function saveCourse(e) {
    e.preventDefault();

    const courseData = {
      title: editorTitle ? editorTitle : undefined,
      description: editorDescription ? editorDescription : undefined,
      filePath: editorFilePath ? editorFilePath : undefined,
    };

    try {
      if (!editCourseData) await axios.post(`${domain}/courses/`, courseData);
      else
        await axios.put(
          `${domain}/courses/${editCourseData._id}`,
          courseData
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

    getCourses();
    closeEditor();
  }

  function closeEditor() {
    // closing the forms
    setCourseEditorOpen(false);
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
    <div className='course-editor'>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          clear={() =>  { setErrorMessage(null); setErrorStatus(null)}}
        />
      )}
      <form className='form' action='' onSubmit={saveCourse}>
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
        <label htmlFor='editor-code'>{t("Path")}</label>
        <textarea
          id='editor-code'
          name=''
          value={editorFilePath}
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

export default CourseEditor;
