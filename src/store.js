import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {reducer as formReducer} from 'redux-form'
import {createEpicMiddleware, ofType} from 'redux-observable';
import {catchError, mapTo, map, switchMap, tap} from "rxjs/operators";
import axios from "axios";
import {of, from} from "rxjs";

const SET_FIELD_VALUE = "SET_FIELD_VALUE";

export const LOG_IN = "LOG_IN";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE= "LOG_IN_FAILURE";

const preloadedLoginState = {isLoggedIn: false};

const epicMiddleware = createEpicMiddleware();

const rootEpic = action$ => action$.pipe(
    ofType(LOG_IN),
    switchMap((action) => {

        const { user, pass } = action.payload;

        return from(axios.post('http://localhost:3001/log-in', {user, pass})).pipe(
            map(() => ({type: LOG_IN_SUCCESS })),
            catchError(() => {
                return of({ type: LOG_IN_FAILURE });
            })
        )
    })
);

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
            [LOG_IN_SUCCESS]: function () {
                return {
                    ...state,
                    isLoggedIn: true
                }
            },
            [LOG_IN_FAILURE]: function () {
                return {
                    ...state,
                    isLoggedIn: false
                }
            }
        };

        return handlers[action.type] ? handlers[action.type]() : state
    }
});

export const store = createStore(
    combinedReducers,
    compose(
        applyMiddleware(
            epicMiddleware
        ),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

epicMiddleware.run(rootEpic);

export function setFieldValue(fieldName, value) {
    return {
        type: SET_FIELD_VALUE,
        payload: {[fieldName]: value}
    }
}

export function logIn(user, pass) {
    return {
        type: LOG_IN,
        payload: { user, pass }
    }

}