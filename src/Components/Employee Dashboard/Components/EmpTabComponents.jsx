
import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import ManageMerchant from '../Merchant Management/ManageMerchant';
import IpoApplicationManagement from '../Merchant IPO Application Management/IpoApplicationMangement';
import IpoForm from '../IpoManagement/IpoForm';
import IpoTable from '../IpoManagement/IpoTable';
import FeedForm from '../Feed Management/FeedForm';
import FeedTable from '../Feed Management/FeedTable';
import EnquiriesTable from '../Enquiries Management/EnquiriesTable';
import AuditTrail from '../Audit Trail/AuditTrail';

const EmpTabsComponent = () => {
  const [value, setValue] = useState(0);
  const [hoveredTab, setHoveredTab] = useState(null);

  const tabNames = ['Merchant Management', 'IPO Management','Merchant IPO Management' ,'Feed Management', 'Enquiries', 'Audit Trail'];
  const tabContents = ['Merchant Management', 'IPO Management', 'Merchant IPO Management','Feed Management',  'Enquiries', 'Audit Trail'];

  const setActiveTab = (tabIndex) => {
    setValue(tabIndex);
    setHoveredTab(null);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setHoveredTab(null);
  };

  const handleTabMouseOver = (event, index) => {
    setHoveredTab(index);
  };

  const handleTabMouseLeave = () => {
    setHoveredTab(null);
  };

  const renderTabContent = () => {
    switch (value) {
      case 0:
        return <ManageMerchant></ManageMerchant>;
      case 1:
        return <Box display={'flex'} flexDirection={'column'} gap={1} ><IpoForm /><Divider /><IpoTable /></Box>;
      case 2:
        return <IpoApplicationManagement></IpoApplicationManagement>;
      case 3:
        return <Box display={'flex'} flexDirection={'column'} gap={1}> <FeedForm /><Divider /><FeedTable /></Box>;
      case 4:
        return <EnquiriesTable />;
      case 5:
        return <AuditTrail />;
      default:
        return null;
    }
  };

  return (
    <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column', padding: '2rem' }}>
      <Grid item xs={12} sm={6}>
        <Typography sx={{ fontSize: '2rem', fontWeight: '500' }} margin={'0rem 2rem'}>
          {tabContents[value]}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} sx={{ justifySelf: 'center', alignSelf: 'center', width: '100%' }}>
        <Box
          sx={{
            width: '100%',
            height: '100px', // Set your desired height
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap', // Allow tabs to wrap to the next row
            // boxShadow:'0px 10px 10px -2px rgba(0,0,0,0.1)'
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            style={{ width: '100%', }}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
          >
            {tabNames.map((tab, index) => (
              <Tab
                key={index}
                label={tab}

                onMouseOver={(event) => handleTabMouseOver(event, index)}
                onMouseLeave={handleTabMouseLeave}
                style={{
                  borderBottom: hoveredTab === index ? '3px solid #2196f3' : 'none',
                  margin: '0 10px', // Adjust the spacing between tab names
                  
                }}
              />
            ))}
          </Tabs>
        </Box>
      </Grid>
      <Divider />
      <Grid item xs={12} sx={{ justifySelf: 'center', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        {renderTabContent()}
      </Grid>
    </Grid>
  );
};

export default EmpTabsComponent;
