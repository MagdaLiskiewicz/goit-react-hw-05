import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import Loader from "../Loader/Loader.jsx";
import css from "./MovieReviews.module.css";
import { fetchMovieReviews } from "../../api/tmdb.js";
import { FaRegCommentDots } from "react-icons/fa";

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    const getMovieReviews = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const movieReviews = await fetchMovieReviews(movieId);
        setReviews(movieReviews);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieReviews();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      {isError && (
        <ErrorMessage
          title="Something went wrong..."
          message="Unable to load the reviews. Please check your internet connection
              or try again later."
        />
      )}
      {reviews.length > 0 && (
        <ul className={css.list}>
          {reviews.map((review) => (
            <li key={review.id} className={css.item}>
              <div className={css.infoWrapper}>
                <FaRegCommentDots size="40" color="#e2d5e9" />
                <ul className={css.infoList}>
                  <li className={css.infoItem}>
                    <p className={css.infoAccent}>Author:</p>
                    <p className={css.infoText}>{review.author}</p>
                  </li>
                  <li className={css.infoItem}>
                    <p className={css.infoAccent}>Rating:</p>
                    <p className={css.infoText}>
                      {review.author_details.rating || "N/A"}
                    </p>
                  </li>
                  <li className={css.infoItem}>
                    <p className={css.infoAccent}>Date:</p>
                    <p className={css.infoText}>
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </li>
                </ul>
              </div>
              <p className={css.textWrapper}>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
      {reviews.length === 0 && !isLoading && !isError && (
        <p className={css.message}> No review yet...</p>
      )}
    </div>
  );
};

export default MovieReviews;
