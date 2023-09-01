import { createSlice } from "@reduxjs/toolkit";
import { disablesApi } from "../apis/disablesApi";
import { membersApi } from "../apis/membersApi";
import toastr from "../../helpers/toastr.config";
import Swal from "sweetalert2";

const memberSlice = createSlice({
  name: "memberForm",
  initialState: {
    data: {},
  },
  reducers: {
    changeMember(state, action) {
      const { name, value, step } = action.payload;
      if (step === "misc") {
        state.data[name] = value;
      } else {
        state.data[step][name] = value;
      }
    },
    updateAllMemberData(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      disablesApi.endpoints.importDisable.matchFulfilled,
      () => {
        toastr["success"]("ทำการนำเข้าข้อมูลสำเร็จ");
      }
    );
    builder.addMatcher(
      disablesApi.endpoints.importDisable.matchRejected,
      () => {
        Swal.fire("เกิดข้อผิดพลาด", "กรุณาลองใหม่อีกครั้งในภายหลัง", "error");
      }
    );
    builder.addMatcher(
      disablesApi.endpoints.deleteDisable.matchFulfilled,
      () => {
        toastr["success"]("ทำการลบข้อมูลสำเร็จ");
      }
    );
    builder.addMatcher(
      disablesApi.endpoints.deleteDisable.matchRejected,
      () => {
        Swal.fire("เกิดข้อผิดพลาด", "กรุณาลองใหม่อีกครั้งในภายหลัง", "error");
      }
    );
    builder.addMatcher(membersApi.endpoints.editMember.matchFulfilled, () => {
      toastr["success"]("ทำการแก้ไขและตรวจสอบข้อมูลสำเร็จ");
    });
    builder.addMatcher(membersApi.endpoints.editMember.matchRejected, () => {
      Swal.fire("เกิดข้อผิดพลาด", "กรุณาลองใหม่อีกครั้งในภายหลัง", "error");
    });
  },
});

export const { changeMember, updateAllMemberData } = memberSlice.actions;
export const memberReducer = memberSlice.reducer;
