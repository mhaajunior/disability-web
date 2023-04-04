import { useSelector } from "react-redux";
import { changeMember } from "../../store";
import Button from "../Button";
import {
  f20,
  f21,
  f23,
  f24,
  f26,
  f27,
  f28,
  f30,
  f31,
  f34,
  f35,
  f36,
} from "../../assets/memberResource/step4";
import { useState } from "react";
import $ from "jquery";
import InputGroup from "../inputGroup/InputGroup";

const Step4 = ({ onNext, onShowError }) => {
  const [formErrors, setFormErrors] = useState({});
  const step2 = useSelector((state) => {
    return state.memberForm.data.step2;
  });

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
      label: "การใส่แว่นตาของเด็กเล็ก",
      name: "f20",
      options: f20,
    },
    {
      id: 2,
      type: "dropdown",
      label: "ความลำบากในการมองเห็นเมื่อใส่แว่นตาของเด็กเล็กที่ใส่แว่นตา",
      name: "f21",
      options: f21,
    },
    {
      id: 3,
      type: "dropdown",
      label: "ความลำบากในการมองเห็นของเด็กเล็กที่ไม่ใส่แว่นตา",
      name: "f22",
      options: f21,
    },
    {
      id: 4,
      type: "dropdown",
      label: "การใช้เครื่องช่วยฟังของเด็กเล็ก",
      name: "f23",
      options: f23,
    },
    {
      id: 5,
      type: "dropdown",
      label:
        "ความลำบากในการได้ยินเมื่อใช้เครื่องช่วยฟังของเด็กเล็กที่ใช้เครื่องช่วยฟัง",
      name: "f24",
      options: f24,
    },
    {
      id: 6,
      type: "dropdown",
      label: "ความลำบากในการได้ยินของเด็กเล็กที่ไม่ใช้เครื่องช่วยฟัง",
      name: "f25",
      options: f24,
    },
    {
      id: 7,
      type: "dropdown",
      label: "การใช้อุปกรณ์หรือได้รับความช่วยเหลือสำหรับการเดินของเด็กเล็ก",
      name: "f26",
      options: f26,
    },
    {
      id: 8,
      type: "dropdown",
      label: "ความลำบากในการเดินเมื่อไม่ใช้อุปกรณ์ฯ ของเด็กเล็กที่ใช้อุปกรณ์ฯ",
      name: "f27",
      options: f27,
    },
    {
      id: 9,
      type: "dropdown",
      label: "ความลำบากในการเดินเมื่อใช้อุปกรณ์ฯ ของเด็กเล็กที่ใช้อุปกรณ์ฯ",
      name: "f28",
      options: f28,
    },
    {
      id: 10,
      type: "dropdown",
      label: "ความลำบากในการเดินชองเด็กเล็กที่ไม่ใช้อุปกรณ์ฯ",
      name: "f29",
      options: f28,
    },
    {
      id: 11,
      type: "dropdown",
      label: "ความลำบากในการใช้มือหยิบสิ่งของขนาดเล็กของเด็กเล็ก",
      name: "f30",
      options: f30,
    },
    {
      id: 12,
      type: "dropdown",
      label: "ความลำบากในการเข้าใจแม่ หรือผู้ดูแลหลักของเด็กเล็ก",
      name: "f31",
      options: f31,
    },
    {
      id: 13,
      type: "dropdown",
      label: "ความลำบากในการเข้าใจสิ่งที่เด็กเล็กพูด",
      name: "f32",
      options: f31,
    },

    {
      id: 14,
      type: "dropdown",
      label: "ความลำบากในการเรียนรู้สิ่งต่าง ๆของเด็กเล็ก",
      name: "f33",
      options: f30,
    },
    {
      id: 15,
      type: "dropdown",
      label: "ความลำบากในการเล่นของเด็กเล็ก",
      name: "f34",
      options: f34,
    },
    {
      id: 16,
      type: "dropdown",
      label: "การทำกิจกรรมร่วมหรือเล่นกับเด็กอื่น ๆ นอกครอบครัว",
      name: "f35",
      options: f35,
    },
    {
      id: 17,
      type: "dropdown",
      label: "การเตะ กัด หรือตีเด็กคนอื่นหรือผู้ใหญ่ของเด็กเล็ก",
      name: "f36",
      options: f36,
    },
  ];

  return (
    <div className="w-full">
      <h1 className="text-xl mb-5">
        ตอนที่ 4 ความลำบากหรือปัญหาสุขภาพของเด็กอายุ 2 - 4 ปี
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

export default Step4;
