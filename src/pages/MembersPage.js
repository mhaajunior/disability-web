import { useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import Header from "../components/Header";
import { useFetchMembersQuery } from "../store";
import Loading from "../components/Loading";
import useMemberParams from "../hooks/use-member-params";
import Dropdown from "../components/inputGroup/Dropdown";

const MembersPage = () => {
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState(1);
  const fileId = searchParams.get("fi");
  const fileName = searchParams.get("fn");
  const iden = searchParams.get("iden");
  const { data, error, isFetching, isSuccess } = useFetchMembersQuery({
    file_id: fileId,
    iden,
  });
  const navigate = useNavigate();
  const { f4 } = useMemberParams();

  const navigateBack = () => {
    navigate(`/consistency?fi=${fileId}&fn=${fileName}`);
  };

  const handleEdit = (id) => {
    navigate(`/consistency/members/${id}`);
  };

  let content;
  if (isFetching) {
    content = <Loading type="partial" />;
  } else if (error) {
    content = <div className="text-red-600">เกิดข้อผิดพลาดในการแสดงข้อมูล</div>;
  } else if (data.data.members.length === 0) {
    content = <div>ไม่มีสมาชิกที่จะแสดง</div>;
  } else {
    content = data.data.members.map((member) => {
      let err = false;
      let relation = "";
      let status = (
        <span className="text-green-500 font-bold">ไม่พบความผิดพลาด</span>
      );
      if (data.data.errArr.find((err) => err === member._id)) {
        err = true;
        status = <span className="text-red-500 font-bold">พบความผิดพลาด</span>;
      }
      Object.values(f4).forEach((val) => {
        if (val.id === member.fields.step1.f4) {
          relation = val.name;
        }
      });

      if (mode === 1 || (mode === 2 && err)) {
        return (
          <Card
            key={member._id}
            id={member._id}
            error={err}
            hoverable
            onEdit={() => handleEdit(member._id)}
          >
            <div className="text-left">
              <div>สมาชิกลำดับที่: {member.fields.step1.f1}</div>
              <div>ความเกี่ยวพันกับหัวหน้าครัวเรือน: {relation}</div>
              <div>สถานะ: {status}</div>
            </div>
          </Card>
        );
      } else {
        return null;
      }
    });
  }

  const options = [
    {
      id: 1,
      name: "แสดงครัวเรือนทั้งหมด",
      value: 1,
    },
    {
      id: 2,
      name: "แสดงครัวเรือนที่มีความผิดพลาด",
      value: 2,
    },
  ];

  return (
    <>
      <Header title="รายละเอียดสมาชิกภายในครัวเรือน">
        <div className="flex flex-row">
          <Button secondary onClick={navigateBack}>
            <IoChevronBack className="mr-1" />
            กลับ
          </Button>
        </div>
      </Header>
      <Card className="mt-5 flex-col">
        {isSuccess && (
          <div className="flex justify-end mb-5">
            <Dropdown
              options={options}
              className="sm:w-72 w-48"
              value={mode}
              setterFn={(value) => setMode(value)}
            />
          </div>
        )}
        <div>รหัสครัวเรือน: {iden}</div>
        <div>จำนวนสมาชิก: {data ? data.data.members.length : "loading..."}</div>
        <div>
          จำนวนสมาชิกที่พบความผิดพลาด:{" "}
          {data ? data.data.errArr.length : "loading..."}
        </div>
        <div className="mt-5 text-center">{content}</div>
      </Card>
    </>
  );
};

export default MembersPage;
