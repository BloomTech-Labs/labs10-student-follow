import React from 'react';

export default function LandingPage(props) {
  return (
    <>
      {props.people.map((people) => (
        <div key={people.id}>
          <h1>{people.firstname}</h1>
        </div>
      ))}
    </>
  );
}
