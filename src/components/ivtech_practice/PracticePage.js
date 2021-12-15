import React, { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import domain from "../../util/domain";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';
import UserContext from "../../context/UserContext";
import "./PracticePage.scss"
import { Link } from "react-router-dom";

function PracticePage () {

    const [isActive, setActive] = useState("false")
    const handleToggle = () => {
        setActive(!isActive);
      };


      useEffect(() => {
        AOS.init({
            easing: "ease",
            duration: 1800,
            once: true
        });
      }, []);

    return (
        <>
        {/* <div className={isActive ? "menu-toggler" : "menu-toggler open"} onClick={handleToggle}>
            <div className="bar half start"></div>
            <div className="bar"></div>
            <div className="bar half end"></div>
        </div> */}
        <nav className={isActive ? "top-nav" : "top-nav open"}>
            <ul className="nav-list">
                <li>
                    <a href="/" className="nav-link">Home</a>
                </li>
                <li>
                    <a href="/IVTech/courses" className="nav-link" onClick={handleToggle}>1</a>
                </li>
                <li>
                    <a href="/IVTech/mentors" className="nav-link" onClick={handleToggle}>2</a>
                </li>
                <li>
                    <a href="/IVTech/practice" className="nav-link" onClick={handleToggle}>3</a>
                </li>
                <li>
                    <a href="/IVTech/Social" className="nav-link" onClick={handleToggle}>4</a>
                </li>
                <li>
                    <a href="/#contact" className="nav-link" onClick={handleToggle}>5</a>
                </li>
            </ul>
        </nav>
        </>
    )
}

export default PracticePage;