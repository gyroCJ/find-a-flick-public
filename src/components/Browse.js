import Header from "./Header";
import VideoContainer from "./VideoContainer";
import MovieListContainer from "./MovieListContainer";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";

const Browse = () => {
  //A custom hook to fetch and store the movies list in redux store
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  return (
    <div id="browse-page" className="flex flex-col relative h-screen bg-black">
      <header className="z-20 w-screen">
        <Header />
      </header>
      <section>
        <VideoContainer />
      </section>
      <section className="bg-black">
        <MovieListContainer />
      </section>
    </div>
  );
};
export default Browse;
