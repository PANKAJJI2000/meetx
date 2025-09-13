import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton, CircularProgress } from '@mui/material';

export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const token = localStorage.getItem("token");
                console.log('Fetching history with token:', token ? 'exists' : 'missing');
                
                if (!token) {
                    setError('No authentication token found');
                    return;
                }
                
                const history = await getHistoryOfUser();
                console.log('History response:', history);
                console.log('History type:', typeof history);
                console.log('Is array:', Array.isArray(history));
                
                // Handle different response formats
                let meetingsArray = [];
                if (Array.isArray(history)) {
                    meetingsArray = history;
                } else if (history && typeof history === 'object') {
                    meetingsArray = [history];
                } else {
                    meetingsArray = [];
                }
                
                console.log('Processed meetings array:', meetingsArray);
                console.log('Meetings count:', meetingsArray.length);
                setMeetings(meetingsArray);
            } catch (err) {
                console.error('Error fetching history:', err);
                setError(err.message || 'Failed to fetch history');
                setMeetings([]);
            } finally {
                setLoading(false);
            }
        }

        fetchHistory();
    }, [getHistoryOfUser])

    let formatDate = (dateString) => {
        if (!dateString) return 'Invalid Date';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return 'Invalid Date';
            
            const day = date.getDate().toString().padStart(2, "0");
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        } catch {
            return 'Invalid Date';
        }
    }

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Loading history...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <div>
                <IconButton onClick={() => routeTo("/home")}>
                    <HomeIcon />
                </IconButton>
                <Typography variant="h6" color="error" sx={{ textAlign: 'center', mt: 4 }}>
                    {error}
                </Typography>
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Button variant="contained" onClick={() => window.location.reload()}>
                        Retry
                    </Button>
                </Box>
            </div>
        );
    }

    return (
        <div>
            <IconButton onClick={() => routeTo("/home")}>
                <HomeIcon />
            </IconButton>
            {
                meetings && meetings.length > 0 ? meetings.map((e, i) => {
                    console.log('Meeting item:', e); // Debug log
                    return (
                        <Card key={e?._id || e?.meeting_code || i} variant="outlined" sx={{ mb: 2 }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Code: {e?.meeting_code || e?.meetingCode || 'N/A'}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    Date: {formatDate(e?.date || e?.createdAt)}
                                </Typography>
                            </CardContent>
                        </Card>
                    )
                }) : (
                    <Typography variant="h6" sx={{ textAlign: 'center', mt: 4, color: 'gray' }}>
                        No meeting history found
                    </Typography>
                )
            }
        </div>
    )
}