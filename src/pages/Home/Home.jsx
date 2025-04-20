import Banner from "./components/Banner/Banner";
import PopularMovieSlide from "./components/PopularMovieSlide/PopularMovieSlide";

export default function Home() {
  return (
    <div className="bg-black h-screen">
      <Banner />
      <PopularMovieSlide />
    </div>
  );
}
