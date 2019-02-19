import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import {RefreshrView, BillingPage, Auth} from './components'

export default function App() {
  const [people, setPeople] = useState([]);

  const fetchPeople = async () => {
    const response = await axios("https://refreshr.herokuapp.com/teachers/");
    setPeople(response.data);
  };

   
  useEffect(() => {
    fetchPeople();
  }, []);

  const auth = new Auth();
  auth.login();
  
  return (
    <>  
    <Route path="/refreshrs" render={props => <RefreshrView />} />
    <Route path="/billing" render={props => <BillingPage />} />
    </>
  );
}
