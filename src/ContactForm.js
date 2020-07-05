import {reduxForm} from 'redux-form'
import {ContactForm} from "./ContactForm.layout";
import React from "react";

// HOC - Higher Order Component


//
// const withReduxForm = function (options) {
//     return function (Component) {
//         return function (props) {
//             const additionalProps = options.shouldValidate ? {abc: 1 }: {abc: 2};
//
//             return <Component {...props} {...additionalProps}/>
//         }
//     }
// }

function withBaloons(Component) {
    return function (props) {
        return <Component {...props} baloons="4" />
    }
}


export default reduxForm({

    shouldValidate: function (params) {
        // console.log('params', params);

        return true;
    },
    validate: function (formData) {
        if (formData.address === 'dupa') {
            return {
                address: 'wrong address!'
            }
        } else {
            return {};
        }
    },
    form: 'contact' // state.form.contact // state.NAZWA_REDUCERA.NAZWA_FORMULARZA
})(ContactForm)