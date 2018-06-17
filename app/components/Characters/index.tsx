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

const Characters: CharacterMap = {
    "Lion'O": {
        src: require("../../../images/lion-o.png"),
        alt: "Lion'O image",
        id: "Lion'O",
        component: LionO
    },
    "Cheetara": {
        src: require("../../../images/cheetara.png"),
        alt: "Cheetara image",
        id: "Cheetara",
        component: Cheetara
    },
    "Tygra": {
        src: require("../../../images/tygra.png"),
        alt: "Tygra image",
        id: "Tygra",
        component: Tygra
    },
    "Wilykit": {
        src: require("../../../images/wilykit.png"),
        alt: "Wilykit image",
        id: "Wilykit",
        component: Wilykit
    },
    "Panthro": {
        src: require("../../../images/panthro.png"),
        alt: "Panthro image",
        id: "Panthro",
        component: Panthro
    },
    "Wilykat": {
        src: require("../../../images/wilykat.png"),
        alt: "Wilykat image",
        id: "Wilykat",
        component: Wilykat
    }
}

export default Characters;