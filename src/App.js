import { Route, Routes } from "react-router-dom";
import HouseholdPage from "./pages/HouseholdPage";
import AddHousehold from "./pages/AddHousehold";

const App = () => {
  return (
    <div className="text-gray-500 m-5 lg:w-9/12 sm:w-5/6 w-11/12 h-full mx-auto ">
      <Routes>
        <Route path="/addHousehold" element={<AddHousehold />} />
        <Route path="/" element={<HouseholdPage />} />
      </Routes>
    </div>
  );
};

export default App;
