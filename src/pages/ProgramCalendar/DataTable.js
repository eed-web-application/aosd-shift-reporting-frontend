import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


function DataTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Make an API request to fetch data from your backend server
    axios.get('http://localhost:3001/programdata')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


    // Define the column definitions for Ag-Grid
    const columnDefs = [
      { headerName: 'beam source', field: 'beam_source', sortable: true, filter: true },
      { headerName: 'beam destination', field: 'beam_destination', sortable: true, filter: true },
      { headerName: 'program name', field: 'program_name', sortable: true, filter: true },
      { headerName: 'program type', field: 'program_type', sortable: true, filter: true },
      { headerName: 'Start Time', field: 'start_time', sortable: true, filter: true },
      { headerName: 'End Time', field: 'end_time', sortable: true, filter: true },
      
      // Add more columns as needed
    ];

  
  return (
    <div className="ag-theme-alpine" style={{ height: 644, width: '80%' }}>
    <AgGridReact
      columnDefs={columnDefs}
      rowData={data}
      pagination={true}
      paginationPageSize={13}
      suppressCellSelection={true}
    />
  </div>
  );
}

export default DataTable;
