import useSWR from "swr";
import { fetcher } from "../utils/swr/fetcher";

export const useCurrentUser = () => {
  const { data, error, mutate } = useSWR("/api/user", fetcher);
  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
    mutateUser: mutate,
  };
};
