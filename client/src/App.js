import React from 'react';
import './reset.css';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';


// Components -----------------
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';
import Error from './components/Error';
// import Forbidden from './components/Forbidden';
import NotFound from './components/NotFound';
import Authenticated from './components/Authenticated';

// Functions ------------
import withContext from './Context';
import PrivateRoute from './PrivateRoute';


const HeaderWithContext = withContext(Header);
const AuthWithContext = withContext(Authenticated);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CourseDetailWithContext = withContext(CourseDetail);


export default function App() {

  return (
    <Router>
      <div>
        <HeaderWithContext />
        <Switch>
          <Route exact path="/courses" component={Courses}/>
          <Route path="/signin" component={UserSignInWithContext} />  
          <Route path="/signup" component={UserSignUpWithContext} />
          <Route path="/signout" component={UserSignOutWithContext} />
          <Route path="/courses/:id" component={CourseDetail} />
          <Route path="/courses/create" component={CreateCourse} />
          <PrivateRoute path="/authenticated" component={AuthWithContext} />
          
          <PrivateRoute path="/courses/:id/update" component={UpdateCourse} />
          <Route component={Error} />
        </Switch>
      </div>
    </Router>
  );
}


