import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import Swal from "sweetalert2";
import Button from "../components/Button";
import Header from "../components/Header";
import Card from "../components/Card";
import { useImportDisablesMutation } from "../store";
import Table from "../components/Table";

const Homepage = () => {
  const [file, setFile] = useState();
  const [preview, setPreview] = useState("");
  const [importDisables] = useImportDisablesMutation();

  const handleFileChange = (e) => {
    const { files } = e.target;
    if (files) {
      if (files.length === 0) return;

      setFile(files[0]);

      if (files[0].type !== "text/csv") return;

      let reader = new FileReader();
      reader.onload = (e) => {
        const file = e.target.result;
        const lines = file.split(/\r\n|\n/);
        let slicedlines = lines.slice(0, 11);
        slicedlines.join("\n");

        setPreview(slicedlines);
      };

      reader.onerror = (e) => alert(e.target.error.name);
      reader.readAsText(files[0]);
    }
  };

  const handleUploadClick = (e) => {
    e.preventDefault();
    if (!file) {
      Swal.fire("คำเตือน", "กรุณาเลือกไฟล์ที่ต้องการจะอัพโหลดก่อน", "warning");
      return;
    }

    if (file.type !== "text/csv") {
      Swal.fire("ผิดพลาด", "กรุณาอัพโหลดไฟล์ที่มีนามสกุล .csv", "error");
    }

    const formData = new FormData();
    formData.append("fileData", file);
    importDisables(formData);
  };

  let content = "กดเลือกไฟล์และนำเข้าข้อมูลเพื่อทำการแสดงตารางข้อมูล";
  if (file) {
    if (file.type !== "text/csv") {
      content = "ไม่สามารถแสดง preview ได้เนื่องจากนามสกุลไฟล์ผิด";
    } else {
      content = <Table data={preview} head="Preview" />;
    }
  }

  return (
    <>
      <Header title="โครงการสำรวจความพิการ">
        <form
          className="flex flex-row items-center"
          onSubmit={handleUploadClick}
          encType="multipart/form-data"
        >
          <input type="file" onChange={handleFileChange} />
          <Button primary>
            <IoIosAddCircle className="mr-2" />
            นำเข้าข้อมูล
          </Button>
        </form>
      </Header>
      <Card className="mt-5 flex-col">{content}</Card>
    </>
  );
};

export default Homepage;
