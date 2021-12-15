import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/UserContext";
import "./AuthForm.scss";
import ErrorMessage from "../misc/ErrorMessage";
import domain from "../../util/domain";
import { useTranslation } from "react-i18next";
//import LanguageSelect from "../../languageSelect";

// google
import {GoogleLogin} from 'react-google-login'
import {useDispatch} from 'react-redux'


function Login() {
  const { t } = useTranslation();
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  //const dispatch = useDispatch() // google
  const { getUser } = useContext(UserContext);

  const history = useHistory();

  async function login(e) {
    e.preventDefault();

    const loginData = {
      email: formEmail,
      password: formPassword,
    };

    try {
      await axios.post(`${domain}/auth/login`, loginData);
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

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try{
      //dispatch({type: 'AUTH', data: {result, token}}) // send result and token
      //localStorage.setItem('profile', JSON.stringify({...result}))
      console.log(result)
      console.log(token)
      const userData = {data: result, token: token}
      localStorage.setItem('profile', JSON.stringify({userData}))
      await axios.post(`${domain}/auth/gLogin`, userData);
      history.push("/");
      window.location.reload();
    }catch(error){
      console.log(error)
    }
  }

  const googleFailure = () => {
    console.log("Google sign in was UNSUCCESSFUL. TRY AGAIN")
  }

  return (
    <div className='auth-form'>
      <h2>{t("Login")}</h2>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          clear={() => setErrorMessage(null)}
        />
      )}
      <form className='form' onSubmit={login}>
        <label htmlFor='form-email'>Email</label>
        <input
          id='form-email'
          type='email'
          value={formEmail}
          onChange={(e) => setFormEmail(e.target.value)}
        />
        <label htmlFor='form-password'>{t("Password")}</label>
        <input
          id='form-password'
          type='password'
          value={formPassword}
          onChange={(e) => setFormPassword(e.target.value)}
        />
        <button className='btn-submit' type='submit'>
        {t("Login")}
        </button>
      </form>
      <p>
      {t("NoAccount")} <Link to='/register'>{t("RegisterHere")}</Link>
      </p>
      <GoogleLogin
          clientId="369268854649-jjt1gm6ios96qk090gghnke93oq45bf3.apps.googleusercontent.com"
          render={(renderProps) => (
            <button onClick={renderProps.onClick} disabled={renderProps.disabled}>GOOGLE</button>
          )}
          onSuccess = {googleSuccess}
          onFailure = {googleFailure}
          cookiePolicy = "single_host_origin"
        />
    </div>
  );
}

export default Login;
