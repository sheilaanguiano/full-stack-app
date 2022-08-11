import React, { useState, useEffect, useContext }  from 'react';
import { Context } from '../Context';
import { Link } from 'react-router-dom';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const context = useContext(Context);

    //Fetch data with the useEffect hook
    useEffect(() => {
        context.data.getCourses()
            .then((courses) => {
                if(courses){
                    setCourses(courses);
                } else {
                    console.log("Error");
                }
            })
    },
    []);

    return (
        <main>
            <div className="wrap main--grid">
                {courses.map(course => {
                    return (
                        <Link to={`/courses/${course.id}`} className="course--module course--link" key={course.id}   >
                        <h2 className="course--label">Course</h2>
                        <h3 className="course--title">{ course.title }</h3> 
                        </Link>
                    );
                }) }


                {/* Link to Create a Course */}
                <Link className="course--module course--add--module" to={'/courses/create'}>
                    <span className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                        New Course
                    </span>
                </Link>
            </div>
        </main>
    );
}

export default Courses;