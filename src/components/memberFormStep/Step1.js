import { useDispatch, useSelector } from "react-redux";
import { changeMember } from "../../store";
import Button from "../Button";
import { useState } from "react";
import $ from "jquery";
import InputGroup from "../inputGroup/InputGroup";
import useMemberParams from "../../hooks/use-member-params";

const Step1 = ({ onNext, onShowError, onDisabled }) => {
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();
  const step1 = useSelector((state) => {
    return state.memberForm.data.step1;
  });
  const { f1, f2, f4, f5, f6, f7, f8, f9 } = useMemberParams();

  const renderF9 = () => {
    if (step1["f6"]) {
      let num = parseInt(step1["f6"]);
      if (num >= 15) {
        return true;
      }
    }
    return false;
  };

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
    if (validate(step1)) {
      if (!renderF9()) {
        dispatch(changeMember({ name: "f9", value: "", step: "step1" }));
      }

      const intF6 = parseInt(step1["f6"]);
      if (intF6 >= 5) {
        onDisabled([2], "remove");
        onNext(2);
      } else {
        if (intF6 < 15) {
          if (intF6 < 2) {
            onDisabled([2, 3, 4, 5, 6, 7], "add");
            onNext(8);
          } else {
            onDisabled([2, 3], "add");
            onNext(4);
          }
        } else {
          onDisabled([2], "add");
          onNext(3);
        }
      }
    } else {
      $("html, body").animate({ scrollTop: 0 }, "fast");
    }
  };

  const validate = (values) => {
    const errors = {
      1: { name: "กรุณากรอกข้อมูลให้ครบทุกช่อง", fields: [] },
      2: {
        name: "ลำดับที่กับความเกี่ยวพันกับหัวหน้าครัวเรือนไม่สอดคล้องกัน",
        fields: [],
      },
      3: { name: "คำนำหน้าชื่อกับเพศไม่สอดคล้องกัน", fields: [] },
      4: { name: "อายุมากเกินกว่าค่าที่กำหนด", fields: [] },
      5: { name: "คำนำหน้าชื่อกับอายุไม่สอดคล้องกัน", fields: [] },
      6: {
        name: "ความเกี่ยวพันกับหัวหน้าครัวเรือนกับอายุไม่สอดคล้องกัน",
        fields: [],
      },
      7: { name: "อายุกับสถานภาพสมรสไม่สอดคล้องกัน", fields: [] },
      8: {
        name: "อายุกับความเกี่ยวพันกับหัวหน้าครัวเรือนกับสถานภาพสมรสไม่สอดคล้องกัน",
        fields: [],
      },
    };

    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        if (!values[key]) {
          if (key === "f9" && !renderF9()) {
            continue;
          }
          errors[1].fields.push(key);
        }
      }
    }

    if (
      (values["f1"] === "01" && values["f4"] !== "01") ||
      (parseInt(values["f1"]) >= 2 && values["f4"] === "01")
    ) {
      errors[2].fields.push("f1", "f4");
    }

    if (
      (["1", "4"].includes(values["f2"]) && values["f5"] !== "1") ||
      (["2", "3", "5"].includes(values["f2"]) && values["f5"] !== "2")
    ) {
      errors[3].fields.push("f2", "f5");
    }

    if (parseInt(values["f6"]) >= 120) {
      errors[4].fields.push("f6");
    }

    if (
      (["1", "2", "3"].includes(values["f2"]) && parseInt(values["f6"]) < 15) ||
      (["4", "5"].includes(values["f2"]) && parseInt(values["f6"]) > 14)
    ) {
      errors[5].fields.push("f2", "f6");
    }

    if (
      (values["f4"] === "01" && parseInt(values["f6"]) < 12) ||
      (["02", "04", "05"].includes(values["f4"]) &&
        parseInt(values["f6"]) < 13) ||
      (["07", "08"].includes(values["f4"]) && parseInt(values["f6"]) < 30) ||
      (values["f4"] === "09" && parseInt(values["f6"]) < 45)
    ) {
      errors[6].fields.push("f4", "f6");
    }

    if (
      parseInt(values["f6"] < 15) &&
      values["f9"] !== "" &&
      parseInt(values["f6"] >= 15) &&
      values["f9"] === ""
    ) {
      errors[7].fields.push("f6", "f9");
    }

    if (
      parseInt(values["f6"]) >= 15 &&
      ((values["f4"] === "02" && values["f9"] !== "2") ||
        (values["f4"] === "03" && values["f9"] !== "1") ||
        (["04", "05", "07", "08", "09"].includes(values["f4"]) &&
          !["2", "3", "4", "5"].includes(values["f9"])))
    ) {
      errors[8].fields.push("f4", "f6", "f9");
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
      label: "ลำดับที่",
      name: "f1",
      options: f1,
    },
    {
      id: 2,
      type: "dropdown",
      label: "คำนำหน้าชื่อ",
      name: "f2",
      options: f2,
    },
    {
      id: 3,
      type: "input",
      label: "ชื่อ",
      name: "f3_1",
    },
    {
      id: 4,
      type: "input",
      label: "นามสกุล",
      name: "f3_2",
    },
    {
      id: 5,
      type: "dropdown",
      label: "ความเกี่ยวพันกับหัวหน้าครัวเรือน",
      name: "f4",
      options: f4,
    },
    {
      id: 6,
      type: "dropdown",
      label: "เพศ",
      name: "f5",
      options: f5,
    },
    {
      id: 7,
      type: "dropdown",
      label: "อายุ",
      name: "f6",
      options: f6,
    },
    {
      id: 8,
      type: "dropdown",
      label: "สัญชาติ",
      name: "f7",
      options: f7,
    },
    {
      id: 9,
      type: "dropdown",
      label: "การได้รับสวัสดิการค่ารักษาพยาบาลหลักของรัฐ",
      name: "f8",
      options: f8,
    },
    {
      id: 10,
      type: "dropdown",
      label: "สถานภาพสมรส",
      name: "f9",
      options: f9,
      isShow: renderF9,
    },
  ];

  return (
    <div className="w-full">
      <h1 className="text-xl mb-5">
        ตอนที่ 1 ลักษณะทั่วไปของสมาชิกในครัวเรือน
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
              value={step1[input.name]}
              isValid={checkInputError(input.name)}
              dispatchFn={(name, value) =>
                changeMember({ name, value, step: "step1" })
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

export default Step1;
