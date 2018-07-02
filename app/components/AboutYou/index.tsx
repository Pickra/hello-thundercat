import * as React from "react";
import userStore from "../../stores/userStore";
import Characters from "../../components/Characters";

export default class AboutYou extends React.Component {
    getComponent = name => {
        const ThunderCat = Characters[name].component;
        return <ThunderCat />;
    };

    render() {
        const { id } = userStore.getState().character;
        return <div>{this.getComponent(id)}</div>;
    }
}