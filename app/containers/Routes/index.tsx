import * as React from "react";
import { Route } from 'react-router-dom';
import { Switch, Redirect } from 'react-router';
import userStore from "../../stores/userStore";

import Login from "../../components/Login";
import ThunderCatSelection from "../../components/ThunderCatSelection";
import AboutYou from "../../components/AboutYou";

interface RoutesProps {
    showAlert: () => void;
}

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { condition, showAlert } = rest;
    if (!userStore.getState().isLoggedIn) { showAlert(); }

    const render = props => condition ? <Component {...props} />
        : <Redirect to={{ pathname: "/", state: { from: props.location }}} />
    
    return <Route {...rest} render={render} />;
};

const Routes = (props: RoutesProps) => (
    <Switch>
        <Route exact={true} path="/" component={Login} />
        <PrivateRoute
            exact={true}
            path="/select"
            component={ThunderCatSelection}
            showAlert={props.showAlert}
            condition={userStore.getState().isLoggedIn}
        />
        <PrivateRoute
            exact={true}
            path="/about-you"
            component={AboutYou}
            showAlert={props.showAlert}
            condition={userStore.getState().isLoggedIn && userStore.getState().hasSelectedCharacter}
        />
    </Switch>
);

export default Routes;