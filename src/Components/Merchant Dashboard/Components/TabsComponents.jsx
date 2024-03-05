import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import ApplyForm from '../Apply For IPO/ApplyForm';
import EnquiryUs from '../EnquiryUs/EnquiryUs';
import Ipos from '../Ipos/Ipos';
import History from '../Subscription History/History';


const TabsComponent = () => {
  const [value, setValue] = useState(0);
  const [hoveredTab, setHoveredTab] = useState(null);

  const tabNames = ['IPOs','Apply', 'Enquiry Us','Transaction History'];
  const tabContents = ['Available IPOs','Apply for IPO', 'Equiry Us', 'Transaction History'];

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
        return <Ipos setActiveTab={setActiveTab} />        ;
      case 1:
        return <ApplyForm />;
      case 2:
        return <EnquiryUs />;
      case 3:
        return <History />;
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
        justifyContent: 'center',
        alignItems: 'center',
        // boxShadow: '0px 10px 10px -2px rgba(0,0,0,0.1)',
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
              // boxShadow: '0px 10px 10px -2px rgba(0,0,0,0.1)',
            }}
          />
        ))}
      </Tabs>
    </Box>
  </Grid>
  <Divider></Divider>
  <Grid item xs={12} sx={{ justifySelf: 'center', alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
    {renderTabContent()}
  </Grid>
</Grid>

  );
};

export default TabsComponent;


























// import React, { useState } from 'react';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Box from '@mui/material/Box';
// import { Typography } from '@mui/material';
// import Grid from '@mui/material/Grid';

// const TabsComponent = () => {
//   const [value, setValue] = useState(0);
//   const [hoveredTab, setHoveredTab] = useState(null);

//   const tabNames = ['Apply', 'Eligibility', 'Benefits'];
//   const tabContents = ['Apply for IPO', 'Eligibility for IPO', 'Benefits of IPO'];

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//     setHoveredTab(null);
//   };

//   const handleTabMouseOver = (event, index) => {
//     setHoveredTab(index);
//   };

//   const handleTabMouseLeave = () => {
//     setHoveredTab(null);
//   };

//   return (
//     <Grid container spacing={2} sx={{display:'flex', flexDirection:'column', padding: '2rem' }}>
//       <Grid item xs={3}>
//         <Typography sx={{ fontSize: '2rem', fontWeight: '500' }} margin={'0rem 2rem'} >
//           {tabContents[value]}
//         </Typography>
//       </Grid>
//       <Grid item xs={6} sx={{ justifySelf:'center', alignSelf:'center', justifyContent: 'center', alignItems: 'center', }}>
//         <Box
//           sx={{
//             width: '100%',
//             height: '100px', // Set your desired height
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         >
//           <Tabs
//             value={value}
//             onChange={handleChange}
//             indicatorColor="primary"
//             style={{ width: '100%', }}
//           >
//             {tabNames.map((tab, index) => (
//               <Tab
//                 key={index}
//                 label={tab}
//                 onMouseOver={(event) => handleTabMouseOver(event, index)}
//                 onMouseLeave={handleTabMouseLeave}
//                 style={{
//                   borderBottom: hoveredTab === index ? '3px solid #2196f3' : 'none',
//                   margin: '0 10px', // Adjust the spacing between tab names
//                 }}
//               />
//             ))}
//           </Tabs>
//         </Box>
//       </Grid>
//     </Grid>
//   );
// };

// export default TabsComponent;
