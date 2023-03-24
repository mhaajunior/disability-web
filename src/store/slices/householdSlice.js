import { createSlice } from "@reduxjs/toolkit";

const householdSlice = createSlice({
  name: "householdForm",
  initialState: {
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
    yr: (new Date().getFullYear() + 543).toString().slice(-2),
    hh_no: "",
    list_gr: "",
    enum_gr: "",
    members: "",
    listing: "",
    mem_dis: "",
    enum: "",
  },
  reducers: {
    changeHousehold(state, action) {
      const { name, value } = action.payload;
      state[name] = value;
    },
  },
});

export const { changeHousehold } = householdSlice.actions;
export const householdReducer = householdSlice.reducer;
