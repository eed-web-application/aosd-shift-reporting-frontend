// BeamDest.js
//import './App.css';
import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import DataTable from './DataTable.js'; // Import the DataTable component
import { Button } from 'react-bootstrap'; // Import Bootstrap Button component

//import { format } from 'date-fns';
import moment from 'moment';

function BeamDest() {
  const [beamdest, setBeamDest] = useState(false);
  useEffect(() => {
    getBeamDest();
  }, []);
  
  function getBeamDest() {
    console.log("Calling getBeamDest...");
    fetch('/api/aosd-shift-reporting-backend/beamdest')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setBeamDest(data);
      });
  }
  function createBeamDest() {
    let beam_destination = prompt('Enter Beam Destination');
    fetch('/api/aosd-shift-reporting-backend/beamdest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({beam_destination}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getBeamDest();
      });
  }
  function deleteBeamDest() {
    let id = prompt('Enter Beam Destination Id');
    fetch(`/api/aosd-shift-reporting-backend/beamdest/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getBeamDest();
      });
  }
  return (
    <div >
      <Button variant="primary" onClick={createBeamDest} style={{margin:'5px'}}>Add Beam Destination</Button>
      <Button variant="danger" onClick={deleteBeamDest} style={{margin:'5px'}}>Delete Beam Destination</Button>
        {beamdest ? (
          <DataTable/> // Render the DataTable component here
        ) : (
          'There is no Beam Destination data available'
        )}      
    </div>
  );
}

export default BeamDest;