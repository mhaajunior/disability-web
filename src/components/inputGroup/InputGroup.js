import Dropdown from "../inputGroup/Dropdown";
import Input from "../inputGroup/Input";
import classNames from "classnames";

const InputGroup = ({
  group,
  label,
  options,
  name,
  value,
  setterFn,
  isValid,
  isShow,
  ...rest
}) => {
  const classes = classNames("flex justify-between py-5 px-8 items-center", {
    error: !isValid,
    hidden: isShow && !isShow(),
  });

  return (
    <div id={`${group}_group_${name}`} className={classes}>
      <div className="pr-7 font-bold w-24 label">{name.toUpperCase()}</div>
      {group === "dropdown" && (
        <Dropdown
          label={label}
          options={options}
          name={name}
          value={value}
          setterFn={setterFn}
          className={rest.className}
        />
      )}
      {group === "input" && (
        <Input
          label={label}
          type={rest.type}
          name={name}
          value={value}
          setterFn={setterFn}
          className={rest.className}
        />
      )}
    </div>
  );
};

export default InputGroup;
