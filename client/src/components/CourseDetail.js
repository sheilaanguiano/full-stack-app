import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
// import {Context} from '../Context';


function CourseDetail() {
    const [course, setCourse] = useState([]);
    // const context = useContext(Context.Context);
    const {id} = useParams();
    let history = useHistory();

    useEffect(() => {
        const fetchData = async() => {
            // try {
                const response = await fetch(`http://localhost:5000/api/courses/${id}`);
                if(response.status === 200) {
                    const json = await response.json();
                    setCourse(json);
                } else if (response.status === 500) {
                    history.push('/error');
                } else {
                    history.push('/notfound');
                }
            // } catch (err) {
            //     console.log("error", err)
            // }
        };
        fetchData();
    }, [id, history]);       
                      
   
    

    
    
    return (
        <main>
            {/* Action Buttons  */}
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
                            <p>John Doe</p>

                            <p>Lorem Ipsum</p>
                            
                           
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>1000</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                <li>Thing 1</li>
                                <li>Thing 2</li>
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default CourseDetail;