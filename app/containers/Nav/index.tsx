import * as React from "react";

interface NavProps {}
const style = {paddingLeft: '1rem', paddingRight: '1rem'};

export default class Nav extends React.Component<NavProps, {}> {
    render() {
        return (
            <nav className="layout__nav" style={style}>
                <ul className="layout__nav-menu">
                    
                </ul>
            </nav>
        );
    }
}
