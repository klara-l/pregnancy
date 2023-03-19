import React, {useState} from 'react';
import {Box, Container, makeStyles, TextField, Typography} from '@material-ui/core';
import {Controller, useForm} from 'react-hook-form';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import {baseHeaders, baseUrl} from '../utils/config';
import Hidden from '@material-ui/core/Hidden';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ScheduleIcon from '@mui/icons-material/Schedule';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import Badge from '@mui/material/Badge';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ExposureIcon from '@mui/icons-material/Exposure';


import WeekCard from '../components/card';
import generatePDF from "../utils/planGenerator";


import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';


const DATE_FORMAT = 'DD.MM.YYYY';

const WEEKS_WITH_APPOINTMENT = new Set([
  "week-14",
  "week-16",
  "week-20",
  "week-25",
  "week-30",
  "week-33",
  "week-36",
  "week-37",
  "week-38",
  "week-39",
  "birthdate"
]);

const dateNames = new Map([
        ["period", "Letzte Periode"],
        ["birthdate", "Errechneter Geburtstermin"]
    ]);

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '90vh',
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6, 2, 6, 2),
    borderRadius: 6,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.secondary[300],
  },
  formContainer: {
    padding: theme.spacing(6, 2, 6, 2),
    backgroundColor: theme.palette.background.paper,
  },
  field: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  buttonHandlers: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    textTransform: "none",
  },
  rightChild: {
    marginLeft: "auto"
  },
  logo: {
    margin: "auto"
  }
}));


function createDataFromLastPeriodDay(lastPeriodDay, birthDate) {
  console.log("lastPeriodDay: " + lastPeriodDay.format(DATE_FORMAT));
  const result =  Array(40).fill().map((element, index) => index + 1)
  .map((week) => {
    const firstDay = lastPeriodDay.clone().add(week - 1, 'week');
    const lastDay = firstDay.clone().add(6, 'day');
    return {
      id: "week-" + week,
      readableId: week + ". Schwangerschaftswoche",
      description: firstDay.format(DATE_FORMAT) + " - " + lastDay.format(DATE_FORMAT),
    };
  });
  result.push({
      id: "birthdate",
      readableId: "Errechneter Geburtstermin",
      description: birthDate.format(DATE_FORMAT),
  });
  return result;
}


const Appointments = () => {
  const history = useHistory();
  const classes = useStyles();
  const [error, setError] = useState({non_field_errors: null});
  const {handleSubmit, control} = useForm();

  const [inputDateType, setInputDateType] = useState('period');
  const [inputDate, setInputDate] = useState(dayjs());
  const [periodAdjustment, setPeriodAdjustment] = useState(0);
  const [checkedWeeks, setCheckedWeeks] = React.useState(WEEKS_WITH_APPOINTMENT);

  let unadjustedLastPeriodDay;
  if (inputDateType === 'period') {
    unadjustedLastPeriodDay = inputDate.clone();
  } else {
    unadjustedLastPeriodDay = inputDate.clone().add(-280, 'day');
  }

  const lastPeriodDay = unadjustedLastPeriodDay.clone().add(periodAdjustment, 'day');
  const birthDate = lastPeriodDay.clone().add(280, 'day');
  const appointmentData = createDataFromLastPeriodDay(lastPeriodDay, birthDate);


  const handleToggle = (value) => () => {
    console.log("value " + value);
    console.log("old checkedWeeks " + Array.from(checkedWeeks).join(', '));
    const newCheckedWeeks = new Set(checkedWeeks);

    if (!checkedWeeks.has(value)) {
      newCheckedWeeks.add(value);
    } else {
      newCheckedWeeks.delete(value);
    }

    setCheckedWeeks(newCheckedWeeks);
    console.log("new checkedWeeks " + Array.from(newCheckedWeeks).join(', '));
  };



  // https://mui.com/material-ui/react-badge/

  const items = appointmentData
    .map((element, index) => (
      <ListItem  key={element.id}>
        <ListItemIcon>
          <ScheduleIcon />
        </ListItemIcon>
        <ListItemText primary={element.readableId} secondary={element.description}  />
        <Switch
          edge="end"
          onChange={handleToggle(element.id)}
          checked={checkedWeeks.has(element.id)}
          inputProps={{
            'aria-labelledby': 'switch-list-label-wifi',
          }}
        />
      </ListItem>
    ));

  const SignInForm = () => (
    <Container maxWidth="lg" className={classes.formContainer}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={1}>
          <Box display={"flex"} justifyContent={"center"}>
            <AccessTimeFilledIcon/>
          </Box>
          <Typography variant="h4" gutterBottom align={"center"}>
            Schwangerschaftsplan erstellen
          </Typography>
        </Stack>

        <Stack direction="row" spacing={4}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Datum ist...</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              value={inputDateType}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setInputDateType(event.target.value);
                // no adjustment needed, if we set the birthdate directly.
                setPeriodAdjustment(0);
              }}
              name="radio-buttons-group"
            >
              <FormControlLabel value="period" control={<Radio />} label={dateNames.get("period")} />
              <FormControlLabel value="birthdate" control={<Radio />} label={dateNames.get("birthdate")} />
            </RadioGroup>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={dateNames.get(inputDateType)}
              format={DATE_FORMAT}
              value={inputDate}
              onChange={(newValue) => setInputDate(newValue)}
            />
          </LocalizationProvider>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h4">
              {"Korrektur: " + periodAdjustment + " Tage"}
            </Typography>
          </Box>

            <ButtonGroup disabled={inputDateType === 'birthdate'}>
              <Button
                aria-label="reduce"
                onClick={() => {
                  setPeriodAdjustment(periodAdjustment - 1);
                }}
              >
                <RemoveIcon fontSize="small" />
              </Button>
              <Button
                aria-label="increase"
                onClick={() => {
                  setPeriodAdjustment(periodAdjustment + 1);
                }}
              >
                <AddIcon fontSize="small" />
              </Button>
            </ButtonGroup>

          <Button variant="contained" onClick={() => 
            generatePDF(
              {periodDate: unadjustedLastPeriodDay.format(DATE_FORMAT), periodAdjustment: periodAdjustment, birthDate: birthDate.format(DATE_FORMAT)}, 
              appointmentData.filter(appointment => checkedWeeks.has(appointment.id))
            )
          }>
            Plan öffnen
          </Button>
        </Stack>

        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          subheader={<ListSubheader>Termine</ListSubheader>}
        >
          {items}
        </List>
      </Stack>
    </Container>
  );

  return (<SignInForm/>);
};

Appointments.propTypes = {};

export default Appointments;
