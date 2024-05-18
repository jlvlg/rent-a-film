import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Counter from "../../components/counter";
import Store from "../../store";
import tmdb from "../../util/tmdb";
import styles from "./page.module.css";

export default function MoviePage() {
  const params = useParams();
  const cart = Store.useSelector(
    (state) => state.cart[params.movieId ?? ""] ?? { days: 0 },
  );
  const {
    data: movie,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["movie", params.movieId ?? ""],
    queryFn: () => tmdb.getMovieDetails(params.movieId ?? ""),
  });

  return isPending ? (
    <p>Loading</p>
  ) : isError ? (
    <p>{error.message}</p>
  ) : (
    <div className="relative flex h-full flex-col gap-5">
      <div
        className={`${styles.backdrop} relative aspect-video overflow-hidden`}
      >
        <img
          className="min-h-72 w-full object-cover object-center"
          src={tmdb.getBackdropImage(movie.backdrop_path!, "w1280")}
          alt={movie.title}
        />
      </div>
      <div>
        Days: <Counter initialState={cart.days} />
      </div>
      <div className="flex w-full flex-col gap-4 px-5 md:absolute md:bottom-20">
        <h1 className="text-3xl text-slate-100 md:static md:text-5xl">
          {movie.title}
        </h1>
        <p className="text-slate-300 sm:text-lg md:line-clamp-4 md:w-3/4">
          {movie.overview}
        </p>
      </div>
    </div>
  );
}
