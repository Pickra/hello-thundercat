import LionO from "./LionO";
import Cheetara from "./Cheetara";
import Tygra from "./Tygra";
import Wilykit from "./Wilykit";
import Panthro from "./Panthro";
import Wilykat from "./Wilykat";

export interface Character {
    src: any;
    alt: string;
    id?: string;
    component?: () => JSX.Element;
}

interface CharacterMap {
    [key: string]: Character;
}

const thundercats = { LionO, Cheetara, Tygra, Wilykit, Panthro, Wilykat };

const Characters: CharacterMap = Object.keys(thundercats)
.reduce((acc, curr, i) => {
    const src = i === 0 ? "lion-o" : curr.toLowerCase();
    const name = i === 0 ? "Lion'O" : curr;

    acc[name] = {
        src: require(`../../../images/${src}.png`),
        alt: `${name} image`,
        id: name,
        component: thundercats[curr]
    }

    return acc;
}, {});

export default Characters;