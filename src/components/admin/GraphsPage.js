import domain from "../../util/domain";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../context/UserContext";
import Plot from "react-plotly.js";
import { useTranslation } from "react-i18next";
import ErrorPage from "../misc/ErrorPage";

function GraphsPage() {

    const [stats, setStats] = useState({});
    const { user } = useContext(UserContext);
    const [errorMessage, setErrorMessage] = useState(null);
    const { t } = useTranslation();
    useEffect(() => {
        if (!user) {
          setStats({});
        } else getStats();
      }, [user]);

    async function getStats() {
      try {
        const getStats = await axios.get(`${domain}/admin/stats`);
        setStats(getStats);
      } catch(err) {
        if (err.response) {
          if (err.response.status) {
            setErrorMessage(err.response.status);
          }
        }
      }
    }
    return (
    <div style={{margin: "auto"}}>
       {errorMessage && (
        <ErrorPage
          status={errorMessage} />
      )}
      {stats.data && (
      <Plot data={[
        {
          x: [t("ActiveUsers"), t("InactiveUsers")],
          y: [stats.data.activeUsers, stats.data.inactiveUsers],
          type: 'bar'
        }
      ]}
        layout={
          {width: "50%", height: "20%", title: t("UserStats")}
        }
        style={{margin: "auto", width: "75%", padding:"1em"}}
      />)}
      {stats.data && (
      <Plot data={[
        {
          labels: [t("User"), t("Support"), t("Admin")],
          values: [stats.data.users, stats.data.supports, stats.data.admins],
          type: 'pie'
        }
      ]}
        layout={
          {width: "50%", height: "20%", title: t("UserDistribution")}
        }
        style={{margin: "auto", width: "75%", padding:"1em"}}
      />)}
      {stats.data && (
      <Plot data={[
        {
          x: [t("3weeks") ,t("2weeks"), t("1week"), t("ThisWeek")],
          y: [stats.data.week4, stats.data.week3, stats.data.week2, stats.data.week1],
          type: 'scatter'
        }
      ]}
        layout={
          {width: "50%", height: "20%", title: t("NewPosts")}
        }
        style={{margin: "auto", width: "75%", padding:"1em"}}
      />)}
    </div>);
}

export default GraphsPage;