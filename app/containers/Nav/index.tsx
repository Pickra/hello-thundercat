import * as React from "react";
import userStore, { userActions } from "../../stores/userStore";
import NavItem from "../../components/NavItem";

interface NavProps {}
const style = {paddingLeft: '1rem', paddingRight: '1rem'};

export default class Nav extends React.Component<NavProps, {}> {
    getLogOut() {
        if (!userStore.getState().isLoggedIn) { return null; }

        const updateState = () => {userStore.dispatch({
            type: userActions.logout
        })};

        return <NavItem to='/' onClick={updateState}>Log out</NavItem>
    }

    render() {
        return (
            <nav className="layout__nav" style={style}>
                <ul className="layout__nav-menu">
                    <NavItem to='/select'>Who are you?</NavItem>
                    <NavItem to='/about-you'>About you</NavItem>
                    {this.getLogOut()}
                </ul>
            </nav>
        );
    }
}
