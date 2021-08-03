import { fetchWhitoutToken, fetchWhitToken } from "../../helpers/fetch"

describe('Tests on helper Fetch', () => {

    let token = '';
    
    test('fetchWithoutToken should work', async() => {
        const resp = await fetchWhitoutToken('auth', {email: 'abi@gmail.com', password: '123456'}, 'POST');
        expect(resp instanceof Response).toBeTruthy();
        const body = await resp.json();
        expect(body.ok).toBeTruthy();
        token = body.token;
    })
    
    test('fetchWithToken should work', async() => {
        localStorage.setItem('token', token);

        const resp = await fetchWhitToken('events/610865f75a216019f8f21573', {}, 'DELETE');
        const body = await resp.json();
        
        expect(body.msg).toBe('Event with that ID does not exist');
    })
    
})
