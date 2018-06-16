import * as React from "react";
import userStore from "../../stores/userStore";

interface HeaderProps {
    titleText: string;
}

export default class Header extends React.Component<HeaderProps, {}> {
    render() {
        return (
            <header className="layout__header">
                <section>Hello {this.props.titleText}</section>
            </header>
        );
    }
}