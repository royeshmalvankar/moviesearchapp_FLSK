import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../App.css"

const UpdateMovie = () => {
    const navigate = useNavigate();
    const {id} = useParams()
  const [formstate,setformstate]=useState({
    title:"",
    year:"",
    imdbID:"",
    type:"",
    rating:"",
    genre:"",
    poster:"",
    actors:""
    
  })



  useEffect(() => {
    fetchData()
  },[])

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://moviesearchapp-server.onrender.com/movie/${id}`,{
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
      })
      
      setformstate({
        ...formstate,
        title:response.data.data.title,
        year:response.data.data.year,
        imdbID:response.data.data.imdbID,
        type:response.data.data.type,
        rating:response.data.data.rating,
        genre:response.data.data.genre,
        poster:response.data.data.poster,
        actors:response.data.data.actors
      })

      
    } catch (error) {
      console.log(error);
    }
  }
  
  function handelchange(e) {
    setformstate({...formstate,[e.target.name]:e.target.value})
  }
  let postmovies= async(mdata)=>{
    try {
      let data= JSON.stringify(mdata)
      let response= await fetch(`https://moviesearchapp-server.onrender.com/movie/updatemovie/${id}`,{
        method:"PATCH",
        mode:"cors",
        headers: {
          "Content-Type":"application/json",
           "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body:data
      });
      
      await response.json()
    } catch (error) {
      console.log(error);
      
    }
  }
  function handelsubmit(e){
    e.preventDefault()
    if(formstate.title===""&&formstate.year===""&&formstate.imdbID===""&&formstate.type===""&&formstate.rating===""&&formstate.poster===""){return null}
    postmovies(formstate) 
    navigate("/")
  }
  return (
    <div >
      <h1 style={{textAlign:"center",margin:"10px"}}>Update Movie</h1>
      <form style={{border:"1px dotted red",padding:"10px",width:"30%",margin:"auto",textAlign:"center",borderRadius:"10px"}}>
        <label htmlFor="">Title:</label><br />
        <input name="title" type="text" value={formstate.title} onChange={handelchange} /><br /><br />

        <label htmlFor="">Year:</label><br />
        <input name="year" type="number" value={formstate.year} onChange={handelchange}/><br /><br />

        {/* <label htmlFor="">ImdbID</label><br />
        <input name="imdbID" type="text" value={formstate.imdbID} onChange={handelchange}/><br /><br /> */}

        <label htmlFor="">Type:</label><br />
        <select name="type" id="type" value={formstate.type} onChange={handelchange}>
          <option value="">Select a type</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="game">Game</option>
        </select><br /><br />

        <label htmlFor="">Rating:</label><br />
        <input name="rating" type="number" value={formstate.rating} onChange={handelchange}/><br /><br />

        <label htmlFor="">Genre:</label><br />
        <input type="genre" name="genre" id="genre" value={formstate.genre} onChange={handelchange} />
        <br /><br />

        <label htmlFor="">Poster:</label><br />
        <input type="url" name="poster" id="poster" value={formstate.poster} onChange={handelchange}/>
        <br /><br />

        <label htmlFor="">Actors:</label><br />
        <input type="text" name="actors" id="actors" value={formstate.actors} onChange={handelchange}/>
        <br /><br />
        <input type="submit" onClick={handelsubmit}/>
      </form>
    </div>
  );
};

export default UpdateMovie;
