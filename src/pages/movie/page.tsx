import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/button";
import Counter from "../../components/counter";
import { MovieDto } from "../../models/movie";
import Store, { StoreState } from "../../store";
import tmdb from "../../util/tmdb";
import styles from "./page.module.css";

export default function MoviePage() {
  const params = useParams();
  const selector = useMemo(
    () => (state: StoreState) =>
      state.cart[params.movieId ?? ""] as
        | (MovieDto & { days: number })
        | undefined,
    [params.movieId],
  );
  const cart = Store.useSelector(selector);
  const dispatch = Store.useDispatch();
  const {
    data: movie,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["movie", params.movieId ?? ""],
    queryFn: () => tmdb.getMovieDetails(params.movieId ?? ""),
  });

  function onSubmit(e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    const data = new FormData(e.currentTarget);
    let days = parseInt(data.get("days")!.toString());
    if (
      e.nativeEvent.submitter &&
      (e.nativeEvent.submitter as HTMLButtonElement).value === "remove"
    ) {
      days = 0;
    }
    dispatch(
      Store.actions.cart.updateCart({
        movie: movie!,
        days,
      }),
    );
    e.currentTarget.reset();
    e.preventDefault();
  }

  return isPending ? (
    <p>Loading</p>
  ) : isError ? (
    <p>{error.message}</p>
  ) : (
    <div className="relative flex h-full flex-col ">
      <div
        className={`${styles.backdrop} relative aspect-video overflow-hidden`}
      >
        <img
          className="min-h-72 w-full object-cover object-center"
          src={tmdb.getBackdropImage(movie.backdrop_path!, "w1280")}
          alt={movie.title}
        />
      </div>
      <div className="flex w-full flex-col gap-4 px-5 md:absolute md:bottom-8">
        <div className="flex flex-col gap-4">
          <header className="flex flex-col gap-1 text-slate-100 md:static ">
            <h1 className="line-clamp-2 text-4xl md:text-5xl">{movie.title}</h1>
            <p className="text-xl text-slate-400">3.99 U$ / DAY</p>
          </header>
          <p className="text-slate-300 sm:text-lg md:line-clamp-4 md:w-3/4">
            {movie.overview}
          </p>
        </div>
        <form onSubmit={onSubmit} className="flex gap-2">
          <label className="flex items-center gap-2 ">
            <span className="text-xl font-bold uppercase text-slate-100 sm:text-2xl">
              Days
            </span>
            <Counter name="days" defaultValue={cart?.days ?? 0} />
          </label>
          <Button
            type="submit"
            name="buttonSubmitted"
            value="update"
            className="material-symbols-outlined rounded-lg px-[8px]"
          >
            {cart ? "edit" : "shopping_cart"}
          </Button>
          {cart ? (
            <Button
              type="submit"
              name="buttonSubmitted"
              value="remove"
              color="red"
              className="material-symbols-outlined rounded-lg px-[8px]"
            >
              delete
            </Button>
          ) : null}
        </form>
      </div>
    </div>
  );
}
