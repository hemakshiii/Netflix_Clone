import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {BiPlay} from "react-icons/bi";
import {AiOutlinePlus} from "react-icons/ai"




const apiKey="2b894e07fe6bb9a6bb8d808ec08c92fb";
const url="https://api.themoviedb.org/3/movie";
const tvurl="https://api.themoviedb.org/3/tv/airing_today?api_key=2b894e07fe6bb9a6bb8d808ec08c92fb&page=2"
const imgUrl="https://image.tmdb.org/t/p/original"



//card
const Card=({img})=>(
<img className='card' src={img} alt="cover" />
)

//row
const Row =({title, arr=[]})=>(
<div className='row'>
<h4>{title}</h4>
<div>
  {
    arr.map((item, index)=>(
      <Card key={index} img={`${imgUrl}/${item.poster_path}`}/>
    ))
  }


</div>
</div>
)


function Movies() {
  const[upcoming, setupcoming]=useState([])

  useEffect(()=>{
    const fetchUpcoming=async()=>{
     const {data:{results}} = await axios.get(`${url}/upcoming?api_key=${apiKey}&page=4`)
     setupcoming(results);
    }
    fetchUpcoming();
  },[])
  return (
    <div>
      <Row title={"Upcoming Movies"} arr={upcoming}/> 
    </div>
  )
}




function Home() {
  //upcoming movies
  // const[upcoming, setupcoming]=useState([])
  const[popular, setpopular]=useState([])
  const[playing, setplaying]=useState([])
  const[top, settop]=useState([])
  const[tv, setTv]=useState([])

  useEffect(()=>{
  //  const fetchUpcoming=async()=>{
  //   const {data:{results}} = await axios.get(`${url}/upcoming?api_key=${apiKey}&page=4`)
  //   setupcoming(results);
  //  }

   const fetchPopular=async()=>{
    const {data:{results}} = await axios.get(`${url}/popular?api_key=${apiKey}`)
    setpopular(results);
   }

   const fetchPlaying=async()=>{
    const {data:{results}} = await axios.get(`${url}/now_playing?api_key=${apiKey}&page=4`)
    setplaying(results);
   }

   const fetchTop=async()=>{
    const {data:{results}} = await axios.get(`${url}/top_rated?api_key=${apiKey}`)
    settop(results);
   }

   const fetchTV=async()=>{
    const {data:{results}} = await axios.get(`${tvurl}`)
    setTv(results);
   }
   
  //  fetchUpcoming();
   fetchPopular();
   fetchPlaying();
   fetchTop();
   fetchTV();
  },[])

  
  return (
    <section className='home'>
     <div className="banner" style={{
      backgroundImage:popular[2]?
      `url(${`${imgUrl}/${popular[2].poster_path}`})`:
      "none"
     }}>
     {popular[2] && <h1>{popular[2].original_title}</h1>}
     {popular[2] && <p>{popular[2].overview}</p>}
     
     <div>

     <button><BiPlay/>Play</button>
     <button>My List<AiOutlinePlus/></button>
     </div>
     
     </div>

    {/* <Row title={"Upcoming Movies"} arr={upcoming}/>  */}
    <Movies/>
    <Row title={"Popular Movies"} arr={popular}/>
    <Row title={"TV Shows"}arr={tv}/>
    <Row title={"Top Rated"}arr={top}/>
    <Row title={"Newly Added"}arr={playing}/>
    </section>
  )
}

export default Home
export {Movies}