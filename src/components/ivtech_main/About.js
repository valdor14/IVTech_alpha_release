import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import domain from "../../util/domain";
import { useTranslation } from "react-i18next";

function About() {
  const { t } = useTranslation();


  return (
    <div className='about'>
        <p>Aceasta sectiune o vom folosi pentru partea de about a platformei</p>
        <p>dasdasdasdsadasdada</p>
        <p>asdasdadaad</p>
    </div>
  );
}

export default About;