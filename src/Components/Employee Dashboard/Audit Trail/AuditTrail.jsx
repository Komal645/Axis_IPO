import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TablePagination,
  Box,
  TextField,
} from '@mui/material';

const AuditTrail = () => {
  // Dummy data for testing
  // const dummyAuditTrail = [
  //   { id: 1, timestamp: '2022-01-20T12:30:45', date: '02/01/2022', action: 'Edit', recordId: 123, doneBy: 'User 1' },
  //   { id: 2, timestamp: '2022-01-21T09:15:30', date: '02/01/2022', action: 'Delete', recordId: 124, doneBy: 'User 2' },
  //   { id: 3, timestamp: '2022-01-22T15:45:20', date: '02/01/2022', action: 'Edit', recordId: 125, doneBy: 'User 3' },
  //   // Add more dummy data as needed
  // ];

  const [dummyAuditTrail,setDummyAuditTrail] = useState([]);
  const fetchLog = async () => {
    try {
      const authToken = localStorage.getItem('token');
      const response = await axios.get('http://localhost:9901/admin/getAllLogs', {   
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      // Update IPOs and keep existing showFullDescription states
      setDummyAuditTrail(response.data);
      console.log(dummyAuditTrail);

      
    } catch (error) {
      console.error('Error fetching log:', error.message);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchLog();
  }, []);
  
  // Use setInterval to periodically fetch data (every 5 seconds in this example)
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchLog();
    }, 5000); // 5000 milliseconds = 5 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs once on mount


  // State to manage pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // State to manage search query
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Function to handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Function to handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
    setPage(0);
  };

  const filteredAuditTrail = dummyAuditTrail.filter((entry) =>
    Object.values(entry).some((value) => value.toString().toLowerCase().includes(searchQuery))
  );

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end', // Align to the right
          alignItems: 'center',
          marginBottom: 2,
        }}
      >
        <TextField
          label="Search by Action and Done By"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          size="small"
        />
      </Box>

      <Table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <TableHead>
          <TableRow>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>ID</TableCell>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>Date</TableCell>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>Time</TableCell>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>Record ID</TableCell>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>Action</TableCell>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>Done By User ID</TableCell>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>Done By</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredAuditTrail.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((entry) => (
            <TableRow key={entry.id} style={{ border: '1px solid #ddd' }}>
              <TableCell style={{ border: '1px solid #ddd' }}>{entry.id}</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>{entry.date}</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>{entry.time}</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>{entry.recordId}</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>{entry.action}</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>{entry.doneById}</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>{entry.doneBy}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredAuditTrail.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default AuditTrail;
