import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import domain from "../../util/domain";
import { useTranslation } from "react-i18next";



function ApisPage() {
  const { t } = useTranslation();


  return (
    <div className='apisPage'>
      <p>NOTHING YET</p>
    </div>
  );
}

export default ApisPage;
