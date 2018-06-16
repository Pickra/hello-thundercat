import * as React from "react";
import { ApiUrl, Origin } from "../../models/config";
import { History } from "history";
import userStore, { userActions } from "../../stores/userStore";

import LoginSignUpForm from "../LoginSignUpForm";
import LoginAlert from "../LoginAlert";

interface LoginProps {
    history: History;
}

interface LoginState {
    isLoginVisible: boolean;
    isAlertVisible: boolean;
}

export default class Login extends React.Component<LoginProps, LoginState> {
    state = {
        isLoginVisible: true,
        isAlertVisible: false
    }

    handleLogin = (login, pswd): void => {
        fetch(`${Origin}${ApiUrl.users}?login=${login}&password=${pswd}`)
        .then(res => res.json())
        .then(r => {
            if (r.length > 0) {
                userStore.dispatch({
                    type: userActions.login,
                    payload: { isLoggedIn: true }
                });
                
                this.props.history.push("/select");
            }
            else { this.setState({ isAlertVisible: true }); }
        });
    }
    
    showSignup = (): void => { this.setState({ isLoginVisible: false })}

    handleSignup = (login, pswd): void => {
        const postData = { 
            method: 'POST', 
            body: JSON.stringify({ login: login, password: pswd }), 
            headers: {'Content-Type': 'application/json'}
        };

        fetch(`${Origin}${ApiUrl.users}`, postData)
          .then(res =>  res.json().then(data => ({status: res.status, body: data})))
          .then(obj => {
              if (obj.status === 201) {
                userStore.dispatch({
                    type: userActions.login,
                    payload: { isLoggedIn: true }
                });

                this.props.history.push("/select");
              }
          });
    }

    handleKeyDownSignup = e => {
        if (e.key === 'Enter') {
            e.preventDefault()
            this.showSignup();
        }
    }

    closeAlert = (): void => { this.setState({ isAlertVisible: false }); }

    getAlertMessage = (): JSX.Element => (
        <span>
            Great Jaga's ghost! That didn't work.
            Do you need to
            <a
                style={{color: 'white'}}
                tabIndex={0}
                onClick={this.showSignup}
                onKeyDown={this.handleKeyDownSignup}
            > signup</a>,
            snarf snarf?
        </span>
    );

    render() {
        return (
            <div>
                <LoginAlert
                    close={this.closeAlert}
                    showSignup={this.showSignup}
                    isAlertVisible={this.state.isAlertVisible}
                >{this.getAlertMessage()}</LoginAlert>
                <LoginSignUpForm
                    onSubmit={this.handleLogin}
                    isVisible={this.state.isLoginVisible}
                    title="Please Login"
                />
                <LoginSignUpForm
                    onSubmit={this.handleSignup}
                    isVisible={!this.state.isLoginVisible}
                    title="Please Signup"
                />
            </div>
        );
    }
}