import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignIn extends Component {
    state = {
        emailAddress: '',
        password: '',
        errors:[],
    } 

    render(){
        const {
            emailAddress,
            password,
            errors,
        } = this.state;

        return (
            <main>
                <div class="form--centered">
                    <h2>Sign In</h2>

                    <Form 
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Sign In"
                        elements={() => (
                            <React.Fragment>
                                <label htmlFor="emailAddress">Email Address</label>
                                <input 
                                    id="emailAddress" 
                                    name="emailAddress" 
                                    type="email" 
                                    value={emailAddress}
                                    onChange={this.change}
                                    placeholder="Email" />
                                <label htmlFor="password">Password</label>
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
                    <p>Don't have a user account? Click here to <Link to="/singup">sign up</Link>!</p>
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
        const { from } = this.props.location.state || { from: { pathname: '/courses' } };

        const { emailAddress, password } = this.state;
        
        context.actions.signIn(emailAddress, password)
          .then( user => {
            if(user === null){
              this.setState(() => {
                return { errors: ['Sign-in was unsucccessful']};
              });
            } else {
              this.props.history.push(from);
              console.log(`SUCCESS! ${emailAddress} is now signed in!  o(≧∇≦o)`);
            }
          })
          .catch( err => {
            console.log(err);
            this.props.history.push('/error');
          })
      }
    
      cancel = () => {
        this.props.history.push('/');
      }

}