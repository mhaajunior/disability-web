import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ImportDataPage from "./ImportDataPage";
import { FaFileUpload, FaClipboardCheck, FaSignOutAlt } from "react-icons/fa";
import ConsistencyPage from "./ConsistencyPage";

const Homepage = () => {
  const location = useLocation();
  const menus = [
    {
      id: 1,
      title: "Import Data",
      icon: <FaFileUpload />,
      route: "/",
    },
    {
      id: 2,
      title: "Consistency Check",
      icon: <FaClipboardCheck />,
      route: "/consistency",
    },
    {
      id: 3,
      title: "Sign Out",
      icon: <FaSignOutAlt />,
      route: "/signout",
    },
  ];

  const renderedComponent = () => {
    switch (location.pathname) {
      case "/":
        return <ImportDataPage />;
      case "/consistency":
        return <ConsistencyPage />;
      default:
        return;
    }
  };

  return (
    <>
      <Sidebar title="โครงการสำรวจความพิการ" menus={menus}>
        {renderedComponent()}
      </Sidebar>
    </>
  );
};

export default Homepage;
