import { createSlice } from "@reduxjs/toolkit";

const memberSlice = createSlice({
  name: "memberForm",
  initialState: {
    data: {
      step1: {
        f1: "",
        f2: "",
        f3_1: "",
        f3_2: "",
        f4: "",
        f5: "",
        f6: "",
        f7: "",
        f8: "",
        f9: "",
      },
    },
    household_id: 0,
    status: "warning",
  },
  reducers: {
    changeMember(state, action) {
      const { name, value, step } = action.payload;
      state.data[step][name] = value;
    },
    clearStepMemberData(state, action) {
      const step = action.payload;
      Object.keys(state.data[step]).forEach(
        (index) => (state.data[step][index] = "")
      );
    },
  },
});

export const { changeMember, clearStepMemberData } = memberSlice.actions;
export const memberReducer = memberSlice.reducer;
