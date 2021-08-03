import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import moment from 'moment';
import { CalendarModal } from '../../../components/calendar/CalendarModal';
import { eventStartUpdate, eventClearActiveEvent, eventStartAddNew } from '../../../actions/events';
import { act } from '@testing-library/react';
import Swal from 'sweetalert2';

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}))
jest.mock('../../../actions/events', () => ({
    eventStartUpdate: jest.fn(),
    eventClearActiveEvent: jest.fn(),
    eventStartAddNew: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const now = moment().minutes(0).seconds(0).add(1, 'hours')
const later = now.clone().add(1, 'hours');

const initialState = {
    auth: {
        cheking: false,
        uid: '123',
        name: 'Tester'
    },
    calendar: {
        events: [],
        activeEvent: {
            title: 'Hello world',
            notes: 'Some notes',
            start: now.toDate(),
            end: later.toDate()
        }
    },
    ui: {
        modalOpen: true
    }
};
const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <CalendarModal />
    </Provider>
)

describe('Tests on component <CalendarModal />', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })
    
    test('should show the modal', () => {
        expect(wrapper.find('Modal').prop('isOpen')).toBeTruthy();
    })
    
    test('should call the action update and close modal', () => {
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        })

        expect(eventStartUpdate).toHaveBeenLastCalledWith(initialState.calendar.activeEvent);
        expect(eventClearActiveEvent).toHaveBeenCalled();
    })
    
    test('should show error if there is no title', () => {
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        })

        expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBeTruthy();
    })
    
    test('should create a new event', () => {
        const initialState = {
            auth: {
                cheking: false,
                uid: '123',
                name: 'Tester'
            },
            calendar: {
                events: [],
                activeEvent: null
            },
            ui: {
                modalOpen: true
            }
        };
        const store = mockStore(initialState);
        store.dispatch = jest.fn();
        
        const wrapper = mount(
            <Provider store={ store }>
                <CalendarModal />
            </Provider>
        )

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'tester'
            }
        })

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        })

        expect(eventStartAddNew).toHaveBeenCalledWith({
            end: expect.anything(), 
            notes: "",
            start: expect.anything(),
            title: "tester"
        });
        expect(eventClearActiveEvent).toHaveBeenCalled();
    })
    
    test('should validate dates', () => {
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'tester'
            }
        });

        const today = new Date();

        act(() => {
            wrapper.find('DateTimePicker').at(1).prop('onChange')(today)
        });
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        })

        expect(Swal.fire).toHaveBeenCalledWith("Error", "La fecha find debe ser mayor a la fecha inicio", "error")
    })
    
})
