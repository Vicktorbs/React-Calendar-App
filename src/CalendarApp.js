import React from 'react';
import { Approuter } from './route/Approuter';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es-mx'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from './helpers/claedar-messages-es';
import { CalendarEvent } from './components/calendar/CalendarEvent';

moment.locale('es')
const localizer = momentLocalizer(moment) // or globalizeLocalizer

const events = [{
    title: 'Spacieal day',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgcolor: '#fafafa',
    notes: 'buy',
    user: {
        _id: '1234',
        name: 'Victor'
    }
}]

export const CalendarApp = () => {

    const eventStyleGetter = (event, start, end, isSelected) => {
        // console.log(event, start, end, isSelected);
        const style = {
            backgroundColor: '#367CF7',
            borderRadious: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }
        return {
            style
        }
    }

    return (
        <div className="calendar-screen">
            <Approuter />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={ messages }
                eventPropGetter={ eventStyleGetter }
                components={{
                    event: CalendarEvent
                }}
            />
        </div>
    )
}
