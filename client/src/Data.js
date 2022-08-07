import config from './config';
import { Buffer } from 'buffer'; 

/*
 * Helper class that provides utility methods to allow the 
 * React client to talk to the Express server
*/

export default class Data {

  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {

    /*
    * The url constant configures the request path using the
    * base URL defined in config.js, which gets passed to the
    * returned fetch() method.
    */
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {    
      //Thanks to Bret Kitchell --> TH Slack
      const encodedCredentials = Buffer.from(`${credentials.emailAddress}:${credentials.password}`).toString('base64');

       
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;

    }

    return fetch(url, options);
  }

  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password});
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  async getCourses(){
    const response = await this.api(`/courses`, 'GET', null);
    if(response.status === 200){
      return response.json().then(data => data);
    }
    else if(response.status === 401){
      return null;
    } else {
      throw new Error();
    }
  }
  
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }
}