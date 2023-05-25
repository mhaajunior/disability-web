import Dropdown from "../inputGroup/Dropdown";
import Input from "../inputGroup/Input";
import classNames from "classnames";

const InputGroup = ({
  type,
  label,
  options,
  name,
  value,
  setterFn,
  isValid,
  isShow,
}) => {
  const classes = classNames("flex justify-between py-5 px-8 items-center", {
    error: !isValid,
    hidden: isShow && !isShow(),
  });

  return (
    <div id={`${type}_group_${name}`} className={classes}>
      <label className="pr-7 font-bold w-24 label">{name.toUpperCase()}</label>
      {type === "dropdown" && (
        <Dropdown
          label={label}
          options={options}
          name={name}
          value={value}
          setterFn={setterFn}
        />
      )}
      {type === "input" && (
        <Input label={label} name={name} value={value} setterFn={setterFn} />
      )}
    </div>
  );
};

export default InputGroup;
