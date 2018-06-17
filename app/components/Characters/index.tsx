import LionO from "./LionO";

export interface Character {
    src: any;
    alt: string;
    id?: string;
    component?: () => JSX.Element;
}

interface CharacterMap {
    [key: string]: Character;
}

const Characters: CharacterMap = {
    "Lion'O": {
        src: require("../../../images/lion-o.png"),
        alt: "Lion 'O image",
        id: "liono",
        component: LionO
    }
}

export default Characters;