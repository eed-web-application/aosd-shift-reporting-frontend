// ProgramCalendar.js
//import './App.css';
import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import DataTable from './DataTable.js'; // Import the DataTable component
import { Button } from 'react-bootstrap'; // Import Bootstrap Button component

function ProgramCalendar() {
  const [programdata, setProgram] = useState(false);
  useEffect(() => {
    getProgram();
  }, []);
  
  function getProgram() {
    console.log("Calling getProgram...");
    fetch('/api/aosd-shift-reporting-backend/programdata')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setProgram(data);
      });
  }
 
  return (
    <div >
        {programdata ? (
          <DataTable/> // Render the DataTable component here
        ) : (
          'There is no Program data available'
        )}      
    </div>
  );
}

export default ProgramCalendar;