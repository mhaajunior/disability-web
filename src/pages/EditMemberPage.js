import { useCallback, useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import Header from "../components/Header";
import {
  changeMember,
  updateAllMemberData,
  useEditMemberMutation,
  useFetchMemberByIdQuery,
} from "../store";
import Loading from "../components/Loading";
import FieldGroup from "../components/FieldGroup";
import { RiErrorWarningLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import $ from "jquery";
import usePossibleLength from "../hooks/use-possible-length";
import { padZero } from "../helpers/common";

const EditMemberPage = () => {
  const [fields, setFields] = useState([]);
  const [miscErr, setMiscError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, isFetching } = useFetchMemberByIdQuery(id);
  const [editMember, { isLoading, isSuccess }] = useEditMemberMutation();
  const dispatch = useDispatch();
  const possibleLength = usePossibleLength();
  const memberForm = useSelector((state) => {
    return state.memberForm.data;
  });

  const navigateBack = useCallback(() => {
    if (data) {
      navigate(
        `/consistency/members?fi=${data.data.file_id}&fn=${data.data.files.name}&iden=${data.data.iden}`
      );
    }
  }, [data, navigate]);

  useEffect(() => {
    $("html, body").animate({ scrollTop: 0 }, "fast");
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(updateAllMemberData(data.data.fields));
      const fieldsArr = [];
      const miscArr = [];
      const { data: o } = data;
      for (const key1 in o.fields) {
        if (typeof o.fields[key1] === "object") {
          const arr = [];
          for (const key2 in o.fields[key1]) {
            arr.push(key2);
          }
          fieldsArr.push(arr);
        } else {
          miscArr.push(key1);
        }
      }
      fieldsArr.push(miscArr);
      setFields(fieldsArr);
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      navigateBack();
    }
  }, [isSuccess, navigateBack]);

  const titles = [
    { key: "step1", name: "ตอนที่ 1 ลักษณะทั่วไปของสมาชิกในครัวเรือน" },
    { key: "step2", name: "ตอนที่ 2 การศึกษา" },
    { key: "step3", name: "ตอนที่ 3 การทำงานระหว่าง 12 เดือนก่อนวันสัมภาษณ์" },
    {
      key: "step4",
      name: "ตอนที่ 4 ความลำบากหรือปัญหาสุขภาพของเด็กอายุ 2 - 4 ปี",
    },
    {
      key: "step5",
      name: "ตอนที่ 5 ความลำบากหรือปัญหาสุขภาพของเด็กอายุ 5 - 17 ปี",
    },
    {
      key: "step6",
      name: "ตอนที่ 6 ความลำบากหรือปัญหาสุขภาพของผู้ใหญ่อายุตั้งแต่ 18 ปีขึ้นไป",
    },
    {
      key: "step7",
      name: "ตอนที่ 7 ผู้ดูแลของผู้ที่มีความลำบากในการดูแลตนเอง",
    },
    { key: "step8", name: "ตอนที่ 8 ลักษณะความบกพร่อง" },
    {
      key: "step9",
      name: "ตอนที่ 9 สวัสดิการจากภาครัฐ และความลำบากหรือข้อจำกัดในการเข้าร่วมกิจกรรม",
    },
    {
      key: "step10",
      name: "ตอนที่ 10 การเข้าถึงบริการทางด้านสาธารณสุข การใช้คอมพิวเตอร์และอินเทอร์เน็ต",
    },
    { key: "step11", name: "ตอนที่ 11 ลักษณะของครัวเรือน" },
    { key: "misc", name: "อื่นๆ" },
  ];

  const saveMemberForm = () => {
    if (checkValidation()) {
      editMember({ id, memberForm });
    } else {
      $("html, body").animate({ scrollTop: 0 }, "fast");
      return false;
    }
  };

  const checkValidation = () => {
    const err = {
      1: { name: "ข้อมูลประกอบด้วยอักขระที่ไม่ถูกต้อง", fields: [] },
      2: { name: "จำนวนอักขระมากเกินกว่าที่กำหนด", fields: [] },
    };
    for (const [key, value] of Object.entries(memberForm)) {
      if (typeof value === "object") {
        for (const [key2, value2] of Object.entries(value)) {
          if (value2) {
            if (!/^\d*\.?\d+$/.test(value2)) {
              err[1].fields.push(key2);
            }
            if (value2.length > possibleLength[key2]) {
              err[2].fields.push(key2);
            } else {
              const x = padZero(value2, possibleLength[key2]);
              dispatch(changeMember({ name: key2, value: x, step: key }));
            }
          }
        }
      } else {
        if (value && !/^\d*\.?\d+$/.test(value)) {
          err[1].fields.push(key);
        }
      }
    }

    const errArr = [];
    for (const key in err) {
      if (err[key].fields.length > 0) {
        errArr.push({
          des: err[key].name,
          field: err[key].fields.join(", "),
        });
      }
    }
    if (errArr.length > 0) {
      setMiscError(errArr);
      return false;
    }

    return true;
  };

  let content;
  if (isFetching) {
    content = <Loading type="partial" />;
  } else if (error) {
    content = <div className="text-red-600">เกิดข้อผิดพลาดในการแสดงข้อมูล</div>;
  } else {
    content = (
      <div>
        <Card warning block className="border mb-8">
          <p className="m-2">
            <RiErrorWarningLine className="inline-block mr-3" />
            การกรอกข้อมูลในแต่ละ field ไม่ต้องกรอกเลข 0 นำหน้า
            ระบบจะทำการเติมให้เองโดยอัตโนมัติตามจำนวนหลักที่ยังขาดไปของ field
            นั้นๆ
          </p>
          <p className="m-2">
            <RiErrorWarningLine className="inline-block mr-3" />
            Field ใดๆที่มี error ขึ้นแสดงว่ามีความเป็นไปได้ที่ field ใด field
            หนึ่งอาจจะมีการกรอกข้อมูลผิด ไม่จำเป็นต้องแก้ไขทุก field
            ให้ตรวจสอบจาก error code ที่แสดงขึ้นมาแล้วทำการตรวจสอบใน field
            ที่เกี่ยวข้อง
          </p>
        </Card>
        {miscErr && (
          <Card error block className="border mb-10">
            {miscErr.map((elm, idx) => {
              return (
                <p key={idx} className="m-2">
                  <RiErrorWarningLine className="inline-block mr-3" />
                  {elm.des} : {elm.field.toUpperCase()}
                </p>
              );
            })}
          </Card>
        )}
        {fields.map((elm, idx) => {
          return (
            <FieldGroup
              key={idx}
              title={titles[idx].name}
              step={titles[idx].key}
              fields={elm}
              errors={
                data.data.inconsist && data.data.inconsist[titles[idx].key]
              }
            />
          );
        })}
        <Button primary className="mx-auto" onClick={saveMemberForm}>
          บันทึก
        </Button>
      </div>
    );
  }

  return (
    <>
      {isLoading && <Loading type="full" />}
      <Header title="แก้ไขสมาชิกในครัวเรือน">
        <Button secondary onClick={navigateBack}>
          <IoChevronBack className="mr-1" />
          กลับ
        </Button>
      </Header>
      <Card block className="mt-5">
        {content}
      </Card>
    </>
  );
};

export default EditMemberPage;
