import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import domain from "../../util/domain";
import { useTranslation } from "react-i18next";

function Partners() {
  const { t } = useTranslation();


  return (
    <div className='about'>
        <p>Aceasta sectiune o vom folosi pentru parteneri</p>
        <p>POZA cu link</p>
        <p>POZA cu link</p>
    </div>
  );
}

export default Partners;