import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center p-10 txt-primary">
      <h1 className="text-9xl font-extrabold pb-5">404</h1>
      <p className="text-3xl">Page not found</p>
      <p className="p-1">
        The page you are looking for doesn't exist or an other error ocurred.
      </p>
      <br></br>
      <br></br>
      <Button className="m-auto p-5" primary onClick={() => navigate("/")}>
        กลับไปหน้าหลัก
      </Button>
    </div>
  );
};

export default PageNotFound;
