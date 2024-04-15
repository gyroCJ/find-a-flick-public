import { useRef } from "react";
import { openai } from "../api/apiConstants";
import Header from "./Header";
import Homepage_Background from "../assets/Homepage_Background.jpg";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptSearch = () => {
  const searchText = useRef(null);
  const movies = useSelector((store) => store.movies);
  const handleGptSearch = async () => {
    const gptQuery =
      "Assume you are a movie recommendation system. Give names of 6 movies for the query - " +
      searchText.current.value +
      ". Give the result in a javascript array.";
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    console.log(completion.choices);
  };

  return (
    <div
      id="gpt-search-page"
      className="h-screen w-screen relative flex flex-col"
    >
      <div
        id="background-image"
        className="bg-cover block h-full min-h-screen overflow-hidden absolute w-full -z-10"
      >
        <img
          src={Homepage_Background}
          alt="Find a Flick background"
          className="min-h-full min-w-full overflow-clip"
        />
      </div>
      <div
        id="transparent-black-layer"
        className="absolute h-screen w-screen bg-black opacity-75 z-0"
      ></div>
      <header className="z-20">
        <Header />
      </header>
      {/* flex flex-col justify-center items-center absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 */}
      <section className="z-20 flex flex-col justify-center items-center">
        <div className="flex flex-row items-center gap-2 pt-14 pb-6">
          <input
            ref={searchText}
            placeholder="Search GPT"
            className="bg-white text-black border border-[#a7a7a5] px-3 py-2 rounded-md sm:w-96 sm:px-5 sm:py-4 xl:w-[600px]"
          ></input>
          <button
            onClick={handleGptSearch}
            className="bg-[#339989] text-white rounded-md px-4 py-2 sm:px-6 sm:py-4"
          >
            Search
          </button>
        </div>
      </section>
      <div className="z-20 flex flex-col overflow-y-scroll">
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Popular"} movies={movies.popularMovies} />
        <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />
        <MovieList title={"Upcoming"} movies={movies.upcomingMovies} />
      </div>
    </div>
  );
};

export default GptSearch;
