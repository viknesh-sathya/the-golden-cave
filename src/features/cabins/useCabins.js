import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins, // so usually we need a prms here like we can use fetch directly but here since we already have a function for it we can use it
  });
  // console.log(cabins);
  return { isLoading, cabins, error };
}
