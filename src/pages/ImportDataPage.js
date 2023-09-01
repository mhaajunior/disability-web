import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import Swal from "sweetalert2";
import { useImportDisableMutation } from "../store";
import Button from "../components/Button";
import Header from "../components/Header";
import Card from "../components/Card";
import Table from "../components/Table";
import Loading from "../components/Loading";
import { isNull } from "../helpers/common";

const ImportDataPage = () => {
  const [file, setFile] = useState();
  const [preview, setPreview] = useState("");
  const [rows, setRows] = useState(0);
  const [active, setActive] = useState(1);
  const [load, setLoad] = useState(false);
  const [importDisables, { isLoading }] = useImportDisableMutation();

  const handleFileChange = (e) => {
    setLoad(true);
    const { files } = e.target;
    if (files) {
      if (files.length === 0) return;

      setFile(files[0]);

      if (files[0].type !== "text/csv") {
        setLoad(false);
        setFile();
        Swal.fire("ผิดพลาด", "ไฟล์ที่นำเข้ามีนามสกุลไฟล์ผิด", "error");
        return;
      }

      let reader = new FileReader();
      reader.onload = (e) => {
        const file = e.target.result;
        const lines = file.split(/\r\n|\n/);

        if (lines[0].split(",").length !== 201) {
          setLoad(false);
          setFile();
          Swal.fire("ผิดพลาด", "ไฟล์ที่นำเข้ามีรูปแบบไม่ถูกต้อง", "error");
          return;
        }

        let slicedlines;
        if (lines.length < 11) {
          slicedlines = lines.slice(0, lines.length);
        } else {
          slicedlines = lines.slice(0, 11);
        }
        slicedlines.join("\n");

        setRows(lines.length);
        setPreview(slicedlines);
        setLoad(false);
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
        setFile("");
      }
    });
  };

  let content = "ยังไม่ได้เลือกไฟล์ กรุณากดเลือกไฟล์เพื่อแสดง preview";
  if (file) {
    let titleArr = [];
    let contentArr = [];
    for (let i = 0; i < preview.length; i++) {
      if (i === 0) {
        titleArr = preview[i].split(",");
      } else {
        contentArr.push(preview[i].split(","));
      }
    }
    if (load) {
      content = <Loading type="partial" />;
    } else {
      content = (
        <Table
          titles={titleArr}
          contents={contentArr}
          totalRows={rows - 1}
          head="Preview"
          checkFn={(content) => isNull(content, true)}
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
            onClick={() => setActive(1)}
          >
            นำเข้าจากไฟล์
          </div>
          <div
            className={`box ${active === 2 ? "box-active" : ""}`}
            onClick={() => setActive(2)}
          >
            นำเข้าจากฐานข้อมูลอื่น
          </div>
        </div>

        {active === 1 && (
          <>
            <form
              className="lg:w-4/6 mx-auto my-5 lg:flex flex-row items-center justify-between"
              encType="multipart/form-data"
              onSubmit={handleUploadClick}
            >
              <input
                type="file"
                className="hidden"
                id="files"
                onChange={handleFileChange}
              />
              <div className="flex items-center">
                <label htmlFor="files">
                  <div className="box !w-32">เลือกไฟล์</div>
                </label>
                <span className="ml-3">
                  {file ? file.name : "ยังไม่มีไฟล์ที่เลือก"}
                </span>
              </div>

              <Button
                loading={load}
                disabled={load}
                primary
                className="mb-3 mx-auto md:mx-0"
              >
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
