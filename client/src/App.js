import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import LandingPage from "./containers/LandingPage.js";
import BillingPage from './containers/BillingPage.js';
import { RefreshrView } from "./components";

export default function App() {
  const [people, setPeople] = useState([]);

  const fetchPeople = async () => {
    const response = await axios("https://refreshr.herokuapp.com/teachers/");
    setPeople(response.data);
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  // if (!people.length) {
  //   return <>Loading...</>;
  // }
  return (
    <>
      <Route
        exact
        path="/"
        render={props => <LandingPage {...props} people={people} />}
      />
      <Route path="/refreshrs" render={props => <RefreshrView />} />
      <Route path="/billing" render={props => <BillingPage />} />
    </>
  );
}
