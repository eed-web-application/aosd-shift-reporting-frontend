import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


function DataTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Make an API request to fetch data from your backend server
    axios.get('/api/aosd-shift-reporting-backend/beamdest')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


    // Define the column definitions for Ag-Grid
    const columnDefs = [
      { headerName: 'Beam Dest Id', field: 'beam_dest_id', sortable: true, filter: true },
      { headerName: 'Beam Destination', field: 'beam_destination', sortable: true, filter: true, editable: true },
        ];

  
  return (
    <div className="ag-theme-alpine" style={{ height: 644, width: '60%' }}>
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
