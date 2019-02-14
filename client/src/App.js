import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import LandingPage from "./containers/LandingPage.js";
import { RefreshrView } from "./components";

export default function App() {
  const [people, setPeople] = useState([]);

  const fetchPeople = async () => {
    const response = await axios("https://swapi.co/api/people/");
    setPeople(response.data.results);
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <>
      <Route
        exact
        path="/"
        render={props => <LandingPage {...props} people={people} />}
      />
      <Route path="/refreshrs" render={props => <RefreshrView />} />
    </>
  );
}
