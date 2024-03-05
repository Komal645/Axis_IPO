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

const IpoApplicationManagement = () => {
  // const token =
  //   'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlcyI6IlJPTEVfQURNSU4iLCJpYXQiOjE3MDYxNjE0NzUsImV4cCI6MTcwOTc2MTQ3NX0.H2sDyNzPd3botA_4GlmWgsMamJmg-H-m2rMPl6fnBCA';
  // localStorage.setItem('token', token);

  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [approveMerchantId, setApproveMerchantId] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [errorText, setErrorText] = useState('');
  // const [selectedMerchant, setSelectedMerchant] = useState(null);

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
        const response = await axios.put(
          `http://localhost:9902/ipo/admin/ipoApplicationApproveById/${additionalInfo}`,
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



  const [merchants, setMerchants] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

// useEffect(() => {
  const fetchData = async () => {
    try {
      // Assuming you have the JWT token stored in localStorage
      const authToken = localStorage.getItem('token');

      const response = await axios.get('http://localhost:9902/ipo/admin/getAllIpoApplications', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setMerchants(response.data);
      console.log(merchants);
    } catch (error) {
      console.error('Error fetching data from the server:', error.message);
    }
  };

  useEffect(() => {
  fetchData();
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

  const filteredMerchants = merchants.filter((merchant) => {
  const isStatusMatch =
    (filter === 'all' || merchant.status === filter) &&
    (searchQuery === '' ||
    // (merchant.id.includes(searchQuery)) ||
    (merchant.ipo.ipoName && merchant.ipo.ipoName.toLowerCase().includes(searchQuery)) ||
      (merchant.merchant.fullName && merchant.merchant.fullName.toLowerCase().includes(searchQuery)));

  // Include both 'DECLINED' and 'WITHDRAW' when the filter is 'Closed'
  const isClosedFilter = filter === 'CLOSED' && ['DECLINED', 'WITHDRAW'].includes(merchant.status);

  return isStatusMatch || isClosedFilter;
});

  

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            label="Search by Merchant Name or Ipo Name"
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
            color={filter === 'APPROVED' ? 'primary' : 'text.primary'}
            onClick={() => handleChangeFilter('APPROVED')}
          >
            Active
          </Typography>
          <Typography
            variant="body2"
            style={{ marginRight: '1rem', cursor: 'pointer' }}
            color={filter === 'PENDING' ? 'primary' : 'text.primary'}
            onClick={() => handleChangeFilter('PENDING')}
          >
            Pending
          </Typography>
          <Typography
            variant="body2"
            style={{ marginRight: '1rem', cursor: 'pointer' }}
            color={filter === 'CLOSED' ? 'primary' : 'text.primary'}
            onClick={() => handleChangeFilter('CLOSED')}
          >
            Closed
          </Typography>
        </Box>
      </Box>

      <Table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <TableHead>
          <TableRow>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>Application ID</TableCell>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>Merchant ID</TableCell>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>Merchant Name</TableCell>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>Ipo Name</TableCell>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>Lot Size</TableCell>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>Bid Price</TableCell>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>Total Insvestment</TableCell>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>Apply Date</TableCell>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>Offer Size</TableCell>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>Status</TableCell>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>Action Date</TableCell>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredMerchants.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((merchant) => (
            <TableRow key={merchant.id} style={{ border: '1px solid #ddd' }}>
              <TableCell style={{ border: '1px solid #ddd' }}>{merchant.id}</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>{merchant.merchant.id}</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>{merchant.merchant.fullName}</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>{merchant.ipo.ipoName}</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>{merchant.alotSize}</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>{merchant.bidPrice}</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>{merchant.totalInvestement}</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>{merchant.applyDate}</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>{merchant.ipo.totalOfferSize}</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>
                {merchant.status=='APPROVED' ? (
                  <Typography style={{ color: 'green' }}>Active</Typography>
                ) : merchant.status=='PENDING' ? (
                  <Typography >Pending</Typography>
                ): merchant.status=='DECLINED'?(
                  <Typography >Decline</Typography>
                ): merchant.status === 'WITHDRAW' ? (
                  <>
                  <Typography >Withdraw</Typography>
                  </>
                ) : null}
              </TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>{merchant.actionDate}</TableCell>
              {/* <TableCell style={{ border: '1px solid #ddd' }}>{merchant.s}</TableCell> */}
              <TableCell style={{ border: '1px solid #ddd' }}>
                {merchant.status === 'APPROVED' ? (
                  <>
                    {/* <Button onClick={() => onView(merchant.id)}>View</Button> */}
                    {/* <Button onClick={() => onApprove(merchant.id)}>Approve</Button> */}
                  </>
                ) : merchant.status === 'PENDING' ? (
                  <>
                    {/* <Button onClick={() => onView(merchant.id)}>View</Button> */}
                    <Button onClick={() => handleApproveClick(merchant.id)}  >Approve</Button>
                    {/* <Button >Decline</Button> */}
                  </>
                ) : merchant.status === 'DECLINED' || merchant.status === 'WITHDRAW' ? (
                  <>
                    {/* <Button onClick={() => onView(merchant.id)}>View</Button> */}
                    {/* <Button onClick={() => onApprove(merchant.id)}>Approve</Button> */}
                  </>
                ) : null}
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

export default IpoApplicationManagement;
