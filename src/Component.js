import {connect} from "react-redux";
import Component from "./Component.layout";
import {LOG_IN, logIn} from "./store";
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
            dispatch(logIn(user, pass));
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