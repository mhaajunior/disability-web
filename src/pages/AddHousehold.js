import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import Header from "../components/Header";
import { IoChevronBack } from "react-icons/io5";
import Dropdown from "../components/Dropdown";
import { useSelector } from "react-redux";
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

const AddHousehold = () => {
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

  return (
    <>
      <Header title="เพิ่มครัวเรือน">
        <Button secondary onClick={navigateBack}>
          <IoChevronBack className="mr-1" />
          กลับ
        </Button>
      </Header>
      <Card className="mt-5">
        <form className="w-full flex flex-wrap">
          <Dropdown label="ภาค" options={regions} name="reg" />
          <Dropdown label="จังหวัด" options={filterdProvinces} name="cwt" />
          <Dropdown label="อำเภอ/เขต" options={filterdDistricts} name="amp" />
          <Dropdown label="ตำบล/แขวง" options={subDistricts} name="tmb" />
          <Dropdown label="เขตการปกตรอง" options={protectionArea} name="area" />
          <Dropdown label="เขตแจงนับ" options={subDistricts} name="ea" />
          <Dropdown
            label="หมู่ที่/หมู่บ้าน"
            options={subDistricts}
            name="vil"
          />
          <Dropdown
            label="ลำดับที่ EA ตัวอย่าง"
            options={subDistricts}
            name="psu_no"
          />
          <Dropdown label="ชุด EA ตัวอย่าง" options={eaSet} name="ea_set" />
          <Dropdown label="เดือนที่สำรวจ" options={month} name="month" />
          <Dropdown label="ปีที่สำรวจ" options={year} name="yr" main />
          <Dropdown
            label="ลำดับที่ครัวเรือนส่วนบุคคลตัวอย่าง"
            options={hhNo}
            name="hh_no"
          />
          <Dropdown
            label="กลุ่มครัวเรือนตัวอย่างขั้นนับจด"
            options={listGr}
            name="list_gr"
          />
          <Dropdown
            label="กลุ่มครัวเรือนตัวอย่างขั้นแจงนับ"
            options={enumGr}
            name="enum_gr"
          />
          <Dropdown
            label="จำนวนสมาชิกในครัวเรือนขั้นแจงนับ"
            options={members}
            name="members"
          />
          <Dropdown
            label="จำนวนสมาชิกในครัวเรือนขั้นนับจด"
            options={listing}
            name="listing"
          />
          <Dropdown
            label="จำนวนสมาชิกที่พิการในครัวเรือน ขั้นแจงนับ"
            options={memDis}
            name="mem_dis"
          />
          <Dropdown
            label="ผลการแจงนับครัวเรือนตัวอย่าง"
            options={_enum}
            name="enum"
          />
        </form>
      </Card>
    </>
  );
};

export default AddHousehold;
