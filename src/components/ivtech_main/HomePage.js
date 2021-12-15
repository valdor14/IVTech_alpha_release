import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import domain from "../../util/domain";
import { useTranslation } from "react-i18next";
import About from "./About"
import Partners from "./Partners"


function HomePage() {
  const { t } = useTranslation();


  return (
    <div className='mainPage'>
      <Link to='IVTech/courses'>
        <h1>{t("Courses")}</h1>
      </Link>
      <Link to='IVTech/mentors'>
        <h1>{t("Mentors")}</h1>
      </Link>
      <Link to='IVTech/practice/'>
        <h1>{t("Exercises and Technologies")}</h1>
      </Link>
      <Link to='IVTech/social'>
        <h1>{t("Social")}</h1>
      </Link>
      <About />
      <Partners />
    </div>
  );
}

export default HomePage;
