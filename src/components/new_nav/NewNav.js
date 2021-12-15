import React, { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import domain from "../../util/domain";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';
import UserContext from "../../context/UserContext";
import "./NewNav.scss"
import { Link } from "react-router-dom";

function NewNav () {

    const [isActive, setActive] = useState('false')
    const [isPractice, setPractice] = useState('false')
    const { user, getUser } = useContext(UserContext);

  const { t } = useTranslation();
  const [role, setRole] = useState();

  async function getRole() {
    const role = await axios.get(`${domain}/auth/role/${user}`);
    setRole(role.data);
    return role.data;
  }

  getRole();



    const handleToggle = () => {
        setActive(!isActive);
      };

    const handlePractice = () => {
        setPractice(!isPractice)
    }

    async function logOut() {
        await axios.get(`${domain}/auth/logOut`);
        await getUser();
      }


      useEffect(() => {
        AOS.init({
            easing: "ease",
            duration: 1800,
            once: true
        });
      }, []);



    return (
        <>
        {isPractice && (
            <>
            <div className={isActive ? "menu-toggler" : "menu-toggler open"} onClick={handleToggle}>
                <div className="bar half start"></div>
                <div className="bar"></div>
                <div className="bar half end"></div>
            </div>
            {user === null && (
                <div className="logged-user">
                Welcome
                <a href='/IVTech/new_signin'>Log In</a>
            </div>
            )}
            {user && (
                <div className="logged-user">
                Welcome name,
                <button onClick={logOut} className='btn-logout'>
                    Logout
                </button>
            </div>
            )}
            <nav className={isActive ? "top-nav" : "top-nav open"}>
                <ul className="nav-list">
                    <li>
                        <a href="/" className="nav-link">Home</a>
                    </li>
                    <li>
                        <a href="/IVTech/courses" className="nav-link" onClick={handleToggle}>Courses</a>
                    </li>
                    <li>
                        <a href="/IVTech/mentors" className="nav-link" onClick={handleToggle}>Mentors</a>
                    </li>
                    <li>
                        <a href="#" className="nav-link" onClick={handlePractice}>Practice</a>
                    </li>
                    <li>
                        <a href="/IVTech/Social" className="nav-link" onClick={handleToggle}>Social</a>
                    </li>
                    <li>
                        <a href="/#contact" className="nav-link" onClick={handleToggle}>Contact</a>
                    </li>
                    {role === "Support" && (
                        <li>
                        <a href="/IVTech/support/contact" className="nav-link" onClick={handleToggle}>Contact-Requests</a>
                    </li>
                    )}
                    {role === "Admin" && (
                        <>
                        <li>
                        <a href="/IVTech/admin/manageUsers" className="nav-link" onClick={handleToggle}>Manage-Users</a>
                    </li>
                    <li>
                    <a href="/IVTech/admin/stats" className="nav-link" onClick={handleToggle}>Stats</a>
                </li>
                </>
                    )}
                </ul>
            </nav>
            </>
            )}
            {!isPractice && (
                <>
            <div className={isActive ? "menu-toggler" : "menu-toggler open"} onClick={handleToggle}>
                <div className="bar half start"></div>
                <div className="bar"></div>
                <div className="bar half end"></div>
            </div>
            <nav className={isActive ? "top-nav" : "top-nav open"}>
                <ul className="nav-list">
                    <li>
                        <a href="#" className="nav-link" onClick={handlePractice}>Back</a>
                    </li>
                    <li>
                        <a href="/" className="nav-link">Home</a>
                    </li>
                    <li>
                        <a href="/IVTech/practice/interview" className="nav-link" onClick={handleToggle}>Interview</a>
                    </li>
                    <li>
                        <a href="/IVTech/practice/compiler" className="nav-link" onClick={handleToggle}>IDE</a>
                    </li>
                    <li>
                        <a href="/IVTech/practice/apis" className="nav-link" onClick={handleToggle}>APIs</a>
                    </li>
                    <li>
                        <a href="/IVTech/practice/snippets" className="nav-link" onClick={handleToggle}>Snippets</a>
                    </li>
                    {role === "Support" && (
                        <>
                        <li>
                        <a href="/IVTech/support/featured/" className="nav-link" onClick={handleToggle}>Featured-Snippets</a>
                    </li>
                    <li>
                    <a href="/IVTech/support/" className="nav-link" onClick={handleToggle}>Notfeatured-Snippets</a>
                </li>
                </>
                    )}
                </ul>
            </nav>
            </>
            )}
            </>
    )
}

export default NewNav;
