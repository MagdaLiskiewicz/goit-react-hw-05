import axios from "axios";

const API_KEY = "3bd508244c2c2c47e8ace312a4f85567";
axios.defaults.baseURL = "https://api.themoviedb.org/3";

const params = {
  params: {
    api_key: API_KEY,
    headers: {
      Authorization: `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYmQ1MDgyNDRjMmMyYzQ3ZThhY2UzMTJhNGY4NTU2NyIsIm5iZiI6MTcyNzcxNzcyOS4wNDUzMjYsInN1YiI6IjY2ZmE0N2IxYTYyOTNlM2Q3NmEyNmYwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uNDTAZ0qPZMkZYVMXzfOHEvjjp322lEi6TQk1NTlypw`,
    },
  },
};

export const fetchTrendingMovies = async () => {
  const response = await axios.get(`trending/movie/day`, params);
  return response.data.results;
};

export const fetchSearchMovie = async (query, page) => {
  const response = await axios.get(`search/movie`, {
    params: {
      api_key: API_KEY,
      query: query,
      page: page,
    },
  });
  return response.data;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await axios.get(`movie/${movieId}`, params);
  return response.data;
};

export const fetchMovieCast = async (movieId) => {
  const response = await axios.get(`movie/${movieId}/credits`, params);
  return response.data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/reviews`, params);
  return response.data.results;
};
