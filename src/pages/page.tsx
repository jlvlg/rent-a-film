import { useRef, useState } from "react";
import MovieGrid from "../components/moviegrid";
import Select from "../components/select";
import useOnEndOfPage from "../util/hooks/useOnEndOfPage";
import useWindowDimensions from "../util/hooks/useWindowDimensions";
import remToPixels from "../util/remToPx";
import tmdb from "../util/tmdb";

export default function HomePage() {
  const [category, setCategory] = useState("popular");
  const moviegridref = useRef<HTMLUListElement>(null);
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
    moviegridref,
    600,
    hasNextPage && !isFetchingNextPage && !isFetching,
  );

  let listWLength = Math.floor(
    (windowDimensions.width - remToPixels(0.75)) / 200,
  );
  if (
    listWLength * (200 + remToPixels(0.5)) >
    windowDimensions.width - remToPixels(0.75)
  ) {
    listWLength--;
  }

  return (
    <div className="p-3">
      <Select
        style={{
          paddingLeft: `calc((${windowDimensions.width}px - 24px - (${listWLength} * 200px + 0.5rem * ${listWLength - 1})) / 2)`,
        }}
        values={{
          popular: "Popular",
          top_rated: "Top Rated",
          now_playing: "Now Playing",
        }}
        defaultValue={category}
        onChange={setCategory}
      />
      {isPending ? (
        <p>Loading</p>
      ) : isError ? (
        <p>Error: {error?.message}</p>
      ) : (
        <MovieGrid ref={moviegridref} movies={movies!} />
      )}
      {isFetching || isFetchingNextPage ? <p>Loading</p> : null}
    </div>
  );
}
