import useSWR from "swr";
import axios from "axios";
import { toast } from "sonner";

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const useUserList = (page: number) => {
  const { data, error } = useSWR(
    `${BACKEND_API_URL}/api/get-user-list?page=${page}`,
    fetcher,
    { keepPreviousData: true }
  );

  if (error) {
    toast.error("Error");
  }

  return {
    users: data ? data.users : [],
    totalCount: data ? data.totalCount : 0,
    loading: !data && !error,
    error,
  };
};

export { useUserList };
