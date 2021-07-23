import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { LoginScreeen } from '../components/auth/LoginScreeen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';

export const Approuter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/login" component={ LoginScreeen } />
                    <Route exact path="/" component={ CalendarScreen } />

                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}
