import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Form from './Form';
import { Context }  from '../Context';

const UserSignUp = () => {
  
  const history = useHistory();
  const context = useContext(Context);
  const[firstName, setFirstName] = useState('');
  const[lastName, setLastName] = useState('');
  const[emailAddress, setEmailAddress] = useState('');
  const[password, setPassword] = useState();
  const[errors, setErrors] = useState([]);
  
  // Creates a new User
  const submit = () => {
    const user = {
       firstName,
       lastName,
       emailAddress,
       password,
   };
   
   context.data.createUser(user)
     .then(errors => {
       if(errors.length){
         setErrors(errors);
       } else {
         context.actions.signIn(emailAddress, password)
           .then(()=> {
               history.push('/courses');
           });
       }
     })
     .catch(err => {     //handle rejected promises
       console.log(err);
       history.push('/error');
     });
 }

  // User Input
  const change = (event) => {
    const value = event.target.value;
    switch (event.target.name){
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "emailAddress":
        setEmailAddress(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        return;
    }
  }

  const cancel = () => {
    // console.log(this.props.history);
    history.push('/courses');
  }

  
  return (
    <main>
        <div className="form--centered">
            <h2>Sign Up</h2>
            
            <Form
                cancel={cancel}
                errors={errors}
                submit={submit}
                submitButtonText="Sign Up"
                elements={() => ( //render prop
                    <React.Fragment>
                        <label htmlFor="firstName">First Name</label>
                        <input 
                            id="firstName" 
                            name="firstName" 
                            type="text" 
                            defaultValue={firstName}
                            onChange={change}
                            placeholder="Name" />
                        
                        <label htmlFor="lastName">Last Name</label>
                        <input 
                            id="lastName" 
                            name="lastName" 
                            type="text" 
                            defaultValue={lastName}
                            onChange={change}
                            placeholder="Last Name" />
                        <label htmlFor="emailAddress">Email Address</label>
                        <input 
                            id="emailAddress" 
                            name="emailAddress" 
                            type="email" 
                            defaultValue={emailAddress}
                            onChange={change} 
                            placeholder="Email"
                            />
                        <label htmlFor="password">Password</label>
                        <input 
                            id="password" 
                            name="password" 
                            type="password" 
                            defaultValue={password}
                            onChange={change} 
                            placeholder="Password" />
                    </React.Fragment>
                )} 
            />
            <p>Already have a user account? Click here to <Link to='/signin'>sign in</Link>!</p>
        </div>
    </main>
  )
};

export default UserSignUp;