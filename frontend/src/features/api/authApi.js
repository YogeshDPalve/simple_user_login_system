import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../authSlice";
import { BASE_API } from "@/constants/constants";

const USER_API = `${BASE_API}/api/v1/user`;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (inputData) => ({
        url: "/register",
        method: "POST",
        body: inputData,
      }),
    }),
    loginUser: builder.mutation({
      query: (inputData) => ({
        url: "/login",
        method: "POST",
        body: inputData,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("result", result);
          dispatch(
            userLoggedIn({ user: result.data.userInfo, isAuthenticated: true })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    sendResetOtp: builder.mutation({
      query: (email) => ({
        url: "/send-otp",
        method: "POST",
        body: email,
      }),
    }),

    resetPassword: builder.mutation({
      query: (passwordData) => ({
        url: "/reset-password",
        method: "PUT",
        body: passwordData,
      }),
    }),

    logout: builder.query({
      query: (email) => ({
        url: `/logout?email=${email}`,
        method: "GET",
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          dispatch(userLoggedOut());
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useSendResetOtpMutation,
  useResetPasswordMutation,
  useLazyLogoutQuery,
} = authApi;
