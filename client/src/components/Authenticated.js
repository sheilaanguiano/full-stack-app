import React from 'react';

export default ({ context }) => {
  const authUser = context.authenticatedUser;

  return (
  <div className="bounds">
      <h1>{ authUser.firstName } is authenticated!</h1>
  </div>
  );
}