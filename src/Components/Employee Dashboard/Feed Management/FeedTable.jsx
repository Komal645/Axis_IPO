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
  Stack,
} from '@mui/material';

const FeedTable = () => {
  // const token =
  //   'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlcyI6IlJPTEVfQURNSU4iLCJpYXQiOjE3MDYxNjE0NzUsImV4cCI6MTcwOTc2MTQ3NX0.H2sDyNzPd3botA_4GlmWgsMamJmg-H-m2rMPl6fnBCA';
  // localStorage.setItem('token', token);


  const [editDialogOpen, setEditDialogOpen] = useState(false);
const [editTitle, setEditTitle] = useState('');
const [editDescription, setEditDescription] = useState('');
const [editItemId, setEditItemId] = useState(null);
const [selectedRow,setSelectedRow] = useState('');

const handleEditClick = (id) => {
  const selectedItem = ipos.find((ipo) => ipo.id === id);
  setSelectedRow(selectedItem);
  setEditTitle(selectedItem.title);
  setEditDescription(selectedItem.description);
  setEditItemId(id);
  setEditDialogOpen(true);
};

const handleUpdateClick = async () => {
  try {
    const authToken = localStorage.getItem('token');
    const updatedItem = {
      title: editTitle,
      description: editDescription,
    };

    // Call your backend API to update the item
    await axios.put(`http://localhost:9902/ipo/admin/updateFeed/${selectedRow.id}`, updatedItem, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    // Close the edit dialog
    setEditDialogOpen(false);

    // Fetch updated data
    fetchIpos();
  } catch (error) {
    console.error('Error updating item:', error.message);
    // Handle error, show a message, etc.
  }
};

const handleDeleteClick = async (id) => {
  try {
    const authToken = localStorage.getItem('token');
    
    

    // Call your backend API to update the item
    await axios.delete(`http://localhost:9902/ipo/admin/deleteFeed/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    // Close the edit dialog
    // setEditDialogOpen(false);

    // Fetch updated data
    fetchIpos();
  } catch (error) {
    console.error('Error deleting item:', error.message);
    // Handle error, show a message, etc.
  }
};




  // State to manage data from the backend API
  const [ipos, setIpos] = useState([]);

  // State to manage pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // State to manage filter option (all/active)
  const [filter, setFilter] = useState('all');

  // State to manage search query
  const [searchQuery, setSearchQuery] = useState('');

  // State to track whether to show full description for each row
  const [showFullDescription, setShowFullDescription] = useState({});

  // Function to handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Function to handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Function to handle filter change
  const handleChangeFilter = (newFilter) => {
    setFilter(newFilter);
    setPage(0);
  };

  // Function to handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
    setPage(0);
  };

  // Function to handle "Read More" button click for a specific row
  const handleReadMoreClick = (id) => {
    setShowFullDescription((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Function to fetch data from the backend API
  const fetchIpos = async () => {
    try {
      const authToken = localStorage.getItem('token');
      const response = await axios.get('http://localhost:9902/ipo/merchant/getAllFeeds', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      // Update IPOs and keep existing showFullDescription states
      setIpos(response.data);

      // Ensure that each IPO has an entry in the showFullDescription state
      setShowFullDescription((prev) => {
        const updatedShowFullDescription = { ...prev };
        response.data.forEach((ipo) => {
          updatedShowFullDescription[ipo.id] = updatedShowFullDescription[ipo.id] || false;
        });
        return updatedShowFullDescription;
      });
    } catch (error) {
      console.error('Error fetching ipos:', error.message);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchIpos();
  }, []);

  // Use setInterval to periodically fetch data (every 5 seconds in this example)
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchIpos();
    }, 5000); // 5000 milliseconds = 5 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs once on mount

  const renderDescription = (id, description) => {
    const maxWords = 20;
    const words = description.split(' ');
    const displayText = showFullDescription[id] ? description : words.slice(0, maxWords).join(' ');

    return (
      <div>
        <Typography variant="body2">{displayText}</Typography>
        {words.length > maxWords && (
          <Button onClick={() => handleReadMoreClick(id)}>
            {showFullDescription[id] ? 'Read Less' : 'Read More'}
          </Button>
        )}
      </div>
    );
  };

  const filteredIpos = ipos.filter(
    (ipo) =>
      (filter === 'all' || ipo.status === filter) &&
      ipo.title.toLowerCase().includes(searchQuery)
      // ipo.id.includes(searchQuery)

  );

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginBottom: 2,
        }}
      >
        <TextField
          label="Search by Title"
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
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>Title</TableCell>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>Description</TableCell>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>Post Date</TableCell>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>Updated Date</TableCell>
            <TableCell style={{ backgroundColor: '#f0f0f0', color: '#555555', border: '1px solid #ddd' }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredIpos.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((ipo) => (
            <TableRow key={ipo.id} style={{ border: '1px solid #ddd' }}>
              <TableCell style={{ border: '1px solid #ddd' }}>{ipo.id}</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>{ipo.title}</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>
                {renderDescription(ipo.id, ipo.description)}
              </TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>{ipo.postDate}</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>{ipo.lastUpdatedDate}</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>
                <Button onClick={() => handleEditClick(ipo.id)}>Edit</Button>
                <Button onClick={() => handleDeleteClick(ipo.id)}>Delete</Button>
              </TableCell>
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
<Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            label="Title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Description"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            multiline
            rows={5}
            fullWidth
            margin="dense"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdateClick}>Update</Button>
        </DialogActions>
      </Dialog>



    </Box>
  );
};

export default FeedTable;
