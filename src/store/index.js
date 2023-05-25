import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { disablesApi } from "./apis/disablesApi";
import { membersApi } from "./apis/membersApi";
import {
  memberReducer,
  changeMember,
  updateAllMemberData,
} from "./slices/memberSlice";

const store = configureStore({
  reducer: {
    memberForm: memberReducer,
    [disablesApi.reducerPath]: disablesApi.reducer,
    [membersApi.reducerPath]: membersApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(disablesApi.middleware)
      .concat(membersApi.middleware);
  },
});

setupListeners(store.dispatch);

export { store, changeMember, updateAllMemberData };
export {
  useImportDisableMutation,
  useFetchDisablesQuery,
  useDeleteDisableMutation,
} from "./apis/disablesApi";
export {
  useFetchMembersQuery,
  useFetchMemberByIdQuery,
  useEditMemberMutation,
} from "./apis/membersApi";
