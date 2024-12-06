import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  // Create Mutation
  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Cabin successfully Created");
      //   reset(); //we are resetting here and not in the onSubmit because we want to reset the form only if the form is successfully added
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCreating, createCabin };
}
