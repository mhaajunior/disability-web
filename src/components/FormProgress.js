import "./FormProgress.css";

const FormProgress = ({ total, current, onProgressClick }) => {
  const arr = [];
  for (let i = 1; i <= total; i++) {
    arr.push(i);
  }

  const renderedClasses = (i) => {
    let classes = "";
    if (i <= current) {
      classes += "active ";
    }
    if (i < current) {
      classes += "cursor-pointer ";
    }
    if (i === current) {
      classes += "current ";
    }
    return classes;
  };

  const handleClick = (i) => {
    if (i < current) {
      onProgressClick(i);
    }
  };

  return (
    <div className="mt-8 mb-8 flex scrollbar-thin scrollbar-thumb-custom scrollbar-thumb-rounded-full h-32 overflow-x-scroll">
      {arr.map((i) => {
        return (
          <div
            key={i}
            className={`flex items-center ${renderedClasses(i)}`}
            onClick={() => handleClick(i)}
          >
            {i !== 1 && <div className="progress-line"></div>}
            <div className="progress-circle">{i}</div>
          </div>
        );
      })}
    </div>
  );
};

export default FormProgress;
