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
// import CourseDetail from './components/CourseDetail';
// import CreateCourses from './components/CreateCourse';
// import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';
// import Error from './components/Error';
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


export default function App() {

  return (
    <Router>
      <div>
      <HeaderWithContext />
      
      <Switch>
        <Route exact path="/" component={Courses} />
        <PrivateRoute path="/authenticated" component={AuthWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route component={NotFound} />
      </Switch>
 
      </div>
    </Router>
    
  );
}


