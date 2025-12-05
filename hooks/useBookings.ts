"use client"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { cancelBookingSuccess } from "@/redux/slices/bookingsSlice"

export const useBookings = () => {
  const dispatch = useAppDispatch()
  const { userBookings, bookings, isLoading, error } = useAppSelector((state) => state.bookings)

  const cancelBooking = (bookingId: string) => {
    dispatch(cancelBookingSuccess(bookingId))
  }

  return { userBookings, bookings, isLoading, error, cancelBooking }
}
