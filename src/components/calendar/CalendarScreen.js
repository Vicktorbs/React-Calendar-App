import React, { useState } from 'react'
import { Navbar } from '../ui/Navbar'
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { messages } from '../../helpers/claedar-messages-es';

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

export const CalendarScreen = () => {

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')

    const onDoubleClick = (e) => {
        console.log(e);
    }

    const onSelectEvent = (e) => {
        console.log(e);
    }

    const onViewChange = (e) => {
        // console.log(e);
        setLastView(e);
        localStorage.setItem('lastView', e);
    }

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
            <Navbar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={ messages }
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelectEvent }
                onView={ onViewChange }
                view={ lastView }
                components={{
                    event: CalendarEvent
                }}
            />

            <CalendarModal />
        </div>
    )
}
