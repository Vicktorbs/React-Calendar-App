import { starLogin } from "../../actions/auth";
import { authReducer } from "../../reducers/authReducer"
import { types } from "../../types/types";

const initialState = {
    cheking: true
}

describe('Tests on reducer authReducer', () => {
    
    test('should return the default state', () => {
        const state = authReducer(initialState, {});
        expect(state).toEqual(initialState)
    })

    test('should authenticate the user', () => {
        const action = {
            type: types.authLogin,
            payload: {
                uid: '1234564',
                name: 'testeruser'
            }
        };
        const state = authReducer(initialState, action);
        
        expect(state).toEqual({ cheking: false, uid: '1234564', name: 'testeruser' })
    })
    
    test('should checkin the token state', () => {
        const action = {
            type: types.authCheckingFinish
        }
        const state = authReducer(initialState, action);

        expect(state).toEqual({ cheking: false })
    })
    
    test('should logout the user', () => {
        const action = {
            type: types.authLogout
        }
        const state = authReducer(initialState, action);

        expect(state).toEqual({ cheking: false })
    })
    
})
