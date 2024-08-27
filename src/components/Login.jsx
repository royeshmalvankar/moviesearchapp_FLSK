//libraries
import React,{useContext,useEffect,useState} from "react";
import {  useNavigate } from "react-router-dom";
import { AuthContext } from "../authcontext/AuthContext";
import axios from "axios";
import "../App.css";

const Login = () => {
    const navigate = useNavigate();
    const {logemail, setlogemail,logpassword,setlogpassword,setIsAuth,setRole}=useContext(AuthContext);

    const reset = () => {
        setlogemail("");
        setlogpassword("");
    }

    const authrole=async()=>{
        const ath = await axios.get("https://moviesearchapp-server.onrender.com/user/profile",{
            headers:{
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        setRole(ath.data.user.role) 
    }

    const fetchlogin = async()=>{
        try {
            let response = await axios.post(`https://moviesearchapp-server.onrender.com/user/login`,{email:logemail,password:logpassword})
            let token=response.data.token
            if (token){
            setIsAuth(true)
            localStorage.setItem("token",response.data.token)
            alert("login success");
            reset()
            navigate("/")
            authrole()
            }
            else{
                alert("login failed \n Check Email and Password or if you are new Register first");
            }
            
        } catch (error) {
            console.log(error);
        }
        
        
    }

    return (
        <>
        <div>
            
            <div className="details" style={{marginTop:"200px"}}>
            <h1>Login</h1>
                <div className="form">
                    <label htmlFor="">Email</label>
                    <br />
                    <input type="text" placeholder="Email" value={logemail} onChange={(e)=>setlogemail(e.target.value)}/>
                    <br />
                    <label htmlFor="">Password</label>
                    <br />
                    <input type="password" placeholder="Password" value={logpassword} onChange={(e)=>setlogpassword(e.target.value)}/>
                    <br />
                    <br />
                    <button onClick={fetchlogin}>Login</button>
                </div>
            </div>
            <div className="register">
                <p>Don't have an account?</p>
                <button onClick={()=>navigate("/register")}>Register</button>
            </div>
        </div>
        </>
    );
};

export default Login;