import classNames from "classnames";
import "./Button.css";

const Button = ({
  children,
  primary,
  secondary,
  warning,
  danger,
  rounded,
  ...rest
}) => {
  const classes = classNames(rest.className, "flex items-center px-3 py-1.5", {
    "btn-grad": primary,
    "btn-blue": secondary,
    "btn-danger": danger,
    "btn-warning": warning,
    "rounded-3xl": rounded,
  });

  return (
    <button {...rest} className={classes}>
      {children}
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
