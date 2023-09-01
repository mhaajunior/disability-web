import { useState } from "react";
import Card from "../components/Card";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { useDeleteDisableMutation, useFetchDisablesQuery } from "../store";
import Button from "../components/Button";
import Swal from "sweetalert2";
import { RiDeleteBin6Line } from "react-icons/ri";
import Inconsist from "../components/Inconsist";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const ConsistencyPage = () => {
  const { data, error, isFetching } = useFetchDisablesQuery();
  const [deleteFile, { isLoading }] = useDeleteDisableMutation();
  const [searchParams] = useSearchParams();
  const fileId = searchParams.get("fi") || "";
  const fileName = searchParams.get("fn") || "";
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState({
    id: fileId,
    name: fileName,
  });

  const consistencyCheck = async (id) => {
    try {
      setLoading(true);
      await axios.get(
        `${process.env.REACT_APP_BACK_END_URL}/consistencies/validate`,
        {
          params: { id },
          withCredentials: true,
        }
      );
      setLoading(false);
    } catch (err) {
      Swal.fire("เกิดข้อผิดพลาด", "กรุณาลองใหม่อีกครั้งในภายหลัง", "error");
    }
  };

  const handleDelete = (id, name) => {
    Swal.fire({
      title: "คำเตือน!",
      text: `คุณแน่ใจหรือไม่ที่จะลบไฟล์ ${name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่ใช่",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFile(id);
        setSelectedFile({});
      }
    });
  };

  let content;
  if (isFetching) {
    content = <Loading type="partial" />;
  } else if (error) {
    content = <div className="text-red-600">เกิดข้อผิดพลาดในการแสดงข้อมูล</div>;
  } else if (data.data.files.length === 0) {
    content = <div>ไม่มีรายการไฟล์ที่จะแสดง</div>;
  } else {
    content = data.data.files.map((file) => {
      return (
        <div
          key={file._id}
          className={`box md:w-36 ellipsis mb-2 relative ${
            file._id === selectedFile.id ? "box-active" : ""
          }`}
          onClick={() => setSelectedFile({ id: file._id, name: file.name })}
        >
          {file.name}
        </div>
      );
    });
  }

  return (
    <>
      {(loading || isLoading) && <Loading type="full" />}
      <Header title="Consistency Check"></Header>
      <Card className="mt-5 flex-col">
        {selectedFile.id && (
          <div className="flex justify-between items-center">
            <p>ไฟล์ที่เลือก: {selectedFile.name}</p>
            <div className="flex">
              <Button
                primary
                onClick={() => {
                  consistencyCheck(selectedFile.id);
                }}
                className="mr-3 hidden"
                id="consistency"
              >
                Consistency Check
              </Button>
              <Button
                danger
                onClick={() => {
                  handleDelete(selectedFile.id, selectedFile.name);
                }}
              >
                <RiDeleteBin6Line />
              </Button>
            </div>
          </div>
        )}
        <div className="md:flex justify-evenly flex-wrap mt-5">{content}</div>
        {selectedFile.id && <Inconsist file={selectedFile} load={loading} />}
      </Card>
    </>
  );
};

export default ConsistencyPage;
