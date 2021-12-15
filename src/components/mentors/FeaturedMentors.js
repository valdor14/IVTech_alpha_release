import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import Mentor from "./Mentor";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";
import domain from "../../util/domain";
import { useTranslation } from "react-i18next";
import ErrorPage from "../misc/ErrorPage";
import MentorApplication from "./MentorApplication";
import MentorEditor from "./MentorEditor";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./Mentor.scss";

function Home() {
  const [mentors, setMentors] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const { t } = useTranslation();
  const { user } = useContext(UserContext);
  const [mentorEditorOpen, setMentorEditorOpen] = useState(false);
  const [editMentorData, setEditMentorData] = useState(null);
  const [role, setRole] = useState();

  useEffect(() => {
    if (!user) {
      setMentors([]);
    } else getMentors();
  }, [user]);

  async function getMentors() {
    try {
      const mentorsRes = await axios.get(`${domain}/mentors/featured`);
      setMentors(mentorsRes.data);
    } catch(err) {
      if (err.response) {
        if (err.response.status) {
          setErrorMessage(err.response.status);
        }
      }
    }
  }

  function editMentor(mentorData) {
    setEditMentorData(mentorData);
    setMentorEditorOpen(true);
  }

  function renderMentors() {
    let sortedMentors = [...mentors];
    sortedMentors = sortedMentors.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    //return sortedMentors.map((mentor, i) => {
      return (

        <div class="mentor-grid">
              {/* <Grid item xs={12} sm={6} md={4}> */}
        {sortedMentors.map((mentor, i) => {return(<Mentor
          key={i}
          mentor={mentor}
          getMentors={getMentors}
          editMentor={editMentor}
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
      {!mentorEditorOpen && user && (role === "Support" || role ==="Admin") && (
        <button
          className='btn-editor-toggle'
          onClick={() => setMentorEditorOpen(true)}>
          {t("AddMentor")}
        </button>
      )}
      {(role === "Support" || role ==="Admin") && (mentorEditorOpen && (
        <MentorEditor
          setMentorEditorOpen={setMentorEditorOpen}
          getMentors={getMentors}
          editMentorData={editMentorData}
        />
      ))}
      {mentors.length > 0
        ? renderMentors()
        : user && (
            <p className='no-mentors-msg'>{t("NoMentors")}</p>
          )}
      {user === null && (
        <>
          <div className='no-user-message'>
            <h2>{t("Welcome")}</h2>
            <Link to='/register'>{t("RegisterHere")}</Link>
          </div>
        </>
      )}
      <MentorApplication />
    </div>
  );
}

export default Home;
