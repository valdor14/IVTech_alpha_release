import axios from "axios";
import React from "react";
import { UserContextProvider } from "./context/UserContext";
import Router from "./Router";
import "./style/index.scss";
import LanguageSelect from "./languageSelect";
import Particles from "./components/particles/Particles";
import { useState, useEffect, useContext } from "react";
import UserContext from "./context/UserContext";
import AppBeforeLogin from "./AppBeforeLogin"

import SignInSide from "./components/new_auth/SignInSide"

axios.defaults.withCredentials = true;

function App() {

  //const { user } = useContext(UserContext);

  return (
    <UserContextProvider>

    <AppBeforeLogin />
    </UserContextProvider>
  );
}

export default App;
