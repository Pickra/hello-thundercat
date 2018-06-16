import * as React from "react";

import MainContent from "../MainContent";
import Header from "../Header";
import Nav from "../Nav";
import Footer from "../Footer";
import Routes from "../Routes";
import LoginAlert from "../../components/LoginAlert";

const logoPng = require("../../../images/logo.png");

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
                    <img
                        id="logo"
                        src={logoPng}
                        alt="Thundercats Logo"
                        style={{display: "block", margin: "1rem auto"}}
                    />
                    <LoginAlert
                        close={this.closeAlert}
                        isAlertVisible={this.state.isAlertVisible}
                    >
                        Sword of Omens, give me Sight Beyond Sight!
                        Ohh, you just need to login, snarf snarf...
                    </LoginAlert>
                    <Routes showAlert={this.showAlert} />
                </MainContent>
                <Footer />
            </div>
        );
    }
};
