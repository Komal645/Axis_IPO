import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import img1 from '../../../Assets/ipo.jpg'

const MyCard = () => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const description = "This is the full description of the card. It can be longer than 50 words This is the full description of the card. It can be longer than 50 words This is the full description of the card. It can be longer than 50 words This is the full description of the card. It can be longer than 50 words This is the full description of the card. It can be longer than 50 words. You can add more text here if needed. This is the full description of the card. It can be longer than 50 words This is the full description of the card. It can be longer than 50 words This is the full description of the card. It can be longer than 50 words This is the full description of the card. It can be longer than 50 words This is the full description of the card. It can be longer than 50 words. You can add more text here if needed.";

  const shortDescription = description.length > 100 ? description.substring(0, 100) + "..." : description;

  return (
    <Card sx={{width:300, boxShadow:'10px', margin:'1rem'}}>
      {/* Image */}
      <CardMedia
        component="img"
        alt="Image Alt Text"
        
        image={img1}
      />

      <CardContent>
        {/* Heading */}
        <Typography variant="h5" component="div">
          Card Heading
        </Typography>

        {/* Description */}
        <Typography variant="body2" color="text.secondary">
          {showFullDescription ? description : shortDescription}
        </Typography>

        {/* Read More Button */}
        {description.length > 50 && (
          <Button onClick={toggleDescription} color="primary">
            {showFullDescription ? 'Read Less' : 'Read More'}
          </Button>
        )}

        {/* Comment Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
        <Button variant="text" color="primary">
            View more
          </Button>
          {/* <Button variant="text" color="primary">
            Comment
          </Button> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default MyCard;
