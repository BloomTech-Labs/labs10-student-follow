import React from 'react';

export default function LandingPage(props) {
  return (
    <>
      {props.people.map((person) => (
        <div key={person.name}>
          <h1>{person.name}</h1>
        </div>
      ))}
    </>
  );
}
