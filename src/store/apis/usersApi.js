import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACK_END_URL,
    prepareHeaders(headers) {
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      login: builder.mutation({
        query: (data) => {
          return {
            url: "/users/auth",
            method: "POST",
            body: data,
            credentials: "include",
          };
        },
      }),
      signup: builder.mutation({
        query: (data) => {
          return {
            url: "/users",
            method: "POST",
            body: data,
          };
        },
      }),
      logout: builder.mutation({
        query: () => {
          return {
            url: "/users/logout",
            method: "POST",
            credentials: "include",
          };
        },
      }),
      changePassword: builder.mutation({
        query: (data) => {
          return {
            url: "/users/change_password",
            method: "PUT",
            body: data,
          };
        },
      }),
    };
  },
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useChangePasswordMutation,
} = usersApi;
export { usersApi };
