import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/button";
import Counter from "../../components/counter";
import Store from "../../store";
import tmdb from "../../util/tmdb";
import styles from "./page.module.css";

export default function MoviePage() {
  const params = useParams();
  const movieId = useMemo(() => params.movieId ?? "", [params.movieId]);
  const cart = Store.useSelector(
    (state) =>
      state.cart[movieId] as { title: string; days: number } | undefined,
  );
  const rent = Store.useSelector((state) => state.rent[movieId]);
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

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(Store.actions.rent.check(parseInt(movieId)));
    }, 300000);

    return () => clearInterval(interval);
  }, [dispatch, movieId]);

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
      Store.actions.cart.update({
        id: movie!.id!,
        title: movie!.title!,
        days,
      }),
    );
    e.currentTarget.reset();
    e.preventDefault();
  }

  return (
    <div className="relative flex h-full flex-col ">
      {isError ? (
        <p>{error.message}</p>
      ) : (
        <>
          <div
            className={`${styles.backdrop} relative aspect-video overflow-hidden`}
          >
            {isPending ? null : (
              <img
                className="min-h-72 w-full object-cover object-center"
                src={tmdb.getBackdropImage(movie.backdrop_path!, "w1280")}
                alt={movie.title}
              />
            )}
          </div>
          <div className="flex w-full flex-col gap-4 px-5 md:absolute md:bottom-8">
            <div className="flex flex-col gap-4">
              <header className="flex flex-col gap-1 text-slate-100 md:static ">
                <h1
                  className={`line-clamp-2 text-4xl md:text-5xl ${isPending ? "h-12 w-48 animate-pulse rounded-lg bg-slate-300/10" : ""}`}
                >
                  {isPending ? null : movie.title}
                </h1>
                <p
                  className={`text-xl text-slate-400 ${isPending ? "h-8 w-20 animate-pulse rounded-lg bg-slate-300/10" : ""}`}
                >
                  {isPending ? null : "3.99 U$ / DAY"}
                </p>
              </header>
              <p
                className={`text-slate-300 sm:text-lg md:line-clamp-4 md:w-3/4 ${isPending ? "h-36 w-96 animate-pulse rounded-lg bg-slate-300/10" : ""}`}
              >
                {isPending ? null : movie.overview}
              </p>
            </div>
            {isPending ? null : rent ? (
              <p className="text-xl font-bold uppercase text-slate-100 sm:text-2xl">
                {((rent - new Date().getTime()) / 86400000).toPrecision(1)} days
                left
              </p>
            ) : (
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
            )}
          </div>
        </>
      )}
    </div>
  );
}
