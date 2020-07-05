import {connect} from "react-redux";
import Component from "./Component.layout";
import {logIn} from "./store";
import axios from "axios";
import {reduxForm} from "redux-form";


function mapStateToProps(state) {

    return {
        state,
        ...state.login
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchLogIn: function (user, pass) {
            console.log("user", user);
            axios
                .post('http://localhost:3001/log-in', {user, pass})
                .then(function () {
                        dispatch(logIn(true))
                    }
                )
                .catch(() => {
                    dispatch(logIn(false))
                })


        }
    }
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Component);

export default reduxForm({
    initialValues: {
        user: 'aa',
        pass: 'bb',
    },
    form: 'login',
    shouldValidate: () => true,
    validate: (formData) => {
        if (formData.user === "111") {
            return {
                user: 'wrong!'
            }
        } else {
            return {}
        }
    }
})(ConnectedComponent);