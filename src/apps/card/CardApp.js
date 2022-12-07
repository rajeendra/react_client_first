
//import logo from './logo.svg';

import React from 'react';
//import ReactDOM from 'react-dom';
import Card from "../../components/Card";
import Navbar from "../../components/Navbar";
import data from "../../data"
import './CardApp.css';

function CardApp() {

  console.log("test point");

  const locations = data.map( location => {
    return <Card location={location} />
  })

  return (
    <div>
     <Navbar />
     <section>
        {locations}
     </section>
    </div>
  );
}

export default CardApp;
