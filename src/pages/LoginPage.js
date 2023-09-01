import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/inputGroup/Input";
import { setCredentials, useLoginMutation } from "../store";
import Loading from "../components/Loading";
import Logo from "../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";

const LoginPage = () => {
  const [fields, setFields] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fields.email || !fields.password) {
      setError("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }

    try {
      const res = await login(fields).unwrap();
      dispatch(setCredentials(res.data));
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
          <div className="logo">
            <img alt="logo" src={Logo} width="200" heght="100" />
          </div>
          <div className="center">
            <form onSubmit={handleSubmit}>
              <h1 className="text-2xl text-center txt-primary font-black mb-3">
                โครงการสำรวจความพิการ
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
              <p className="text-right text-gray-400 text-sm">
                <span
                  className="cursor-pointer hover:text-black"
                  onClick={() => navigate("/forget_password")}
                >
                  ลืมรหัสผ่าน?
                </span>
              </p>
              {error && <p className="text-red-500">{error}</p>}
              <Button primary className="mx-auto mt-5 w-72 justify-center">
                log in
              </Button>
            </form>
            <p className="text-center px-8 text-gray-400">
              <span
                className="cursor-pointer hover:text-black"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </span>
            </p>
          </div>
        </Card>
      </div>
    </>
  );
};

export default LoginPage;
