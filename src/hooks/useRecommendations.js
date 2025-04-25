import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchRecommendation = (movie_id) => {
  return api.get(`/movie/${movie_id}/recommendations?language=ko-KR&page=1'`);
};

export const useRecommendation = (id) => {
  return useQuery({
    queryKey: ["movie-recommendation", id],
    queryFn: () => fetchRecommendation(id),
    select: (result) => result.data,
  });
};
