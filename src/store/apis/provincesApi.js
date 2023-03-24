import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const provincesApi = createApi({
  reducerPath: "provinces",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
  }),
  endpoints(builder) {
    return {
      getProvince: builder.query({
        query: (region) => {
          return {
            url: "/provinces",
            method: "GET",
            params: {
              region,
            },
          };
        },
      }),
    };
  },
});

export const { useGetProvinceQuery } = provincesApi;
export { provincesApi };
