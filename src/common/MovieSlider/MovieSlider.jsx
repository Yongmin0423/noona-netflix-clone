import { Carousel } from "react-bootstrap";
import { responsive } from "../../constant/responsive";
import MovieCard from "../../pages/Home/components/MovieCard/MovieCard";

const MovieSlider = ({ title, movies }) => {
  return (
    <div>
      <h1 className="text-white">{title}</h1>
      <Carousel
        className="h-[30vh]"
        swipeable={false}
        draggable={false}
        showDots={false}
        responsive={responsive}
        infinite={true}
        transitionDuration={500}
      >
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} className="z-2" />
        ))}
      </Carousel>
      ;
    </div>
  );
};

export default MovieSlider;
