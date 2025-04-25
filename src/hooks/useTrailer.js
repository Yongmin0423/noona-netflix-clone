import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchTrailer = (movieId) => {
  return api.get(`/movie/${movieId}/videos?language=ko-KR&page=1`);
};

export const useTrailer = (id) => {
  return useQuery({
    queryKey: ["movie-trailer", id],
    queryFn: () => fetchTrailer(id),
    select: (result) => result.data,
  });
};
