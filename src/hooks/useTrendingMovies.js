import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../api/tmdb";

export const useTrendingMovies = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const getTrendingMovies = async () => {
      const trending = await fetchTrendingMovies();

      setTrendingMovies(trending);
    };
    getTrendingMovies();
  }, []);

  return trendingMovies;
};
