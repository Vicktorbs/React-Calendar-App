import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import { startChecking } from '../actions/auth';
import { LoginScreeen } from '../components/auth/LoginScreeen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const Approuter = () => {

    const { cheking, uid } = useSelector(state => state.auth);

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch])

    if (cheking) {
        return (<h5>Espere...</h5>)
    }
    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        exact 
                        path="/login" 
                        component={ LoginScreeen } 
                        isNotAuthenticated={ !!uid }
                    />
                    <PrivateRoute 
                        exact 
                        path="/" 
                        component={ CalendarScreen } 
                        isAuthenticated={ !!uid }
                    />

                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}
