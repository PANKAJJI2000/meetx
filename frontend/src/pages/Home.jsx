import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import '../App.css'
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import VideoChatIcon from '@mui/icons-material/VideoChat';
function HomeComponent() {


    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");


    const {addToUserHistory} = useContext(AuthContext)
    let handleJoinVideoCall = async () => {
        await addToUserHistory(meetingCode)
        navigate(`/${meetingCode}`)
    }
    return (
        <div className="homepage" > 
            <div className="navBar">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h2> VC:  <IconButton disabled>
                         <VideoChatIcon/>
                        </IconButton> 
                        <span style={{color:"Orange"}}>Connect Now</span></h2>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <IconButton disabled onClick={()=>{
                        navigate("/history")
                    }}>
                        <RestoreIcon />

                    </IconButton>
                    {/* <p>History</p> */}    
                    <Button   variant="standard" onClick={() => {
                        localStorage.removeItem("token")
                        navigate("/auth")
                    }}>
                        Logout
                    </Button>
                </div>
            </div>


            <div className="meetContainer">
                <div className="leftPanel">
                    <div>
                        <h2 style={{color:"black" }}>Providing Quality Video call Just Like Quality Education</h2>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <TextField  label="Meeting Code" onChange={e => setMeetingCode(e.target.value)} id="outlined-basic"></TextField>
                            <Button onClick={handleJoinVideoCall} variant="contained">
                                Join
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="rightPanel">
                    <img src="/logo3.png" alt="" />
                </div>
            </div>


            

        </div>
    );
}

export default withAuth(HomeComponent);