import Navbar from "./navbar"
import { useState,useEffect,useContext } from "react"
import { AuthContext } from "../authcontext/AuthContext"
import { Link } from "react-router-dom"
import axios from "axios"
import Loding from "../loding&error/Loding"
import Error from "../loding&error/Error"


const Genre=()=>{
    const [data1,setData1] = useState([])
    const [gd, setgd] = useState("")
    const {setLoding, isLoding,setError, isError} = useContext(AuthContext)
    const [page, setPage] = useState(1)
    const [lastpage, setLastpage] = useState(0)

    useEffect(() => {
        fetchData()
    },[gd,page])

    
    const fetchData = async () => {
        setLoding(true)
        try {
            const response = await axios.get(`https://moviesearchapp-server.onrender.com/movie/search?page=${page}&limit=10&${gd}`,{
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
            })
            const response2 =  await axios.get(`https://moviesearchapp-server.onrender.com/movie/search?${gd}`,{
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
            })
            setData1(response.data.data)
            setLastpage(Math.ceil(response2.data.genrecount/10))
            setLoding(false)
        } catch (error) {
            setError(true)
        }
        setError(false)
        setLoding(false)
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
        <>
        <div className="genre">
            <button onClick={()=>{setgd("genre=Action"),setPage(1)}}>Action</button>
            <button onClick={()=>{setgd("genre=Adventure"),setPage(1)}}>Adventure</button>
            <button onClick={()=>{setgd("genre=Sci-Fi"),setPage(1)}}>Sci-Fi</button>
            <button onClick={()=>{setgd("genre=Romance"),setPage(1)}}>Romance</button>
            <button onClick={()=>{setgd("genre=Horror"),setPage(1)}}>Horrer</button>
            <button onClick={()=>{setgd("genre=Mystery"),setPage(1)}}>Mystery</button>
            <button onClick={()=>{setgd("genre=Comedy"),setPage(1)}}>Comedy</button>
        </div>
        <div className="page">
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                {data1.length<10?<button onClick={() => setPage(1)}>First Page</button>:<button onClick={() => setPage(lastpage)}>Last Page</button>}
                
                <button onClick={() => setPage(page + 1)} disabled={data1.length < 10}>Next</button>
            </div>
        <div className="movie-container">
       
                {data1.map((movie) => {
                    return(
                        <Link style={{ textDecoration: "none" }} to={`/movieselect/${movie._id}`}><div key={movie._id} className="movie">
                        <img src={movie.poster} alt="" />
                        <h2>{movie.title}</h2>
                        <p>{movie.year}</p>
                    </div></Link>
                    )
                    })}
    
            </div>
            <div className="page">
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                {data1.length<10?<button onClick={() => setPage(1)}>First Page</button>:<button onClick={() => setPage(lastpage)}>Last Page</button>}
                <button onClick={() => setPage(page + 1)} disabled={data1.length < 10}>Next</button>
            </div>
        </>
    )
}
export default Genre