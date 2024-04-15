import { useDispatch } from "react-redux";
import {
  upcomingMoviesApiUrl,
  upcomingMoviesOptions,
} from "../api/apiConstants";
import { addUpcomingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();

  const fetchUpcomingMovies = async () => {
    const data = await fetch(upcomingMoviesApiUrl, upcomingMoviesOptions);
    const json = await data.json();
    dispatch(addUpcomingMovies(json.results));
  };

  useEffect(() => {
    fetchUpcomingMovies();
  }, []);
};

export default useUpcomingMovies;
