import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {Context} from '../Context';


const CourseDetail = () => {
    const [course, setCourse] = useState([]);
    const {id} = useParams();
    const context = useContext(Context);

    useEffect(() => {
        context.data.getCourse(id).then((course) =>{
            if(course){
                setCourse(course);
            }else {
                console.log('Oh noes');
            }
        })
    },[]);
    

    
    
    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    <a className="button" href="update-course.html">Update Course</a>
                    <a className="button" href="button">Delete Course</a>
                    <a className="button button-secondary" href="index.html">Return to List</a>
                </div>
            </div>

            {/* Course Details */}
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                            <p>{course.user.firstName} {course.user.lastName}</p>

                            <p>{course.description}</p>
                            
                           
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                {course.materialsNeeded}
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default CourseDetail;