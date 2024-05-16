import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { MovieDto } from "../models/movie";

const instance = axios.create({
  baseURL: `https://api.themoviedb.org/3/`,
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
  headers: {
    Accept: "application/json",
  },
});

function usePaginated(query: string[], params: { [key: string]: string } = {}) {
  const infiniteQuery = useInfiniteQuery({
    queryKey: [...query, ...Object.values(params)],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const result = (
        await instance.get(query.join("/"), { params: { page: pageParam } })
      ).data;
      return {
        results: result.results as MovieDto[],
        page: result.page as number,
        total_pages: result.total_pages as number,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  });

  return {
    ...infiniteQuery,
    movies: infiniteQuery.data?.pages.flatMap((group) => group.results),
  };
}

export default {
  usePaginated,
};
