import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import Swal from "sweetalert2";
import { useImportDisableMutation } from "../store";
import Button from "../components/Button";
import Header from "../components/Header";
import Card from "../components/Card";
import Table from "../components/Table";
import Loading from "../components/Loading";

const ImportDataPage = () => {
  const [file, setFile] = useState();
  const [preview, setPreview] = useState("");
  const [rows, setRows] = useState(0);
  const [active, setActive] = useState(1);
  const [importDisables, { isLoading }] = useImportDisableMutation();

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
        let slicedlines;
        if (lines.length < 11) {
          slicedlines = lines.slice(0, lines.length);
        } else {
          slicedlines = lines.slice(0, 11);
        }
        slicedlines.join("\n");

        setRows(lines.length);
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
      return;
    }

    Swal.fire({
      title: "คุณแน่ใจหรือไม่ที่นำเข้าไฟล์นี้",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่ใช่",
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append("fileData", file);
        importDisables(formData);
      }
    });
  };

  const isNull = (data) => {
    const content = JSON.parse(data);
    if (content && content !== " ") {
      return content;
    } else {
      return "-";
    }
  };

  let content = "ยังไม่ได้เลือกไฟล์ กรุณากดเลือกไฟล์เพื่อแสดง preview";
  if (file) {
    if (file.type !== "text/csv") {
      content = "ไม่สามารถแสดง preview ได้เนื่องจากนามสกุลไฟล์ผิด";
    } else {
      let titleArr = [];
      let contentArr = [];
      for (let i = 0; i < preview.length; i++) {
        if (i === 0) {
          titleArr = preview[i].split(",");
        } else {
          contentArr.push(preview[i].split(","));
        }
      }
      content = (
        <Table
          titles={titleArr}
          contents={contentArr}
          totalRows={rows}
          head="Preview"
          checkFn={(content) => isNull(content)}
        />
      );
    }
  }

  return (
    <>
      {isLoading && <Loading type="full" />}
      <Header title="Import Data"></Header>
      <Card className="mt-5 flex-col">
        <div className="md:flex justify-evenly">
          <div
            className={`box ${active === 1 ? "box-active" : ""}`}
            style={{ width: "30%" }}
            onClick={() => setActive(1)}
          >
            นำเข้าจากไฟล์
          </div>
          <div
            className={`box ${active === 2 ? "box-active" : ""}`}
            style={{ width: "30%" }}
            onClick={() => setActive(2)}
          >
            นำเข้าจากฐานข้อมูลอื่น
          </div>
        </div>

        {active === 1 && (
          <>
            <form
              className="lg:w-4/6 mx-auto my-5 lg:flex flex-row items-center justify-between"
              onSubmit={handleUploadClick}
              encType="multipart/form-data"
            >
              <input type="file" onChange={handleFileChange} />
              <Button primary className="mb-3">
                <IoIosAddCircle className="mr-2" />
                นำเข้าข้อมูล
              </Button>
            </form>
            <span className="text-center">{content}</span>
          </>
        )}
      </Card>
    </>
  );
};

export default ImportDataPage;
