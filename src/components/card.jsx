import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';

import Paper from '@mui/material/Paper';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ScheduleIcon from '@mui/icons-material/Schedule';





const DATE_FORMAT = 'DD.MM.YYYY';

const WEEKS_WITH_APPOINTMENT = new Set([14, 16, 20, 25, 30, 33 ,36, 37, 38, 39]);



export default function WeekCard({week, lastPeriodDay}) {
  const firstDay = lastPeriodDay.clone().add(week - 1, 'week');
  const lastDay = firstDay.clone().add(6, 'day');

  const [checked, setChecked] = React.useState(['wifi']);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    console.log("value " + value);
    console.log("old checked " + checked);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
        console.log("new checked " + checked);

  };


    const isRegularAppointment = WEEKS_WITH_APPOINTMENT.has(week);
    const id = "week-" + week;


  return (
    <ListItem>
      <ListItemIcon>
        <ScheduleIcon />
      </ListItemIcon>
      <ListItemText id={id} primary={"Woche " + week} secondary={firstDay.format(DATE_FORMAT) + " - " + lastDay.format(DATE_FORMAT)}  />
      <Switch
        edge="end"
        onChange={handleToggle(id)}
        checked={checked.indexOf(id) !== -1}
        inputProps={{
          'aria-labelledby': 'switch-list-label-wifi',
        }}
      />
    </ListItem>
  );
}

    // <Paper sx={{ minWidth: 275 }}>
    //     <Stack direction="row" spacing={4}>
    //               {switchComponent}

    //       <Typography variant="h5">
    //         Woche {week}: {firstDay.format(DATE_FORMAT) } - {lastDay.format(DATE_FORMAT) }
    //       </Typography>
    //     </Stack>
    // </Paper>


    // <Card sx={{ minWidth: 275 }}>
    //   <CardContent>
    //     <Stack direction="row" spacing={4}>
    //               {switchComponent}

    //       <Typography variant="h5">
    //         Woche {week}: {firstDay.format(DATE_FORMAT) } - {lastDay.format(DATE_FORMAT) }
    //       </Typography>
    //     </Stack>
    //   </CardContent>
    // </Card>





    // <Accordion expanded={expanded ?? isRegularAppointment } onChange={handleChange}>
    //   <AccordionSummary
    //     expandIcon={<ExpandMoreIcon />}
    //     aria-controls="panel1a-content"
    //     id="panel1a-header"
    //   >
    //     <Typography>Woche {week}: {firstDay.format(DATE_FORMAT) } - {lastDay.format(DATE_FORMAT) }</Typography>
    //   </AccordionSummary>
    //   <AccordionDetails>
    //     {workDays}
    //     <FormGroup>
    //       <FormControlLabel control={switchComponent} label="Termin buchen?" />
    //     </FormGroup>
    //   </AccordionDetails>
    // </Accordion>
