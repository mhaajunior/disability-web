import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const disablesApi = createApi({
  reducerPath: "disables",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACK_END_URL,
  }),
  endpoints(builder) {
    return {
      importDisables: builder.mutation({
        invalidatesTags: () => {
          return [{ type: "UsersDisables" }];
        },
        query: (formData) => {
          return {
            url: "/disables",
            method: "POST",
            body: formData,
          };
        },
      }),
    };
  },
});

export const { useImportDisablesMutation } = disablesApi;
export { disablesApi };
