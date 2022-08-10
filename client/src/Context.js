import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';


/*
* Higher-order component (HOC) that shares functionality 
* across the components of the app. 
*/

export const Context = React.createContext();


export class Provider extends Component {

  state = {
    authenticatedUser: null,
  }

  // Initialize Data
  constructor() {
    super();
    this.data = new Data();
    this.cookie = Cookies.get('authenticatedUser');
    this.state = {
      authenticatedUser: this.cookie ? JSON.parse(this.cookie) : null
    };
  }

  render() {
    // Initialize State
    const { authenticatedUser,
            course,
            courses
    } = this.state;

    const value = {
      authenticatedUser,
      course,
      courses,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut
      },
    };

    return (
      <Context.Provider value ={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    const userPassword = password;
    if(user !== null){
      this.setState(()=> {
        user.userPassword = userPassword;
        return {
          authenticatedUser: user,
        }
      });
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
    }
    return user;
  }

   signOut = () => {
    this.setState(() => {
      return {
        authenticatedUser: null,
      };
    });
    Cookies.remove('authenticatedUser');
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

 export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

