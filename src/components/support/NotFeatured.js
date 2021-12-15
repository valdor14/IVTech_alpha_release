import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import Snippet from "./Snippet";
import SnippetEditor from "./SnippetEditor";
import "../home/Home.scss";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";
import domain from "../../util/domain";
import { useTranslation } from "react-i18next";
import ErrorPage from "../misc/ErrorPage";

function NotFeatured() {
  const [snippets, setSnippets] = useState([]);
  const [snippetEditorOpen, setSnippetEditorOpen] = useState(false);
  const [editSnippetData, setEditSnippetData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { t } = useTranslation();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      setSnippets([]);
    } else getSnippets();
  }, [user]);

  async function getSnippets() {
    try {
      const snippetsRes = await axios.get(`${domain}/support`);
      setSnippets(snippetsRes.data);
    } catch(err) {
      if (err.response) {
        if (err.response.status) {
          setErrorMessage(err.response.status);
        }
      }
    }
  }

  function editSnippet(snippetData) {
    setEditSnippetData(snippetData);
    setSnippetEditorOpen(true);
  }

  function renderSnippets() {
    let sortedSnippets = [...snippets];
    sortedSnippets = sortedSnippets.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return sortedSnippets.map((snippet, i) => {
      return (
        <Snippet
          key={i}
          snippet={snippet}
          getSnippets={getSnippets}
          editSnippet={editSnippet}
        />
      );
    });
  }

  return (
    <div className='home'>
      {errorMessage && (
        <ErrorPage
          status={errorMessage} />
      )}
      {snippetEditorOpen && (
        <SnippetEditor
          setSnippetEditorOpen={setSnippetEditorOpen}
          getSnippets={getSnippets}
          editSnippetData={editSnippetData}
        />
      )}
      {snippets.length > 0
        ? renderSnippets()
        : user && (
            <p className='no-snippets-msg'>{t("NoSnippets")}</p>
          )}
      {user === null && (
        <>
          <div className='no-user-message'>
            <h2>{t("Welcome")}</h2>
            <Link to='/register'>{t("RegisterHere")}</Link>
          </div>
        </>
      )}
    </div>
  );
}

export default NotFeatured;
