import { apiSlice } from "./apiSlice";

const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCarts: builder.query({
      query: () => `/cart`,
      transformResponse: (res) => res.data,
      providesTags: ["Cart"],
    }),
    updateCarts: builder.mutation({
      query: (body) => ({ url: `/cart`, method: "PATCH", body }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const { useGetCartsQuery, useUpdateCartsMutation } = cartApiSlice;
