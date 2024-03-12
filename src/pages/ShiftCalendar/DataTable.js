// Datatable.js 
// For formatting the Shift Dates data
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import moment from 'moment';
import 'moment-timezone';

function DataTable({ data: propsData }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Make an API request to fetch data from your backend server
    axios.get('/api/aosd-shift-reporting-backend/shiftdata')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Define the column definitions for Ag-Grid
  const columnDefs = [
    { headerName: 'Shift Id', 
    field: 'shift_id', 
    sortable: true, 
    filter: true 
    },
    {
      headerName: 'Start Time',
      field: 'start_time',
      sortable: true,
      filter: true,
      valueFormatter: params => {
        return moment(params.value).tz('America/Los_Angeles').format('YYYY-MM-DD HH:mm');
      },
    },
    {
      headerName: 'End Time',
      field: 'end_time',
      sortable: true,
      filter: true,
      valueFormatter: params => {
        return moment(params.value).tz('America/Los_Angeles').format('YYYY-MM-DD HH:mm');
      },
    },
    { headerName: 'Shift Comments', 
    field: 'comments', 
    sortable: true, 
    filter: true 
    }
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 644, width: '80%' }}>
      <AgGridReact
        key={propsData?.length} // prop to force re-render
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
