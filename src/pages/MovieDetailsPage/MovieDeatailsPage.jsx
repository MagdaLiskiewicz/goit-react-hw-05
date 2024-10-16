import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { Suspense, useRef, useState, useEffect } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader.jsx";
import Section from "../../components/Section/Section.jsx";
import Container from "../../components/Container/Container.jsx";
import { fetchMovieDetails } from "../../api/tmdb.js";
import css from "./MovieDetailsPage.module.css";
import { BsPatchQuestion } from "react-icons/bs";

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();
  const goBackRef = useRef(location.state ?? "/movies");
  const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const movieDetails = await fetchMovieDetails(movieId);
        setMovie(movieDetails);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getMovieDetails();
  }, [movieId]);

  const backdropStyle = {
    background: movie?.backdrop_path
      ? `url(https://image.tmdb.org/t/p/w1280/${movie.backdrop_path})`
      : "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <>
      <Section>
        <Container>
          {isLoading && <Loader />}
          {!isLoading && isError && (
            <ErrorMessage
              title="Something went wrong..."
              message="Unable to load the movie details. Please try again later."
            />
          )}
          {!isLoading && !isError && movie && (
            <>
              <Link to={goBackRef.current} className={css.backLink}>
                Go back
              </Link>
              <div style={backdropStyle} className={css.backdrop}>
                <div className={css.posterWrapper}>
                  <img
                    className={css.infoPoster}
                    src={
                      movie?.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                        : defaultImg
                    }
                    width={280}
                    alt="poster"
                  />
                </div>
                <div className={css.infoWrapper}>
                  <div>
                    <h1 className={css.infoTitle}>{movie.title}</h1>

                    <h2 className={css.infoTagline}>{movie.tagline}</h2>
                  </div>

                  <p className={css.infoOwerview}>
                    {movie.overview
                      ? movie.overview
                      : "The movie's description remains a mystery for now."}
                  </p>
                  <ul className={css.infoList}>
                    <li className={css.infoItem}>
                      <h3 className={css.infoAccent}>Geners:</h3>
                      {movie.genres?.length > 0 ? (
                        <p className={css.infoText}>
                          {movie.genres.map((genre) => genre.name).join(", ")}
                        </p>
                      ) : (
                        <BsPatchQuestion size="20" className={css.infoIcon} />
                      )}
                    </li>
                    <li className={css.infoItem}>
                      <h3 className={css.infoAccent}>Runtime:</h3>
                      {movie.runtime ? (
                        <p className={css.infoText}>{`${movie.runtime} min`}</p>
                      ) : (
                        <BsPatchQuestion size="20" className={css.infoIcon} />
                      )}
                    </li>
                    <li className={css.infoItem}>
                      <h3 className={css.infoAccent}>Release Date:</h3>

                      {movie.release_date ? (
                        <p className={css.infoText}>{movie.release_date}</p>
                      ) : (
                        <BsPatchQuestion size="20" className={css.infoIcon} />
                      )}
                    </li>
                    <li className={css.infoItem}>
                      <h3 className={css.infoAccent}>Country:</h3>
                      {movie.production_countries?.length > 0 ? (
                        <p className={css.infoText}>
                          {movie.production_countries
                            .map((country) => country.name)
                            .join(", ")}
                        </p>
                      ) : (
                        <BsPatchQuestion size="20" className={css.infoIcon} />
                      )}
                    </li>
                    <li className={css.infoItem}>
                      <h3 className={css.infoAccent}>Rating:</h3>
                      {movie.vote_average ? (
                        <p className={css.infoText}>
                          {movie.vote_average.toFixed(1)}
                        </p>
                      ) : (
                        <BsPatchQuestion size="20" className={css.infoIcon} />
                      )}
                    </li>
                  </ul>
                </div>
              </div>

              <div className={css.nav}>
                <NavLink
                  to="cast"
                  className={({ isActive }) =>
                    isActive ? css.active : css.link
                  }
                >
                  Cast
                </NavLink>
                <NavLink
                  to="reviews"
                  className={({ isActive }) =>
                    isActive ? css.active : css.link
                  }
                >
                  Reviews
                </NavLink>
              </div>
            </>
          )}

          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </Container>
      </Section>
    </>
  );
};

export default MovieDetailsPage;
