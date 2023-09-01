import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { disablesApi } from "./apis/disablesApi";
import { membersApi } from "./apis/membersApi";
import { usersApi } from "./apis/usersApi";
import {
  memberReducer,
  changeMember,
  updateAllMemberData,
} from "./slices/memberSlice";
import { authReducer, setCredentials, logout } from "./slices/authSlice";

const store = configureStore({
  reducer: {
    memberForm: memberReducer,
    auth: authReducer,
    [disablesApi.reducerPath]: disablesApi.reducer,
    [membersApi.reducerPath]: membersApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(disablesApi.middleware)
      .concat(membersApi.middleware)
      .concat(usersApi.middleware);
  },
});

setupListeners(store.dispatch);

export { store, changeMember, updateAllMemberData, setCredentials, logout };
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
export {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useChangePasswordMutation,
} from "./apis/usersApi";
