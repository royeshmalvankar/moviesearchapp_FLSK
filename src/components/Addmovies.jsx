import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
    const navigate = useNavigate();
  const [formstate,setformstate]=useState({
    title:"",
    year:"",
    type:"",
    rating:"",
    genre:"",
    poster:"",
    actors:""
    
  })
  function handelchange(e) {
    setformstate({...formstate,[e.target.name]:e.target.value})
  }
  let postmovies=async(mdata)=>{
    try {
      let data= JSON.stringify(mdata)
      console.log(data);
      let response= await fetch(`https://moviesearchapp-server.onrender.com/movie/addmovie`,{
        method:"POST",
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
    console.log("handelsubmit");
  }
  return (
    <div >
      <h1 style={{textAlign:"center",margin:"10px"}}>Add Movie</h1>
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

export default AddMovie;
