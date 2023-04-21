import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const householdsApi = createApi({
  reducerPath: "households",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACK_END_URL,
  }),
  endpoints(builder) {
    return {
      fetchHouseholds: builder.query({
        providesTags: (result) => {
          if (result) {
            const tags = result.households.map((household) => {
              return { type: "Household", id: household._id };
            });
            tags.push({ type: "UsersHouseHolds" });
            return tags;
          }
          return [];
        },
        query: (id) => {
          return {
            url: "/households",
            method: "GET",
            params: {
              id,
            },
          };
        },
      }),
      addHousehold: builder.mutation({
        invalidatesTags: () => {
          return [{ type: "UsersHouseHolds" }];
        },
        query: (obj) => {
          return {
            url: "/households",
            method: "POST",
            body: {
              data: obj.data,
              status: obj.status,
            },
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          };
        },
      }),
      editHousehold: builder.mutation({
        invalidatesTags: (result, error, obj) => {
          return [{ type: "Household", id: obj.id }];
        },
        query: (obj) => {
          return {
            url: `/households/${obj.id}`,
            method: "PATCH",
            body: obj.data,
          };
        },
      }),
      deleteHousehold: builder.mutation({
        invalidatesTags: (result, error, id) => {
          return [{ type: "Household", id }];
        },
        query: (id) => {
          return {
            url: `/households/${id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const {
  useFetchHouseholdsQuery,
  useAddHouseholdMutation,
  useEditHouseholdMutation,
  useDeleteHouseholdMutation,
} = householdsApi;
export { householdsApi };
