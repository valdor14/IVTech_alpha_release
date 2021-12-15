import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import Contact from "./Contact";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";
import domain from "../../util/domain";
import { useTranslation } from "react-i18next";
import ErrorPage from "../misc/ErrorPage";

function Home() {
  const [contacts, setContacts] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const { t } = useTranslation();
  const { user, getUser } = useContext(UserContext);
  const [role, setRole] = useState();

  useEffect(() => {
    if (!user) {
      setContacts([]);
    } else getContacts();
  }, [user]);

  async function getContacts() {
    try {
      const contactsRes = await axios.get(`${domain}/contact`);
      setContacts(contactsRes.data);
    } catch(err) {
      if (err.response) {
        if (err.response.status) {
          setErrorMessage(err.response.status);
        }
      }
    }
  }

  function renderContacts() {
    let sortedContacts = [...contacts];
    sortedContacts = sortedContacts.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return sortedContacts.map((contact, i) => {
      return (
        <Contact
          key={i}
          contact={contact}
          getContacts={getContacts}
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

      {contacts.length > 0
        ? renderContacts()
        : user && (
            <p className='no-contacts-msg'>{t("NoContacts")}</p>
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