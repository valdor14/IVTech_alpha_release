import React, { useState, useEffect } from "react";
import axios from "axios";
import ErrorMessage from "../misc/ErrorMessage";
import domain from "../../util/domain";
import { useTranslation } from "react-i18next";
import ErrorPage from "../misc/ErrorPage";
import "./Event.scss";

function EventEditor({ getEvents, setEventEditorOpen, editEventData }) {
  const [editorTitle, setEditorTitle] = useState("");
  const [editorDescription, setEditorDescription] = useState("");
  const [editorLocation, setEditorLocation] = useState("");
  const [editorImage, setEditorImage] = useState("");
  const [editorDate, setEditorDate] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorStatus, setErrorStatus] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (editEventData) {
      setEditorTitle(editEventData.title ? editEventData.title : "");
      setEditorDescription(
        editEventData.description ? editEventData.description : ""
      );
      setEditorLocation(editEventData.location ? editEventData.location : "");
      setEditorImage(editEventData.image ? editEventData.image : "");
      setEditorDate(editEventData.date ? editEventData.date : "");
    }
  }, [editEventData]);

  async function saveEvent(e) {
    e.preventDefault();

    const eventData = {
      title: editorTitle ? editorTitle : undefined,
      description: editorDescription ? editorDescription : undefined,
      location: editorLocation ? editorLocation : undefined,
      date: editorDate ? editorDate : undefined,
      image: editorImage ? editorImage : undefined,
    };

    try {
      if (!editEventData) await axios.post(`${domain}/events/`, eventData);
      else
        await axios.put(
          `${domain}/events/${editEventData._id}`,
          eventData
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

    getEvents();
    closeEditor();
  }

  function closeEditor() {
    // closing the forms
    setEventEditorOpen(false);
    setEditorLocation("");
    setEditorDescription("");
    setEditorTitle("");
    setEditorImage("");
    setEditorDate("");
  }

  return (
    <div>
      {errorStatus && (
        <ErrorPage
          status={errorStatus} />
      )}
    <div className='event-editor'>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          clear={() =>  { setErrorMessage(null); setErrorStatus(null)}}
        />
      )}
      <form className='form' action='' onSubmit={saveEvent}>
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
        <label htmlFor='editor-location'>{t("Location")}</label>
        <textarea
          id='editor-location'
          name=''
          value={editorLocation}
          onChange={(e) => {
            setEditorLocation(e.target.value);
          }}></textarea>

        <label htmlFor='editor-image'>{t("Image")}</label>
        <input
          id='editor-image'
          type='text'
          value={editorImage}
          onChange={(e) => {
            setEditorImage(e.target.value);
          }}
        />
        <label htmlFor='editor-date'>{t("Date")}</label>
        <input
          id='editor-date'
          type='date'
          value={editorDate}
          onChange={(e) => {
            setEditorDate(e.target.value);
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

export default EventEditor;
