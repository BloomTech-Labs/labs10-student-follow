import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import LandingPage from './containers/LandingPage.js';

export default function App() {
  const [people, setPeople] = useState([]);

  const fetchPeople = async () => {
    const response = await axios('https://swapi.co/api/people/');
    setPeople(response.data.results);
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <>
      <Route
        path="/"
        render={(props) => <LandingPage {...props} people={people} />}
      />
    </>
  );
}
