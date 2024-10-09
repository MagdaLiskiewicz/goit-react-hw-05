import RingLoader from "react-spinners/RingLoader";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.loader}>
      <RingLoader color="#1cb5e0" size={100} speedMultiplier={1} />
    </div>
  );
};

export default Loader;
