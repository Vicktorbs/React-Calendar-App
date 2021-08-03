import { types } from "../../types/types"

describe('Tests on types', () => {
    
    test('should be equal to the object', () => {
        expect(types).toEqual({
            uiOpenModal: '[UI] Open modal',
            uiCloseModal: '[UI] Close modal',
        
            eventSetActive: '[Event] Set active',
            eventLogout: '[Event] Logout event',
            eventStartAddNew: '[Event] Add add new',
            eventAddNew: '[Event] Add new',
            eventClearActiveEvent: '[Event] Clear active event',
            eventUpdated: '[Event] Event update',
            eventDeleted: '[Event] Event deleted',
            eventLoaded: '[Event] Event loaded',
        
            authChecking: '[Checking] Checking login state',
            authCheckingFinish: '[Checking] Finish checking login state',
            authStartLogin: '[Checking] Start login',
            authLogin: '[Checking] Login',
            authStartRegister: '[Checking] Start register',
            authStartTokenRenew: '[Checking] Start token renew',
            authLogout: '[Checking] Logout'
        })
    })
    
})
