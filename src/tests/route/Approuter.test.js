import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { Approuter } from '../../route/Approuter';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// store.dispatch = jest.fn();

describe('TEst on Approuter', () => {
    
    test('should show "espere..."', () => {
        const initialState = {
            auth: {
                cheking: true
            }
        };
        const store = mockStore(initialState);
        
        const wrapper = mount(
            <Provider store={ store }>
                <Approuter />
            </Provider>
        )

        expect(wrapper).toMatchSnapshot();
        
    })
    
    test('should show the public route', () => {
        const initialState = {
            auth: {
                cheking: false
            }
        };
        const store = mockStore(initialState);
        
        const wrapper = mount(
            <Provider store={ store }>
                <Approuter />
            </Provider>
        )

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.login-container').exists()).toBeTruthy()
    })
    
    test('should show the private route', () => {
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
        
        const wrapper = mount(
            <Provider store={ store }>
                <Approuter />
            </Provider>
        )

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.calendar-screen').exists()).toBeTruthy()
    })
    
})
