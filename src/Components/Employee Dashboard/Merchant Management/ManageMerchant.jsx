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

const ManageMerchant = () => {
  // const token =
  //   'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlcyI6IlJPTEVfQURNSU4iLCJpYXQiOjE3MDYxNjE0NzUsImV4cCI6MTcwOTc2MTQ3NX0.H2sDyNzPd3botA_4GlmWgsMamJmg-H-m2rMPl6fnBCA';
  // localStorage.setItem('token', token);

  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [approveMerchantId, setApproveMerchantId] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [errorText, setErrorText] = useState('');

  const fetchData = async () => {
    try {
      const authToken = localStorage.getItem('token');
      const response = await axios.get('http://localhost:9901/merchant/getAllMerchantExist', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setMerchants(response.data);
    } catch (error) {
      setError('Error fetching data from the server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleViewClick = (merchant) => {
    setSelectedMerchant(merchant);
    setViewDialogOpen(true);
  };

  const handleDialogClose = () => {
    setViewDialogOpen(false);
  };

  const handleApproveClick = (merchantId) => {
    setApproveMerchantId(merchantId);
    setApproveDialogOpen(true);
  };

  const handleApproveDialogClose = () => {
    setApproveDialogOpen(false);
    setApproveMerchantId('');
    setAdditionalInfo('');
    setErrorText('');
  };

  const handleConfirmApprove = async () => {
    try {
      // Check if entered merchant ID matches the selected merchant ID
      if (additionalInfo === approveMerchantId.toString()) {
        // Perform the approval action here using approveMerchantId and additionalInfo
        const authToken = localStorage.getItem('token');
        const response = await axios.post(
          `http://localhost:9901/admin/approveMerchantByAdmin/${additionalInfo}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        console.log(response.data);
        fetchData();

        // Close the approve dialog and reset error text
        handleApproveDialogClose();
      } else {
        // Display an error message below the input field for incorrect merchant ID
        setErrorText('Enter correct merchant ID');
      }
    } catch (error) {
      console.error('Error approving merchant:', error);
      // Handle errors
    }
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredMerchants = merchants.filter((merchant) => {
    let status;

    if (merchant.accountApproved) {
      status = 'active';
    } else {
      status = 'pending';
    }

    return (
      (filter === 'all' || status === filter) &&
      (searchQuery === '' ||
      merchant.fullName && merchant.fullName.toLowerCase().includes(searchQuery) ||
      // merchant.id.includes(searchQuery) ||
      merchant.email && merchant.email.toLowerCase().includes(searchQuery))
    );
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            label="Search by Merchant Name or Email"
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
            color={filter === 'active' ? 'primary' : 'text.primary'}
            onClick={() => handleChangeFilter('active')}
          >
            Active
          </Typography>
          <Typography
            variant="body2"
            style={{ marginRight: '1rem', cursor: 'pointer' }}
            color={filter === 'pending' ? 'primary' : 'text.primary'}
            onClick={() => handleChangeFilter('pending')}
          >
            Pending
          </Typography>
        </Box>
      </Box>

      <Table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <TableHead>
          <TableRow>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>ID</TableCell>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>Merchant Name</TableCell>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>Email</TableCell>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>Status</TableCell>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredMerchants.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((merchant) => (
            <TableRow key={merchant.id} style={{ border: '1px solid #ddd' }}>
              <TableCell style={{ border: '1px solid #ddd' }}>{merchant.id}</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>{merchant.fullName}</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>{merchant.email}</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>
                {merchant.accountApproved ? (
                  <Typography style={{ color: 'green' }}>Active</Typography>
                ) : (
                  <Typography style={{ color: 'orange' }}>Pending</Typography>
                )}
              </TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>
                {merchant.accountApproved ? (
                  <>
                    <Button onClick={() => handleViewClick(merchant)}>View</Button>
                    {/* <Button onClick={() => handleApproveClick(merchant.id)}>Approve</Button> */}
                  </>
                ) : (
                  <>
                    <Button onClick={() => handleViewClick(merchant)}>View</Button>
                    <Button onClick={() => handleApproveClick(merchant.id)}>Approve</Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredMerchants.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={viewDialogOpen} onClose={handleDialogClose} maxWidth="md">
        <DialogTitle>{`Merchant Details - ${selectedMerchant?.fullName}`}</DialogTitle>
        <DialogContent>
          {/* Display merchant details here */}
          <Typography>Merchant ID: {selectedMerchant?.id}</Typography>
          <Typography>Merchant Name: {selectedMerchant?.fullName}</Typography>
          <Typography>Email: {selectedMerchant?.email}</Typography>
          <Typography>Mobile number: {selectedMerchant?.phone}</Typography>
          <Typography>
            Address: {`${selectedMerchant?.address.street}, ${selectedMerchant?.address.city}, ${selectedMerchant?.address.state}, ${selectedMerchant?.address.country}`}
          </Typography>
          <Typography>Pincode: {selectedMerchant?.address.pincode}</Typography>
          <Typography>Status: {selectedMerchant?.accountApproved ? 'Active' : 'Pending'}</Typography>
          {/* Add more details as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={approveDialogOpen} onClose={handleApproveDialogClose} maxWidth="sm">
        <DialogTitle>Approve Merchant </DialogTitle>
        <DialogContent>
          {/* Add a TextField to input the merchant ID */}
          <TextField
            label="Enter Merchant Id"
            variant="outlined"
            type="number"
            fullWidth
            value={additionalInfo}
            onChange={(e) => {
              setAdditionalInfo(e.target.value);
              setErrorText(''); // Clear error text when user changes the input
            }}
          />
          {/* Display error text if there is an error */}
          <Typography variant="caption" color="error">
            {errorText}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleApproveDialogClose}>Cancel</Button>
          <Button onClick={handleConfirmApprove} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageMerchant;
