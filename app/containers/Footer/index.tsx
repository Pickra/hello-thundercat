import * as React from "react";

interface FooterProps {}

export default class Footer extends React.Component<FooterProps, {}> {
    render() {
        return (
            <footer className="layout__footer">
                <div className="layout__footer-left-item">Important footer stuff</div>
                <div className="layout__footer-right-item">Not as important footer stuff</div>
            </footer>
        );
    }
}
