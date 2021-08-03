import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { LoginScreeen } from '../../../components/auth/LoginScreeen';
import { starLogin, startRegister } from '../../../actions/auth';
import Swal from 'sweetalert2';

jest.mock('../../../actions/auth', () => ({
    starLogin: jest.fn(),
    startRegister: jest.fn()
}))
jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};
const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <LoginScreeen />
    </Provider>
)

describe('Tests on component <LoginScreeen />', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })
    
    test('should show itselft correctly', () => {
        expect(wrapper).toMatchSnapshot();
    })
    
    test('should call login dispatch', () => {
        wrapper.find('input[name="lEmail"]').simulate('change', {
            target: {
                name: 'lEmail',
                value: 'tester@gamail.com'
            }
        })
        wrapper.find('input[name="lPassword"]').simulate('change', {
            target: {
                name: 'lPassword',
                value: '123456'
            }
        })

        wrapper.find('form').at(0).prop('onSubmit')({
            preventDefault(){}
        })

        expect(starLogin).toHaveBeenCalledWith('tester@gamail.com', '123456')
    })
    
    test('should not allow register if the passwords are not equals', () => {
        wrapper.find('input[name="rPassword1"]').simulate('change', {
            target: {
                name: 'rPassword1',
                value: '123456'
            }
        })
        wrapper.find('input[name="rPassword2"]').simulate('change', {
            target: {
                name: 'rPassword2',
                value: '12345'
            }
        })

        wrapper.find('form').at(1).prop('onSubmit')({
            preventDefault(){}
        })
        expect(startRegister).not.toHaveBeenCalled()
        expect(Swal.fire).toHaveBeenCalledWith('Error', 'Las contraseñas deben ser iguales', 'error')
    })
    
    test('should allow register if the passwords are equals', () => {
        wrapper.find('input[name="rPassword1"]').simulate('change', {
            target: {
                name: 'rPassword1',
                value: '123456'
            }
        })
        wrapper.find('input[name="rPassword2"]').simulate('change', {
            target: {
                name: 'rPassword2',
                value: '123456'
            }
        })

        wrapper.find('form').at(1).prop('onSubmit')({
            preventDefault(){}
        })
        expect(startRegister).toHaveBeenCalled()
        expect(startRegister).toHaveBeenCalledWith("", "123456", "")
        expect(Swal.fire).not.toHaveBeenCalled()
    })
    
})