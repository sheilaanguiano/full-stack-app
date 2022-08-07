import React from 'react';


export default class Header extends React.PureComponent {
    render() {
        const { context } = this.props;
        const authUser = context.authenticatedUser;      


        return (
            <header>
                <div className="wrap header--flex">
                    <h1 className="header--logo"><a href="index.html">Courses</a></h1>
                    <nav>
                        { authUser ?
                            <ul className="header--signedin">
                                <React.Fragment>
                                    <li><span>Welcome, {authUser.firstName}!</span></li>
                                    <li><a href="/signout">Sign Out</a></li>
                                </React.Fragment>                            
                            </ul>
                         :
                            <ul className="header--signedout">
                                <React.Fragment>
                                    <li><a href="/signup">Sign Up</a></li>
                                    <li><a href="/signin">Sign In</a></li>
                                </React.Fragment>                            
                            </ul>
                        }                  
                    </nav>
                </div>
            </header>
        );
        
    }
    
}
