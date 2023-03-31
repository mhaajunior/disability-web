import { IoIosAddCircle } from "react-icons/io";
import {
  AiOutlineLoading3Quarters,
  AiOutlineWarning,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "../components/Button";
import Card from "../components/Card";
import Header from "../components/Header";
import { useDeleteHouseholdMutation, useFetchHouseholdsQuery } from "../store";
import { useEffect } from "react";
import $ from "jquery";

const MembersPage = () => {
  const { data, error, isFetching } = useFetchHouseholdsQuery();
  const [deleteHousehold, results] = useDeleteHouseholdMutation();
  const navigate = useNavigate();
  const { household_id } = useParams();

  useEffect(() => {
    $("html,body").scrollTop(0);
  }, []);

  const navigateAdd = () => {
    navigate(`/addMember/${household_id}`);
  };

  const navigateBack = () => {
    navigate("/");
  };

  const handleEdit = (id) => {
    navigate(`/editMember/${id}`);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "คำเตือน!",
      text: `คุณต้องการที่จะลบครัวเรือนที่ #${id} หรือไม่`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ต้องการลบ",
      cancelButtonText: "ไม่ต้องการลบ",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteHousehold(id);
      }
    });
  };

  let content;
  if (isFetching || results.isLoading) {
    content = (
      <AiOutlineLoading3Quarters className="animate-spin text-7xl m-auto txt-primary" />
    );
  } else if (error) {
    content = <div className="text-red-600">เกิดข้อผิดพลาดในการแสดงข้อมูล</div>;
  } else if (data.length === 0) {
    content = <div>ไม่มีสมาชิกที่จะแสดง</div>;
  } else {
    content = data.map((household) => {
      let { status } = household;
      let success,
        warning,
        error = false;
      let status_text, class_name, pic;

      if (status === "success") {
        success = true;
        status_text =
          "ข้อมูลของสมาชิกในครัวเรือนที่ท่านกรอกได้ผ่านขั้นตอนตรวจสอบความถูกต้องของข้อมูลเรียบร้อยแล้ว";
        class_name = "text-green-600";
        pic = (
          <AiOutlineCheckCircle className="absolute right-4 top-3 text-green-600 text-8xl opacity-70" />
        );
      } else if (status === "warning") {
        warning = true;
        status_text =
          "ข้อมูลของสมาชิกในครัวเรือนยังไม่เสร็จสมบูรณ์ กรุณากดที่กล่องเพื่อดำเนินการเพิ่มข้อมูลของสมาชิกในครัวเรือนและส่งข้อมูลมาให้ระบบทำการตรวจสอบความถูกต้องของข้อมูล";
        class_name = "text-yellow-600";
        pic = (
          <AiOutlineWarning className="absolute right-4 top-3 text-yellow-600 text-8xl opacity-70" />
        );
      } else {
        error = true;
        status_text =
          "เกิดข้อผิดพลาดในขั้นตอนตรวจสอบความถูกต้องของข้อมูล กรุณากดที่กล่องเพื่อตรวจสอบข้อมูลของสมาชิกในครัวเรือนทีท่านกรอกอีกครั้งว่าถูกต้องและสอดคล้องตามข้อกำหนดหรือไม่";
        class_name = "text-red-600";
        pic = (
          <AiOutlineCloseCircle className="absolute right-4 top-3 text-red-600 text-8xl opacity-70" />
        );
      }

      return (
        <Card
          key={household.id}
          id={household.id}
          success={success}
          warning={warning}
          error={error}
          hoverable
          hoverWord="กดเพื่อดูสมาชิกในครัวเรือน"
          onDelete={handleDelete}
          onEdit={handleEdit}
          onClick={() => navigate(`/members/${household.id}`)}
          className="relative"
        >
          {pic}
          <div className="flex flex-col leading-10">
            {" "}
            <p>
              <span className="font-bold">รหัสครัวเรือน:</span> #{household.id}
            </p>
            <p>
              <span className="font-bold">จำนวนสมาชิกในครัวเรือน:</span> -
            </p>
            <p>
              <span className="font-bold">หัวหน้าครัวเรือน:</span> -
            </p>
            <p>
              <span className="font-bold">สถานะ:</span>{" "}
              <span className={class_name}>{status_text}</span>
            </p>
          </div>
        </Card>
      );
    });
  }

  return (
    <>
      <Header title="รายละเอียดสมาชิกภายในครัวเรือน">
        <div className="flex flex-row">
          <Button primary onClick={navigateAdd}>
            <IoIosAddCircle className="mr-2" />
            เพิ่มสมาชิก
          </Button>
          <Button secondary onClick={navigateBack}>
            <IoChevronBack className="mr-1" />
            กลับ
          </Button>
        </div>
      </Header>
      <Card className="mt-5 flex-col">{}</Card>
    </>
  );
};

export default MembersPage;
