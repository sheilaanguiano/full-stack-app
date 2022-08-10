import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Context } from '../Context';


export default function CourseDetail() {
    const {id} = useParams();
    let history = useHistory();
    const context = useContext(Context);
    const [course, setCourse] = useState([]);
    const authenticatedUser = context.authenticatedUser;

    useEffect(() => {
        const fetchData = async() => {
                const response = await fetch(`http://localhost:5000/api/courses/${id}`);
                if(response.status === 200) {
                    const json = await response.json();
                    setCourse(json);
                } else if (response.status === 500) {
                    history.push('/error');
                } else {
                    history.push('/notfound');
                }
        };
        fetchData();
    }, [history, id]);       

    console.log(authenticatedUser);
                      
   const handleDelete = () => {
        const emailAddress = authenticatedUser.emailAddress;
        const password = authenticatedUser.userPassword;
      
        context.data.deleteCourse(id, emailAddress, password)
        .then(errors => {
            if(errors){
                console.log(`Failed with: ${errors}`);
            } else {
                console.log('Course Deleted');
                history.push('/courses');
            }
          })
        .catch(err => {
            history.push('/error');
        })

   }


   
    return (
        <main>
            {/* Action Buttons  */}
            <div className="actions--bar">
                <div className="wrap">
                    { authenticatedUser && authenticatedUser.id === course.userId 
                        ?
                        <React.Fragment>
                            <Link className="button" to="/courses/:id/update">Update Course</Link>
                            <Link className="button" to="button" onClick={handleDelete}>Delete Course</Link>
                            <Link className="button button-secondary" to="/courses">Return to List</Link>
                        </React.Fragment>
                        :
                        <Link className="button button-secondary" to="/courses">Return to List</Link>
                    }
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
                            {course.user && (
                              <p>
                              By {course.user.firstName} {course.user.lastName}
                              </p>
                            )}
                            <ReactMarkdown>{course.description}</ReactMarkdown>    
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
};

