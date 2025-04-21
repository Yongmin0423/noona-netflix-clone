import Banner from "./components/Banner/Banner";
import PopularMovieSlide from "./components/PopularMovieSlide/PopularMovieSlide";
import TopRatedMovieSlide from "./components/TopRatedMovieSlider/TopRatedMovieSlider";
import UpcomingMovieSlide from "./components/UpcomingMovieSlider/UpcomingMovieSlider";

export default function Home() {
  return (
    <div className="bg-black h-screen">
      <Banner />
      <PopularMovieSlide />
      <TopRatedMovieSlide />
      <UpcomingMovieSlide />
    </div>
  );
}
