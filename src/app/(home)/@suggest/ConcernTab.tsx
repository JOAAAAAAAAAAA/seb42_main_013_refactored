"use client"
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { useState, SyntheticEvent } from 'react';
import { ConcernWithBase64 } from '@/types';
import { FallbackImage } from './FallbackImage';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import HealthSvgSprite from '@/app/components/HealthSvgSprite'
import TabScrollButton, { TabScrollButtonProps } from '@mui/material/TabScrollButton';
import { experimental_useFormState as useFormState } from 'react-dom'
import { loadData } from '@/lib/health';
import CircularProgress from '@mui/material/CircularProgress';
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import TabSubmitBtn from '@/app/components/TabSubmitBtn';


interface CustomTabPanelProps {
  children: React.ReactNode;
  value: number;
  index: number;
  other?: React.HTMLAttributes<HTMLDivElement>;
}
function CustomTabPanel(props: CustomTabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`concern-tabpanel-${index}`}
      aria-labelledby={`concern-tab-${index}`}
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


function a11yProps(index: number) {
  return {
    id: `concern-tab-${index}`,
    'aria-controls': `concern-tabpanel-${index}`,
  };
}



export default function ConcernTab({ initialData }: { initialData: ConcernWithBase64[] }) {
  const [value, setValue] = useState<number>(0);
  const [loadedData, loadAction] = useFormState<ConcernWithBase64[], FormData>(loadData, initialData)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  interface customTabScrollButtonProps extends TabScrollButtonProps {
    onClick: () => void
  }

  const CustomButton = (props: customTabScrollButtonProps) => {
    const isDone = loadedData.length === 20
    return (
      isDone || props.direction === 'left'
        ? <TabScrollButton {...props} />
        : 
        <form action={loadAction}>
          <input name="curLength" defaultValue={loadedData.length} hidden />
          <TabSubmitBtn {...props} />
        </form>
    );
  }
  return (
    <div className='container'>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="concern tabs"
          textColor="secondary"
          indicatorColor="primary"
          variant="scrollable"
          scrollButtons
          ScrollButtonComponent={CustomButton}
          allowScrollButtonsMobile
        >
          {loadedData && loadedData.map((el, idx) => {
            return (
              <Tab
                key={idx}
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
