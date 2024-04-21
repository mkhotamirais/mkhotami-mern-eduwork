import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (param) => `/product?${param}`,
      transformResponse: (res) => res.data,
      providesTags: ["Product"],
    }),
    getProductById: builder.query({
      query: (id) => `/product/${id}`,
      transformResponse: (res) => res.data,
      providesTags: ["Product"],
    }),
    postProduct: builder.mutation({
      query: (body) => ({ url: `/product`, method: "POST", body }),
      invalidatesTags: (result, error, arg) => [{ type: "Product", id: arg.id }],
    }),
    updateProduct: builder.mutation({
      query: (body) => ({ url: `/product/${body?.get("id")}`, method: "PATCH", body }),
      invalidatesTags: (result, error, arg) => [{ type: "Product", id: arg.id }],
      // invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({ url: `/product/${id}`, method: "DELETE" }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  usePostProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApiSlice;
