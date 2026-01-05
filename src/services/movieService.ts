import axios, { type AxiosResponse } from "axios";
import type { Movie } from "../types/movie";

interface MoviesResults {
  results: Movie[];
  total_pages: number;
}

const BASE_URL = "https://api.themoviedb.org/3/search/movie";
const myKey = import.meta.env.VITE_TMDB_TOKEN;

export const fetchMovies = async (query: string, page: number) => {
  const response: AxiosResponse<MoviesResults> = await axios.get<MoviesResults>(
    BASE_URL,
    {
      params: {
        query: query,
        page: page,
      },
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    }
  );

  return response.data;
};
