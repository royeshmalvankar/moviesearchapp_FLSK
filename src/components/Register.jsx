import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../authcontext/AuthContext";
import axios from "axios";
import "../App.css";
const Register = () => {
    const {email, setemail,password,setpassword} =useContext(AuthContext);
    const [name, setname] = useState("");
    const [role, setrole] = useState("");
    const navigate = useNavigate()

    const reset = () => {
        setname("");
        setemail("");
        setpassword("");
        setrole("");
    }
    async function handleSubmit(e){

        e.preventDefault();
        try {
            let response =  await axios.post(`https://moviesearchapp-server.onrender.com/user/register`,{name,email,password,role})
            console.log("rp",response)
            alert("Registered Successfully")
            reset()
            navigate("/login")
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
        <div className="details" style={{marginTop:"200px"}}>
            <h1>Register</h1>
                <div className="form">
                    <label htmlFor="">Name</label>
                    <br />
                    <input type="text" placeholder="Name" value={name} onChange={(e)=>setname(e.target.value)}/>
                    <br />
                    <label htmlFor="">Email</label>
                    <br />
                    <input type="text" placeholder="Email" value={email} onChange={(e)=>setemail(e.target.value)}/>
                    <br />
                    <label htmlFor="">Password</label>
                    <br />
                    <input type="password" placeholder="Password" value={password} onChange={(e)=>setpassword(e.target.value)}/>
                    <br />
                    <label htmlFor="">Role</label>
                    <br />
                    <select value={role} onChange={(e)=>setrole(e.target.value)}>
                        <option value="">Select</option>
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                    <br />
                    <button onClick={handleSubmit}>Register</button>
                </div>
        </div>
        <div className="register">
                <p>Already have an account?</p>
                <button onClick={()=>navigate("/lo")}>Login</button>
            </div>
        </>
    );
}

export default Register