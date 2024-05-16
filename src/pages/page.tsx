import { useState } from "react";
import MovieGrid from "../components/moviegrid";
import Select from "../components/select";
import tmdb from "../util/api";
import useOnEndOfPage from "../util/hooks/useOnEndOfPage";
import useWindowDimensions from "../util/hooks/useWindowDimensions";

export default function HomePage() {
  const [category, setCategory] = useState("popular");
  const windowDimensions = useWindowDimensions();
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

  let listWLength = Math.floor(windowDimensions.width / 200);
  if (listWLength * 208 > windowDimensions.width) listWLength--;

  return (
    <>
      <Select
        style={{
          paddingLeft: `calc((${windowDimensions.width}px - (${listWLength} * 200px + 0.5rem * ${listWLength - 1})) / 2)`,
        }}
        values={{
          popular: "Popular",
          top_rated: "Top Rated",
          now_playing: "Now Playing",
        }}
        selected={category}
        onChange={setCategory}
      />
      {isPending ? (
        <p>Loading</p>
      ) : isError ? (
        <p>Error: {error?.message}</p>
      ) : (
        <MovieGrid movies={movies!} />
      )}
      {isFetching || isFetchingNextPage ? <p>Loading</p> : null}
    </>
  );
}
