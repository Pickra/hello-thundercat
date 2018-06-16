import * as React from "react";

interface LoginAlertProps {
    close: () => void;
    showSignup: () => void;
    isAlertVisible: boolean;
}

export default class LoginAlert extends React.Component<LoginAlertProps, {}> {
    handleKeyDownClose = e => {
        if (e.key === 'Enter') {
            e.preventDefault()
            this.props.close();
        }
    }

    handleKeyDownSignup = e => {
        if (e.key === 'Enter') {
            e.preventDefault()
            this.props.showSignup();
        }
    }

    render() {
        const { close, showSignup, isAlertVisible} = this.props;
        if (!isAlertVisible) { return null; }

        return (
            <div className="alert alert--warning" style={{marginTop: "2rem"}}>
                <span className="alert__icon">
                    <svg className="icon icon--md"><use xlinkHref="#ei-eye"></use></svg>
                </span>
                <span
                    className="alert__close alert__close--warning"
                    onClick={close}
                    onKeyDown={this.handleKeyDownClose}
                    tabIndex={0}
                >
                    <svg
                        className="icon icon--md"
                        role="button"
                        aria-label="close"
                    ><use xlinkHref="#ei-close"></use></svg>
                </span>
                <span>
                    Great Jaga's ghost! That didn't work.
                    Do you need to
                    <a
                        style={{color: 'white'}}
                        tabIndex={0}
                        onClick={showSignup}
                        onKeyDown={this.handleKeyDownSignup}
                    > signup</a>,
                    snarf snarf?
                </span>
            </div>
        );
    }
}