import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    //   this data is received from the mutationfn returened
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      //   Prev we invalidated the query by passing the queryKey but we can also do as below by setting the active:true
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: (data) =>
      toast.error(`There was an error while checking in ${data.id}`),
  });
  return { checkin, isCheckingIn };
}
