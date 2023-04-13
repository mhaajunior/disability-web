import { useSelector } from "react-redux";
import { changeMember } from "../../store";
import Button from "../Button";
import { useState } from "react";
import $ from "jquery";
import InputGroup from "../inputGroup/InputGroup";
import useMemberParams from "../../hooks/use-member-params";

const Step10 = ({ onNext, onShowError }) => {
  const [formErrors, setFormErrors] = useState({});
  const step2 = useSelector((state) => {
    return state.memberForm.data.step2;
  });
  const { f11, f12, f13 } = useMemberParams();

  const checkInputError = (name) => {
    for (const key in formErrors) {
      const found = formErrors[key].fields.find((elm) => elm === name);
      if (found) {
        return false;
      }
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate(step2)) {
      onNext(3);
    } else {
      $("html, body").animate({ scrollTop: 0 }, "fast");
    }
  };

  const validate = (values) => {
    const errors = {
      1: { name: "กรุณากรอกข้อมูลให้ครบทุกช่อง", fields: [] },
    };

    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        if (!values[key]) {
          errors[1].fields.push(key);
        }
      }
    }

    setFormErrors(errors);
    onShowError(errors);

    for (const key in errors) {
      if (errors[key].fields.length > 0) {
        return false;
      }
    }

    return true;
  };

  const inputs = [
    {
      id: 1,
      type: "dropdown",
      label: "ชั้นที่กำลังเรียน",
      name: "f10",
      options: f11,
    },
    {
      id: 2,
      type: "dropdown",
      label: "ประเภทโรงเรียน/สถานศึกษา",
      name: "f11",
      options: f11,
    },
    {
      id: 3,
      type: "dropdown",
      label: "เหตุผลที่ปัจจุบันไม่ได้เรียนหนังสือ",
      name: "f12",
      options: f12,
    },
    {
      id: 4,
      type: "dropdown",
      label: "การเรียนการสอนนอกสถานศึกษา",
      name: "f13",
      options: f13,
    },
    {
      id: 5,
      type: "dropdown",
      label: "ชั้นการศึกษาสูงสุดที่จบ",
      name: "f14",
      options: f11,
    },
  ];

  return (
    <div className="w-full">
      <h1 className="text-xl mb-5">ตอนที่ 2 การศึกษา</h1>
      <form className="w-full flex flex-wrap" onSubmit={handleSubmit}>
        {inputs.map((input) => {
          return (
            <InputGroup
              key={input.id}
              type={input.type}
              label={input.label}
              options={input.options || null}
              name={input.name}
              value={step2[input.name]}
              isValid={checkInputError(input.name)}
              dispatchFn={(name, value) =>
                changeMember({ name, value, step: "step2" })
              }
              isShow={input.isShow || null}
            />
          );
        })}
        <div className="flex block w-full justify-center">
          <Button primary>บันทึกและถัดไป</Button>
        </div>
      </form>
    </div>
  );
};

export default Step10;
