import React, { useContext, useEffect, useState, } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Context } from '../Context';
import Form from './Form';


const UpdateCourse =() => {
    const {id} = useParams();
    let history = useHistory();
    const context = useContext(Context);
    const authenticatedUser = context.authenticatedUser;
    //Initialize state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [errors, setErrors] = useState([]);


    // Fetch data of the course to be Updated
    useEffect(() => {
        context.data.getCourse(id)
        .then(course => {
          setTitle(course.title)
          setDescription(course.description)
          setEstimatedTime(course.estimatedTime)
          setMaterialsNeeded(course.materialsNeeded)
        })
        .catch(err => {     //handle rejected promises
            console.log(err);
        }); 
    },[context.data, id, errors])

    const submit = () => {
        const emailAddress = authenticatedUser.emailAddress;
        const password = authenticatedUser.userPassword;
        const userId = authenticatedUser.id;
          
         // New course payload to be passed to createCourse()
        const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId,
        }
        //Send the payload to the API to process the information or return the validation errors
        context.data.updateCourse(course, id, emailAddress, password)
        .then(errors => {
            console.log(`output: ${errors}`)
            if (errors && errors.length){
                setErrors(errors);  //Validations errors that will appear on the error display
            } else {
                console.log('Course Updated!!!');
                history.push('/')
            }
          })
        .catch(err => { 
            console.log(err);
            history.push('/error');     
        })  
    }

    // Sets the new state when the form is updated
    const change = (event) => {
        const value = event.target.value;
        switch (event.target.name){
          case "title":
            setTitle(value);
            break;
          case "description":
            setDescription(value);
            break;
          case "estimatedTimed":
            setEstimatedTime(value);
            break;
          case "materialsNeeded":
            setMaterialsNeeded(value);
            break;
          default:
            return;
        }
      }
    
    // Redirects to the main page
    const cancel = () => {
        history.push('/');
      }

  return (
    <main>
        <div className="wrap">
            <h2>Update Course</h2>
            <Form
                cancel={cancel}
                errors={errors}
                submit={submit}
                submitButtonText="Update Course"
                elements={() =>(
                <React.Fragment>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="title">Course Title</label>
                            <input  
                                id="courseTitle" 
                                name="title" 
                                type="text" 
                                defaultValue={title}
                                onChange={change}    
                                />
                              
                                <p> By {authenticatedUser.firstName} {authenticatedUser.lastName}</p>
                        
                            <label htmlFor="description">Course Description</label>
                            <textarea 
                                id="description" 
                                name="description"
                                defaultValue={description}
                                onChange={change} 
                            />
                        </div>

                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input 
                                id="estimatedTime" 
                                name="estimatedTime" 
                                type="text" 
                                defaultValue={estimatedTime}
                                onChange={change} 
                                />
                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea 
                                id="materialsNeeded" name="materialsNeeded"
                                defaultValue={materialsNeeded}
                                onChange={change}
                                />
                        </div>
                    </div>
                </React.Fragment>
                )}
            />
            </div>
        </main>   
  );
}

export default UpdateCourse;