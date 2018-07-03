import * as React from "react";
import userStore, { userActions } from "../../stores/userStore";
import Drawer from "../Drawer";

import Characters, { Character } from "../Characters";
import { History } from "history";

interface ThunderCatSelectionState {
    selectedCharacter: Character;
    isDrawerOpen: boolean;
}

interface ThunderCatSelectionProps {
    history: History;
}

class ThunderCatSelection extends React.Component<ThunderCatSelectionProps, ThunderCatSelectionState> {
    state = {
        selectedCharacter: undefined,
        isDrawerOpen: false
    }

    handleCharacterSelection = (thunderCat: Character) => {
        this.setState({
            selectedCharacter: thunderCat,
            isDrawerOpen: true
        });
    }

    onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, thunderCat: Character) => {
        if (e.key === "Enter") {
            e.preventDefault();
            this.handleCharacterSelection(thunderCat);
        }
    }

    toggleDrawer = () => {
        this.setState({ isDrawerOpen: !this.state.isDrawerOpen})
    }

    getCols() {
        return Object.keys(Characters).map(k => {
            const character = Characters[k];

            return (
                <div
                    className="grid__col grid__col--xs-4"
                    key={character.id}
                    role="radiogroup"
                    aria-labelledby="characters"
                >
                    <label
                        className="label"
                        style={{textAlign: "center", marginRight: 0}}
                        htmlFor={character.id}
                    >
                        <img
                            src={character.src}
                            alt={character.alt}
                        />
                        <p>{k}</p>
                        <input
                            type="radio"
                            name={character.id}
                            id={character.id}
                            onKeyDown={e => this.onKeyDown(e, character)}
                            onClick={() => this.handleCharacterSelection(character)}
                        />
                    </label>
                </div>
            );
        });
    }

    onSubmit = e => {
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