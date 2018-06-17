import LionO from "./LionO";

export interface Character {
    src: any;
    alt: string;
    component?: () => JSX.Element;
}

const Characters: { [key: string]: Character } = {
    logo: {
        src: require("../../../images/logo.png"),
        alt: "Thundercats Logo"
    },
    "Lion'O": {
        src: require("../../../images/lion-o.png"),
        alt: "Lion 'O image",
        component: LionO
    }
}

export default Characters;