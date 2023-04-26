import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const disablesApi = createApi({
  reducerPath: "disables",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACK_END_URL,
  }),
  endpoints(builder) {
    return {
      importDisable: builder.mutation({
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
      fetchDisables: builder.query({
        providesTags: (result) => {
          if (result) {
            const tags = result.data.map((file) => {
              return { type: "Disable", id: file._id };
            });
            tags.push({ type: "UsersDisables" });
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
          return [{ type: "Disable", id }];
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
