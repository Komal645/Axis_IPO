import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import img from '../../../Assets/ad.jpeg'

const Container = styled(Box)({
    background: 'linear-gradient(to right, #000080, #3366cc)',
    padding: theme => theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
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
  
  const Image = styled('img')({
    maxWidth: '100%',
    height: '150',
    marginLeft: theme => theme.spacing(2),
    [theme => theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  });
  
  const Banner = () => {
    return (
      <Container sx={{padding:'0rem 0rem', marginBottom:'1rem', width:'100%'}}>
      <Image src={img} alt="IPO Image" height={'250'} width={'100%'} />
        {/* <Heading variant="h6" marginRight={'2rem'}>
          <span style={{color:'white', fontSize:'1.3rem', fontWeight:'bold'}}>Axis IPO</span>
          <span style={{color:'white', display: 'block' }}>Invest in IPO to earn interest</span>
        </Heading> */}
  
        
      </Container>
    );
  };

export default Banner;