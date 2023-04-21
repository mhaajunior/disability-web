import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { disablesApi } from "./apis/disablesApi";
import {
  householdReducer,
  changeHousehold,
  clearHouseholdData,
  updateAllHouseholdData,
} from "./slices/householdSlice";
import {
  memberReducer,
  changeMember,
  clearStepMemberData,
  clearAllMemberData,
} from "./slices/memberSlice";

const store = configureStore({
  reducer: {
    householdForm: householdReducer,
    memberForm: memberReducer,
    [disablesApi.reducerPath]: disablesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(disablesApi.middleware);
  },
});

setupListeners(store.dispatch);

export {
  store,
  changeHousehold,
  clearHouseholdData,
  updateAllHouseholdData,
  changeMember,
  clearStepMemberData,
  clearAllMemberData,
};
export { useImportDisablesMutation } from "./apis/disablesApi";
