import React, { useContext, useState } from "react";
//import "./Event.scss";
import { useTranslation } from "react-i18next";
import domain from "../../util/domain";
import axios from "axios";
import UserContext from "../../context/UserContext";
import "./Event.scss";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
//import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// destructuring props into event
function Event({ event, getEvents, editEvent }) {

  const { t } = useTranslation();
  const { user, getUser } = useContext(UserContext);
  const [role, setRole] = useState();

  async function deleteEvent() {
    if (window.confirm("Do you want to delete this event?")) {
      await axios.delete(`${domain}/events/${event._id}`);
      getEvents();
    }
  }

  async function getRole() {
    const role = await axios.get(`${domain}/auth/role/${user}`);
    setRole(role.data);
    return role.data;
  }

  getRole();

  var dispDate = event.date;
  var cdate = (new Date(dispDate)).toString();
  return (
<div className='event-card'>
<Card
                  sx={{height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={event.image}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                    [TITLU] {event.title}
                    </Typography>
                    <Typography>
                    [DESCRIPTION] {event.description}
                    </Typography>
                  </CardContent>
                  {(role === "Support" || role ==="Admin") && (
                  <CardActions>
                    <Button size="small" onClick={() => editEvent(event)}>Edit</Button>
                    <Button size="small" onClick={deleteEvent}>Delete</Button>
                  </CardActions>
                  )}
                </Card>
</div>











    // <div className='event'>
    //   {event.title && <h2 className='title'>[TITLU] {event.title}</h2>}
    //   {event.date && (
    //     <p className='date'>[DATA] {cdate}</p>
    //   )}
    //   {event.description && (
    //     <pre className='description'>
    //       <p>[DESCRIERE] {event.description}</p>
    //     </pre>
    //   )}
    //   {event.location && (
    //     <pre className='location'>
    //       <p>[LOCATIE] {event.location}</p>
    //     </pre>
    //   )}
    //   {event.image && (
    //     <pre className='image'>
    //       <img src={event.image} alt="" width="500" height="500"></img>
    //     </pre>
    //   )}
    //   {(role === "Support" || role === "Admin") && (
    //     <>
    //   <button className='btn-edit' onClick={() => editEvent(event)}>
    //     {t("Edit")}
    //   </button>
    //   <button className='btn-delete' onClick={deleteEvent}>
    //     {t("Delete")}
    //   </button>
    //   </>
    //   )}
    // </div>
  );
}

export default Event;
