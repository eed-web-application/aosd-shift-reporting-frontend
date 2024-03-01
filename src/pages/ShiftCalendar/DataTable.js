import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


function DataTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Make an API request to fetch data from your backend server
    axios.get('/api/aosd-shift-reporting-backend/shiftdata')
//    fetch('/api/aosd-shift-reporting-backend/shiftdata')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


    // Define the column definitions for Ag-Grid
    const columnDefs = [
      { headerName: 'Shift Id', field: 'shift_id', sortable: true, filter: true },
      { headerName: 'Start Time', field: 'start_time', sortable: true, filter: true, editable: true },
      { headerName: 'End Time', field: 'end_time', sortable: true, filter: true, editable: true },
      
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
