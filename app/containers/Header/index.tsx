import * as React from "react";

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