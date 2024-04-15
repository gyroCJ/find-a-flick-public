import { useDispatch } from "react-redux";
import {
  nowPlayingMoviesApiUrl,
  nowPlayingMoviesOptions,
} from "../api/apiConstants";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const fetchNowPlayingMovies = async () => {
    const data = await fetch(nowPlayingMoviesApiUrl, nowPlayingMoviesOptions);
    const json = await data.json();
    dispatch(addNowPlayingMovies(json.results));
  };

  useEffect(() => {
    fetchNowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;
