import { Badge } from "react-bootstrap";
import { useState } from "react";

const MovieCard = ({ movie }) => {
  const BASE_IMG_PATH = "https://image.tmdb.org/t/p/original/";
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="w-full h-[30vh] flex flex-col relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="w-full h-full bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${BASE_IMG_PATH}${movie.poster_path}) `,
        }}
      >
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/50 w-full h-full transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            zIndex: 5,
          }}
        >
          <p className="font-bold text-lg mb-2">{movie.title}</p>
          <div className="flex gap-1 mb-3">
            {movie.genre_ids.map((id, index) => (
              <Badge key={index} bg="danger">
                {id}
              </Badge>
            ))}
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-1">평점: {movie.vote_average}</div>
            <div className="mb-1">인기도: {movie.popularity}</div>
            <div>{movie.adult ? "18세 이상" : "전체 관람가"}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
