import { createSlice } from "@reduxjs/toolkit";
import { householdsApi } from "../apis/householdsApi";
import toastr from "../../helpers/toastr.config";
import Swal from "sweetalert2";

const householdSlice = createSlice({
  name: "householdForm",
  initialState: {
    data: {
      reg: "",
      cwt: "",
      amp: "",
      tmb: "",
      area: "",
      ea: "",
      vil: "",
      psu_no: "",
      ea_set: "",
      month: "",
      yr: "",
      hh_no: "",
      list_gr: "",
      enum_gr: "",
      members: "",
      listing: "",
      mem_dis: "",
      enum: "",
    },
    status: "warning",
  },
  reducers: {
    changeHousehold(state, action) {
      const { name, value } = action.payload;
      state.data[name] = value;
      if (name === "reg") {
        state.data["cwt"] = "";
        state.data["amp"] = "";
        state.data["tmb"] = "";
      } else if (name === "cwt") {
        state.data["amp"] = "";
        state.data["tmb"] = "";
      } else if (name === "amp") {
        state.data["tmb"] = "";
      }
    },
    clearHouseholdData(state) {
      Object.keys(state.data).forEach((index) => (state.data[index] = ""));
    },
    updateAllHouseholdData(state, action) {
      Object.keys(state.data).forEach(
        (index) => (state.data[index] = action.payload[index])
      );
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      householdsApi.endpoints.addHousehold.matchFulfilled,
      (state) => {
        toastr["success"]("ทำการเพิ่มครัวเรือนสำเร็จ");
        Object.keys(state.data).forEach((index) => (state.data[index] = ""));
      }
    );
    builder.addMatcher(
      householdsApi.endpoints.addHousehold.matchRejected,
      () => {
        Swal.fire("เกิดข้อผิดพลาด", "กรุณาลองใหม่อีกครั้งในภายหลัง", "error");
      }
    );
    builder.addMatcher(
      householdsApi.endpoints.editHousehold.matchFulfilled,
      (state) => {
        toastr["success"]("ทำการแก้ไขครัวเรือนสำเร็จ");
        Object.keys(state.data).forEach((index) => (state.data[index] = ""));
      }
    );
    builder.addMatcher(
      householdsApi.endpoints.deleteHousehold.matchFulfilled,
      () => {
        toastr["success"]("ทำการลบครัวเรือนสำเร็จ");
      }
    );
  },
});

export const { changeHousehold, clearHouseholdData, updateAllHouseholdData } =
  householdSlice.actions;
export const householdReducer = householdSlice.reducer;
