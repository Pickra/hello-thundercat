import * as React from "react";
import { Route } from 'react-router-dom';
import { Switch } from 'react-router';

import MainContent from "../MainContent";
import Header from "../Header";
import Nav from "../Nav";
import Footer from "../Footer";

import Login from "../../components/Login";
interface AppProps {}

export default class App extends React.Component<AppProps, {}> {
    render() {
        return (
            <div className="layout">
                <Header />
                <Nav />
                <MainContent>
                    <Switch>
                        <Route exact={true} path="/" component={Login} />
                    </Switch>
                </MainContent>
                <Footer />
            </div>
        );
    }
}