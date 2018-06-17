import * as React from "react";

interface LoginSignUpFormProps {
    onSubmit: (login: string, pswd: string) => void;
    isVisible: boolean;
    title: string;
}

const loginButtonClasses = "grid__col grid__col--xs-offset-9 grid__col--xs-3 grid__col--sm-offset-7 grid__col--sm-2";
const inputColClasses = "grid__col grid__col--xs-12 grid__col--sm-offset-3 grid__col--sm-6";

export default class LoginSignUpForm extends React.Component<LoginSignUpFormProps, {}> {
    loginRef: HTMLInputElement;
    passwordRef: HTMLInputElement;

    handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        const login = this.loginRef.value;
        const pswd = this.passwordRef.value;

        if (login.length > 0 && pswd.length > 0) {
            e.preventDefault();
            this.props.onSubmit(login, pswd);
        }
    }

    render() {
        if (!this.props.isVisible) { return null; }

        return (
            <form className="form grid" onSubmit={this.handleSubmit}>
                <h2>{this.props.title}</h2>
                <div className="grid__row grid__row--padded" style={{marginTop: "5rem"}}>
                    <div className={inputColClasses}>
                        <label className="label" htmlFor="login">Login</label>
                        <input
                            className="input"
                            type="text"
                            id="login"
                            ref={ref => {this.loginRef = ref;}}
                            required
                        />
                    </div>
                </div>
                <div className="grid__row grid__row--padded">
                    <div className={inputColClasses}>
                        <label className="label" htmlFor="password">Password</label>
                        <input
                            className="input"
                            type="text"
                            id="password"
                            ref={ref => {this.passwordRef = ref;}}
                            required
                        />
                    </div>
                </div>
                <div className="grid__row grid__row--padded" style={{textAlign: "right"}}>
                    <div className={loginButtonClasses}>
                        <input type="submit" className="button button--primary" />
                    </div>
                </div>
            </form>
        );
    }
}