import { useContext,useEffect, useState } from "react"
import { AuthContext } from "../authcontext/AuthContext"
import axios from "axios"
import Navbar from "./navbar"
import "../App.css"
import Loding from "../loding&error/Loding"
import Error from "../loding&error/Error"
import { Link, Navigate } from "react-router-dom"
import { Button } from "@chakra-ui/react"
import Nodata from "./Nodata"


const Home = () => {
    const {data, setData,setLoding, isLoding,setError, isError,setfav,Token,IsAuth} = useContext(AuthContext)
    const [sd, setSd] = useState("")
    const [page, setPage] = useState(1)
    const [lastpage, setLastpage] = useState(0)
    const [responses, setResponses] = useState(false)
    const [year, setyear] = useState("")
    const [rating, setrating] = useState("")
    const [type, settype] = useState("")
    const [sort, setSort] = useState("")
    const [order, setOrder] = useState("")
    
    const reset=()=>{
        setyear("")
        setrating("")
        settype("")
        setSort("")
        setOrder("")
    }

    useEffect(() => {
        const timer=setTimeout(() => {
            fetchData()
        },1000)
        return () => clearTimeout(timer)
    },[sd,page])

    function search(e){
        setSd(e.target.value)
        setPage(1)
    }

    const fetchData = async () => {
        setLoding(true)
       try {
         const response =  await axios.get(`https://moviesearchapp-server.onrender.com/movie/search?title=${sd}&page=${page}&year=${year}&rating=${rating}&type=${type}&sortby=${sort}&order=${order}&limit=10`,
         {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
         )
         const response2 =  await axios.get(`https://moviesearchapp-server.onrender.com/movie/all`,
         {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
         )
         
         if(response.data.length===0){
            setResponses(true)
         }
         else{
            setResponses(false)
         }
         setData(response.data.data)
         setLastpage(Math.ceil(response2.data.count/10))
         reset()
         
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
    if(responses){
        return(
           <Navigate to={"/nodata"} />
        )
    }
    return (
        <>
            <h1 style={{textAlign:"center"}}>Movie Search</h1>
            <br />
            <div className="search">
                <label>Search: </label>
                <input name="scr" type="text" placeholder="search" value={sd} onChange={search} />
                <br />
            </div>
            <div className="filterandsorting">
                <label htmlFor="">Year: </label>
                <input type="text" placeholder="year" value={year} onChange={(e) => setyear(e.target.value )}/>
                <label htmlFor="">Type: </label>
                <input type="text" placeholder="type" value={type} onChange={(e) => settype( e.target.value )}/>
                <label htmlFor="">Rating: </label>
                <select name="rating" id="" value={rating} onChange={(e) => setrating(e.target.value )}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <button onClick={() => fetchData()} >Filter</button>
            </div>
            <div className="filterandsorting">
                <label htmlFor="">SortBy:</label>
                <select name="" id="" value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="">sort</option>
                    <option value="year">Year</option>
                    <option value="rating">Rating</option>
                </select>
                <label htmlFor="">Order:</label>
                <select name="" id="" value={order} onChange={(e) => setOrder(e.target.value)}>
                    <option value="">order</option>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
                <button onClick={() => fetchData()}>Sort</button>
            </div>
            <div className="page">
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                {data.length<10?<button onClick={() => setPage(1)}>First Page</button>:<button onClick={() => setPage(lastpage)}>Last Page</button>}
                <button onClick={() => setPage(page + 1)} disabled={data.length < 10}>Next</button>
            </div>
            <div className="movie-container">
                {data.length==null?<h1>No Data Found</h1>:data.map((movie) => {
                    return(
                    <Link style={{ textDecoration: "none" }} to={`/movieselect/${movie._id}`} key={movie._id}><div className="movie">
                        <img src={movie.poster} alt="" />
                        <h2>{movie.title}</h2>
                        <p>{movie.year}</p>
                        <p>{movie.actors.join(", ")}</p>
                    </div></Link>
                    )
                    })}
            </div>
            <div className="page">
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                {data.length<10?<button onClick={() => setPage(1)}>First Page</button>:<button onClick={() => setPage(lastpage)}>Last Page</button>}
                <button onClick={() => setPage(page + 1)} disabled={data.length < 10}>Next</button>
            </div>

        </>
    )
}
export default Home