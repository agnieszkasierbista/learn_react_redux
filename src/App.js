import {Provider} from "react-redux";
import {store} from "./store";
import Component from "./Component";
import React from "react";
import ContactForm from "./ContactForm";

console.log(Component, "component");

function App(){
    return (
        <Provider store={store}>
            <Component/>
            <ContactForm />
        </Provider>
    )
}

export default App;