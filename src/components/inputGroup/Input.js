import "../../styles/Input.css";

const Input = ({ label, name, value, setterFn, ...rest }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setterFn(name, value);
  };

  return (
    <input
      name={name}
      type={rest.type || "text"}
      className={`input ${rest.className}`}
      placeholder={`${label}`}
      value={value}
      onChange={handleChange}
      autoComplete="off"
    />
  );
};

export default Input;
