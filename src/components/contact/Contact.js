import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import domain from "../../util/domain";
import axios from "axios";
import UserContext from "../../context/UserContext";
import "./Contact.scss"

// destructuring props into event
function Contact({ contact, getContacts }) {

  const { t } = useTranslation();
  const { user, getUser } = useContext(UserContext);
  const [role, setRole] = useState();

  async function deleteContact() {
    if (window.confirm("Do you want to delete this contact?")) {
      await axios.delete(`${domain}/contact/${contact._id}`);
      getContacts();
    }
  }

  async function getRole() {
    const role = await axios.get(`${domain}/auth/role/${user}`);
    setRole(role.data);
    return role.data;
  }

  getRole();

  return (
    <div className='contact'>
      {contact.name && <h2 className='name'>[NUME] {contact.name}</h2>}
      {contact.email && (
        <pre className='email'>
          <p>[EMAIL] {contact.email}</p>
        </pre>
      )}
      {contact.services && (
        <pre className='services'>
          <p>[SERVICES] {contact.services}</p>
        </pre>
      )}
      {contact.subject && (
        <pre className='subject'>
          <p>[SUBIECT] {contact.subject}</p>
        </pre>
      )}
      {(role === "Support" || role === "Admin") && (
        <>
      <button className='btn-delete' onClick={deleteContact}>
        {t("Delete")}
      </button>
      </>
      )}
    </div>
  );
}

export default Contact;