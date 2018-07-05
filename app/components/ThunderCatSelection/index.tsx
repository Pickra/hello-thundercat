import * as React from "react";
import userStore, { userActions } from "../../stores/userStore";
import Drawer from "../Drawer";

import Characters, { Character } from "../Characters";
import { History } from "history";

interface ThunderCatSelectionState {
    selectedCharacter: Character;
    selectedRef: HTMLLabelElement;
    isDrawerOpen: boolean;
}

interface ThunderCatSelectionProps {
    history: History;
}

interface OnKeyDown {
    (e: React.KeyboardEvent<HTMLLabelElement>, thunderCat: Character, ref: HTMLLabelElement): void;
}

const visuallyHidden = {
    position: "absolute", height: "1px", margin: "-1px",
    clip: "rect(0 0 0 0)", overflow: "hidden", width: "1px"
} as React.CSSProperties;

class ThunderCatSelection extends React.Component<ThunderCatSelectionProps, ThunderCatSelectionState> {
    state = {
        selectedCharacter: undefined,
        selectedRef: undefined,
        isDrawerOpen: false
    }

    handleCharacterSelection = (thunderCat: Character, ref: HTMLLabelElement) => {
        this.setState({
            selectedCharacter: thunderCat,
            selectedRef: ref,
            isDrawerOpen: true
        });
    }

    onKeyDown: OnKeyDown = (e, thunderCat, ref) => {
        if (e.key === "Enter") {
            e.preventDefault();
            this.handleCharacterSelection(thunderCat, ref);
        }
    }

    toggleDrawer = () => {
        this.setState({ isDrawerOpen: !this.state.isDrawerOpen});
        this.state.selectedRef.focus();
    }

    getCols() {
        return Object.keys(Characters).map(k => {
            const character = Characters[k];

            return (
                <div
                    className="grid__col grid__col--xs-4"
                    key={k}
                    role="radiogroup"
                    aria-labelledby="Thundercats"
                >
                    <label
                        className="label"
                        style={{textAlign: "center", marginRight: 0}}
                        htmlFor={k}
                        tabIndex={0}
                        onKeyDown={e => this.onKeyDown(e, character, this[`${k}-ref`])}
                        onClick={() => this.handleCharacterSelection(character, this[`${k}-ref`])}
                        ref={ref => this[`${k}-ref`] = ref}
                    >
                        <img src={character.src} alt={character.alt} />
                        <p>{k}</p>
                        <input
                            type="radio"
                            name="Thundercat"
                            id={k}
                            tabIndex={-1}
                            style={visuallyHidden}
                        />
                    </label>
                </div>
            );
        });
    }

    onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.toggleDrawer();

        userStore.dispatch({
            type: userActions.selectCharacter,
            payload: {
                hasSelectedCharacter: true,
                character: this.state.selectedCharacter.id
            }
        });

        this.props.history.push("/about-you");
    }

    render() {
        const { isDrawerOpen, selectedCharacter } = this.state;

        return (
            <div>
                <h2>Which Thundercat are you?</h2>
                <div className="grid">
                    <div
                        className="grid__row grid__row--padded"
                        style={{marginTop: "5rem"}}
                        id="characters"
                    >{this.getCols()}</div>
                </div>
                <div className={"drawer" + (isDrawerOpen ? " drawer--open" : "")}>
                    <Drawer
                        selectedCharacter={selectedCharacter}
                        toggleDrawer={this.toggleDrawer}
                        onSubmit={this.onSubmit}
                        isActive={isDrawerOpen}
                    >{getDrawerBody(selectedCharacter)}</Drawer>
                </div>
            </div>
        );
    }
}

const getDrawerBody = (character: Character): JSX.Element => {
    return (
        <div className="grid">
            <div className="grid__row grid__row--padded">
                <div className="grid__col grid__col--xs-4 grid__col--xs-offset-3">
                    <img
                        src={character ? character.src : ""}
                        alt={character ? character.alt : ""}
                    />
                </div>
                <div className="grid__col grid__col--xs-11 grid__col--xs-offset-1">
                    <p>
                        Excellent choice but this is an important decision,
                        one that may affect the rest of your life.
                    </p>
                    <p><b>ARE YOU 100% SURE ABOUT THIS?</b></p>
                </div>
            </div>
        </div>
    );
};

export default ThunderCatSelection;