// ─── Модель фильма ─────────────────────────────────────────────
export interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  genre: Genre;
  description?: string;
  director?: string;
}

// ─── Жанры (as const + вывод типа) ─────────────────────────────
export const GENRES = ["comedy", "drama", "action", "horror", "sci-fi"] as const;
type Genre = (typeof GENRES)[number];

// ─── Тип сортировки ─────────────────────────────────────────────
type SortBy = "year" | "rating" | "title";

// ─── Utility types: карточка и полное описание ──────────────────
type MovieCard = Pick<Movie, "id" | "title" | "year" | "rating">;
export type MovieFull = Readonly<Movie>;

// ─── Функции ────────────────────────────────────────────────────

export function filterByGenre(movies: Movie[], genre: Genre): Movie[] {
  return movies.filter((m) => m.genre === genre);
}

export function sortMovies(movies: Movie[], by: SortBy): Movie[] {
  const copy = [...movies];
  return copy.sort((a, b) => {
    if (by === "title") return a.title.localeCompare(b.title);
    if (by === "year") return a.year - b.year;
    return a.rating - b.rating;
  });
}

export function toCard(movie: Movie): MovieCard {
  return {
    id: movie.id,
    title: movie.title,
    year: movie.year,
    rating: movie.rating,
  };
}

export const GENRE_EMOJI: { [K in Genre]: string } = {
  comedy: "😂",
  drama: "🎭",
  action: "💥",
  horror: "👻",
  "sci-fi": "🚀",
} satisfies Record<Genre, string>;