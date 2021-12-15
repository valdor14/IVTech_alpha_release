import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import domain from "../../util/domain";
import "./Navbar.scss";
import { useTranslation } from "react-i18next";

function Navbar() {
  const { user, getUser } = useContext(UserContext);
  const { t } = useTranslation();
  const [role, setRole] = useState();

  async function logOut() {
    await axios.get(`${domain}/auth/logOut`);
    await getUser();
  }

  async function getRole() {
    const role = await axios.get(`${domain}/auth/role/${user}`);
    setRole(role.data);
    return role.data;
  }

  getRole();

  return (
    <div className='navbar'>
      {/* <Link to='/'>
        <h1>{t("MySnippets")}</h1>
      </Link>
      <Link to='/events/featured'>
        <h1>{t("Events")}</h1>
      </Link>
      <Link to='/mentors/featured'>
        <h1>{t("Mentors")}</h1>
      </Link>
      <Link to='/featured/snippets'>
        <h1>{t("FeaturedSnippets")}</h1>
      </Link>
      <Link to='/featured/courses'>
        <h1>{t("FeaturedCourses")}</h1>
      </Link> */}

      <Link to='/IVTech'>
        <h1>{t("IVTech")}</h1>
      </Link>

      {role === "Support" && (
        <>
        {/* <Link to='/support/add_courses'>
          <h1>{t("AddCourses")}</h1>
        </Link>
        <Link to='/support/add_events'>
          <h1>{t("AddEvents")}</h1>
        </Link>
        <Link to='/support/add_mentors'>
          <h1>{t("AddMentors")}</h1>
        </Link>
        <Link to='/support/add_interviews'>
          <h1>{t("AddInterviews")}</h1>
        </Link> */}
        <Link to='/support/featured/'>
          <h1>{t("SupportPageFeatured")}</h1>
        </Link>
        <Link to='/support/'>
          <h1>{t("SupportPageNotFeatured")}</h1>
        </Link>

        </>
      )}
      {role === "Admin" && (
        <Link to='/admin/manageUsers'>
          <h1>{t("ManageUsers")}</h1>
        </Link>
      )}
      {role === "Admin" && (
        <Link to='/admin/stats'>
          <h1>{t("Stats")}</h1>
        </Link>
      )}
      {user === null ? (
        <>
          <Link to='/login'>{t("Login")}</Link>
          <Link to='/register'>{t("Register")}</Link>
        </>
      ) : (
        user && (
          <button onClick={logOut} className='btn-logout'>
            {t("Logout")}
          </button>
        )
      )}
    </div>
  );
}

export default Navbar;
