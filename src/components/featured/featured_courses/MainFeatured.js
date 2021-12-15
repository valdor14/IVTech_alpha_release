import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import Course from "./Course";
import CourseEditor from "./CourseEditor";
import "../../home/Home.scss";
import "./Course.scss"
import UserContext from "../../../context/UserContext";
import { Link } from "react-router-dom";
import domain from "../../../util/domain";
import { useTranslation } from "react-i18next";
import ErrorPage from "../../misc/ErrorPage";


function MainFeatured() {
  const [courses, setCourses] = useState([]);
  const { t } = useTranslation();
  const { user } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [courseEditorOpen, setCourseEditorOpen] = useState(false);
  const [editCourseData, setEditCourseData] = useState(null);
  const [role, setRole] = useState();

  useEffect(() => {
    if (!user) {
      setCourses([]);
    } else getCourses();
  }, [user]);

  async function getCourses() {
    try {
        console.log("BEfore axios get call")
      const coursesRes = await axios.get(`${domain}/courses/featured`);//TODO add route
      setCourses(coursesRes.data);
    } catch(err) {
      if (err.response) {
        if (err.response.status) {
          setErrorMessage(err.response.status);
        }
      }
    }
  }

  function editCourse(courseData) {
    setEditCourseData(courseData);
    setCourseEditorOpen(true);
  }

  function renderCourses() {
    let sortedCourses = [...courses];
    sortedCourses = sortedCourses.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return sortedCourses.map((course, i) => {
      return (
        <Course
          key={i}
          course={course}
          getCourses={getCourses}
          editCourse={editCourse}
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
      {(role === "Support" || role === "Admin") && !courseEditorOpen && user && (
        <button
          className='btn-editor-toggle'
          onClick={() => setCourseEditorOpen(true)}>
          {t("AddCourse")}
        </button>
      )}

      {(role === "Support" || role === "Admin") && courseEditorOpen && (
        <CourseEditor
          setCourseEditorOpen={setCourseEditorOpen}
          getCourses={getCourses}
          editCourseData={editCourseData}
        />
      )}
      {courses.length > 0
        ? renderCourses()
        : user && (
            <p className='no-courses-msg'>{t("NoCourses")}</p>
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

export default MainFeatured;