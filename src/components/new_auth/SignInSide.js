import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import domain from "../../util/domain";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ParticleImage, { ParticleOptions } from "react-particle-image";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import ErrorMessage from "../misc/ErrorMessage";
import { useTranslation } from "react-i18next";
//import LanguageSelect from "../../languageSelect";

// google
import {GoogleLogin} from 'react-google-login'
import {useDispatch} from 'react-redux'

//import images
import image1 from './images/image1.jpeg'
import image2 from './images/image2.jpeg'
import image3 from './images/image3.jpeg'
import image4 from './images/image4.jpeg'
import image5 from './images/image5.jpeg'
import man1 from './images/man1.jpeg'
import tim_lee from './images/tim_lee.jpeg'
import { red } from "@material-ui/core/colors";

const imageArray = [image1,image2,image3,image4,image5]

const randomNumber = Math.floor(Math.random() * 5);

const chosenImage = image1;

const particleOptions = {
    filter: ({ x, y, image }) => {
      // Get pixel
      const pixel = image.get(x, y);
      // Make a particle for this pixel if blue > 50 (range 0-255)
      return pixel.b > 70;
    },
    color: ({ x, y, image }) => "white",
    radius: () => 0.6
  };


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/IVTech">
        IVTech
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    // backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundImage: `url(${imageArray[randomNumber]})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  particleImage:{
      height: '100%',
      weight: '100%',
      width: '100%',
      backgroundColor: 'black',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const [width, setWidth]   = useState(window.innerWidth);
const [height, setHeight] = useState(window.innerHeight);
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
  history.push("/");
  window.location.reload();
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



const updateDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
}
useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
}, []);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      {/* <Grid item xs={false} sm={4} md={7} className={classes.image} > */}
      {/* <Grid item xs={false} sm={4} md={7} className={classes.particleImage}> */}
{/* <div className={classes.particleImage}> */}
    {width > 960 && (
        <Grid item xs={false} sm={4} md={7} className={classes.particleImage}>
    <div className={classes.particleImage}>
    <ParticleImage
      src={tim_lee}
      scale={0.55}
      entropy={3}
      maxParticles={7000}
      mouseMoveForceDuration
      particleOptions={particleOptions}
      backgroundColor="#000112"
      //mouseMoveForce={300}
    //   touchMoveForce={3}
      style={{width:  width/1.716,
        height: height}}
    />
    </div>
    </Grid>
    )}

{/* </div> */}
    {/* </Grid> */}


      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={login}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              type='email'
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formPassword}
              onChange={(e) => setFormPassword(e.target.value)}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <GoogleLogin
          clientId="369268854649-jjt1gm6ios96qk090gghnke93oq45bf3.apps.googleusercontent.com"
          render={(renderProps) => (
            <Button fullWidth
            variant="contained"
            color="secondary"
            onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign in with GOOGLE</Button>
          )}
          onSuccess = {googleSuccess}
          onFailure = {googleFailure}
          cookiePolicy = "single_host_origin"
        />
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/IVTech/new_signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}