import "../../styles/Input.css";

const Input = ({ label, name, value, setterFn }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setterFn(name, value);
  };

  return (
    <input
      name={name}
      type="text"
      className="input w-24"
      placeholder={`${label}`}
      value={value}
      onChange={handleChange}
      autoComplete="off"
    />
  );
};

export default Input;
