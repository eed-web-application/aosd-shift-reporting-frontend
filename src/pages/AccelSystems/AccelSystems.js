// AccelSystems.js
//import './App.css';
import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import DataTable from './DataTable.js'; // Import the DataTable component
import { Button } from 'react-bootstrap'; // Import Bootstrap Button component

function AccelSystems() {
  const [accelsystem, setAccelSystem] = useState(false);
  useEffect(() => {
    getAccelSystem();
  }, []);
  
  function getAccelSystem() {
    console.log("Calling getAccelSystem...");
    fetch('/api/aosd-shift-reporting-backend/accelsystem')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setAccelSystem(data);
      });
  }
  function createAccelSystem() {
    let system_name = prompt('Enter System Name');
    fetch('/api/aosd-shift-reporting-backend/accelsystem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({system_name}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getAccelSystem();
      });
  }
  function deleteAccelSystem() {
    let id = prompt('Enter System Id');
    fetch(`/api/aosd-shift-reporting-backend/accelsystem/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getAccelSystem();
      });
  }
  return (
    <div >
      <Button variant="primary" onClick={createAccelSystem} style={{margin:'5px'}}>Add Accelerator System</Button>
      <Button variant="danger" onClick={deleteAccelSystem} style={{margin:'5px'}}>Delete Accelerator System</Button>
        {accelsystem ? (
          <DataTable/> // Render the DataTable component here
        ) : (
          'There is no Systems data available'
        )}      
    </div>
  );
}

export default AccelSystems;