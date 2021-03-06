import { uiCloseModal, uiOpenModal } from "../../actions/ui";
import { uiReducer } from "../../reducers/uiReducer"

const initState = {
    modalOpen: false
}

describe('Tests on reducer uiReducer', () => {
    
    test('should return the initState by default', () => {
        const state = uiReducer(initState, {});
        expect(state).toEqual(initState)
    })
    
    test('should open and close the modal', () => {
        const modalOpen = uiOpenModal();
        const state = uiReducer(initState, modalOpen);

        expect(state).toEqual({"modalOpen": true});

        const modalClose = uiCloseModal();
        const stateClose = uiReducer(state, modalClose);

        expect(stateClose).toEqual({"modalOpen": false});
    })
    
})
