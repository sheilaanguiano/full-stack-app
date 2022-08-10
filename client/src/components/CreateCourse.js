import React, { useContext, useState, } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../Context';
import Form from './Form';


const CreateCourse =() => {

    let history = useHistory();
    const context = useContext(Context);
    const authenticatedUser = context.authenticatedUser;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [errors, setErrors] = useState([]);

    const submit = () => {
        const emailAddress = authenticatedUser.emailAddress;
        const password = authenticatedUser.userPassword;
        const userId = authenticatedUser.id;

        console.log(authenticatedUser);
          
         // New course payload to be passed to createCourse()
        const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId,
        }
        
        context.data.createCourse(course, emailAddress, password)
          .then(errors => {
            if(errors.length){
                setErrors(errors)  
            } else {
                console.log('course created!!!');
                history.push('/courses')
            }
          })
          .catch(err => { 
            console.log(err);
            history.push('/error');     
          });
    }


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
        history.push('/courses');
      }

  return (
    <main>
        <div className="wrap">
            <h2>Create Course</h2>
            <Form
                cancel={cancel}
                errors={errors}
                submit={submit}
                submitButtonText="Create Course"
                elements={() =>(
                <React.Fragment>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="title">Course Title</label>
                            <input  
                                id="title" 
                                name="title" 
                                type="text" 
                                defaultValue=""
                                onChange={change}    
                                />
                              
                                <p> By {authenticatedUser.firstName} {authenticatedUser.lastName}</p>
                        
                            <label htmlFor="description">Course Description</label>
                            <textarea 
                                id="description" 
                                name="description"
                                defaultValue=""
                                onChange={change} 
                            />
                        </div>

                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input 
                                id="estimatedTime" 
                                name="estimatedTime" 
                                type="text" 
                                defaultValue=""
                                onChange={change} 
                                />
                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea 
                                id="materialsNeeded" name="materialsNeeded"
                                defaultValue=""
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

export default CreateCourse;