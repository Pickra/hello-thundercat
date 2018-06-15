import * as React from "react";

const style: any = {overflowY: "auto"};
export default class MainContent extends React.Component {
    render() {
        return (
            <section className="layout__main" style={style}>
                <main className="layout__content">
                    {this.props.children}
                </main>
            </section>
        );
    }
}