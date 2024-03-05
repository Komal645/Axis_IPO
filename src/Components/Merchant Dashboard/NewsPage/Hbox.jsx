import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import imgipo from '../../../Assets/bh.png';

const Container = styled(Box)({
  background: 'linear-gradient(to right, #eeeeee, #999999)',
  padding: theme => theme.spacing(2),
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  overflow: 'hidden',
  backgroundImage: `url(${imgipo})`, // Set image as background
  backgroundSize: 'cover', // Adjust to your needs
  backgroundPosition: 'center', // Adjust to your needs
});

const Heading = styled(Typography)({
  color: '#333333',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  [theme => theme.breakpoints.down('sm')]: {
    whiteSpace: 'normal',
    overflow: 'visible',
  },
});

const Hbox = () => {
  return (
    <Container sx={{ padding: '8rem 4rem', width: '100%' }}>
      {/* <Heading variant="h6">
        <span style={{ fontSize:'1.3rem', fontWeight:'bold'}}>Axis IPO</span>
        <span style={{ display: 'block' }}>Invest in IPO to earn interest</span>
      </Heading> */}
    </Container>
  );
};

export default Hbox;
