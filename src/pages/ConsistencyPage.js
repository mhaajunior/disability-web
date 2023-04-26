import { useState } from "react";
import Card from "../components/Card";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { useDeleteDisableMutation, useFetchDisablesQuery } from "../store";
import Button from "../components/Button";
import Swal from "sweetalert2";
import axios from "axios";
import Table from "../components/Table";

const ConsistencyPage = () => {
  const { data, error, isFetching } = useFetchDisablesQuery();
  const [deleteFile, { isLoading }] = useDeleteDisableMutation();
  const [selectedFile, setSelectedFile] = useState({ id: "", name: "" });
  const [loading, setLoading] = useState(false);
  const [consistData, setConsistData] = useState(null);

  const consistencyCheck = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACK_END_URL}/consistencies`,
        {
          params: { id },
        }
      );
      setLoading(false);
      setConsistData(data);
    } catch (err) {
      setLoading(false);
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
  } else if (data.data.length === 0) {
    content = <div>ไม่มีรายการไฟล์ที่จะแสดง</div>;
  } else {
    content = data.data.map((file) => {
      return (
        <div
          key={file._id}
          className={`box w-36 ellipsis mb-2 relative ${
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
          <div className="md:flex justify-between items-center">
            <p>ไฟล์ที่เลือก: {selectedFile.name}</p>
            <div className="flex">
              <Button
                danger
                onClick={() => {
                  handleDelete(selectedFile.id, selectedFile.name);
                }}
                className="mr-3"
              >
                ลบไฟล์
              </Button>
              <Button
                primary
                onClick={() => {
                  consistencyCheck(selectedFile.id);
                }}
              >
                Consistency Check
              </Button>
            </div>
          </div>
        )}
        <div className="md:flex justify-evenly flex-wrap mt-5">{content}</div>
        {consistData && <Table />}
      </Card>
    </>
  );
};

export default ConsistencyPage;
