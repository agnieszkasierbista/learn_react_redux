import {Field, Form} from "redux-form";
import React from "react";

const Input = (props) => {

    return (
        <div>
            <input
                {...props.input}
            />
            { props.meta.error }
        </div>
    )
};

function sf(values) {
    return console.log(123, values);
}

export const ContactForm = function (props) {

    const {handleSubmit} = props;

    return (
        <Form onSubmit={handleSubmit(sf)}>
            <Field
                ble={1}
                name="address"
                component={Input}/>

            <button
                type="button"
                onClick={props.reset}>
                reset
            </button>

            <button
                type="submit"
            >
                submit
            </button>
        </Form>
    )

};
