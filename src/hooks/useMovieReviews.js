import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieReviews = (movieId) => {
  return api.get(`/movie/${movieId}/reviews?language=en-US&page=1`);
};

export const useMovieReviews = (id) => {
  return useQuery({
    queryKey: ["movie-review", id],
    queryFn: () => fetchMovieReviews(id),
    select: (result) => result.data,
  });
};
