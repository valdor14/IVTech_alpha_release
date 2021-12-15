import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/misc/Navbar";
import Home from "./components/home/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";



//import Compiler from "./components/compiler/Compiler";
import Compiler from "./components/code_ide/Ide";



import Featured from "./components/support/Featured";
import NotFeatured from "./components/support/NotFeatured";
import MainFeaturedCourses from "./components/featured/featured_courses/MainFeatured";
import MainFeaturedSnippets from "./components/featured/featured_snippets/MainFeatured";
import Admin from "./components/admin/Admin";
import Validate from "./components/validate/Validate";
import Page404 from "./components/misc/Page404"
import GraphsPage from "./components/admin/GraphsPage";
import AddCourse from "./components/add_courses/AddCourse";
import Event from "./components/events/Events";
import FeaturedEvents from "./components/events/FeaturedEvents";
import FeaturedMentors from "./components/mentors/FeaturedMentors";
import Mentor from "./components/mentors/Mentors";
import Interview from "./components/interviews/Interviews";
import FeaturedInterviews from "./components/interviews/FeaturedInterviews";

// imports for official layout
import HomePage from "./components/ivtech_main/HomePage"
import PracticePage from "./components/ivtech_practice/PracticePage"
import ApisPage from "./components/apis/ApisPage"

//home in development
import NewHome from "./components/new_home/NewHome"
import SignInSide from "./components/new_auth/SignInSide"
import SignUpSide from "./components/new_auth/SignUpSide"
import NewNav from "./components/new_nav/NewNav"
import ContactPage from "./components/contact/ContactPage"



function Router() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      {/* <NewNav /> */}
      <Switch>
        <Route exact path='/'>
          <NewHome />
        </Route>
        <Route exact path='/IVTech/support/featured'>
          <Featured />
        </Route>
        <Route exact path='/IVTech/support/add_courses'>
          <AddCourse />
        </Route>
        <Route exact path='/IVTech/featured/snippets'>
          <MainFeaturedSnippets />
        </Route>
        <Route exact path='/featured/courses'>
          <MainFeaturedCourses />
        </Route>
        <Route exact path='/IVTech/admin/manageUsers'>
          <Admin />
        </Route>
        <Route exact path='/IVTech/admin/stats'>
          <GraphsPage />
        </Route>
        <Route exact path='/events/featured'>
          <FeaturedEvents />
        </Route>
        <Route exact path='/mentors/featured'>
          <FeaturedMentors />
        </Route>
        <Route exact path='/IVTech/support'>
          <NotFeatured />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
        <Route path='/validate/'>
          <Validate />
        </Route>
        <Route path='/compiler/'>
          <Compiler />
        </Route>
        <Route path='/support/add_events'>
          <Event />
        </Route>
        <Route path='/support/add_mentors'>
          <Mentor />
        </Route>
        <Route path='/support/add_interviews'>
          <Interview />
        </Route>
        <Route path='/IVTech/support/contact'>
          <ContactPage />
        </Route>

      {/* aici incepe partea oficiala */}

        <Route exact path='/IVTech'>
          <HomePage />
        </Route>
        <Route exact path='/IVTech/courses'>
          <MainFeaturedCourses />
        </Route>
        <Route exact path='/IVTech/mentors'>
          <FeaturedMentors />
        </Route>
        <Route exact path='/IVTech/practice'>
          <PracticePage />
        </Route>
        <Route exact path='/IVTech/practice/interview'>
          <FeaturedInterviews />
        </Route>
        <Route exact path='/IVTech/practice/compiler'>
          <Compiler />
        </Route>
        <Route exact path='/IVTech/practice/apis'>
          <ApisPage />
        </Route>
        <Route exact path='/IVTech/practice/snippets'>
          <MainFeaturedSnippets />
        </Route>
        <Route exact path='/IVTech/social'>
          <FeaturedEvents />
        </Route>


        {/* homepage test */}
        <Route exact path='/home'>
          <NewHome />
        </Route>
        <Route exact path='/IVTech/new_signin'>
          <SignInSide/>
        </Route>
        <Route exact path='/IVTech/new_signup'>
          <SignUpSide/>
        </Route>


        <Route path='*'>
          <Page404 />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
