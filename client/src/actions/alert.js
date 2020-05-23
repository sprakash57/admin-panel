import { v4 as uuid } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

export const removeAlert = id => dispatch => {
    dispatch({
        type: REMOVE_ALERT,
        payload: id
    })
}

export const setAlert = (text, type, timeout = 6000) => dispatch => {
    const id = uuid();
    dispatch({
        type: SET_ALERT,
        payload: { id, text, type }
    });
    setTimeout(() => removeAlert(id)(dispatch), timeout);
}