import React, { useState, useEffect, useContext } from "react";
//import "./Event.scss";
import { useTranslation } from "react-i18next";
import domain from "../../util/domain";
import axios from "axios";
import UserContext from "../../context/UserContext";
import "./Mentor.scss";
import ReactDOM from "react-dom";
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
function Mentor({ mentor, getMentors, editMentor, classes }) {

  const { t } = useTranslation();
  const { user } = useContext(UserContext);
  const [role, setRole] = useState();

  const theme = createTheme();

  const cards = [1];






  async function deleteMentor() {
    if (window.confirm("Do you want to delete this mentor?")) {
      await axios.delete(`${domain}/mentors/${mentor._id}`);
      getMentors();
    }
  }

  async function getRole() {
    const role = await axios.get(`${domain}/auth/role/${user}`);
    setRole(role.data);
    return role.data;
  }

  getRole();

  return (
    <div className='mentor-card'>



{/* <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={7}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}> */}
<Card
                  sx={{height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={mentor.image}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                    [TITLU] {mentor.title}
                    </Typography>
                    <Typography>
                    [DESCRIPTION] {mentor.description}
                    </Typography>
                  </CardContent>
                  {(role === "Support" || role ==="Admin") && (
                  <CardActions>
                    <Button size="small" onClick={() => editMentor(mentor)}>Edit</Button>
                    <Button size="small" onClick={deleteMentor}>Delete</Button>
                  </CardActions>
                  )}
                </Card>
                {/* </Grid>
            ))}
          </Grid>
        </Container> */}








      {/* {mentor.title && <h2 className='title'>[TITLU] {mentor.title}</h2>}
      {mentor.description && (
        <pre className='description'>
          <p>[DESCRIERE] {mentor.description}</p>
        </pre>
      )}
      {mentor.image && (
        <pre className='image'>
          <img src={mentor.image} alt="" width="500" height="500"></img>
        </pre>
      )}
      {(role === "Support" || role ==="Admin") && (
        <>
      <button className='btn-edit' onClick={() => editMentor(mentor)}>
        {t("Edit")}
      </button>
      <button className='btn-delete' onClick={deleteMentor}>
        {t("Delete")}
      </button>
      </>
      )} */}
    </div>
  );
}

export default Mentor;