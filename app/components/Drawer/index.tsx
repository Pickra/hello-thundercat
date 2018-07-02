import * as React from "react";

import { Character } from "../Characters";

interface DrawerProps {
    selectedCharacter: Character;
    isActive: boolean;
    toggleDrawer: () => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

interface DrawerState {
    isHoldingShiftKey: boolean;
}

export default class Drawer extends React.Component<DrawerProps, DrawerState> {
    state = { isHoldingShiftKey: false };

    titleRef: HTMLElement;
    submitButtonRef: HTMLElement;
    formRef: HTMLFormElement;

    componentDidUpdate() {
        if (this.props.isActive) {
            this.titleRef.focus();
        }
    }

    submitFocusTrap = e => {
        if (!this.props.isActive || e.shiftKey) { return; }

        if (e.key === "Tab") {
            e.preventDefault();
            this.titleRef.focus();
        }
    }

    titleOnKeyUpFocusTrap = e => {
        if (!this.props.isActive) { return; }

        if (this.state.isHoldingShiftKey && e.key === "Tab") {
            e.preventDefault();
            this.setState({isHoldingShiftKey: false});
        }
    }

    titleOnKeyDownFocusTrap = e => {
        if (!this.props.isActive) { return; }

        if (this.state.isHoldingShiftKey && e.key === "Tab") {
            e.preventDefault();
            this.submitButtonRef.focus();
        } else if (e.shiftKey) {
            e.preventDefault();
            this.setState({isHoldingShiftKey: true});
        };
    }

    toggleOnKey = (e, key) => {
        if (!this.props.isActive) { return; }

        if (e.key === key) {
            e.preventDefault();
            this.props.toggleDrawer();
        }
    }

    onCancelClick = e => {
        e.preventDefault();
        this.props.toggleDrawer();
    }

    render() {
        const {
            children, selectedCharacter, toggleDrawer, onSubmit, isActive
        } = this.props;

        if (!selectedCharacter) { return false; }

        return (
            <div className={"drawer" + (isActive ? " drawer--open" : "")}>
                <form
                    name="thundercat-drawer"
                    className="drawer__content"
                    onSubmit={onSubmit}
                    ref={ref => { this.formRef = ref; }}
                    onKeyDown={e => {this.toggleOnKey(e, "Escape");}}
                >
                    <div
                        className="drawer__head"
                        tabIndex={0}
                        ref={ref => { this.titleRef = ref; }}
                        onKeyDown={this.titleOnKeyDownFocusTrap}
                        onKeyUp={this.titleOnKeyUpFocusTrap}
                        aria-labelledby="title"
                    >
                        <span
                            className="drawer__close"
                            onClick={toggleDrawer}
                            onKeyDown={e => {this.toggleOnKey(e, "Enter");}}
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
                            onKeyDown={e => {this.toggleOnKey(e, "Enter");}}
                            style={{marginRight: "1rem"}}
                        >Cancel</button>
                        <button
                            className="button button--primary"
                            ref={ref => { this.submitButtonRef = ref; }}
                            onKeyDown={this.submitFocusTrap}
                        >100%</button>
                    </div>
                </form>
            </div>
        );
    }
}
