import { nanoid } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const householdsApi = createApi({
  reducerPath: "households",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
  }),
  endpoints(builder) {
    return {
      fetchHouseholds: builder.query({
        providesTags: (result) => {
          if (result) {
            const tags = result.map((household) => {
              return { type: "Household", id: household.id };
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
          const {
            reg,
            cwt,
            amp,
            tmb,
            area,
            ea,
            vil,
            psu_no,
            ea_set,
            month,
            yr,
            hh_no,
            list_gr,
            enum_gr,
            members,
            listing,
            mem_dis,
          } = obj.data;
          return {
            url: "/households",
            method: "POST",
            body: {
              id: nanoid,
              reg,
              cwt,
              amp,
              tmb,
              area,
              ea,
              vil,
              psu_no,
              ea_set,
              month,
              yr,
              hh_no,
              list_gr,
              enum_gr,
              members,
              listing,
              mem_dis,
              enum: obj.data.enum,
              status: obj.status,
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
