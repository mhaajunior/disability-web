import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const membersApi = createApi({
  reducerPath: "members",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACK_END_URL,
  }),
  endpoints(builder) {
    return {
      fetchMembers: builder.query({
        providesTags: (result) => {
          if (result) {
            const tags = result.data.members.map((member) => {
              return { type: "Member", id: member._id };
            });
            tags.push({ type: "UsersMembers" });
            return tags;
          }
          return [];
        },
        query: (data) => {
          const { file_id, iden } = data;
          return {
            url: "/members",
            method: "GET",
            params: {
              file_id,
              iden,
            },
          };
        },
      }),
      fetchMemberById: builder.query({
        providesTags: (result, error, id) => {
          return [{ type: "Member", id }];
        },
        query: (id) => {
          return {
            url: `/members/${id}`,
            method: "GET",
          };
        },
      }),
      editMember: builder.mutation({
        invalidatesTags: (result, error, data) => {
          return [{ type: "Member", id: data.id }];
        },
        query: (data) => {
          const { id, memberForm } = data;
          return {
            url: `/members/${id}`,
            method: "PATCH",
            body: memberForm,
          };
        },
      }),
    };
  },
});

export const {
  useFetchMembersQuery,
  useFetchMemberByIdQuery,
  useEditMemberMutation,
} = membersApi;
export { membersApi };
