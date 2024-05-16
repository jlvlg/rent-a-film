import { MovieDto } from "../../models/movie";
import styles from "./index.module.css";

type Props = { movies: MovieDto[] };

export default function MovieGrid({ movies }: Props) {
  return (
    <ul className="mx-auto flex w-full flex-wrap justify-center gap-2 p-2 ">
      {movies.map((i) => (
        <li
          key={i.id}
          className="group transition hover:z-10 hover:scale-110 hover:shadow-2xl"
        >
          <article className={`relative w-[200px] overflow-hidden rounded-lg`}>
            <div className={styles.poster}>
              <img
                className="aspect-[2/3] w-full"
                src={`https://images.tmdb.org/t/p/w342${i.poster_path}`}
                alt={i.title}
              />
            </div>
            <div className="absolute inset-x-0 -bottom-full flex flex-col gap-2 overflow-hidden p-3 transition-all duration-200 group-hover:bottom-0">
              <header className="flex flex-col gap-1">
                <h2 className="line-clamp-2 text-lg font-extrabold text-white">
                  {i.title}
                </h2>
                <p className="line-clamp-5 h-full text-justify text-sm text-slate-300">
                  {i.overview}
                </p>
              </header>
              <p className="self-end text-sm font-bold text-white">
                U$ 3.99 / DAY
              </p>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
