import httpStatus from 'http-status';
import { User } from '../models/users.js';
import bcrypt, { hash } from "bcrypt";
import crypto from 'crypto';
import { Meeting } from '../models/meeting.js';


const logIn = async (req, res) => {
    let { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Provide details" })
    }
    try {
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "User not Found" });
        }
        let isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (isPasswordCorrect) {
            let token = crypto.randomBytes(20).toString("hex");

            user.token = token;
            await user.save();
            res.status(httpStatus.OK).json({ token: token });
        }
        else{
            return res.status(httpStatus.UNAUTHORIZED).json({message:"Wrong Password"})
        }

    } catch (error) {
        return res.status(500).json({message:`Something went wrong ${error.message}`});
    }
};


const signUp = async (req, res) => {
    

    try {
        let { name, username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(httpStatus.FOUND).json({ message: "User already exists." });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            name: name,
            username: username,
            password: hashedPassword,
        });
       
        await newUser.save();
        
        res.status(httpStatus.CREATED).json({ message: "Account Created SuccessFully." })
    } catch (error) {
        res.json({ message: `Something went wrong ${error.message}` });
    }
}



const getUserHistory = async (req,res) => {
    const {token} = req.query;
    console.log('getUserHistory called with token:', token);
    
    try {
        if (!token) {
            console.log('No token provided');
            return res.status(400).json({message: "Token is required"});
        }

        const user = await User.findOne({token:token});
        console.log('User found:', user ? user.username : 'No user found');
        
        if (!user) {
            console.log('User not found for token:', token);
            return res.status(404).json({message: "User not found"});
        }
        
        const meetings = await Meeting.find({user_id:user.username});
        console.log('Found meetings for user:', user.username, 'Count:', meetings.length, 'Data:', meetings);
        
        res.json(meetings);
    } catch (e) {
        console.error('Error in getUserHistory:', e);
        res.status(500).json({message: `something went wrong ${e.message}`})
    }
}

const addToUserHistory = async (req,res) =>{
    const {token, meeting_code} = req.body;
    console.log('addToUserHistory called with:', {token, meeting_code});
    
    try {
        if (!token || !meeting_code) {
            console.log('Missing required fields:', {token: !!token, meeting_code: !!meeting_code});
            return res.status(400).json({message: "Token and meeting code are required"});
        }

        const user = await User.findOne({token:token});
        console.log('User found for addToHistory:', user ? user.username : 'No user found');
        
        if (!user) {
            console.log('User not found for token:', token);
            return res.status(404).json({message: "User not found"});
        }
        
        const newMeeting = new Meeting({
            user_id: user.username,
            meeting_code: meeting_code,
        });

        const savedMeeting = await newMeeting.save();
        console.log('Meeting saved successfully:', savedMeeting);
        
        res.status(httpStatus.CREATED).json({message:"Added Code to History", meeting: savedMeeting});
    } catch (e) {
        console.error('Error in addToUserHistory:', e);
        res.status(500).json({message: `something went wrong ${e.message}`})
    } 
}

export { logIn, signUp, getUserHistory, addToUserHistory };