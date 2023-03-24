import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import Header from "../components/Header";
import { IoChevronBack } from "react-icons/io5";
import { BsSend } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";
import Dropdown from "../components/Dropdown";
import { useSelector } from "react-redux";
import $ from "jquery";
import {
  regions,
  provinces,
  districts,
  subDistricts,
  protectionArea,
  eaSet,
  month,
  year,
  hhNo,
  listGr,
  enumGr,
  members,
  listing,
  memDis,
  _enum,
} from "../assets/resource";
import { useState } from "react";

const AddHousehold = () => {
  const [passValidate, setPassValidate] = useState([]);
  const household = useSelector((state) => {
    return state.householdForm;
  });
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate("/");
  };

  const filterdProvinces = provinces.filter(
    (province) => province.region === household.reg
  );

  const filterdDistricts = districts.filter(
    (district) => district.province === household.cwt
  );

  const inputs = [
    {
      id: 1,
      label: "ภาค",
      name: "reg",
      options: regions,
      validate: passValidate[0],
    },
    {
      id: 2,
      label: "จังหวัด",
      name: "cwt",
      options: filterdProvinces,
      validate: passValidate[1],
    },
    {
      id: 3,
      label: "อำเภอ/เขต",
      name: "amp",
      options: filterdDistricts,
      validate: passValidate[2],
    },
    {
      id: 4,
      label: "ตำบล/แขวง",
      name: "tmb",
      options: subDistricts,
      validate: passValidate[3],
    },
    {
      id: 5,
      label: "เขตการปกตรอง",
      name: "area",
      options: protectionArea,
      validate: passValidate[4],
    },
    {
      id: 6,
      label: "เขตแจงนับ",
      name: "ea",
      options: subDistricts,
      validate: passValidate[5],
    },
    {
      id: 7,
      label: "หมู่ที่/หมู่บ้าน",
      name: "vil",
      options: subDistricts,
      validate: passValidate[6],
    },
    {
      id: 8,
      label: "ลำดับที่ EA ตัวอย่าง",
      name: "psu_no",
      options: subDistricts,
      validate: passValidate[7],
    },
    {
      id: 9,
      label: "ชุด EA ตัวอย่าง",
      name: "ea_set",
      options: eaSet,
      validate: passValidate[8],
    },
    {
      id: 10,
      label: "เดือนที่สำรวจ",
      name: "month",
      options: month,
      validate: passValidate[9],
    },
    {
      id: 11,
      label: "ปีที่สำรวจ",
      name: "yr",
      options: year,
      validate: passValidate[10],
    },
    {
      id: 12,
      label: "ลำดับที่ครัวเรือนส่วนบุคคลตัวอย่าง",
      name: "hh_no",
      options: hhNo,
      validate: passValidate[11],
    },
    {
      id: 13,
      label: "กลุ่มครัวเรือนตัวอย่างขั้นนับจด",
      name: "list_gr",
      options: listGr,
      validate: passValidate[12],
    },
    {
      id: 14,
      label: "กลุ่มครัวเรือนตัวอย่างขั้นแจงนับ",
      name: "enum_gr",
      options: enumGr,
      validate: passValidate[13],
    },
    {
      id: 15,
      label: "จำนวนสมาชิกในครัวเรือนขั้นแจงนับ",
      name: "members",
      options: members,
      validate: passValidate[14],
    },
    {
      id: 16,
      label: "จำนวนสมาชิกในครัวเรือนขั้นนับจด",
      name: "listing",
      options: listing,
      validate: passValidate[15],
    },
    {
      id: 17,
      label: "จำนวนสมาชิกที่พิการในครัวเรือน ขั้นแจงนับ",
      name: "mem_dis",
      options: memDis,
      validate: passValidate[16],
    },
    {
      id: 18,
      label: "ผลการแจงนับครัวเรือนตัวอย่าง",
      name: "enum",
      options: _enum,
      validate: passValidate[17],
    },
  ];

  const checkValidate = () => {
    let validationArr = [];
    for (const key in household) {
      if (household.hasOwnProperty(key)) {
        if (!household[key]) {
          validationArr.push(false);
        } else {
          validationArr.push(true);
        }
      }
    }
    setPassValidate(validationArr);
    return validationArr.every((element) => element === true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkValidate()) {
      console.log("hi");
    } else {
      $("html, body").animate({ scrollTop: 0 }, "fast");
    }
  };

  return (
    <>
      <Header title="เพิ่มครัวเรือน">
        <Button secondary onClick={navigateBack}>
          <IoChevronBack className="mr-1" />
          กลับ
        </Button>
      </Header>
      {passValidate.length !== 0 &&
        !passValidate.every((element) => element === true) && (
          <Card error>
            <div>
              <BiErrorCircle className="mr-2 inline-block text-xl pb-1" />
              กรุณากรอกข้อมูลให้ครบทุกช่อง
            </div>
          </Card>
        )}
      <Card className="mt-5">
        <form
          className="w-full flex flex-wrap justify-evenly"
          onSubmit={handleSubmit}
        >
          {inputs.map((input) => {
            return (
              <Dropdown
                key={input.id}
                label={input.label}
                options={input.options}
                name={input.name}
                validate={input.validate}
              />
            );
          })}
          <div className="flex block w-full justify-center">
            <Button primary>
              <BsSend className="mr-2" />
              ส่ง
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default AddHousehold;
