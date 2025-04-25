import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "../MovieCard/MovieCard";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const PopularMovieSlide = () => {
  const { data, isError, error } = usePopularMoviesQuery();

  if (isError) return <Alert variant="danger">{error?.message}</Alert>;

  return (
    <div>
      <h1 className="text-white">Popular Movies</h1>
      <Carousel
        className="h-[30vh]"
        swipeable={false}
        draggable={false}
        showDots={false}
        responsive={responsive}
        infinite={true}
        transitionDuration={500}
      >
        {data.results.map((movie) => (
          <MovieCard movie={movie} key={movie.id} className="z-2" />
        ))}
      </Carousel>
      ;
    </div>
  );
};

export default PopularMovieSlide;
