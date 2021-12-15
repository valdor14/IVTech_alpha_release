import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import VerifiedUser from "./VerifiedUser";
import UnverifiedUser from "./UnverifiedUser";
import "./Home.scss";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";
import domain from "../../util/domain";
import ErrorPage from "../misc/ErrorPage";

function Admin() {
  const [users, setUsers] = useState([]);
  const { user } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (!user) {
      setUsers([]);
    } else getUsers();
  }, [user]);

  async function getUsers() {
    try {
      const usersRes = await axios.get(`${domain}/admin/manageUsers`);
      setUsers(usersRes.data);
    } catch(err) {
      console.log("ERRORRRRRRRRR");
      if (err.response) {
        if (err.response.status) {
          setErrorMessage(err.response.status);
        }
      }
    }
  }

  function renderUsers() {
    let sortedUsers = [...users];
    sortedUsers = sortedUsers.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return sortedUsers.map((userDisp, i) => {
      return (  
        <div>
        { 
        userDisp.validation === true ? (
        <VerifiedUser
          key={i}
          user={userDisp}
          getUsers={getUsers}
        />) : (
          <UnverifiedUser
            key={i}
            user={userDisp}
            getUsers={getUsers}
          />)
      }
      </div>
        
      );
    });
  }

  return (
    <div className='home'>
      {errorMessage && (
        <ErrorPage
          status={errorMessage} />
      )}
      {users.length > 0
        ? renderUsers()
        : user && (
            <p className='no-snippets-msg'>EMPTY HERE</p>
          )}
      {user === null && (
        <>
          <div className='no-user-message'>
            <h2>Welcome to Snippet manager</h2>
            <Link to='/register'>Register here</Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Admin;
