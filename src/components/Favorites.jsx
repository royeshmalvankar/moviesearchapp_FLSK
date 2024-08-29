import { AuthContext } from "../authcontext/AuthContext"
import { useContext, useEffect, useState } from "react"
import "../App.css"
import axios from "axios"
import { Link } from "react-router-dom"
import { Button } from "@chakra-ui/react"
import Loding from "../loding&error/Loding"
import Error from "../loding&error/Error"
const Favorites = ()=>{
    const {fav,setLoding, isLoding,setError, isError}=useContext(AuthContext)
    const [favdata, setFavdata] = useState([])

    useEffect(() => {
        getfav()
    }, [])
    // console.log(fav);
    const getfav=async()=>{
        setLoding(true)
        try {
           
            const resp = await axios.get("https://moviesearchapp-server.onrender.com/favorite/favall",{
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
            })   
        setFavdata(resp.data.data)
        setLoding(false)
        } catch (error) {
            setError(true)
            console.log(error);
            
        }
        setError(false)
        setLoding(false)
        
        
    }

    const removefav = async (data) => {
        try { 
            const response = await axios.delete(`https://moviesearchapp-server.onrender.com/favorite/delete/${data._id}`,{
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
            })
            getfav()
        } catch (error) {
            console.log(error);
            
        }
    }
    if (isLoding) {
        return(
            <Loding/>
        )
        
    }
    if (isError) {
        return(
            <Error/>
        )
        
    }
    return(
        <div className="movie-container">
        {favdata.length==0?<h1 style={{width:"100%",textAlign:"center",marginLeft:"230%",marginTop:"50px"}}>No Favorites</h1>:favdata.map((favm) => {
                    return(
                        <div key={favm._id}  className="movie" style={{height:"570px"}} ><Link style={{ textDecoration: "none" }} to={`/movieselect/${favm.mov_id}`} key={favm._id} >
                        <img src={favm.poster} alt="" />
                        <h2>{favm.title}</h2>
                        <p>{favm.year}</p>
                        <p>{favm.rating}</p></Link>
                        <button style={{marginTop:"10px"}} onClick={() => removefav(favm)}>Remove</button>
                    </div>
                    
                    )
                    })}
        </div>
    )
}
export default Favorites