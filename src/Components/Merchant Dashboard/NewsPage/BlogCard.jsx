import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Divider } from '@mui/material';
import axios from 'axios';

const BlogCard = ({id, title, date, description, existingComments }) => {
  
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(existingComments);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleCommentClick = () => {
    console.log(id);
    setShowComments(!showComments);
  };

  // const handleAddComment = () => {
  //   if (comment.trim() !== '') {
  //     setComments([...comments, comment]);
  //     setComment('');
  //   }
  // };

  const handleAddComment = async (id) => {
    // event.preventDefault();
    // Prepare the enquiry data
    if (comment.trim() === '') {
      // alert('Please fill in all required fields.');
      return;
    }
    const commentData = {
      "feedId":id,
      "comment": comment,
    };

    try {


      const authToken = localStorage.getItem('token');
      const response = await axios.post('http://localhost:9902/ipo/merchant/addComment', commentData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      // alert("ss");
      

      setComments([...comments, response.data]);
      // Clear the form fields
      console.log(response.data);
      setComment('');
    } catch (error) {
      console.error('Error add comment:', error);
    }
  };
// kibana
  const handleReadMoreClick = () => {
    setShowFullDescription(true);
  };

  return (
    <Card style={{ width: '90%', margin: '16px' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" marginBottom={2}>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2">{date}</Typography>
        </Box>
        <Typography paragraph>
          {description.length > 200 && !showFullDescription
            ? `${description.slice(0, 200)}...`
            : description}
          {description.length > 200 && !showFullDescription && (
            <Button onClick={handleReadMoreClick} color="primary">
              Read More
            </Button>
          )}
        </Typography>
        <Box display="flex" justifyContent="flex-end">
          <Button onClick={handleCommentClick} color="primary">
            {showComments ? 'Hide Comments' : 'Show Comments'}
          </Button>
        </Box>
        
        {showComments && (
          <Box marginTop={2}>
          <Divider></Divider>
            <Typography variant="h6">Existing Comments:</Typography>
            {comments.map((comment, index) => (
              
              <Typography key={index} variant="body2">
                {comment.comment}
              </Typography>
              
            ))}
            <Box marginTop={2}>
              <TextField
                fullWidth
                multiline
                rows={2}
                variant="outlined"
                label="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button onClick={()=>handleAddComment(id)} color="primary" variant="contained" style={{ marginTop: '8px' }}>
                Add Comment
              </Button>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

const BlogList = () => {

  // const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrdW1hcmlha2Fua3NoYTMzOEBnbWFpbC5jb20iLCJyb2xlcyI6IlJPTEVfTUVSQ0hBTlQiLCJpYXQiOjE3MDYxODU4NTAsImV4cCI6MTcwOTc4NTg1MH0._7IUn1KesK1VuQbB8BGeck6i4SEz-_kiyOzEvOKdscI";
  // localStorage.setItem('token', token);



  // const DummyBlogData = [
  //   {
  //     title: 'News Title 1',
  //     date: '2024-01-20',
  //     description:
  //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  //     comments: ['Comment 1', 'Comment 2', 'Comment 3'],
  //   },
  //   {
  //     title: 'News Title 2',
  //     date: '2024-01-21',
  //     description:
  //       'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  //     comments: ['Comment 4', 'Comment 5'],
  //   },
  //   {
  //     title: 'News Title 3',
  //     date: '2024-01-22',
  //     description:
  //       'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
  //     comments: ['Comment 6'],
  //   },
  // ];

  const [DummyBlogData,setDummyBlogData] = useState([]);

  useEffect(() => {
    // Fetch available IPOs
    const fetchIPOs = async () => {
      try {
        const authToken = localStorage.getItem('token');
        const response = await axios.get('http://localhost:9902/ipo/merchant/getAllFeeds', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        setDummyBlogData(response.data);
        console.log(DummyBlogData);
      } catch (error) {
        console.error('Error fetching IPOs:', error);
      }
    };

    fetchIPOs();
  }, []); // Run once on component mount

  const [comments,setComments]=useState([]);

  
    // Fetch available IPOs
    const fetchComments = async () => {
      try {
        const authToken = localStorage.getItem('token');
        const response = await axios.get('http://localhost:9902/ipo/merchant/getAllComments', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        setComments(response.data);
        console.log(comments);
      } catch (error) {
        console.error('Error fetching IPOs:', error);
      }
    };
    useEffect(() => {

    fetchComments();
  }, []); // Run once on component mount


  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredBlogs = DummyBlogData.filter(blog =>
    blog.title.includes(searchQuery) ||
    blog.title.includes(searchQuery.toUpperCase()) ||  // Case-sensitive check for uppercase
    blog.title.includes(searchQuery.toLowerCase())     // Case-sensitive check for lowercase
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', paddingRight: '16px', paddingTop: '16px' }}>
      <TextField
        label="Search by Title"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        size="small"
        style={{ marginBottom: '16px' }}
      />
      {filteredBlogs.map((blog, index) => (
        <BlogCard
          key={index}
          id={blog.id}
          title={blog.title}
          date={blog.lastUpdatedDate || blog.postdate}
          description={blog.description}
          existingComments={comments.filter((comment)=>comment.feeds.id===blog.id)}
        />
      ))}
    </div>
  );
};

export default BlogList;
