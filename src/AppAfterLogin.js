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
import NewNav from "./components/new_nav/NewNav"


axios.defaults.withCredentials = true;

function AppAfterLogin() {

  const { user } = useContext(UserContext);

  return (
    <>
     {/* {user === null && (
      //<SignInSide/>
      <>
      <Particles />
      <NewHome />
      </>
    )} */}
    {(user || !user) && (
        <>
      <div style={{position:"fixed", top:0, left: 0, right: 0, height:"100%"}}>
        <Particles />
      </div>
      <div className="language-select">
        <LanguageSelect />
      </div>
      <NewNav />
      <BrowserRouter>
      <Switch>
      <Route path='/IVTech'>
      <div className='container'>
        <Router />
      </div>
      </Route>
      <Route exact path='/'>
          <NewHome />
      </Route>
      <div style={{position:"relative",bottom:0,width:"100%", minHeight: "10vh", background: "Orange"}}>
        TODO FOOTER
      </div>
      </Switch>
      </BrowserRouter>
      </>
    )}
      </>
  );
}

export default AppAfterLogin;
