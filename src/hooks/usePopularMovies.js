import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchPopularMovies = () => {
  return api.get("/movie/popular?language=ko-KR&page=1' ");
};

export const usePopularMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-popular"],
    queryFn: fetchPopularMovies,
    suspense: true,
    select: (result) => result.data,
  });
};
