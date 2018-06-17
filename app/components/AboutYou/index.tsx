import * as React from "react";
import userStore from "../../stores/userStore";

interface AboutYouState {
    dynamicComponent: JSX.Element;
}

export default class AboutYou extends React.Component<{}, AboutYouState> {
    state = { dynamicComponent: undefined }

    componentDidMount() {
        const { component } = userStore.getState().character;
        this.setState({ dynamicComponent: this.getComponent(component) })
    }

    getComponent = ComponentFunction => <ComponentFunction />;

    render() { return <div>{this.state.dynamicComponent}</div>; }
}