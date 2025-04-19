import { useQuery } from "@tanstack/react-query";

useQuery;

export const usePopularMoviesQuery = () => {
  return useQuery({
    queryKey: [],
  });
};
