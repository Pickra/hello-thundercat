import * as React from "react";

import { Character } from "../Characters";

interface DrawerProps {
    selectedCharacter: Character;
    isActive: boolean;
    toggleDrawer: () => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default class Drawer extends React.Component<DrawerProps, {}> {
    titleRef: HTMLElement;
    submitButtonRef: HTMLElement;
    formRef: HTMLFormElement;

    componentDidUpdate() {
        if (this.props.isActive) {
            this.titleRef.focus();
        }
    }

    onKeyDownFocusTrap = e => {
        // My original implementation was overcomplicated + not 100%; it was maybe 98%
        // So I borrowed from Hidde de Vries; his article is great.
        // https://hiddedevries.nl/en/blog/2017-01-29-using-javascript-to-trap-focus-in-an-element
        const isTabPressed = e.key === 'Tab';
        if (!this.props.isActive || !isTabPressed) { return; }

        if (e.shiftKey) { /* shift + tab */
            if (document.activeElement === this.titleRef) {
                this.submitButtonRef.focus();
                e.preventDefault();
            }
        } else { /* tab */
            if (document.activeElement === this.submitButtonRef) {
                this.titleRef.focus();
                e.preventDefault();
            }
        }
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
        const { children, selectedCharacter, toggleDrawer, onSubmit } = this.props;

        if (!selectedCharacter) { return false; }

        return (
            <form
                name="thundercat-drawer"
                className="drawer__content"
                onSubmit={onSubmit}
                ref={ref => this.formRef = ref}
                onKeyDown={e => this.toggleOnKey(e, "Escape")}
            >
                <div
                    className="drawer__head"
                    tabIndex={0}
                    ref={ref => this.titleRef = ref}
                    onKeyDown={this.onKeyDownFocusTrap}
                    aria-labelledby="title"
                >
                    <span
                        className="drawer__close"
                        onClick={toggleDrawer}
                        onKeyDown={e => this.toggleOnKey(e, "Enter")}
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
                        onKeyDown={e => this.toggleOnKey(e, "Enter")}
                        style={{marginRight: "1rem"}}
                    >Cancel</button>
                    <button
                        className="button button--primary"
                        ref={ref => this.submitButtonRef = ref}
                        onKeyDown={this.onKeyDownFocusTrap}
                    >100%</button>
                </div>
            </form>
        );
    }
}
