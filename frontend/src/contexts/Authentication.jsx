import { createContext, useContext, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import httpStatus from 'http-status';
export const AuthContext = createContext({});

const client = axios.create({
    baseURL:"http://localhost:3000/api/v1/users"
})

export const AuthProvider = ({children}) => {
    const authContext = useContext(AuthContext);
    const [userData,setUserData] = useState(authContext);
    const router = useNavigate();
    const handleRegister = async(name ,username,password) => {
        try {
            let request = await client.post("/signUp" ,{
                name:name,
                usernmae:username,
                password:password,
            });
            if(request.status == httpStatus.CREATED){
                return request.data.message;
            }
        } catch (error) {
            throw error;
        }
    }

    const handleLogIn = async(username,password)=>{
        try {
            let request = await client.post("/login" , {
                username:username,
                password:password,
            });
            if(request.status == httpStatus.OK){
                localStorage.setItem("token",request.data.token);
            }
        } catch (error) {
            throw error;
        }
    }
    

    const data = {
        userData ,setUserData,handleRegister
    }
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}