import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./containers/App/index";

import "../node_modules/@pickra/css-components/dist/css-components.js";
import "../node_modules/@pickra/css-components/dist/css-components.css";

const Index = () => {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
};

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(
        <Index />,
        document.querySelector("#app")
    );
});
