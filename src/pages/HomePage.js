import { useLocation, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ImportDataPage from "./ImportDataPage";
import { FaFileUpload, FaClipboardCheck, FaSignOutAlt } from "react-icons/fa";
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
    {
      id: 3,
      title: "Sign Out",
      icon: <FaSignOutAlt />,
      route: ["/signout"],
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
    <>
      <Sidebar title="โครงการสำรวจความพิการ" menus={menus}>
        {renderedComponent()}
      </Sidebar>
    </>
  );
};

export default Homepage;
