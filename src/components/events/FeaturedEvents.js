import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import Event from "./Event";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";
import domain from "../../util/domain";
import { useTranslation } from "react-i18next";
import ErrorPage from "../misc/ErrorPage";
import EventEditor from "./EventEditor";
import "./Event.scss";

function Home() {
  const [events, setEvents] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const { t } = useTranslation();
  const { user, getUser } = useContext(UserContext);
  const [role, setRole] = useState();
  const [eventEditorOpen, setEventEditorOpen] = useState(false);
  const [editEventData, setEditEventData] = useState(null);

  useEffect(() => {
    if (!user) {
      setEvents([]);
    } else getEvents();
  }, [user]);

  async function getEvents() {
    try {
      const eventsRes = await axios.get(`${domain}/events/featured`);
      setEvents(eventsRes.data);
    } catch(err) {
      if (err.response) {
        if (err.response.status) {
          setErrorMessage(err.response.status);
        }
      }
    }
  }

  function editEvent(eventData) {
    setEditEventData(eventData);
    setEventEditorOpen(true);
  }

  // function renderEvents() {
  //   let sortedEvents = [...events];
  //   sortedEvents = sortedEvents.sort((a, b) => {
  //     return new Date(b.createdAt) - new Date(a.createdAt);
  //   });
  //   return sortedEvents.map((event, i) => {
  //     return (
  //       <Event
  //         key={i}
  //         event={event}
  //         getEvents={getEvents}
  //         editEvent={editEvent}
  //       />
  //     );
  //   });
  // }


  function renderEvents() {
    let sortedEvents = [...events];
    sortedEvents = sortedEvents.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    //return sortedEvents.map((event, i) => {
      return (

        <div class="event-grid">
              {/* <Grid item xs={12} sm={6} md={4}> */}
        {sortedEvents.map((event, i) => {return(<Event
          key={i}
          event={event}
          getEvents={getEvents}
          editEvent={editEvent}
        />)})}
        {/* </Grid> */}
      </div>
      );
    //});
  }

  async function getRole() {
    const role = await axios.get(`${domain}/auth/role/${user}`);
    setRole(role.data);
    return role.data;
  }

  getRole();

  return (

    <div className='home'>
      {errorMessage && (
        <ErrorPage
          status={errorMessage} />
      )}
      {(role === "Support" || role === "Admin") && !eventEditorOpen && user && (
        <button
          className='btn-editor-toggle'
          onClick={() => setEventEditorOpen(true)}>
          {t("AddEvent")}
        </button>
      )}
      {(role === "Support" || role === "Admin") && eventEditorOpen && (
        <EventEditor
          setEventEditorOpen={setEventEditorOpen}
          getEvents={getEvents}
          editEventData={editEventData}
        />
      )}
      {events.length > 0
        ? renderEvents()
        : user && (
            <p className='no-events-msg'>{t("NoEvents")}</p>
          )}
      {user === null && (
        <>
          <div className='no-user-message'>
            <h2>{t("Welcome")}</h2>
            <Link to='/register'>{t("RegisterHere")}</Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
