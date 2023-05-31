import classNames from "classnames";
import { useState } from "react";
import { RiEditLine, RiDeleteBin6Line } from "react-icons/ri";
import Button from "./Button";
import "../styles/Card.css";

const Card = ({
  children,
  hoverable,
  id,
  success,
  warning,
  error,
  onEdit,
  onDelete,
  block,
  ...rest
}) => {
  const [isHover, setIsHover] = useState(false);
  const classes = classNames(
    rest.className,
    "card br-10 flex justify-between relative",
    {
      green: success,
      red: error,
      yellow: warning,
      "cursor-pointer": hoverable,
      "border-bold": hoverable && isHover,
      block: block,
    }
  );

  return (
    <div
      {...rest}
      id={id}
      className={classes}
      onMouseEnter={() => hoverable && setIsHover(true)}
      onMouseLeave={() => hoverable && setIsHover(false)}
    >
      {children}
      {isHover && (
        <div className="flex items-center z-20">
          <div>
            {onEdit && (
              <Button warning rounded onClick={() => onEdit(id)}>
                <RiEditLine />
              </Button>
            )}
            {onDelete && (
              <Button danger rounded onClick={() => onDelete(id)}>
                <RiDeleteBin6Line />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  checkVariation: ({ success, warning, error }) => {
    const count = Number(!!success) + Number(!!warning) + Number(!!error);

    if (count > 1) {
      return new Error("Invalid props");
    }
  },
};

export default Card;
