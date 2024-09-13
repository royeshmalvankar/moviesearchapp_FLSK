import React, { useEffect, useState } from "react"
import { Link,useNavigate} from "react-router-dom"
import "../App.css"
import axios from "axios"
const Navbar =()=>{
    const css={textDecoration:"none",color:"white"}

    const [user,setUser]=useState("")
    
    const Navigate=useNavigate()

    useEffect(()=>{
        if(expires  <= Date.now()) {
            logout()
          }
          userdata()
    },[])

    const userdata=async()=>{
        try {
            const response = await axios.get(`https://moviesearchapp-server.onrender.com/user/profile`,{
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}   
            })
            setUser(response.data.user.name)
        } catch (error) {
            console.log(error);
            
        }
    }
    const logout=()=>{
        axios.get ("https://moviesearchapp-server.onrender.com/user/logout",{
            headers:{
                 "Authorization": `Bearer ${localStorage.getItem("token")}`
            }})
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        Navigate("/login")
    }
    let token =localStorage.getItem("token")
    const jwtPayload = token && JSON.parse(window.atob(token?.split('.')[1]));
    const expires = new Date(jwtPayload?.exp * 1000);
    const date = new Date();
    console.log("exp",expires,"--","now",date);
    


    return(
        <header>
            <nav className="navbar">
                <div className="nav1">
                    <Link to="/" style={css}><h1>Home</h1></Link>
                    <Link to="/genre" style={css}><h1>Genre</h1></Link>
                    <Link to="/higestrated" style={css}><h1>Higest Rated</h1></Link>
                    <Link to="/favorites" style={css}><h1>Favorites</h1></Link>
                   {localStorage.getItem("role")==="ADMIN" && <Link to="/addmovies" style={css}><h1>Add Movies</h1></Link>}
                </div>
                <div className="nav2">
                {localStorage.getItem("token")?<div className="user"><><h1>Welcome! {user}</h1></><h1 onClick={()=>{logout()}} style={css}>Logout</h1></div>:<Link to="/login" style={css}><h1>Login</h1></Link>}
                 {localStorage.getItem("token")?<h1></h1>:<Link to="/register" style={css}><h1>Register</h1></Link>}
                </div>
            </nav>
        </header>
        
    )
}

export default Navbar