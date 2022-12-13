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


const DATE_FORMAT = 'DD.MM.YYYY';

const WEEKS_WITH_APPOINTMENT = new Set([4, 8, 12, 16, 20]);  // TODO fix to real world



export default function WeekCard({week, lastPeriodDay}) {
  const firstDay = lastPeriodDay.clone().add(week - 1, 'week');
  const lastDay = firstDay.clone().add(6, 'day');

  const workDays = Array(7).fill()
    .map((element, index) => firstDay.clone().add(index, 'day'))
    .filter(day => 0 < day.day() && day.day() < 6  )
    .map((day) => 
      <Typography key={"dayField" + day.toString()} variant="body2">
        {day.format(DATE_FORMAT + ' dddd')}
      </Typography>
    );

    const isRegularAppointment = WEEKS_WITH_APPOINTMENT.has(week);

    const switchComponent = (isRegularAppointment) ? (<Switch defaultChecked />) : (<Switch/>);

    const [expanded, setExpanded] = useState(null);

    const handleChange = (event, newExpanded) => {
        setExpanded(newExpanded);
      };



  return (
    <Accordion expanded={expanded ?? isRegularAppointment } onChange={handleChange}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Woche {week}: {firstDay.format(DATE_FORMAT) } - {lastDay.format(DATE_FORMAT) }</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {workDays}
        <FormGroup>
          <FormControlLabel control={switchComponent} label="Termin buchen?" />
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
}
