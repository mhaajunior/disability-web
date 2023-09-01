import { createSlice } from "@reduxjs/toolkit";
import toastr from "../../helpers/toastr.config";
import Swal from "sweetalert2";
import { usersApi } from "../apis/usersApi";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  reducers: {
    setCredentials(state, action) {
      state.userInfo = action.payload;
      const expDate = new Date().setDate(new Date().getDate() + 3);
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ ...action.payload, expDate })
      );
    },
    logout(state) {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(usersApi.endpoints.signup.matchFulfilled, () => {
      toastr["success"]("ทำการลงทะเบียนเรียบร้อย");
    });
    builder.addMatcher(usersApi.endpoints.changePassword.matchFulfilled, () => {
      toastr["success"]("เปลี่ยนรหัสผ่านสำเร็จ");
    });
    builder.addMatcher(usersApi.endpoints.logout.matchFulfilled, () => {
      toastr["success"]("ออกจากระบบสำเร็จ");
    });
    builder.addMatcher(usersApi.endpoints.logout.matchRejected, () => {
      Swal.fire("เกิดข้อผิดพลาด", "กรุณาลองใหม่อีกครั้งในภายหลัง", "error");
    });
  },
});

export const { setCredentials, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
