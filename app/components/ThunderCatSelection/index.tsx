import * as React from "react";

interface ThunderCatSelectionProps {}

export default class ThunderCatSelection extends React.Component<ThunderCatSelectionProps, {}> {
    render() {
        return (
            <div>
                <h2>Which Thundercat are you?</h2>
                {this.props.children}
            </div>
        );
    }
}