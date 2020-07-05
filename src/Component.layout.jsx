import {StyledComponent} from "./Component.styled";
import React from "react";
import {Field, Form} from "redux-form";


function createLogin(dispatchLogIn, user, pass) {
    return function login() {
        dispatchLogIn(user, pass);
    }
}

function safelyGet(callback) {
    try {
        return callback();
    } catch {
        return '';
    }
}

export default function Component({state, valid, handleSubmit, dispatchLogIn, isLoggedIn}) {

    const loginOnClick = createLogin(
        dispatchLogIn,
        safelyGet(() => state.form.login.values.user),
        safelyGet(() => state.form.login.values.pass)
    );

    return (
        <Form onSubmit={handleSubmit(loginOnClick)}>
            <div>
                <pre>
                    {JSON.stringify(state, null, 2)}
                </pre>
            </div>



            <StyledComponent>
                <div>
                    {JSON.stringify(valid)}
                </div>

                User:
                <Field
                    name="user"
                    component="input"
                    type="text"
                />

                <br/>

                Pass:
                <Field
                    name="pass"
                    component="input"
                    type="password"
                />


                <button type="submit">
                    log in!
                </button>
                <div>
                    {JSON.stringify(isLoggedIn)}
                </div>
            </StyledComponent>
        </Form>
    );
}