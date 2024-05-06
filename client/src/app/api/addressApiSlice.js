import { apiSlice } from "./apiSlice";

export const addressApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAddresses: builder.query({
      query: () => `/address`,
      transformResponse: (res) => res.data,
      providesTags: ["Address"],
    }),
    postAddress: builder.mutation({
      query: (body) => ({ url: `/address`, method: "POST", body }),
      invalidatesTags: (result, err, arg) => [{ type: "Address", id: arg.id }],
    }),
    updateAddress: builder.mutation({
      query: (body) => ({ url: `/address/${body?.id}`, method: "PATCH", body }),
      invalidatesTags: ["Address"],
    }),
    deleteAddress: builder.mutation({
      query: (id) => ({ url: `/address/${id}`, method: "DELETE" }),
      invalidatesTags: ["Address"],
    }),
  }),
});

export const { useGetAddressesQuery, usePostAddressMutation, useUpdateAddressMutation, useDeleteAddressMutation } =
  addressApiSlice;
