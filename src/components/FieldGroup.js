import { useDispatch, useSelector } from "react-redux";
import { removeLeadZero } from "../helpers/common";
import { changeMember } from "../store";
import Card from "./Card";
import InputGroup from "./inputGroup/InputGroup";

const FieldGroup = ({ title, step, fields, errors }) => {
  const dispatch = useDispatch();
  const memberForm = useSelector((state) => {
    return state.memberForm.data;
  });

  const validateInput = (name) => {
    if (errors) {
      const found = errors.fields.find((field) => field === name);
      if (found) {
        return false;
      }
    }
    return true;
  };

  const getFormValue = (name) => {
    if (memberForm[step]) {
      return removeLeadZero(memberForm[step][name]);
    } else {
      return removeLeadZero(memberForm[name]);
    }
  };

  return (
    <div>
      <h1 className="text-lg font-bold my-3">{title}</h1>
      <div className="flex flex-col">
        {errors && errors.codes.length > 0 && (
          <Card error className="border">
            Error Code: {errors.codes.join(", ")}
          </Card>
        )}
        <div className="flex flex-wrap">
          {fields.map((field, idx) => {
            return (
              <InputGroup
                key={idx}
                label={field}
                group="input"
                className="w-24"
                name={field}
                value={getFormValue(field)}
                isValid={validateInput(field)}
                setterFn={(name, value) =>
                  dispatch(changeMember({ name, value, step }))
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FieldGroup;
