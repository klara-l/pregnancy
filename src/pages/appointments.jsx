import React, {useState} from 'react';
import {Box, Button, Container, Grid, makeStyles, TextField, Typography,} from '@material-ui/core';
import {Controller, useForm} from 'react-hook-form';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import {baseHeaders, baseUrl} from '../utils/config';
import Hidden from '@material-ui/core/Hidden';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs, { Dayjs } from 'dayjs';

import WeekCard from '../components/card';

import EggIcon from '@mui/icons-material/Egg';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';



const DATE_FORMAT = 'DD.MM.YYYY';


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



const Appointments = () => {
  const history = useHistory();
  const classes = useStyles();
  const [error, setError] = useState({non_field_errors: null});
  const {handleSubmit, control} = useForm();

    const [lastPeriodDay, setLastPeriodDay] = useState(dayjs());



  const handleChange = (newValue) => {
    setLastPeriodDay(newValue);
  };


  // https://mui.com/material-ui/react-badge/

  const items = Array(36).fill().map((element, index) => index + 1)
  .map((week) => <WeekCard key={"week" + week} week={week} lastPeriodDay={lastPeriodDay}/>);


  const SignInForm = () => (
    <Container maxWidth="lg" className={classes.formContainer}>
      <Box display={"flex"} justifyContent={"center"}>
        <AccessTimeFilledIcon/>
      </Box>
      <Typography variant="h4" gutterBottom align={"center"}>
        Schwangerschaftstermine berechnen
      </Typography>
      {error.non_field_errors ? <Typography color="error">{error.non_field_errors}</Typography> : null}
      <MobileDatePicker
        label="Letzte Periode"
        inputFormat={DATE_FORMAT}
        value={lastPeriodDay}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
      />
      {items}

    </Container>
  );

  return (<SignInForm/>);
};

Appointments.propTypes = {};

export default Appointments;
