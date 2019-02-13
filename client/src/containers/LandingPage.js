import React from 'react';

const LandingPage = (props) => {
  return (
    <>
      {props.data.map((message) => (
        <div key={message.id}>
          <h1>{message.message}</h1>
        </div>
      ))}
    </>
  );
};

export default LandingPage;
