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
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
// const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);


export default function App() {

  return (
    <Router>
      <div>
        <HeaderWithContext />
        <Switch>

          {/* <Route exact path="/" component={Courses}/> */}
          <Route  exact path="/courses" component={Courses}/>
          <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
          <PrivateRoute path="/courses/:id/update" component={UpdateCourse} />
          <Route path="/courses/:id" component={CourseDetail} />
          <Route path="/signin" component={UserSignInWithContext} />  
          <Route path="/signup" component={UserSignUp} />
          <Route path="/signout" component={UserSignOutWithContext} />
          <Route component={Error} />

          <PrivateRoute path="/authenticated" component={AuthWithContext} />
          
         
          
        </Switch>
      </div>
    </Router>
  );
}


