import { useRef, useState } from "react";
import Select from "react-select";
import MovieGrid from "../components/moviegrid";
import useOnEndOfPage from "../util/hooks/useOnEndOfPage";
import useWindowDimensions from "../util/hooks/useWindowDimensions";
import remToPixels from "../util/remToPx";
import tmdb from "../util/tmdb";

export default function HomePage() {
  const [category, setCategory] = useState({
    value: "popular",
    label: "Popular",
  });
  const moviegridref = useRef<HTMLUListElement>(null);
  const windowDimensions = useWindowDimensions();
  const {
    isError,
    error,
    movies,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = tmdb.usePaginated(["movie", category.value]);
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
    <div className="mt-16 flex flex-col gap-2 p-3">
      <div
        style={{
          marginLeft: `calc((${windowDimensions.width}px - 24px - (${listWLength} * 200px + 0.5rem * ${listWLength - 1})) / 2)`,
        }}
        className="w-40"
      >
        <Select
          options={[
            { value: "popular", label: "Popular" },
            { value: "top_rated", label: "Top Rated" },
            { value: "now_playing", label: "Now Playing" },
          ]}
          classNames={{
            control: () => "bg-transparent rounded-3xl",
            singleValue: () => "text-slate-300",
            indicatorSeparator: () => "hidden",
            menu: () => "rounded-lg overflow-hidden h-min",
            menuList: () => "p-0",
          }}
          value={category}
          isSearchable={false}
          onChange={(option) =>
            setCategory({ value: option!.value, label: option!.label })
          }
        />
      </div>
      {isError ? (
        <p>Error: {error?.message}</p>
      ) : (
        <MovieGrid ref={moviegridref} movies={movies} />
      )}
    </div>
  );
}
