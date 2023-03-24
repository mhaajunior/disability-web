import classNames from "classnames";
import { useState } from "react";
import { RiEditLine, RiDeleteBin6Line } from "react-icons/ri";
import Button from "./Button";
import "./Card.css";

const Card = ({
  children,
  primary,
  hoverable,
  success,
  warning,
  error,
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
    }
  );

  return (
    <div
      {...rest}
      className={classes}
      onMouseEnter={() => hoverable && setIsHover(true)}
      onMouseLeave={() => hoverable && setIsHover(false)}
    >
      {children}
      {isHover && (
        <>
          <div className="absolute inset-0 w-full h-full bg-gray-300 opacity-80 br-10 flex justify-center items-center">
            กดเพื่อดูสมาชิกในครัวเรือน
          </div>
          <div className="flex z-20">
            <div>
              <Button warning rounded>
                <RiEditLine />
              </Button>
              <Button danger rounded>
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
  checkVariation: ({ primary }) => {
    const count = Number(!!primary);

    if (count > 1) {
      return new Error("Invalid props");
    }
  },
};

export default Card;
