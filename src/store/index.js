import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { provincesApi } from "./apis/provincesApi";
import { householdReducer, changeHousehold } from "./slices/householdSlice";
import { memberReducer } from "./slices/memberSlice";

const store = configureStore({
  reducer: {
    householdForm: householdReducer,
    member: memberReducer,
    [provincesApi.reducerPath]: provincesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(provincesApi.middleware);
  },
});

setupListeners(store.dispatch);

export { store, changeHousehold };
export { useGetProvinceQuery } from "./apis/provincesApi";
