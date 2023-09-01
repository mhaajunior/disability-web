import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const disablesApi = createApi({
  reducerPath: "disables",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACK_END_URL,
    prepareHeaders(headers) {
      return headers;
    },
    credentials: "include",
  }),
  endpoints(builder) {
    return {
      importDisable: builder.mutation({
        invalidatesTags: (result) => {
          return [{ type: "UsersDisables", user_id: result.user_id }];
        },
        query: (formData) => {
          return {
            url: "/disables",
            method: "POST",
            body: formData,
          };
        },
      }),
      fetchDisables: builder.query({
        providesTags: (result) => {
          if (result) {
            const tags = result.data.files.map((file) => {
              return { type: "Disable", file_id: file._id };
            });
            tags.push({ type: "UsersDisables", user_id: result.data.user_id });
            return tags;
          }
          return [];
        },
        query: () => {
          return {
            url: "/disables",
            method: "GET",
          };
        },
      }),
      deleteDisable: builder.mutation({
        invalidatesTags: (result, error, id) => {
          return [{ type: "Disable", file_id: id }];
        },
        query: (id) => {
          return {
            url: `/disables/${id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const {
  useImportDisableMutation,
  useFetchDisablesQuery,
  useDeleteDisableMutation,
} = disablesApi;
export { disablesApi };
