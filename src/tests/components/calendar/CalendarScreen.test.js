import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { CalendarScreen } from '../../../components/calendar/CalendarScreen';
import { messages } from '../../../helpers/claedar-messages-es';
import { types } from '../../../types/types';
import { eventSetActive, eventStartLoading } from '../../../actions/events';
import { act } from '@testing-library/react';

jest.mock('../../../actions/events', () => ({
    eventSetActive: jest.fn(),
    eventStartLoading: jest.fn()
}))
Storage.prototype.setItem = jest.fn()

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
    auth: {
        cheking: false,
        uid: '123',
        name: 'Tester'
    },
    calendar: {
        events: []
    },
    ui: {
        modalOpen: false
    }
};
const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <CalendarScreen />
    </Provider>
)

describe('Tests on component <CalendarScreen />', () => {
    
    test('should show itselft correctly', () => {
        expect(wrapper).toMatchSnapshot();
    })
    
    test('Tests with the calendar interactions', () => {
        const calendar = wrapper.find('Calendar');
        const calendarMEssages = calendar.prop('messages');

        expect(calendarMEssages).toEqual(messages);

        calendar.prop('onDoubleClickEvent')();
        expect(store.dispatch).toHaveBeenCalledWith({type: types.uiOpenModal})

        calendar.prop('onSelectEvent')({ start: '591378642'});
        expect(eventSetActive).toHaveBeenCalledWith({ start: '591378642'})

        act(() => {
            calendar.prop('onView')('week');
            expect(localStorage.setItem).toHaveBeenCalledWith('lastView', 'week')
        })
    })
    
})
