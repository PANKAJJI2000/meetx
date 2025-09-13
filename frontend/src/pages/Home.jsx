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
    const [isJoining, setIsJoining] = useState(false);

    const {addToUserHistory} = useContext(AuthContext)
    
    let handleJoinVideoCall = async () => {
        if (!meetingCode.trim()) {
            alert('Please enter a meeting code');
            return;
        }

        try {
            setIsJoining(true);
            console.log('Joining call with code:', meetingCode);
            await addToUserHistory(meetingCode);
            console.log('Successfully added to history, navigating...');
            navigate(`/${meetingCode}`);
        } catch (error) {
            console.error('Error adding to history:', error);
            alert('Failed to save meeting to history, but joining anyway');
            navigate(`/${meetingCode}`);
        } finally {
            setIsJoining(false);
        }
    }

    return (
        <div className="homepage" > 
            <div className="navBar">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h2> Desi Talks  <IconButton disabled>
                         <VideoChatIcon/>
                        </IconButton> 
                        <span style={{color:"Orange"}}>Connect Now</span></h2>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <IconButton onClick={()=>{
                        navigate("/history")
                    }}>
                        <RestoreIcon />

                    </IconButton>
                    <Button variant="standard" onClick={() => {
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
                            <TextField  
                                label="Meeting Code" 
                                value={meetingCode}
                                onChange={e => setMeetingCode(e.target.value)} 
                                id="outlined-basic"
                                disabled={isJoining}
                            />
                            <Button 
                                onClick={handleJoinVideoCall} 
                                variant="contained"
                                disabled={isJoining || !meetingCode.trim()}
                            >
                                {isJoining ? 'Joining...' : 'Join'}
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