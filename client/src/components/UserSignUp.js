import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
    state = {
        firstName: '',
        LastName: '',
        emailAddress:'',
        password: '',
        errors: [],
      }
    
    render() {
        const {
          firstName,
          lastName,
          emailAddress,
          password,
          errors,
        } = this.state;
        
        return (
            <main>
                <div class="form--centered">
                    <h2>Sign Up</h2>
                    
                    <Form
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Sign Up"
                        elements={() => (
                            <React.Fragment>
                                <label for="firstName">First Name</label>
                                <input 
                                    id="firstName" 
                                    name="firstName" 
                                    type="text" 
                                    value={firstName}
                                    onChange={this.change}
                                    placeholder="Name" />
                                
                                <label for="lastName">Last Name</label>
                                <input 
                                    id="lastName" 
                                    name="lastName" 
                                    type="text" 
                                    value={lastName}
                                    onChange={this.change}
                                    placeholder="Last Name" />
                                <label for="emailAddress">Email Address</label>
                                <input 
                                    id="emailAddress" 
                                    name="emailAddress" 
                                    type="email" 
                                    value={emailAddress}
                                    onChange={this.change} 
                                    placeholder="Email"
                                    />
                                <label for="password">Password</label>
                                <input 
                                    id="password" 
                                    name="password" 
                                    type="password" 
                                    value={password}
                                    onChange={this.change} 
                                    placeholder="Password" />
                            </React.Fragment>
                        )} 
                    />
                    <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
                </div>
            </main>
        );
    }

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState(() => {
          return {
            [name]: value
          };
        });
      }
    
      submit = () => {
        const { context } = this.props;
      
        const {
            firstName,
            lastName,
            emailAddress,
            password,
        } = this.state;
    
         // New user payload to be passed to createUser()
         const user = {
            firstName,
            lastName,
            emailAddress,
            password,
        };
        
        //Method to Create a user via API using Context
        context.data.createUser(user)
          .then(errors => {
            if(errors.length){
              this.setState({ errors });
            } else {
              console.log(`${firstName} ${lastName} is successfully signed up and authenticated!`);
              context.actions.signIn(emailAddress, password)
                .then(()=> {
                  this.props.history.push('/courses');
                });
            }
          })
          .catch(err => {
            //handle rejected promises
            console.log(err);
            // push to history stack
            this.props.history.push('/error');
          });
      }
    
      cancel = () => {
        this.props.history.push('/');
      }
}