import React from "react";
import "../App.css"
import { Link } from 'react-router-dom';
export default function Landingpage() {
    return (
        <div className="landingPageContainer">
            <nav>
                <div className="navHeader">
                    <h2>Apna video call</h2>
                </div>

                <div className="navList">
                    <p>Join As Guest</p>
                    <p>Register</p>
                    <div role="button">
                        <p>Login</p>
                    </div>
                </div>
            </nav>
            <div className="landingMainContainer">
                <div className="mainContent">
                    <h1><span style={{ color: "#FF9839" }}>Connect</span> With your</h1>
                    <h1>Loved Ones</h1>
                    <p>cover a distance by apna video call</p>
                    <div role="button" className="getStartedbtn">
                        <Link to={"/auth"} >Get started</Link>
                    </div>

                </div>
                <div className="mainContentImg">
                    <img src="../mobile.png" alt="" />

                </div>
            </div>

        </div>
    );
}