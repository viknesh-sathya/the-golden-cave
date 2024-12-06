import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  // mutate is the callback function which we can connec with the button
  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    // mutationFn: (id) => deleteBooking(id), // below line and this are same
    mutationFn: deleteBookingApi,
    // Note: once we delete we need to refetch that can be happened by making the data invalid which triggers refetching.but that is handled by the queryClient, so we use useQueryClient hook to access QC
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      toast.success("Booking successfully deleted");
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteBooking };
}
