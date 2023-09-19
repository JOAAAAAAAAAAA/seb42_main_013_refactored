
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { concern, health } from '@/data';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Suspense, useState } from 'react';
import { Skeleton } from '@mui/material';
import { FallbackImage } from './FallbackImage';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 1 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function ConcerTab() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='container'>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          textColor="secondary"
          indicatorColor="primary"
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
        >
          {health.map((el, idx) => {
            return (
              <Tab 
              key={el.id} 
              icon={<FallbackImage src={el.src} alt="health-icon" />} 
              color="secondary" 
              className="flex flex-col gap-[4px]" 
              aria-label={el.title} label={el.title} {...a11yProps(idx)} />
            )
          })}
        </Tabs>
      </Box>
      {health.map((el, idx) => {
        return (
          <CustomTabPanel key={el.id} value={value} index={idx}>
            <Grid container spacing={2}>
              {
                concern.filter((ele) => ele.id === value + 1).map((filteredEle) =>
                  filteredEle.supplementsList.map((ele, index) => (
                    <Grid xs={6} key={index} className="">
                      <Item className='flex h-32 flex-col items-center'>
                          {/* //Todo image fetching 해오는거는 skeleton 내부이미지는 blur 처리하기 */}
                          <FallbackImage
                            src={ele.imageURL}
                            alt="supplement-img"
                          />
                        <span className='mt-[4px]'>{ele.supplementName}</span>
                      </Item>
                    </Grid>
                  ))
                )
              }
            </Grid>
          </CustomTabPanel>
        )
      })}
    </div>
  );
}
