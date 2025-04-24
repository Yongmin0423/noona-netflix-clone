import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieDetail = (movieId) => {
  return api.get(`/movie/${movieId}?language=ko-KR&page=1`);
};

export const useMovieDetail = (id) => {
  return useQuery({
    queryKey: ["movie-detail", id],
    queryFn: () => fetchMovieDetail(id),
    select: (result) => result.data,
  });
};
