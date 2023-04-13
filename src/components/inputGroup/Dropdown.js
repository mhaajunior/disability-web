import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import $ from "jquery";
import "../../styles/Dropdown.css";

const Dropdown = ({ label, options, name, value, dispatchFn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const divEl = useRef();
  const textEl = useRef();
  const parentEl = useRef();
  const dispatch = useDispatch();

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

  useEffect(() => {
    const filteredOption = options.filter((option) => option.id === value);
    if (filteredOption.length !== 0) {
      setSelected(filteredOption[0].name);
    } else {
      setSelected("");
    }
  }, [value, options]);

  const handleOptionClick = (option, name) => {
    setIsOpen(false);
    setSelected(option.name);
    dispatch(dispatchFn(name, option.id));
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
              value === option.id ? "selected" : ""
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
      name={name}
      className="dropdown sm:w-72 w-48 relative cursor-pointer"
      value={value}
      ref={divEl}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div
        ref={parentEl}
        className="flex justify-between items-center ellipsis"
      >
        <span
          ref={textEl}
          onMouseEnter={startMarquee}
          onMouseLeave={stopMarquee}
        >
          {selected || <span className="text-gray-400">-- {label} --</span>}
        </span>
        <div className="absolute right-2 h-full flex items-center bg-white">
          <GoChevronDown className="text-lg" />
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-full select z-20 scrollbar-thin scrollbar-thumb-custom scrollbar-thumb-rounded-full overflow-y-scroll">
          {renderedOptions()}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
