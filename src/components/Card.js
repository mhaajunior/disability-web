import classNames from "classnames";
import { useState } from "react";
import { RiEditLine, RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import "../styles/Card.css";

const Card = ({
  children,
  hoverable,
  id,
  success,
  warning,
  error,
  hoverWord,
  onEdit,
  onDelete,
  path,
  ...rest
}) => {
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();
  const classes = classNames(
    rest.className,
    "card br-10 flex justify-between relative",
    {
      green: success,
      red: error,
      yellow: warning,
      "cursor-pointer": hoverable,
      "border-bold": hoverable && isHover,
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
        <>
          <div
            onClick={() => navigate(path)}
            className="absolute inset-0 w-full h-full bg-gray-300 opacity-80 br-10 flex justify-center items-center"
          >
            {hoverWord}
          </div>
          <div className="flex items-center z-20">
            <div>
              <Button warning rounded onClick={() => onEdit(id)}>
                <RiEditLine />
              </Button>
              <Button danger rounded onClick={() => onDelete(id)}>
                <RiDeleteBin6Line />
              </Button>
            </div>
          </div>
        </>
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
