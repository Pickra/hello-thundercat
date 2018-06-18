import * as React from "react";

import { Character } from "../Characters";

interface DrawerProps {
    selectedCharacter: Character;
    toggleDrawer: () => void;
    onSubmit: (e) => void;
}

interface DrawerState {
    isActive: boolean;
    isHoldingShiftKey: boolean;
}

export default class Drawer extends React.Component<DrawerProps, DrawerState> {
    state = {
        isActive: true,
        isHoldingShiftKey: false
    };

    titleRef: HTMLElement;
    submitButtonRef: HTMLElement;

    componentDidUpdate() {
        if (this.state.isActive) {
            this.titleRef.focus();
        }
    }

    submitFocusTrap = e => {
        if (e.shiftKey) { return; }

        if (e.key === "Tab") {
            e.preventDefault();
            this.titleRef.focus();
        }
    }

    titleFocusTrapForward = e => {
        if (this.state.isHoldingShiftKey && e.key === "Tab") {
            e.preventDefault();
            this.submitButtonRef.focus();
            this.setState({isHoldingShiftKey: false});
        }
    }

    titleFocusTrapBackward = e => {
        if (e.shiftKey) {
            e.preventDefault();
            this.setState({isHoldingShiftKey: true});
        };
    }

    onCancelClick = e => {
        e.preventDefault();
        this.props.toggleDrawer();
    }

    onKeyDownCancel = e => {
        if (e.key === "Enter") {
            e.preventDefault();
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
                <div
                    className="drawer__head"
                    tabIndex={0}
                    ref={ref => { this.titleRef = ref; }}
                    onKeyDown={this.titleFocusTrapBackward}
                    onKeyUp={this.titleFocusTrapForward}
                    aria-labelledby="title"
                >
                    <span
                        className="drawer__close"
                        onClick={toggleDrawer}
                        onKeyDown={this.onKeyDownCancel}
                        tabIndex={0}
                    >
                        <svg
                            className="icon icon--md"
                            role="button"
                            aria-label="Close Drawer"
                        ><use xlinkHref="#ei-close"></use></svg>
                    </span>
                    <h2 id="title">You Have Selected {selectedCharacter.id}</h2>
                </div>
                <div className="drawer__body">{children}</div>
                <div className="drawer__foot">
                    <button
                        className="button"
                        onClick={this.onCancelClick}
                        onKeyDown={this.onKeyDownCancel}
                        style={{marginRight: "1rem"}}
                    >Cancel</button>
                    <button
                        className="button button--primary"
                        ref={ref => { this.submitButtonRef = ref; }}
                        onKeyDown={this.submitFocusTrap}
                    >100%</button>
                </div>
            </form>
        );
    }
}
