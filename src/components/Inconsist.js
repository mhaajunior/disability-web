import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import Loading from "./Loading";
import Table from "./Table";
import { isNull } from "../helpers/common";
import Button from "./Button";

const Inconsist = ({ file: { id, name }, load }) => {
  const [inconsist, setInconsist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const navigate = useNavigate();
  const perPage = 10;

  useEffect(() => {
    try {
      const fetchInconsist = async () => {
        setLoading(true);
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACK_END_URL}/consistencies`,
          {
            params: { id, pageNo, perPage },
            withCredentials: true,
          }
        );
        setInconsist(data);
        setLoading(false);
      };

      fetchInconsist();
    } catch (err) {
      Swal.fire("เกิดข้อผิดพลาด", "กรุณาลองใหม่อีกครั้งในภายหลัง", "error");
    }
  }, [id, load, pageNo]);

  let content;
  if (!inconsist || loading) {
    content = <Loading type="partial" />;
    $("#consistency").hide();
  } else if (inconsist.data.result.length === 0) {
    content = <div>ไม่มีรายการไฟล์ที่จะแสดง</div>;
    $("#consistency").hide();
  } else {
    if (inconsist.data === "pending") {
      content = <div>ยังไม่ได้ทำการตรวจสอบความถูกต้องของข้อมูล</div>;
      $("#consistency").show();
    } else if (inconsist.data === "success") {
      content = (
        <div>
          <span>ไม่พบความผิดพลาดของข้อมูล</span>
          <Button secondary className="mx-auto mt-5">
            Export Data
          </Button>
        </div>
      );
      $("#consistency").hide();
    } else {
      const titleArr = ["iden", "mem err", "total err", "last edit", "edit"];
      const contentArr = [];
      for (const row of inconsist.data.result) {
        contentArr.push([
          row._id,
          row.totalMemErrors,
          row.overallErrors,
          row.editDatetime,
          <Button
            warning
            onClick={() =>
              navigate(
                `/consistency/members?fi=${id}&fn=${name}&iden=${row._id}`
              )
            }
          >
            แก้ไข
          </Button>,
        ]);
      }
      content = (
        <Table
          titles={titleArr}
          contents={contentArr}
          pageNo={pageNo}
          perPage={perPage}
          totalRows={inconsist.data.count}
          head="ครัวเรือนที่ตรวจพบความผิดพลาด"
          checkFn={(content) => isNull(content, false)}
          pagination
          onChangePage={(page) => setPageNo(page)}
        />
      );
      $("#consistency").hide();
    }
  }

  return <div className="mt-7 text-center">{content}</div>;
};

export default Inconsist;
