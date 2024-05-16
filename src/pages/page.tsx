import { useState } from "react";
import MovieGrid from "../components/moviegrid";
import Select from "../components/select";
import tmdb from "../util/api";
import useOnEndOfPage from "../util/useOnEndOfPage";

export default function HomePage() {
  const [category, setCategory] = useState("popular");
  const {
    isPending,
    isError,
    error,
    movies,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = tmdb.usePaginated(["movie", category]);
  useOnEndOfPage(
    fetchNextPage,
    600,
    hasNextPage && !isFetchingNextPage && !isFetching,
  );

  return (
    <>
      <Select
        values={{
          popular: "Popular",
          top_rated: "Top Rated",
          now_playing: "Now Playing",
        }}
        selected={category}
        onChange={setCategory}
      />
      {isPending || isFetchingNextPage || isFetching ? (
        <p>Loading</p>
      ) : isError ? (
        <p>Error: {error?.message}</p>
      ) : (
        <MovieGrid movies={movies!} />
      )}
    </>
  );
}
