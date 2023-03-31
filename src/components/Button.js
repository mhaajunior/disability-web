import classNames from "classnames";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "./Button.css";

const Button = ({
  children,
  primary,
  secondary,
  warning,
  danger,
  rounded,
  loading,
  ...rest
}) => {
  const classes = classNames(rest.className, "flex items-center px-3 py-2", {
    "btn-grad": primary,
    "btn-blue": secondary,
    "btn-danger": danger,
    "btn-warning": warning,
    "rounded-3xl": rounded,
  });

  return (
    <button {...rest} className={classes}>
      {loading ? (
        <AiOutlineLoading3Quarters className="animate-spin txt-primary" />
      ) : (
        children
      )}
    </button>
  );
};

Button.propTypes = {
  checkVariation: ({ primary, secondary, warning, danger }) => {
    const count =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!warning) +
      Number(!!danger);

    if (count > 1) {
      return new Error("Invalid props");
    }
  },
};

export default Button;
