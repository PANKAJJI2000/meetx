import React from "react";
import "../App.css"
import { Link, useNavigate } from 'react-router-dom';
import VideoChatIcon from '@mui/icons-material/VideoChat';
import { IconButton } from '@mui/material';

export default function Landingpage() {


    const router = useNavigate();
    return (
        <div className="landingPageContainer">
            <nav>
                <div className="navHeader">
                <h2> VC: 
                        <span style={{color:"Orange"}}>Connect Now</span></h2>
                </div>

                <div className="navList">
                    <p onClick={() =>{
                        router( "/djn3e4");
                    }}>Join As Guest</p>
                    <p onClick ={() =>{
                        router("/auth");
                    }}>Register</p>
                    <div onClick ={() =>{
                        router("/auth");
                    }}role="button">
                        <p>Login</p>
                    </div>
                </div>
            </nav>
            <div className="landingMainContainer">
                <div className="mainContent">
                    <h1 style={{ color: "white" }}><span style={{ color: "#FF9839" }}>Connect</span> With your</h1>
                    <h1 style={{ color: "white" }}>Loved Ones</h1>
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