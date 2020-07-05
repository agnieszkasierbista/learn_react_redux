import {combineReducers, createStore} from "redux";
import {reducer as formReducer} from 'redux-form'


const SET_FIELD_VALUE = "SET_FIELD_VALUE";
const LOG_IN = "LOG_IN";

const preloadedLoginState = {isLoggedIn: false};


const combinedReducers = combineReducers({
    form: formReducer,
    login: function (state = preloadedLoginState, action) {

        const handlers = {
            [SET_FIELD_VALUE]: function () {
                return {
                    ...state,
                    ...action.payload
                }
            },
            [LOG_IN]: function () {
                return {
                    ...state,
                    isLoggedIn: action.payload
                }
            }
        };

        return handlers[action.type] ? handlers[action.type]() : state
    }
});

export const store = createStore(
    combinedReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export function setFieldValue(fieldName, value) {
    return {
        type: SET_FIELD_VALUE,
        payload: {[fieldName]: value}
    }
}

export function logIn(isLoggedIn) {
    return {
        type: LOG_IN,
        payload: isLoggedIn
    }

}