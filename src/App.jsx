import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import Login from './pages/auth/login';
import Appointments from './pages/appointments';
import RouteWrapper from './components/routeWrapper';
import AuthLayout from './layouts/auth';
import AppointmentLayout from './layouts/appointments';
import { LightTheme } from './theme';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


const defaultRoute = "/pregnancyAppointments";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ThemeProvider theme={LightTheme}>
        <Switch>
          <Route exact path="/" render={() => <Redirect to={defaultRoute} />} />
          <RouteWrapper exact path="/login" component={Login} layout={AuthLayout} />
          <RouteWrapper exact path="/pregnancyAppointments" component={Appointments} layout={AppointmentLayout} />
        </Switch>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
