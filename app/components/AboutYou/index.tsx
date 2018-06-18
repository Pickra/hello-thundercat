import * as React from "react";
import userStore from "../../stores/userStore";
import Characters from "../../components/Characters";

interface AboutYouState {
    dynamicComponent: JSX.Element;
}

export default class AboutYou extends React.Component<{}, AboutYouState> {
    state = { dynamicComponent: undefined }

    componentDidMount() {
        const { id } = userStore.getState().character;
        this.setState({ dynamicComponent: this.getComponent(id) })
    }

    getComponent = name => {
        const ThunderCat = Characters[name].component;
        return <ThunderCat />;
    };

    render() { return <div>{this.state.dynamicComponent}</div>; }
}