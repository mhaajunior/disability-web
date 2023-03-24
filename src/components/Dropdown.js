import { useDispatch, useSelector } from "react-redux";
import { changeHousehold } from "../store";
import { useEffect, useRef, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import $ from "jquery";
import "./Dropdown.css";

const Dropdown = ({ label, options, name, validate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const divEl = useRef();
  const textEl = useRef();
  const parentEl = useRef();
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
    $(`#dropdown_group_${name}`).removeClass("error");
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
            className={`cursor-pointer p-1 ${
              household[name] === option.id && "selected"
            }`}
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

  const startMarquee = () => {
    let menuItemWidth = $(textEl.current).width();
    let listItemWidth = $(parentEl.current).width();

    if (menuItemWidth > listItemWidth) {
      let scrollDistance = menuItemWidth - listItemWidth;
      let listItem = $(parentEl.current);
      listItem.stop();
      listItem.animate(
        {
          scrollLeft: scrollDistance,
        },
        1000,
        "linear"
      );
    }
  };

  const stopMarquee = () => {
    let listItem = $(parentEl.current);
    listItem.stop();
    listItem.animate(
      {
        scrollLeft: 0,
      },
      "medium",
      "swing"
    );
  };

  return (
    <div
      id={`dropdown_group_${name}`}
      className={`flex justify-between p-5 items-center dropdown-group ${
        validate !== undefined && !validate && "error"
      }`}
    >
      <label className="pr-7 font-bold w-24 label">{name.toUpperCase()}</label>
      <div
        name={name}
        className="dropdown sm:w-72 w-48 relative cursor-pointer"
        value={household[name]}
        ref={divEl}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          ref={parentEl}
          className="flex justify-between items-center  ellipsis"
        >
          <span
            ref={textEl}
            onMouseEnter={startMarquee}
            onMouseLeave={stopMarquee}
          >
            {selected || `-- ${label} --`}
          </span>
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
