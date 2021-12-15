import React, { useContext, useState } from "react";
//import "./Event.scss";
import { useTranslation } from "react-i18next";
import domain from "../../util/domain";
import axios from "axios";
import UserContext from "../../context/UserContext";
import "./Interview.scss"

// destructuring props into event
function Interview({ interview, getInterviews, editInterview }) {

  const { t } = useTranslation();
  const { user, getUser } = useContext(UserContext);
  const [role, setRole] = useState();

  async function deleteInterview() {
    if (window.confirm("Do you want to delete this interview?")) {
      await axios.delete(`${domain}/interviews/${interview._id}`);
      getInterviews();
    }
  }

  async function getRole() {
    const role = await axios.get(`${domain}/auth/role/${user}`);
    setRole(role.data);
    return role.data;
  }

  getRole();

  return (
    <div className='interview'>
      {interview.title && <h2 className='title'>[TITLU] {interview.title}</h2>}
      {interview.description && (
        <pre className='description'>
          <p>[DESCRIERE] {interview.description}</p>
        </pre>
      )}
      {interview.solution && (
        <pre className='solution'>
          <p>[SOLUTIE] {interview.solution}</p>
        </pre>
      )}
      {interview.tags && (
        <pre className='tags'>
          <p>[TAGURI] {interview.tags}</p>
        </pre>
      )}
      {(role === "Support" || role === "Admin") && (
        <>
      <button className='btn-edit' onClick={() => editInterview(interview)}>
        {t("Edit")}
      </button>
      <button className='btn-delete' onClick={deleteInterview}>
        {t("Delete")}
      </button>
      </>
      )}
    </div>
  );
}

export default Interview;