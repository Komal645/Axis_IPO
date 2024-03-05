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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const EnquiriesTable = () => {
  // const token =
  //   'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlcyI6IlJPTEVfQURNSU4iLCJpYXQiOjE3MDYxNjE0NzUsImV4cCI6MTcwOTc2MTQ3NX0.H2sDyNzPd3botA_4GlmWgsMamJmg-H-m2rMPl6fnBCA';
  // localStorage.setItem('token', token);

  // State to manage enquiries data
  const [enquiries, setEnquiries] = useState([]);

  // State to manage pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // State to manage search query
  const [searchQuery, setSearchQuery] = useState('');

  // State to manage filter option (all/active)
  const [filter, setFilter] = useState('all');

  // State to manage the selected enquiry for the reply dialog
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  // State to manage the reply text
  const [replyText, setReplyText] = useState('');

  // State to manage the reply dialog open/close state
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);

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

  // Function to handle filter change
  const handleChangeFilter = (newFilter) => {
    setFilter(newFilter);
    setPage(0);
  };

  const [replyError, setReplyError] = useState('');
  // Function to handle opening the reply dialog
  const handleReplyOpen = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setReplyText('');
    setReplyDialogOpen(true);
  };

  // Function to handle closing the reply dialog
  const handleReplyClose = () => {
    setSelectedEnquiry(null);
    setReplyText('');
    setReplyError('');
    setReplyDialogOpen(false);
  };

  // Function to handle submitting the reply
  const handleReplySubmit = async () => {
    try {
      // Check if reply text is empty
      if (!replyText.trim()) {
        // Show error message if reply text is empty
        setReplyError('Please enter a response');
        // You might want to set an error state and display a message to the user
        return;
      }
  
      // Perform the action to submit the reply using selectedEnquiry.id and replyText
      const authToken = localStorage.getItem('token');
      const response = await axios.put('http://localhost:9902/ipo/admin/replyEnquiresById', {
        feedId: selectedEnquiry.id,
        comment: replyText,
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      handleReplyClose();
      fetchEnquiries();
    } catch (error) {
      console.error('Error submitting reply:', error.message);
      // Handle the error as needed
      // You might want to set an error state and display a message to the user
    }
  };

  // Function to fetch enquiries data from the API
  const fetchEnquiries = async () => {
    try {
      const authToken = localStorage.getItem('token');
      const response = await axios.get('http://localhost:9902/ipo/admin/getAllEnquiries', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setEnquiries(response.data);
    } catch (error) {
      console.error('Error fetching enquiries:', error.message);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchEnquiries();
  }, []);

  const filteredEnquiries = enquiries.filter((enquiry) =>
    (searchQuery === '' ||
    enquiry.ipoName && enquiry.ipoName.toLowerCase().includes(searchQuery) ||
    // enquiry.id.includes(searchQuery) ||
    enquiry.seriesId && enquiry.seriesId.toLowerCase().includes(searchQuery) ||
    enquiry.problem && enquiry.problem.toLowerCase().includes(searchQuery)) &&
    (filter === 'all' || enquiry.status === filter)
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            label="Search by Ipo Name or Problem or Series Id"
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
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>Merchant Name</TableCell>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>Merchant Email</TableCell>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>Ipo Name</TableCell>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>Series ID</TableCell>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>Problem</TableCell>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>Description</TableCell>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>Enquiry Date</TableCell>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredEnquiries.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((enquiry) => (
            <TableRow key={enquiry.id} style={{ border: '1px solid #ddd' }}>
              <TableCell style={{ border: '1px solid #ddd' }}>{enquiry.id}</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>{enquiry.merchant.fullName}</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>{enquiry.merchant.email}</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>{enquiry.ipoName}</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>{enquiry.seriesId}</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>{enquiry.problem}</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>{enquiry.description}</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>{enquiry.enquiryDate}</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>
                {enquiry.status === 'OPEN' ? (
                  <Button onClick={() => handleReplyOpen(enquiry)}>Reply</Button>
                ) : null}
                {enquiry.status === 'CLOSED' ? (
                  <Typography>Closed</Typography>
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredEnquiries.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Reply Dialog */}
      <Dialog open={replyDialogOpen} onClose={handleReplyClose}>
        <DialogTitle>Reply to Enquiry</DialogTitle>
        <DialogContent>
          <TextField
            label="Your Reply"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          {replyError && (
      <Typography color="error" variant="caption">
        {replyError}
      </Typography>
    )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReplyClose}>Cancel</Button>
          <Button onClick={handleReplySubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EnquiriesTable;
