import React from 'react';

export default ({ context }) => {
  const authUser = context.authenticatedUser;

  return (
  <div>
      <h1>{ authUser.firstName } is authenticated!</h1>
      <h2>{authUser.emailAddress}</h2>
      {/* <p>{authUser.password}</p> */}
  </div>
  );
}