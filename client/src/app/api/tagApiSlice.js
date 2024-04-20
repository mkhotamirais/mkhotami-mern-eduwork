import { apiSlice } from "./apiSlice";

export const tagApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTags: builder.query({
      query: () => `/tag`,
      transformResponse: (res) => res.data,
      providesTags: ["Tag"],
    }),
    getTagById: builder.query({
      query: (id) => `/tag/${id}`,
      transformResponse: (res) => res.data,
      providesTags: ["Category"],
    }),
    postTag: builder.mutation({
      query: (body) => ({ url: `/tag`, method: "POST", body }),
      invalidatesTags: (result, error, arg) => [{ type: "Tag", id: arg.id }],
    }),
    updateTag: builder.mutation({
      query: (body) => ({ url: `/tag/${body?.id}`, method: "PATCH", body }),
      invalidatesTags: ["Tag"],
    }),
    deleteTag: builder.mutation({
      query: (id) => ({ url: `/tag/${id}`, method: "DELETE" }),
      invalidatesTags: ["Tag"],
    }),
  }),
});

export const { useGetTagsQuery, useGetTagByIdQuery, usePostTagMutation, useUpdateTagMutation, useDeleteTagMutation } =
  tagApiSlice;
