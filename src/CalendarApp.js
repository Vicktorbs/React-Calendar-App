import React from 'react';
import { Approuter } from './route/Approuter';
import 'moment/locale/es-mx'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Provider } from 'react-redux';
import { store } from './store/store';

export const CalendarApp = () => {

    return (
        <Provider store={ store }>
            <Approuter />
        </Provider>
    )
}
