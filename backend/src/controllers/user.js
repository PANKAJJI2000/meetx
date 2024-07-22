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
    try {
        const user = await User.findOne({token:token});
        const meetings = await Meeting.findOne({user_id:user.username})
        res.json(meetings);

    } catch (e) {
        res.json({message: `something went wrong ${e}`})
    }
}


const addToUserHistory = async (req,res) =>{
    const {token ,meeting_Code} = req.body;
    try {
        const user = await User.findOne({token:token});
        const newMeeting = new Meeting({
            user_id:user.username,
            meetingCode:meeting_Code,
        })

        await newMeeting.save();
        res.status(httpStatus.CREATED).JSON({message:"Added Code to History"})
    } catch (e) {
        res.json({message: `something went wrong ${e}`})
    } 
}

export {logIn , signUp,getUserHistory,addToUserHistory};