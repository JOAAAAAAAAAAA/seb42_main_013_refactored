"use client"
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { useState, SyntheticEvent, useEffect } from 'react';
import { Concern } from '@/types';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import HealthSvgSprite from '@/app/components/HealthSvgSprite'
import { FallbackImage } from '../FallbackImage';
import { experimental_useFormState as useFormState } from 'react-dom'
import { getHealthData } from '@/lib/health';
import { getHealthwithSliced, loadData } from './helper';




interface CustomTabPanelProps{
  children: React.ReactNode;
  value: number;
  index: number;
  other?: React.HTMLAttributes<HTMLDivElement>; 
}
function CustomTabPanel(props:CustomTabPanelProps) {
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

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function a11yProps(index:number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export interface ConcernWithBase64 extends Concern {
  supplementsList: {
    supplementName: string
    imageURL: string
    base64?: string
  }[]
}




export default function ConcernTab({ initialData }: { initialData :ConcernWithBase64[]}) {
  const [value, setValue] = useState(0);

  const [loadedData, loadAction] = useFormState<ConcernWithBase64[], FormData>(loadData, initialData)

  const handleChange = (event: SyntheticEvent, newValue: number)=> {
    console.log('newValue', newValue)
    setValue(newValue);
    if(newValue === 3 || newValue === 5){
      const formData = new FormData();
      formData.append('page', `${newValue}`);
      loadAction(formData);
    }  
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
          {loadedData && loadedData.map((el, idx) => {
            return (
              <Tab
                key={el.id}
                icon={<HealthSvgSprite id={el.id} width="32.51" height="32.51" color="black" />}
                color="secondary"
                className="flex flex-col gap-[4px]"
                aria-label={el.title} 
                label={el.title} 
                {...a11yProps(idx)} />
            )
          })}
        </Tabs>
      </Box>
      {loadedData && loadedData.map((el, idx) => {
        return (
          <CustomTabPanel key={el.id} value={value} index={idx}>
            <Grid container spacing={2}>
              {loadedData
              .filter((ele, idx) => idx === value)
              .map((concern) =>
                  concern.supplementsList.map((ele, index) => (
                    <Grid xs={6} key={index} className="flex h-32 flex-col items-center">
                      <Paper sx={{ typography: 'body2', color: 'text.secondary' }} className='flex h-32 w-full flex-col items-center p-[--gap-sm]'>
                      <FallbackImage
                        src={ele.imageURL}
                        alt="supplement-img"
                        blur={ele.base64}
                      />
                      <span className='mt-[4px]'>{ele.supplementName}</span>
                      </Paper>
                    </Grid>
                  ))
              )}
            </Grid>
          </CustomTabPanel>
        )
      })}
    </div>
  );
}
