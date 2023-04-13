import { useEffect } from "react";
import "../styles/FormProgress.css";
import $ from "jquery";

const FormProgress = ({ total, current, onProgressClick, stepDisabled }) => {
  const arr = [];
  for (let i = 1; i <= total; i++) {
    arr.push(i);
  }

  useEffect(() => {
    if (current > 6) {
      $("#progress_bar").animate({ scrollLeft: 1200 }, "fast");
    }
  }, [current]);

  const renderedClasses = (i) => {
    let classes = "";
    if (i <= current) {
      classes += "active ";
    }
    if (i < current) {
      classes += "cursor-pointerz ";
    }
    if (i === current) {
      classes += "current ";
    }
    if (stepDisabled.length > 0) {
      if (stepDisabled.includes(i)) {
        classes += "disabled ";
      }
    }
    return classes;
  };

  const handleClick = (i) => {
    if (i < current) {
      onProgressClick(i);
    }
  };

  return (
    <div
      id="progress_bar"
      className="mt-8 mb-8 flex scrollbar-thin scrollbar-thumb-custom scrollbar-thumb-rounded-full h-32 overflow-x-scroll"
    >
      {arr.map((i) => {
        return (
          <div
            key={i}
            className={`progress-group flex items-center ${renderedClasses(i)}`}
          >
            {i !== 1 && <div className="progress-line"></div>}
            <div className="progress-circle" onClick={() => handleClick(i)}>
              {i}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FormProgress;
