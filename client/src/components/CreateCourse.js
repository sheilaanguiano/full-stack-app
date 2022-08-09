import React, { Component } from 'react';
import Form from './Form';
// import { Context }  from "../Context";

export default class CreateCourse extends Component {
  
  state= {
    title: '',
    description:'',
    estimatedTime:'',
    materialsNeeded: '',
    userId:'',
    errors: [],
   }

  render(){
    const { context } = this.props;
    const authUser = context.authenticatedUser; 

    const {
        title,
        description,
        estimatedTime,
        materialsNeeded,
        userId,
        errors,
    } = this.state

    return (
        <main>
            <div class="wrap">
                <h2>Create Course</h2>

                <Form
                   cancel={this.cancel}
                   errors={errors}
                   submit={this.submit}
                   submitButtonText="Create Course"
                   elements={() =>(
                    <React.Fragment>
                        <div class="main--flex">
                            <div>
                                <label htmlFor="title">Course Title</label>
                                <input  
                                    id="title" 
                                    name="title" 
                                    type="text" 
                                    value={title} 
                                    onChange={this.change}    
                                    />
                                    { authUser && (
                                    <p> By {authUser.firstName} {authUser.LastName}</p>
                                )}
                                <label htmlFor="description">Course Description</label>
                                <textarea 
                                    id="description" 
                                    name="description"
                                    value={description}
                                    onChange={this.change} 
                                />
                            </div>

                            <div>
                                <label htmlFor="estimatedTime">Estimated Time</label>
                                <input 
                                    id="estimatedTime" 
                                    name="estimatedTime" 
                                    type="text" 
                                    value={estimatedTime}
                                    onChange={this.change} 
                                    />
                                <label htmlFor="materialsNeeded">Materials Needed</label>
                                <textarea 
                                    id="materialsNeeded" name="materialsNeeded"
                                    value={materialsNeeded} 
                                    onChange={this.change}
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
        // const {emailAddress, password, id} = authUser;
      
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId,
        } = this.state;
    
         // New course payload to be passed to createCourse()
         const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            // userId: id,
        };
        
        // context.data.createCourse(course, {emailAddress, password})
        //   .then(errors => {
        //     if(errors.length){
        //       this.setState({ errors });
        //     } else {
        //       context.actions.signIn(emailAddress, password)
        //         .then(()=> {
        //           this.props.history.push('/courses');
        //         });
        //     }
        //   })
        //   .catch(err => { 
        //     this.props.history.push('/error');
        //   });
    }

    cancel = () => {
        console.log(this.props.history);
        this.props.history.push('/courses', );
      }




}