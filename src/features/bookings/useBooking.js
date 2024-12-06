import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
  const { bookingId } = useParams();
  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId], // if we didnt mention the booking id the the data b/w will be the same coming from the cache of "booking"
    queryFn: () => getBooking(bookingId),
    retry: false, // React querry will retry fetching the data 3 times if the data didnt fetched
  });
  // console.log(booking);
  return { isLoading, booking, error };
}
