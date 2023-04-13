import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import Header from "../components/Header";
import { IoChevronBack } from "react-icons/io5";
import { BsSend } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import $ from "jquery";
import {
  changeHousehold,
  clearHouseholdData,
  updateAllHouseholdData,
  useAddHouseholdMutation,
  useEditHouseholdMutation,
} from "../store";
import axios from "axios";
import InputGroup from "../components/inputGroup/InputGroup";
import useHouseholdParams from "../hooks/use-household-params";

const AddHousehold = ({ type }) => {
  const [formErrors, setFormErrors] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [addHousehold] = useAddHouseholdMutation();
  const [editHousehold] = useEditHouseholdMutation();
  const { data, status } = useSelector((state) => {
    return state.householdForm;
  });
  const {
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
  } = useHouseholdParams();

  useEffect(() => {
    $("html,body").scrollTop(0);
    const fetchData = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACK_END_URL}/households`,
        {
          params: { id },
        }
      );
      dispatch(updateAllHouseholdData(data));
    };

    if (type === "edit") {
      fetchData();
    } else {
      dispatch(clearHouseholdData());
    }
  }, [id, dispatch, type]);

  const filterdProvinces = provinces.filter(
    (province) => province.region === data.reg
  );

  const filterdDistricts = districts.filter(
    (district) => district.province === data.cwt
  );

  const checkInputError = (name) => {
    const found = formErrors.find((elm) => elm === name);
    if (found) {
      return false;
    }

    return true;
  };

  const inputs = [
    {
      id: 1,
      type: "dropdown",
      label: "ภาค",
      name: "reg",
      options: regions,
      isValid: checkInputError("reg"),
    },
    {
      id: 2,
      type: "dropdown",
      label: "จังหวัด",
      name: "cwt",
      options: filterdProvinces,
      isValid: checkInputError("cwt"),
    },
    {
      id: 3,
      type: "dropdown",
      label: "อำเภอ/เขต",
      name: "amp",
      options: filterdDistricts,
      isValid: checkInputError("amp"),
    },
    {
      id: 4,
      type: "dropdown",
      label: "ตำบล/แขวง",
      name: "tmb",
      options: subDistricts,
      isValid: checkInputError("tmb"),
    },
    {
      id: 5,
      type: "dropdown",
      label: "เขตการปกตรอง",
      name: "area",
      options: protectionArea,
      isValid: checkInputError("area"),
    },
    {
      id: 6,
      type: "input",
      label: "เขตแจงนับ",
      name: "ea",
      options: subDistricts,
      isValid: checkInputError("ea"),
    },
    {
      id: 7,
      type: "input",
      label: "หมู่ที่/หมู่บ้าน",
      name: "vil",
      options: subDistricts,
      isValid: checkInputError("vil"),
    },
    {
      id: 8,
      type: "input",
      label: "ลำดับที่ EA ตัวอย่าง",
      name: "psu_no",
      options: subDistricts,
      isValid: checkInputError("psu_no"),
    },
    {
      id: 9,
      type: "dropdown",
      label: "ชุด EA ตัวอย่าง",
      name: "ea_set",
      options: eaSet,
      isValid: checkInputError("ea_set"),
    },
    {
      id: 10,
      type: "dropdown",
      label: "เดือนที่สำรวจ",
      name: "month",
      options: month,
      isValid: checkInputError("month"),
    },
    {
      id: 11,
      type: "dropdown",
      label: "ปีที่สำรวจ",
      name: "yr",
      options: year,
      isValid: checkInputError("yr"),
    },
    {
      id: 12,
      type: "dropdown",
      label: "ลำดับที่ครัวเรือนส่วนบุคคลตัวอย่าง",
      name: "hh_no",
      options: hhNo,
      isValid: checkInputError("hh_no"),
    },
    {
      id: 13,
      type: "dropdown",
      label: "กลุ่มครัวเรือนตัวอย่างขั้นนับจด",
      name: "list_gr",
      options: listGr,
      isValid: checkInputError("list_gr"),
    },
    {
      id: 14,
      type: "dropdown",
      label: "กลุ่มครัวเรือนตัวอย่างขั้นแจงนับ",
      name: "enum_gr",
      options: enumGr,
      isValid: checkInputError("enum_gr"),
    },
    {
      id: 15,
      type: "dropdown",
      label: "จำนวนสมาชิกในครัวเรือนขั้นแจงนับ",
      name: "members",
      options: members,
      isValid: checkInputError("members"),
    },
    {
      id: 16,
      type: "dropdown",
      label: "จำนวนสมาชิกในครัวเรือนขั้นนับจด",
      name: "listing",
      options: listing,
      isValid: checkInputError("listing"),
    },
    {
      id: 17,
      type: "dropdown",
      label: "จำนวนสมาชิกที่พิการในครัวเรือน ขั้นแจงนับ",
      name: "mem_dis",
      options: memDis,
      isValid: checkInputError("mem_dis"),
    },
    {
      id: 18,
      type: "dropdown",
      label: "ผลการแจงนับครัวเรือนตัวอย่าง",
      name: "enum",
      options: _enum,
      isValid: checkInputError("enum"),
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate(data)) {
      if (type === "add") {
        addHousehold({ data, status });
      } else {
        editHousehold({ id, data });
      }
      navigateBack();
    } else {
      $("html, body").animate({ scrollTop: 0 }, "fast");
    }
  };

  const validate = (values) => {
    const errors = [];
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        if (!values[key]) {
          errors.push(key);
        }
      }
    }
    setFormErrors(errors);

    if (errors.length !== 0) {
      return false;
    }

    return true;
  };

  const navigateBack = () => {
    navigate("/");
  };

  const clearData = () => {
    dispatch(clearHouseholdData());
  };

  return (
    <>
      <Header title={type === "add" ? "เพิ่มครัวเรือน" : "แก้ไขครัวเรือน"}>
        <div className="flex flex-row">
          <Button danger onClick={clearData}>
            ล้างข้อมูลเดิม
          </Button>
          <Button secondary onClick={navigateBack}>
            <IoChevronBack className="mr-1" />
            กลับ
          </Button>
        </div>
      </Header>
      {formErrors.length !== 0 && (
        <Card error>
          <div className="text-red-600">
            <BiErrorCircle className="mr-2 inline-block text-xl pb-1" />
            กรุณากรอกข้อมูลให้ครบทุกช่อง
          </div>
        </Card>
      )}
      <Card className="mt-5">
        <form className="w-full flex flex-wrap" onSubmit={handleSubmit}>
          {inputs.map((input) => {
            return (
              <InputGroup
                key={input.id}
                label={input.label}
                type={input.type}
                options={input.options}
                name={input.name}
                value={data[input.name]}
                isValid={input.isValid}
                dispatchFn={(name, value) => changeHousehold({ name, value })}
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
