import './reset.css';
import './App.css';

// Components -----------------
import Header from './components/Header';
import Courses from './components/Courses';
// import CourseDetail from './components/CourseDetail';
// import CreateCourses from './components/CreateCourse';
// import UpdateCourse from './components/UpdateCourse';
// import UserSignIn from './components/UserSignIn';
// import UserSignOut from './components/UserSignOut';
// import UserSignUp from './components/UserSignUp';
// import Error from './components/Error';
// import Forbidden from './components/Forbidden';
// import NotFound from './components/NotFound';



function App() {
  // fetch('http://localhost:5000/api/courses')
  //  .then(response => response.json())
  //  .then(data => console.log(data));
  return (
    <div>
      <Header />
      <Courses />
    </div>
  );
}

export default App;
