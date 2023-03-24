import { useDispatch, useSelector } from "react-redux";
import { changeHousehold } from "../store";
import { useEffect, useRef, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import "./Dropdown.css";

const Dropdown = ({ label, options, name, main }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const divEl = useRef();
  const dispatch = useDispatch();
  const household = useSelector((state) => {
    return state.householdForm;
  });

  useEffect(() => {
    const handler = (e) => {
      if (!divEl.current) {
        return;
      }

      if (!divEl.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  const handleOptionClick = (option, name) => {
    setIsOpen(false);
    setSelected(option.name);
    dispatch(changeHousehold({ name, value: option.id }));
  };

  const renderedOptions = () => {
    if (options.length === 0) {
      return (
        <div onClick={() => setIsOpen(false)}>ไม่มีตัวเลือกให้แสดงในขณะนี้</div>
      );
    } else {
      const rendered = options.map((option) => {
        return (
          <div
            key={option.name}
            className="cursor-pointer p-1"
            value={option.id}
            onClick={() => handleOptionClick(option, name)}
          >
            {option.name}
          </div>
        );
      });
      return rendered;
    }
  };

  return (
    <div className="flex justify-between p-5 items-center">
      <label className="pr-7 font-bold w-24">{name.toUpperCase()}</label>
      <div
        name={name}
        className="dropdown sm:w-72 w-48 relative"
        value={household[name]}
        ref={divEl}
      >
        <div
          className="flex justify-between items-center cursor-pointer ellipsis"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="addText">{selected || `-- ${label} --`}</div>
          <div className="absolute right-2 h-full flex items-center bg-white">
            <GoChevronDown className="text-lg" />
          </div>
        </div>
        {isOpen && (
          <div className="absolute top-full select z-20">
            {renderedOptions()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
