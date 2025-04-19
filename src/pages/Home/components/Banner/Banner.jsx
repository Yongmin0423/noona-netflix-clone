import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import Alert from "react-bootstrap/Alert";

export default function Banner() {
  const BASE_IMG_PATH = "https://image.tmdb.org/t/p/original/";
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  console.log("ddd", data);
  if (!data) return null;

  if (isLoading) {
    <h1>Loading...</h1>;
    return null;
  }

  if (isError) {
    <Alert variant="danger">{error.message}</Alert>;
    return null;
  }
  return (
    <div
      className="relative h-[60vh] bg-center bg-no-repeat before:content-[''] before:absolute before:left-0 before:top-0 before:h-[60vh] before:w-full before:bg-gradient-to-t before:from-black before:to-transparent"
      style={{
        backgroundImage: `url(${BASE_IMG_PATH}${data?.results[0].backdrop_path})`,
      }}
    >
      <div className="text-white h-[50%] w-[30vw] flex flex-col justify-center pl-20">
        <p className="text-5xl font-bold">{data?.results[0].title}</p>
        <p className="font-semibold">{data?.results[0].overview}</p>
      </div>
    </div>
  );
}
