import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import Interview from "./Interview";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";
import domain from "../../util/domain";
import { useTranslation } from "react-i18next";
import ErrorPage from "../misc/ErrorPage";
import InterviewEditor from "./InterviewEditor";

function Home() {
  const [interviews, setInterviews] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const { t } = useTranslation();
  const { user, getUser } = useContext(UserContext);
  const [role, setRole] = useState();
  const [interviewEditorOpen, setInterviewEditorOpen] = useState(false);
  const [editInterviewData, setEditInterviewData] = useState(null);

  useEffect(() => {
    if (!user) {
      setInterviews([]);
    } else getInterviews();
  }, [user]);

  async function getInterviews() {
    try {
      const interviewsRes = await axios.get(`${domain}/interviews/featured`);
      setInterviews(interviewsRes.data);
    } catch(err) {
      if (err.response) {
        if (err.response.status) {
          setErrorMessage(err.response.status);
        }
      }
    }
  }

  function editInterview(interviewData) {
    setEditInterviewData(interviewData);
    setInterviewEditorOpen(true);
  }

  function renderInterviews() {
    let sortedInterviews = [...interviews];
    sortedInterviews = sortedInterviews.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return sortedInterviews.map((interview, i) => {
      return (
        <Interview
          key={i}
          interview={interview}
          getInterviews={getInterviews}
          editInterview={editInterview}
        />
      );
    });
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
      {(role === "Support" || role === "Admin") && !interviewEditorOpen && user && (
        <button
          className='btn-editor-toggle'
          onClick={() => setInterviewEditorOpen(true)}>
          {t("AddInterview")}
        </button>
      )}
      {(role === "Support" || role === "Admin") && interviewEditorOpen && (
        <InterviewEditor
          setInterviewEditorOpen={setInterviewEditorOpen}
          getInterviews={getInterviews}
          editInterviewData={editInterviewData}
        />
      )}
      {interviews.length > 0
        ? renderInterviews()
        : user && (
            <p className='no-interviews-msg'>{t("NoInterviews")}</p>
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
