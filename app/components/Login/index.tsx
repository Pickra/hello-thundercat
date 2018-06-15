import * as React from "react";

interface LoginProps {}

export default class Login extends React.Component<LoginProps, {}> {
    render() {
        return (
            <div>
                <h2>Login</h2>
                {this.props.children}
            </div>
        );
    }
}