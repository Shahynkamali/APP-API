import React, { Component } from "react";
import { Link, BrowserRouter } from "react-router-dom";


class Landing extends Component {
    render() {
        return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
            <div className="row">
                <div className="col s12 center-align">
                    <h4><b>Inventory App</b>A Inventory App that makes counting a breeze!{" "}<span style={{ fontFamily: "monospace" }}>Inventory App</span> Count Now!</h4>
                    <p className="flow-text grey-text text-darken-1">
                    Count all your liquor and send it off to a excell spreadsheet!
                    </p>
                    <br />

                    <BrowserRouter>
                        <div className="col s6">
                            <Link style={{width: "140px",borderRadius: "3px",letterSpacing: "1.5px"}}
                                    to="/register"
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                                Register
                            </Link>
                        </div>
                        <div className="col s6">
                            <Link
                            to="/login"
                            style={{width: "140px",borderRadius: "3px",letterSpacing: "1.5px"}}
                            className="btn btn-large btn-flat waves-effect white black-text">
                            Log In
                            </Link>
                        </div>
                    </BrowserRouter>
                </div>
            </div>
        </div>
        );
    }
}
export default Landing;