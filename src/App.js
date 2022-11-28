
//import logo from './logo.svg';

import React from 'react';
//import ReactDOM from 'react-dom';
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import data from "./data"
import './App.css';

function App() {

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

export default App;
