import PropTypes from "prop-types";
import css from "./ErrorMessage.module.css";

const ErrorMessage = ({ title, message }) => {
  return (
    <div className={css.errorContainer}>
      <h2 className={css.errorTitle}>{title}</h2>
      <p className={css.errorMessage}>{message}</p>
    </div>
  );
};

export default ErrorMessage;

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
