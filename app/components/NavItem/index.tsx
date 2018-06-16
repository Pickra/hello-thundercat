import * as React from "react";
import {NavLink} from "react-router-dom";

interface NavItemProps {
    to: string;
}

export default class NavItem extends React.Component <NavItemProps, {}> {
    render() {
        const { to, children } = this.props;

        return (
            <li className="layout__nav-item">
                <NavLink
                    to={to}
                    exact={true}
                    className="layout__nav-link"
                >{children}</NavLink>
            </li>
        );
    }
};