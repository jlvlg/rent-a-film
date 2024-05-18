import React from "react";
import { Link } from "react-router-dom";
import { MovieDto } from "../../models/movie";
import tmdb from "../../util/tmdb";
import styles from "./index.module.css";

type Props = { movies: MovieDto[] };

function MovieGridInner(
  { movies }: Props,
  ref: React.ForwardedRef<HTMLUListElement>,
) {
  return (
    <ul
      ref={ref}
      className="mx-auto flex w-full flex-wrap justify-center gap-2"
    >
      {movies.map((i) => (
        <li
          key={i.id}
          className="group transition hover:z-10 hover:scale-110 hover:shadow-2xl"
        >
          <Link to={`/movie/${i.id}`}>
            <article className="relative w-[200px] overflow-hidden rounded-lg">
              <div className={styles.poster}>
                <img
                  className="aspect-[2/3] w-full"
                  src={tmdb.getPosterImage(i.poster_path!, "w342")}
                  alt={i.title}
                />
              </div>
              <div className="absolute inset-x-0 -bottom-full flex flex-col gap-2 overflow-hidden p-3 transition-all duration-200 group-hover:bottom-0">
                <header className="flex flex-col gap-1">
                  <h2 className="line-clamp-2 text-lg font-extrabold text-slate-100">
                    {i.title}
                  </h2>
                  <p className="line-clamp-5 h-full text-justify text-sm text-slate-300">
                    {i.overview}
                  </p>
                </header>
                <p className="self-end text-sm font-bold text-slate-100">
                  U$ 3.99 / DAY
                </p>
              </div>
            </article>
          </Link>
        </li>
      ))}
    </ul>
  );
}

const MovieGrid = React.forwardRef(MovieGridInner);
export default MovieGrid;
