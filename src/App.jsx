import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import Appointments from './pages/appointments';
import RouteWrapper from './components/routeWrapper';
import AppointmentLayout from './layouts/appointments';
import { LightTheme } from './theme';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


const defaultRoute = "/pregnancyPlan";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ThemeProvider theme={LightTheme}>
        <Switch>
          <Route exact path="/" render={() => <Redirect to={defaultRoute} />} />
          <RouteWrapper exact path="/pregnancyPlan" component={Appointments} layout={AppointmentLayout} />
        </Switch>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
