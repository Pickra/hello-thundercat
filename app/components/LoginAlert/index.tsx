import * as React from "react";

interface LoginAlertProps {
    close: () => void;
    showSignup?: () => void;
    isAlertVisible: boolean;
    messageId: string;
}

export default class LoginAlert extends React.Component<LoginAlertProps, {}> {
    messageRef: HTMLElement;

    componentDidUpdate() {
        if (this.props.isAlertVisible) {
            this.messageRef.focus();
        }
    }

    handleKeyDownClose = e => {
        if (e.key === 'Enter') {
            e.preventDefault()
            this.props.close();
        }
    }

    render() {
        const { close, children, isAlertVisible, messageId} = this.props;
        if (!isAlertVisible) { return null; }

        return (
            <div
                className="alert alert--warning"
                style={{marginTop: "2rem"}}
                aria-labelledby={messageId}
                tabIndex={0}
                ref={ref => {this.messageRef = ref}}
            >
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
                        aria-label="Close"
                    ><use xlinkHref="#ei-close"></use></svg>
                </span>
                {children}
            </div>
        );
    }
}