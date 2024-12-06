import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();
  // FILTER
  const filterValue = searchParams.get("status");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // :{ field: "totalPrice", value: 5000, method: "gte" }; // this will fulter price >= 5000

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // QUERY
  const {
    isLoading,
    data: { data: bookings, count } = {}, // initialy there wont be any data so we will get undefined error so {} will be used,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page], // So now whenever the filter changes the React Query refectches the data
    // SO we can think this array as a dependency array in useEffect
    queryFn: () => getBookings({ filter, sortBy, page }),
  });
  // console.log(bookings);

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);
  //So here we are prefetching the page+1 and only till the last page
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  return { isLoading, bookings, error, count };
}
