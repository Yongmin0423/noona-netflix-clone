import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import Alert from "react-bootstrap/Alert";

export default function Banner() {
  const BASE_IMG_PATH = "https://image.tmdb.org/t/p/original/";
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  console.log("ddd", data);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <div
      className="relative h-[70vh] bg-cover bg-center bg-no-repeat before:content-[''] before:absolute before:left-0 before:top-0 before:h-[70vh] before:w-full before:bg-gradient-to-t before:from-black before:to-transparent"
      style={{
        backgroundImage: `url(${BASE_IMG_PATH}${data?.results[0].backdrop_path})`,
      }}
    >
      <div className="text-white h-full w-[30vw] flex flex-col justify-center ml-[10%] z-5">
        <p className="text-5xl font-bold">{data?.results[0].title}</p>
        <p className="font-semibold">{data?.results[0].overview}</p>
      </div>
    </div>
  );
}
