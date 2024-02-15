// ShiftCalendar.js
//import './App.css';
import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import DataTable from './DataTable.js'; // Import the DataTable component
import { Button } from 'react-bootstrap'; // Import Bootstrap Button component

//import { format } from 'date-fns';
import moment from 'moment';

function ShiftCalendar() {
  const [shiftdata, setShiftCal] = useState(false);
  useEffect(() => {
    getShiftCal();
  }, []);
  
  function getShiftCal() {
    console.log("Calling getShiftCal...");
    fetch('http://localhost:3001')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setShiftCal(data);
      });
  }
  function createShiftCal() {
    let start_time = prompt('Enter Shift start time');
    let end_time = prompt('Enter Shift end time');
    fetch('http://localhost:3001/shiftdata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({start_time, end_time}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getShiftCal();
      });
  }
  function deleteShiftCal() {
    let id = prompt('Enter Shift Id');
    fetch(`http://localhost:3001/shiftdata/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getShiftCal();
      });
  }
  return (
    <div >
      <Button variant="primary" onClick={createShiftCal} style={{margin:'5px'}}>Add Shift</Button>
      <Button variant="danger" onClick={deleteShiftCal} style={{margin:'5px'}}>Delete Shift</Button>
        {shiftdata ? (
          <DataTable/> // Render the DataTable component here
        ) : (
          'There is no Shift data available'
        )}      
    </div>
  );
}

export default ShiftCalendar;