import * as React from "react";
import { Route } from 'react-router-dom';
import { Switch, Redirect } from 'react-router';
import userStore from "../../stores/userStore";

import MainContent from "../MainContent";
import Header from "../Header";
import Nav from "../Nav";
import Footer from "../Footer";
import LoginAlert from "../../components/LoginAlert";

import Login from "../../components/Login";
import ThunderCatSelection from "../../components/ThunderCatSelection";
interface AppState {
    isAlertVisible: boolean;
}

export default class App extends React.Component<{}, AppState> {
    state = { isAlertVisible: false }

    showAlert = (): void => { this.setState({ isAlertVisible: true }); }
    closeAlert = (): void => { this.setState({ isAlertVisible: false }); }

    render() {
        return (
            <div className="layout">
                <Header />
                <Nav />
                <MainContent>
                    <LoginAlert
                        close={this.closeAlert}
                        isAlertVisible={this.state.isAlertVisible}
                    >
                        Sword of Omens, give me Sight Beyond Sight!
                        Ohh, you need to login...
                    </LoginAlert>
                    <Switch>
                        <Route exact={true} path="/" component={Login} />
                        <PrivateRoute
                            exact={true}
                            path="/select"
                            component={ThunderCatSelection}
                            showAlert={this.showAlert}
                        />
                    </Switch>
                </MainContent>
                <Footer />
            </div>
        );
    }
};

const PrivateRoute = ({ component: Component, showAlert, ...rest }) => {
    if (!userStore.getState().isLoggedIn) { showAlert(); }

    const render = props => userStore.getState().isLoggedIn ?
        <Component {...props} />
        : <Redirect to={{ pathname: "/", state: { from: props.location }}} />
    
    return <Route {...rest} render={render} />;
};