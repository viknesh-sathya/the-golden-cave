import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    //   this data is received from the mutationfn returened
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      //   Prev we invalidated the query by passing the queryKey but we can also do as below by setting the active:true
      queryClient.invalidateQueries({ active: true });
    },
    onError: (data) =>
      toast.error(`There was an error while checking out ${data.id}`),
  });
  return { checkout, isCheckingOut };
}
