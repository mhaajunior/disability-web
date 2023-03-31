import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { householdsApi } from "./apis/householdsApi";
import { provincesApi } from "./apis/provincesApi";
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
} from "./slices/memberSlice";

const store = configureStore({
  reducer: {
    householdForm: householdReducer,
    memberForm: memberReducer,
    [provincesApi.reducerPath]: provincesApi.reducer,
    [householdsApi.reducerPath]: householdsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(provincesApi.middleware)
      .concat(householdsApi.middleware);
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
};
export { useGetProvinceQuery } from "./apis/provincesApi";
export {
  useFetchHouseholdsQuery,
  useAddHouseholdMutation,
  useEditHouseholdMutation,
  useDeleteHouseholdMutation,
} from "./apis/householdsApi";
