import { useDispatch } from "react-redux";
import "./Input.css";

const Input = ({ label, name, value, dispatchFn }) => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(dispatchFn(name, value));
  };

  return (
    <input
      name={name}
      type="text"
      className="input sm:w-72 w-48"
      placeholder={`-- ${label} --`}
      value={value}
      onChange={handleChange}
      autoComplete="off"
    />
  );
};

export default Input;
