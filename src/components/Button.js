import classNames from "classnames";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "../styles/Button.css";

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
  const classes = classNames(
    rest.className,
    "flex ellipsis items-center px-3 py-2 btn",
    {
      "btn-grad": primary,
      "btn-blue": secondary,
      "btn-danger": danger,
      "btn-warning": warning,
      "rounded-3xl": rounded,
      "opacity-50": loading,
    }
  );

  return (
    <button {...rest} className={classes}>
      {loading ? (
        <AiOutlineLoading3Quarters className="animate-spin text-white mx-auto" />
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
