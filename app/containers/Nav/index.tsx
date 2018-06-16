import * as React from "react";
import NavItem from "../../components/NavItem";

interface NavProps {}
const style = {paddingLeft: '1rem', paddingRight: '1rem'};

export default class Nav extends React.Component<NavProps, {}> {
    render() {
        return (
            <nav className="layout__nav" style={style}>
                <ul className="layout__nav-menu">
                    <NavItem to='/select'>Who are you?</NavItem>
                </ul>
            </nav>
        );
    }
}
