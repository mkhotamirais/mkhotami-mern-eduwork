import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `/user`,
      transformResponse: (res) => res.data,
      providesTags: ["User", "Address"],
    }),
    getUserById: builder.query({
      query: (id) => `/user/${id}`,
      transformResponse: (res) => res.data,
      providesTags: ["User"],
    }),
    postUser: builder.mutation({
      query: (body) => ({ url: `/user`, method: "POST", body }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    updateUser: builder.mutation({
      query: (body) => ({ url: `/user/${body.id}`, method: "PATCH", body }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({ url: `/user/${id}`, method: "DELETE" }),
      invalidatesTags: ["User", "Address"],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery, useUpdateUserMutation, usePostUserMutation, useDeleteUserMutation } =
  userApiSlice;
