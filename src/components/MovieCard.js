import { movieImageCDNUrl } from "../api/apiConstants";
const MovieCard = ({ posterpath }) => {
  if (!posterpath) return;
  return (
    <div className="w-28 lg:w-32 2xl:w-36">
      <img alt="Movie Card" src={movieImageCDNUrl + posterpath}></img>
    </div>
  );
};

export default MovieCard;
