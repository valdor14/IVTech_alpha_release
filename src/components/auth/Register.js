import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./AuthForm.scss";
import UserContext from "../../context/UserContext";
import ErrorMessage from "../misc/ErrorMessage";
import domain from "../../util/domain";
import { useTranslation } from "react-i18next";

function Register() {
  const [formEmail, setFormEmail] = useState("");
  const [formUsername, setFormUsername] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formPasswordVerify, setFormPasswordVerify] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const { t } = useTranslation();

  const { getUser } = useContext(UserContext);

  const history = useHistory();

  async function register(e) {
    e.preventDefault();

    const registerData = {
      email: formEmail,
      username: formUsername,
      password: formPassword,
      passwordVerify: formPasswordVerify
    };

    try {
      await axios.post(`${domain}/auth/`, registerData);
    } catch (err) {
      if (err.response) {
        if (err.response.data.errorMessage) {
          setErrorMessage(err.response.data.errorMessage);
        }
      }
      return;
    }
    await getUser();

    history.push("/IVTech");
  }

  return (
    <div className='auth-form'>
      <h2>{t("RegisterNew")}</h2>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          clear={() => setErrorMessage(null)}
        />
      )}
      <form className='form' onSubmit={register}>
        <label htmlFor='form-email'>Email</label>
        <input
          id='form-email'
          type='email'
          value={formEmail}
          onChange={(e) => setFormEmail(e.target.value)}
        />
        <label htmlFor='form-username'>{t("Username")}</label>
        <input
          id='form-username'
          type='username'
          value={formUsername}
          onChange={(e) => setFormUsername(e.target.value)}
        />
        <label htmlFor='form-password'>{t("Password")}</label>
        <input
          id='form-password'
          type='password'
          value={formPassword}
          onChange={(e) => setFormPassword(e.target.value)}
        />
        <label htmlFor='form-passwordVerify'>{t("VerifyPass")}</label>
        <input
          id='form-passwordVerify'
          type='password'
          value={formPasswordVerify}
          onChange={(e) => setFormPasswordVerify(e.target.value)}
        />
        <button className='btn-submit' type='submit'>
          {t("Register")}
        </button>
      </form>
      <p>
      {t("HaveAccount")} <Link to='/login'>{t("LoginInstead")}</Link>
      </p>
    </div>
  );
}

export default Register;
