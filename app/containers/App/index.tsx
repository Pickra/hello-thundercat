import * as React from "react";

import MainContent from "../MainContent";
import Header from "../Header";
import Nav from "../Nav";
import Footer from "../Footer";
import Routes from "../Routes";
import LoginAlert from "../../components/LoginAlert";

import userStore from "../../stores/userStore";

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
                <Header titleText={userStore.getState().headerTitle} />
                <Nav />
                <MainContent>
                    <img
                        src={userStore.getState().character.src}
                        alt={userStore.getState().character.alt}
                        style={{display: "block", margin: "1rem auto"}}
                    />
                    <LoginAlert
                        close={this.closeAlert}
                        isAlertVisible={this.state.isAlertVisible}
                        messageId="login-alert"
                    >
                        <span id="login-alert" aria-label="Please login">
                            Sword of Omens, give me Sight Beyond Sight!
                            Ohh, you just need to login, snarf snarf...
                        </span>
                    </LoginAlert>
                    <Routes showAlert={this.showAlert} />
                </MainContent>
                <Footer />
            </div>
        );
    }
};
