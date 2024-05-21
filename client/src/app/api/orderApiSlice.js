import { apiSlice } from "./apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrder: builder.query({
      query: () => `/order`,
      transformResponse: (res) => res.data,
      providesTags: ["Order", "Cart"],
    }),
    getOrderById: builder.query({
      query: (id) => `/order/${id}`,
      transformResponse: (res) => res.data,
    }),
    postOrder: builder.mutation({
      query: (body) => ({ url: `/order`, method: "POST", body }),
      // invalidatesTags: (result, error, arg) => [{ type: "Order", id: arg.id }],
      invalidatesTags: ["Order", "Cart"],
    }),
  }),
});

export const { useGetOrderQuery, useGetOrderByIdQuery, usePostOrderMutation } = orderApiSlice;
