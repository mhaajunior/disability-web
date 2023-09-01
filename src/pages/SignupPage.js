import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";
import Button from "../components/Button";
import Card from "../components/Card";
import { useSignupMutation } from "../store";
import Loading from "../components/Loading";
import InputGroup from "../components/inputGroup/InputGroup";
import Disable from "../assets/images/disable.png";
import { useSelector } from "react-redux";

const SignupPage = () => {
  const [fields, setFields] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [errorCode, setErrorCode] = useState(null);
  const [firstSubmit, setfirstSubmit] = useState(false);
  const [signup, { isLoading, isSuccess }] = useSignupMutation();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  useEffect(() => {
    isSuccess && navigate("/login");
  }, [navigate, isSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setfirstSubmit(true);

    if (!fields.email || !fields.password) {
      setError("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }

    try {
      await signup(fields).unwrap();
      navigate("/login");
    } catch (err) {
      setError(err?.data?.message || err.error);
      setErrorCode(err?.data?.code || 0);
    }
  };

  const validateInput = (name) => {
    if (!firstSubmit) return true;

    if (!fields[name]) {
      return false;
    }

    if (name === "email" && [0, 1003, 1004, 1005, 1008].includes(errorCode)) {
      return false;
    }

    if (name === "password" && [0, 1004, 1006, 1008].includes(errorCode)) {
      return false;
    }

    return true;
  };

  return (
    <>
      {isLoading && <Loading type="full" />}
      <div className="page">
        <div className="flex center signup">
          <Card className="bg-white img !rounded-l-2xl !rounded-r-none p-0">
            <img
              alt="wheelchair"
              src={Disable}
              className="object-fit !rounded-l-2xl"
            />
          </Card>
          <Card className="bg-white form !block relative !rounded-r-2xl !rounded-l-none">
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
                  ลงทะเบียนเข้าใช้งาน
                </h1>
                <InputGroup
                  label="Email"
                  group="input"
                  type="email"
                  name="email"
                  className="w-72"
                  value={fields.email}
                  isValid={validateInput("email")}
                  setterFn={(name, value) =>
                    setFields({ ...fields, [name]: value })
                  }
                />
                <InputGroup
                  label="Password"
                  group="input"
                  type="password"
                  name="password"
                  className="w-72"
                  value={fields.password}
                  isValid={validateInput("password")}
                  setterFn={(name, value) =>
                    setFields({ ...fields, [name]: value })
                  }
                />
                {error && <p className="text-red-500 py-1 px-8">{error}</p>}
                <div className="text-gray-400 text-sm px-8 py-1">
                  <p>การตั้งรหัสผ่านให้เป็นไปตามเงื่อนไขดังต่อไปนี้ :</p>
                  <p>- มีความยาวไม่น้อยกว่า 8 ตัวอักษร</p>
                  <p>- ประกอบด้วยตัวอักษรพิมพ์ใหญ่และพิมพ์เล็ก</p>
                  <p>- ประกอบด้วยตัวเลข</p>
                  <p>- ประกอบด้วยอักขระพิเศษ</p>
                </div>
                <Button primary className="mx-auto mt-5 w-72 justify-center">
                  sign up
                </Button>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
