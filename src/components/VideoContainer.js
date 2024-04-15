import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const VideoContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!movies) return;
  const mainMovie = movies[0];
  const { original_title, overview, id } = mainMovie;
  return (
    <div className="relative">
      <VideoBackground movieId={id} />
      <div className="static lg:absolute lg:bottom-32 lg:left-0 lg:bg-black lg:bg-opacity-10 lg:w-96 lg:rounded-xl lg:px-6 lg:py-6">
        <VideoTitle title={original_title} overview={overview} />
      </div>
    </div>
  );
};

export default VideoContainer;
