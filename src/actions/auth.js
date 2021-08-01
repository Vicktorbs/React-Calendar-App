import Swal from "sweetalert2";
import { fetchWhitoutToken } from "../helpers/fetch";
import { types } from "../types/types";

export const starLogin = (email, password) => {
    return async(dispatch) => {
        const resp = await fetchWhitoutToken('auth', {email, password}, 'POST');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        } else {
            Swal.fire('Error', body.msg, 'error')
        }
    }
}

export const startRegister = (email, password, name) => {
    return async(dispatch) => {
        const resp = await fetchWhitoutToken('auth/new', {email, password, name}, 'POST');
        const body = await resp.json();

        console.log(body);
        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        } else {
            Swal.fire('Error', body.msg, 'error')
        }
    }
}

const login = (user) => ({
    type: types.authLogin,
    payload: user
})