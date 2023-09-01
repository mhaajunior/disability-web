import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "./store";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PageNotFound from "./pages/PageNotFound";
import SignupPage from "./pages/SignupPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  const dispatch = useDispatch();

  const pageRotes = [
    "/",
    "/consistency",
    "/consistency/members",
    "/consistency/members/:id",
  ];

  const checkExpiredUser = () => {
    const user_info = localStorage.getItem("userInfo");

    if (user_info && new Date().getTime() > JSON.parse(user_info).expDate) {
      dispatch(logout());
    }
  };

  return (
    <>
      {checkExpiredUser()}
      <Routes>
        <Route path="" element={<PrivateRoute />}>
          {pageRotes.map((page) => (
            <Route key={page} path={page} element={<HomePage />} />
          ))}
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forget_password" element={<ForgetPasswordPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
