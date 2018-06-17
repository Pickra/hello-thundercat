import * as React from "react";

import { Character } from "../Characters";

interface DrawerProps {
    selectedCharacter: Character;
    toggleDrawer: () => void;
    onSubmit: (e) => void;
}

interface DrawerState {
    isActive: boolean;
}

export default class Drawer extends React.Component<DrawerProps, DrawerState> {
    state = { isActive: true }

    onCancelClick = e => {
        e.preventDefault();
        this.props.toggleDrawer();
    }

    onKeyDownCancel = e => {
        if (e.key === "Enter") {
            this.onCancelClick(e);
        }
    }

    render() {
        const { children, selectedCharacter, toggleDrawer, onSubmit } = this.props;
        if (!selectedCharacter) { return false; }

        return (
            <form
                name="thundercat-drawer"
                className="drawer__content"
                onSubmit={onSubmit}
            >
                <div className="drawer__head">
                    <span
                        className="drawer__close"
                        onClick={toggleDrawer}
                        onKeyDown={this.onKeyDownCancel}
                        tabIndex={0}
                    >
                        <svg
                            className="icon icon--md"
                            role="button"
                            aria-label="close"
                        ><use xlinkHref="#ei-close"></use></svg>
                    </span>
                    <h2>You Have Selected {selectedCharacter.id}</h2>
                </div>
                <div className="drawer__body">{children}</div>
                <div className="drawer__foot">
                    <button
                        className="button"
                        onClick={this.onCancelClick}
                        onKeyDown={this.onKeyDownCancel}
                        style={{marginRight: "1rem"}}
                    >Cancel</button>
                    <button className="button button--primary">100%</button>
                </div>
            </form>
        );
    }
}
