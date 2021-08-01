import { types } from "../types/types"

const initialState = {
    cheking: true,
    // uid: null,
    // name: null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.authLogin:
            return {
                ...state,
                cheking: false,
                ...action.payload
            }

        case types.authCheckingFinish:
            return {
                ...state,
                cheking: false
            }
        
        case types.authLogout:
            return {
                cheking: false
            }
    
        default:
            return state
    }
}