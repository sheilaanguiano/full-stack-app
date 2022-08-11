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
      const encodedCredentials = Buffer.from(`${credentials.emailAddress}:${credentials.password}`).toString('base64');
      
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;

    }
    return fetch(url, options);
  }

  // User  ------------------
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

  // Courses ---------------------
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

  async getCourse(id){
    const response = await this.api(`/courses/${id}`, 'GET', null);
    if(response.status === 200){
      return response.json().then(data => data);
    }else if (response.status === 401){
      return console.log('Something is wrong');
    } else {
      throw new Error();
    }
  }

  async createCourse(course, emailAddress, password){
    console.log(`Context Password: ${password}`);
    const response = await this.api(`/courses`, 'POST', course, true, {emailAddress, password});
    if (response.status === 201){
        return [];
    } else if(response.status === 400){
        return response.json().then(data=> data.errors);
    } else {
        throw new Error();
    }
  }

  async updateCourse(course, id, emailAddress, password){
    const response = await this.api(`/courses/${id}`, 'PUT', course, true, {emailAddress, password});
    if(response.status === 204){
        console.log('Course updated');
    } else if(response.status === 400) {
      return response.json().then(data => data.errors);
    } else {
      throw new Error();
    }
  }

  // Makes a 'DELETE' request
  async deleteCourse( id, emailAddress, password){
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, {emailAddress, password});
    if(response.status === 204){ //Course deleted
      console.log(`course ${id} was deleted`);
    } else if (response.status === 403) {
      console.log("You're not authorized to delete this course");
    } else {
      throw new Error();
    }
  }

}