import * as React from "react";

interface HeaderProps {}

export default class Header extends React.Component<HeaderProps, {}> {
    render() {
        return (
            <header className="layout__header">
                <section>Hello Thundercat</section>
            </header>
        );
    }
}