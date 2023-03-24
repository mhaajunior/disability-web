import { IoIosAddCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import Header from "../components/Header";

const HouseholdPage = () => {
  const navigate = useNavigate();

  const navigateAdd = () => {
    navigate("/addHousehold");
  };

  return (
    <>
      <Header title="รายละเอียดครัวเรือน">
        <Button primary onClick={navigateAdd}>
          <IoIosAddCircle className="mr-2" />
          เพิ่มครัวเรือน
        </Button>
      </Header>
      <Card className="mt-5">
        <Card primary hoverable="true">
          fsfesfsefsefsef
        </Card>
      </Card>
    </>
  );
};

export default HouseholdPage;
