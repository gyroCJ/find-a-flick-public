import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (movies)
    return (
      <div className="px-6">
        <h1 className="py-6 text-white text-xl font-semibold">{title}</h1>
        <div className="flex overflow-x-auto">
          <div className="flex gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} posterpath={movie.poster_path} />
            ))}
          </div>
        </div>
      </div>
    );
};

export default MovieList;
