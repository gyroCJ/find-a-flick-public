import { useDispatch } from "react-redux";
import {
  topRatedMoviesApiUrl,
  topRatedMoviesOptions,
} from "../api/apiConstants";
import { addTopRatedMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();

  const fetchTopRatedMovies = async () => {
    const data = await fetch(topRatedMoviesApiUrl, topRatedMoviesOptions);
    const json = await data.json();
    dispatch(addTopRatedMovies(json.results));
  };

  useEffect(() => {
    fetchTopRatedMovies();
  }, []);
};

export default useTopRatedMovies;
