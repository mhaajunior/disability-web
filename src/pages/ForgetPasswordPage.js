import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/inputGroup/Input";
import { useChangePasswordMutation } from "../store";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";

const ForgetPassword = () => {
  const [fields, setFields] = useState({
    email: "",
    password: "",
    conf_password: "",
  });
  const [error, setError] = useState(null);
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fields.email || !fields.password || !fields.conf_password) {
      setError("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }

    if (fields.password !== fields.conf_password) {
      setError("รหัสผ่านที่กรอกไม่ตรงกัน");
      return;
    }

    try {
      await changePassword({
        email: fields.email,
        password: fields.password,
      }).unwrap();
      navigate("/");
    } catch (err) {
      setError(err?.data?.message || err.error);
    }
  };

  return (
    <>
      {isLoading && <Loading type="full" />}
      <div className="page">
        <Card className="center bg-white login !block relative rounded-2xl">
          <div className="absolute right-5 top-5 text-gray-400 z-10">
            <span
              className="flex cursor-pointer hover:text-black items-center"
              onClick={() => navigate("/login")}
            >
              <BsChevronLeft className="mr-1" />
              เข้าสู่ระบบ
            </span>
          </div>
          <div className="center">
            <form onSubmit={handleSubmit}>
              <h1 className="text-2xl text-center font-black mb-3">
                เปลี่ยนรหัสผ่าน
              </h1>
              <Input
                label="Email"
                type="email"
                name="email"
                className="w-72 my-3"
                value={fields.email}
                setterFn={(name, value) =>
                  setFields({ ...fields, [name]: value })
                }
              />
              <Input
                label="Password"
                type="password"
                name="password"
                className="w-72 my-3"
                value={fields.password}
                setterFn={(name, value) =>
                  setFields({ ...fields, [name]: value })
                }
              />
              <Input
                label="Confirm Password"
                type="password"
                name="conf_password"
                className="w-72 my-3"
                value={fields.conf_password}
                setterFn={(name, value) =>
                  setFields({ ...fields, [name]: value })
                }
              />
              {error && <p className="text-red-500">{error}</p>}
              <Button primary className="mx-auto mt-5 w-72 justify-center">
                change password
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ForgetPassword;
