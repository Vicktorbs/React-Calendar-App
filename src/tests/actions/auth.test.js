import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { starLogin, startChecking, startRegister } from '../../actions/auth';
import { types } from '../../types/types';
import Swal from 'sweetalert2';
import * as fechModule from '../../helpers/fetch';

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};
let store = mockStore(initialState);

Storage.prototype.setItem = jest.fn();

describe('Tests on auth actions', () => {

    beforeEach(() => {
        store = mockStore(initialState);
        jest.clearAllMocks();
    });
    
    test('startLogin should be correct', async() => {
        await store.dispatch(starLogin('abi@gmail.com', '123456'));
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: { 
                uid: expect.any(String), 
                name: expect.any(String) 
            }
        });
        expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));

        // const token = localStorage.setItem.mock.calls[0][1]
        // console.log(token);
    })
    
    test('startLogin should not be correct', async() => {
        await store.dispatch(starLogin('abi@gmail.com', '123456789'));
        let actions = store.getActions();

        expect(actions).toEqual([]);
        expect(Swal.fire).toHaveBeenCalledWith("Error", "Passowrd does not match", "error");

        await store.dispatch(starLogin('abi@gmail2.com', '123456'));
        actions = store.getActions();

        expect(actions).toEqual([]);
        expect(Swal.fire).toHaveBeenCalledWith("Error", "User with that email does not exist", "error");
    })
    
    test('startRegister should work correct', async() => {
        fechModule.fetchWhitoutToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    uid: '1234',
                    name: 'tester',
                    token: 'ASDFGHJKL'
                }
            }
        }))
        await store.dispatch(startRegister('test@test.com', '123456', 'testUser'));
        const actions = store.getActions();
        // console.log(actions);

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: '1234',
                name: 'tester'
            }
        })

        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'ASDFGHJKL');
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));
    })
    
    test('startChecking should be correct', async() => {
        fechModule.fetchWhitToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    uid: '1234',
                    name: 'tester',
                    token: 'ASDFGHJKL'
                }
            }
        }))

        await store.dispatch(startChecking());
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: '1234',
                name: 'tester'
            }
        })
        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'ASDFGHJKL');
    })
    
})
