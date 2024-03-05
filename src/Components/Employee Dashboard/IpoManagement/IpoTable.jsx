import React, { useState, useEffect } from 'react';
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
  Typography,
  TextField,
} from '@mui/material';

const IpoTable = () => {


  // const token =
  //   'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlcyI6IlJPTEVfQURNSU4iLCJpYXQiOjE3MDYxNjE0NzUsImV4cCI6MTcwOTc2MTQ3NX0.H2sDyNzPd3botA_4GlmWgsMamJmg-H-m2rMPl6fnBCA';
  // localStorage.setItem('token', token);

  const [ipos, setIpos] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  
    // Fetch IPO data from your backend API
    const fetchIpos = async () => {
      try {
        const authToken = localStorage.getItem('token');
        const response = await axios.get(
          'http://localhost:9902/ipo/merchant/getAllIpos',
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setIpos(response.data);
      } catch (error) {
        console.error('Error fetching IPOs:', error.message);
      }
    };
    useEffect(() => {

    fetchIpos();
  }, []); // Empty dependency array means this effect runs once on mount
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchIpos();
    }, 5000); // 5000 milliseconds = 5 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeFilter = (newFilter) => {
    setFilter(newFilter);
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
    setPage(0);
  };

  const filteredIpos = ipos.filter((ipo) =>
    (filter === 'all' || ipo.status === filter) &&
    ipo.ipoName.toLowerCase().includes(searchQuery)
  );

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            label="Search by Ipo Name"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            size="small"
          />
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Typography
            variant="body2"
            style={{ marginRight: '1rem', cursor: 'pointer' }}
            color={filter === 'all' ? 'primary' : 'text.primary'}
            onClick={() => handleChangeFilter('all')}
          >
            All
          </Typography>
          <Typography
            variant="body2"
            style={{ marginRight: '1rem', cursor: 'pointer' }}
            color={filter === 'OPEN' ? 'primary' : 'text.primary'}
            onClick={() => handleChangeFilter('OPEN')}
          >
            Active
          </Typography>
        </Box>
      </Box>

      <Table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <TableHead>
          <TableRow>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>ID</TableCell>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>IPO Name</TableCell>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>Series Id</TableCell>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>Lot Size</TableCell>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>Offer Size</TableCell>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>Min Investment</TableCell>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>Price Range</TableCell>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>Start Date</TableCell>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>End Date</TableCell>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredIpos.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((ipo) => (
            <TableRow key={ipo.id} style={{ border: '1px solid #ddd' }}>
              <TableCell style={{ border: '1px solid #ddd' }}>{ipo.id}</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>{ipo.ipoName}</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>{ipo.seriesId}</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>{ipo.lotSize}</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>{ipo.totalOfferSize}</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>{ipo.minInvestment}</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>{ipo.minPriceRange}$ - {ipo.maxPriceRange}$</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>{ipo.startDate}</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>{ipo.endDate}</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>{ipo.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredIpos.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default IpoTable;
