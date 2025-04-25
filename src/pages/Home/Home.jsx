import { Suspense } from "react";
import Banner from "./components/Banner/Banner";
import PopularMovieSlide from "./components/PopularMovieSlide/PopularMovieSlide";
import TopRatedMovieSlide from "./components/TopRatedMovieSlider/TopRatedMovieSlider";
import UpcomingMovieSlide from "./components/UpcomingMovieSlider/UpcomingMovieSlider";
import LoadingSpinner from "../../common/LoadingSpinner";

export default function Home() {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <div className="bg-black h-screen">
          <Banner />
          <PopularMovieSlide />
          <TopRatedMovieSlide />
          <UpcomingMovieSlide />
        </div>
      </Suspense>
    </>
  );
}
