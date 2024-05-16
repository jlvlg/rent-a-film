interface Movie {
  poster_path: string;
  backdrop_path: string;
  title: string;
  id: number;
  overview: string;
  release_date: string;
}

export type MovieDto = Partial<Movie>;
