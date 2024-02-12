import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


function DataTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Make an API request to fetch data from your backend server
    axios.get('http://localhost:3001')
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
      { headerName: 'Start Time', field: 'start_time', sortable: true, filter: true },
      { headerName: 'End Time', field: 'end_time', sortable: true, filter: true },
      
      // Add more columns as needed
    ];

  
  return (
    // <div>
    //   {/* Display the data in a table */}
    //   <table>
    //     <thead>
    //       <tr>
    //         <th>Area Id</th>
    //         <th>Area Code</th>
    //         <th>Area Name</th>
    //         {/* Add more table headers for each column */}
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {data.map(item => (
    //         <tr key={item.area_id}>
    //           <td>{item.area_id}</td>
    //           <td>{item.area_code}</td>
    //           <td>{item.area}</td>
    //           {/* Render additional columns here */}
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
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
