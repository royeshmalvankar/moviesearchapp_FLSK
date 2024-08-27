import { useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { AuthContext } from "../authcontext/AuthContext"
import Loding from "../loding&error/Loding"
import Error from "../loding&error/Error"
import "../App.css"
const Movieselect = () => {
    const [data, setData] = useState()
    const { id } = useParams()
    const [isLoding, setLoding] = useState(true)
    const [isError, setError] = useState(false)
    const {role} = useContext(AuthContext)

    useEffect(() => {
        fetchData()
    },[])

    const fetchData = async () => {
        setLoding(true)
        try {
            const response = await axios.get(`https://moviesearchapp-server.onrender.com/movie/${id}`,{
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
            })
            setData(response.data.data)
            setLoding(false)
        } catch (error) {
            setError(true)
        }
        setError(false)
        setLoding(false)
    }
    const addfav = async (data) => {
        console.log(data);
        try {
            const response = await axios.post(`https://moviesearchapp-server.onrender.com/favorite/addfav`,{ 
                title: data.title,
                year: data.year,
                imdbID: data.imdbID,
                type: data.type,
                rating: data.rating,
                genre: data.genre,
                mov_id: data._id,
                poster: data.poster
        },{
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
        })
            console.log("added");   
        } catch (error) {
            console.log("Something went wrong",error);
            
        }
    }

    if (isLoding) {
        return (
            <Loding />
        )

    }
    if (isError) {
        return (
            <Error />
        )

    }

    return (

        <div className="movieselect">
            <img src={data.poster} alt="" />
            <h1>{data.title}</h1>
            <p><span>Year: </span>{data.year}</p>
            <p><span>ImdbID: </span>{data.imdbID}</p>
            <p><span>Type: </span>{data.type}</p>
            <p><span>Rating: </span>{data.rating}</p>
            <p><span>Genre: </span>{data.genre.join(" ,")}</p>
            <button onClick={() => addfav(data)}>Add to Favorites</button>
           {role==="ADMIN" && <Link style={{textDecoration:"none",color:"white"}} to={`/update/${data._id}`}><button>Update Details</button></Link>}
        </div>
    )
}

export default Movieselect