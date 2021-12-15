import React, { useState, useEffect, useContext } from "react";
import "./Course.scss";
import { useTranslation } from "react-i18next";
import ReactDOM from "react-dom";
import domain from "../../../util/domain";
import axios from "axios";
import UserContext from "../../../context/UserContext";

// destructuring props into course
function Course({ course, getCourses, editCourse }) {

  const { t } = useTranslation();
  const { user } = useContext(UserContext);
  const [role, setRole] = useState();

  const redirect = async (e) => {
    const xx = await axios.get("http://localhost:5000/courses/chosen")
    console.log(xx.data)
    //ReactDOM.render(xx.data, document.getElementById('root'));
    //const safeHTML = DOMPurify.sanitize(xx.data);

    ReactDOM.render(<div dangerouslySetInnerHTML={{ __html: xx.data }} />, document.getElementById('root')); //! caution, may create security risks
  }

  async function deleteCourse() {
    if (window.confirm("Do you want to delete this course?")) {
      await axios.delete(`${domain}/courses/${course._id}`);
      getCourses();
    }
  }
  /*
  function editCourse(courseData) {
    setEditCourseData(courseData);
    setCourseEditorOpen(true);
  }*/

  async function getRole() {
    const role = await axios.get(`${domain}/auth/role/${user}`);
    setRole(role.data);
    return role.data;
  }

  getRole();

  return (
    //TODO onClick to redirect to course page
    <div className='course'>
      {course.author && <h3 className='author'>{t("Author")}: {course.author}</h3>}
      {course.title && <h2 className='title' onClick={(e)=>redirect(e)}>{course.title}</h2>}
      {course.description && (
        <p className='description'>{course.description}</p>
      )}
      {(role === "Support" || role ==="Admin") && (
        <>
      <button className='btn-edit' onClick={() => editCourse(course)}>
        {t("Edit")}
      </button>
      <button className='btn-delete' onClick={deleteCourse}>
        {t("Delete")}
      </button>
      </>
      )}
    </div>
  );
}

export default Course;