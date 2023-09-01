import { useLocation, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ImportDataPage from "./ImportDataPage";
import { FaFileUpload, FaClipboardCheck } from "react-icons/fa";
import ConsistencyPage from "./ConsistencyPage";
import MembersPage from "./MembersPage";
import EditMemberPage from "./EditMemberPage";

const Homepage = () => {
  const location = useLocation();
  let { id } = useParams();

  const menus = [
    {
      id: 1,
      title: "Import Data",
      icon: <FaFileUpload />,
      route: ["/"],
    },
    {
      id: 2,
      title: "Consistency Check",
      icon: <FaClipboardCheck />,
      route: [
        "/consistency",
        "/consistency/members",
        `/consistency/members/${id}`,
      ],
    },
  ];

  const renderedComponent = () => {
    switch (location.pathname) {
      case "/":
        return <ImportDataPage />;
      case "/consistency":
        return <ConsistencyPage />;
      case "/consistency/members":
        return <MembersPage />;
      case `/consistency/members/${id}`:
        return <EditMemberPage />;
      default:
        return;
    }
  };

  return (
    <div className="text-gray-500 m-5 lg:w-9/12 sm:w-5/6 w-11/12 h-full mx-auto ">
      <Sidebar title="โครงการสำรวจความพิการ" menus={menus}>
        {renderedComponent()}
      </Sidebar>
    </div>
  );
};

export default Homepage;
