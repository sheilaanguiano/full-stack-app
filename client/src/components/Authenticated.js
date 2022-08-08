import React from 'react';

export default ({ context }) => {
  const authUser = context.authenticatedUser;

  return (
  <div>
      <h1>{ authUser.firstName } is authenticated!</h1>
  </div>
  );
}