import { useDispatch } from "react-redux";
import { movieVideosApiUrl, movieVideosOptions } from "../api/apiConstants";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const fetchMovieVideos = async () => {
    const data = await fetch(
      movieVideosApiUrl.replace("movie_id", movieId),
      movieVideosOptions
    );
    const json = await data.json();
    const filteredJson = json.results.filter(
      (video) => video.type === "Trailer"
    );
    const trailer = filteredJson.length ? filteredJson[0] : json?.results[0];
    dispatch(addTrailerVideo(trailer?.key));
  };

  useEffect(() => {
    fetchMovieVideos();
  }, []);
};

export default useMovieTrailer;
