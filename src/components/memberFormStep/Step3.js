import { useSelector } from "react-redux";
import { changeMember } from "../../store";
import Button from "../Button";
import { useState } from "react";
import $ from "jquery";
import InputGroup from "../inputGroup/InputGroup";
import useMemberParams from "../../hooks/use-member-params";

const Step3 = ({ onNext, onShowError }) => {
  const [formErrors, setFormErrors] = useState({});
  const step3 = useSelector((state) => {
    return state.memberForm.data.step2;
  });
  const { f17, f19 } = useMemberParams();

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
    if (validate(step3)) {
      onNext(4);
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
      label: "อาชีพ",
      name: "f15",
      options: f17,
    },
    {
      id: 2,
      type: "dropdown",
      label: "อุตสาหกรรม",
      name: "f16",
      options: f17,
    },
    {
      id: 3,
      type: "dropdown",
      label: "สถานภาพการทำงาน",
      name: "f17",
      options: f17,
    },
    {
      id: 4,
      type: "dropdown",
      label: "รายได้ (สุทธิ) ที่เป็นตัวเงินและสิ่งของ เฉลี่ยต่อเดือน",
      name: "f18",
      options: f19,
    },
    {
      id: 5,
      type: "dropdown",
      label: "เหตุผลที่ไม่ทำงาน",
      name: "f19",
      options: f19,
    },
  ];

  return (
    <div className="w-full">
      <h1 className="text-xl mb-5">
        ตอนที่ 3 การทำงานระหว่าง 12 เดือนก่อนวันสัมภาษณ์
      </h1>
      <form className="w-full flex flex-wrap" onSubmit={handleSubmit}>
        {inputs.map((input) => {
          return (
            <InputGroup
              key={input.id}
              type={input.type}
              label={input.label}
              options={input.options || null}
              name={input.name}
              value={step3[input.name]}
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

export default Step3;
