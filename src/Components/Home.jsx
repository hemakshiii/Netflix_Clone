import React, { useEffect, useState } from "react";
import axios from "axios";
import { BiPlay } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

const apiKey = "2b894e07fe6bb9a6bb8d808ec08c92fb";
const url = "https://api.themoviedb.org/3/movie";
const tvurl =
  "https://api.themoviedb.org/3/tv/airing_today?api_key=2b894e07fe6bb9a6bb8d808ec08c92fb&page=2";
const imgUrl = "https://image.tmdb.org/t/p/original";

// Card component
const Card = ({ img }) => <img className="card" src={img} alt="cover" />;

// Row component
const Row = ({ title, arr = [] }) => (
  <div className="row">
    <h4>{title}</h4>
    <div>
      {arr.map((item, index) => (
        <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
      ))}
    </div>
  </div>
);

// Movies component (Upcoming + Popular)
function Movies() {
  const [upcoming, setUpcoming] = useState([]);
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    const fetchUpcoming = async () => {
      const { data: { results } } = await axios.get(
        `${url}/upcoming?api_key=${apiKey}&page=4`
      );
      setUpcoming(results);
    };

    const fetchPopular = async () => {
      const { data: { results } } = await axios.get(
        `${url}/popular?api_key=${apiKey}`
      );
      setPopular(results);
    };

    fetchUpcoming();
    fetchPopular();
  }, []);

  return (
    <div className="movies-section" style={{ backgroundColor: "black", padding: "1rem 0" }}>
      <Row title={"Upcoming Movies"} arr={upcoming} />
      <Row title={"Popular Movies"} arr={popular} />
    </div>
  );
}

function Tv() {
  const [tvshows, setTvshows] = useState([]);
  const [toprated, setToprated] = useState([]);

  useEffect(() => {
    const fetchtvshows = async () => {
      const { data: { results } } = await axios.get(tvurl);
      setTvshows(results);
    };

    const fetchToprated = async () => {
      const { data: { results } } = await axios.get(`${url}/top_rated?api_key=${apiKey}`);
      setToprated(results);
    };

    fetchtvshows();
    fetchToprated();
  }, []);

  return (
    <div className="movies-section" style={{ backgroundColor: "black", padding: "1rem 0" }}>
      <Row title={"TV shows"} arr={tvshows} />
      <Row title={"Top Rated"} arr={toprated} />
    </div>
  );
}

function MyList() {
  return (
    <div
      style={{
        backgroundColor: "black",
        height: "100vh",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "1.5rem",
      }}
    >
      You haven't added anything yet in the list
    </div>
  );
}



// Home component
function Home() {
  const [popular, setPopular] = useState([]);
  const [playing, setPlaying] = useState([]);
  const [top, setTop] = useState([]);
  const [tv, setTv] = useState([]);

  useEffect(() => {
    const fetchPopular = async () => {
      const { data: { results } } = await axios.get(`${url}/popular?api_key=${apiKey}`);
      setPopular(results);
    };

    const fetchPlaying = async () => {
      const { data: { results } } = await axios.get(
        `${url}/now_playing?api_key=${apiKey}&page=4`
      );
      setPlaying(results);
    };

    const fetchTop = async () => {
      const { data: { results } } = await axios.get(`${url}/top_rated?api_key=${apiKey}`);
      setTop(results);
    };

    const fetchTV = async () => {
      const { data: { results } } = await axios.get(tvurl);
      setTv(results);
    };

    fetchPopular();
    fetchPlaying();
    fetchTop();
    fetchTV();
  }, []);

  return (
    <section className="home">
      {/* Banner */}
      <div
        className="banner"
        style={{
          backgroundImage: popular[2]
            ? `url(${`${imgUrl}/${popular[2].poster_path}`})`
            : "none",
        }}
      >
        {popular[2] && <h1>{popular[2].original_title}</h1>}
        {popular[2] && (
          <p>
            {popular[2].overview.length > 200
              ? popular[2].overview.slice(0, 200) + "..."
              : popular[2].overview}
          </p>
        )}

        <div>
          <button>
            <BiPlay />
            Play
          </button>
          <button>
            My List <AiOutlinePlus />
          </button>
        </div>
      </div>

      {/* Movies Section */}
      <Movies />

      {/* Other Rows */}
      <Row title={"TV Shows"} arr={tv} />
      <Row title={"Top Rated"} arr={top} />
      <Row title={"Newly Added"} arr={playing} />
    </section>
  );
}

export default Home;
export { Movies, Tv , MyList};
