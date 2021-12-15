import axios from "axios";
import React from "react";
import { UserContextProvider } from "./context/UserContext";
import Router from "./Router";
import "./style/index.scss";
import LanguageSelect from "./languageSelect";
import Particles from "./components/particles/Particles";
import { useState, useEffect, useContext } from "react";
import UserContext from "./context/UserContext";
import { BrowserRouter, Route, Switch } from "react-router-dom";


import NewHome from "./components/new_home/NewHome"
import SignInSide from "./components/new_auth/SignInSide"
import SignUpSide from "./components/new_auth/SignUpSide"
import AppAfterLogin from "./AppAfterLogin"
import NewNav from "./components/new_nav/NewNav"

axios.defaults.withCredentials = true;

function AppBeforeLogin() {

  const { user } = useContext(UserContext);

  return (
    <>
     {user === null && (
      //<SignInSide/>
      <>
      <BrowserRouter>
      <Switch>
      <Route exact path='/IVTech/new_signin'>
        <SignInSide/>
      </Route>
      <Route exact path='/IVTech/new_signup'>
        <SignUpSide/>
      </Route>
      <Route path='/'>
        <Particles />
        <NewNav />
        <NewHome />
      </Route>
      </Switch>
      </BrowserRouter>
      {/* <AppAfterLogin /> */}
      </>
    )}
    {user && (
        <AppAfterLogin />
    )}
      </>
  );
}

export default AppBeforeLogin;
