import { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

const useUserList = () => {
  const [userList, setUserList] = useState<Array<object> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_API_URL}/api/get-user-list`
        );
        setUserList(response.data.data); // Assuming `data` is the key holding the user list
        console.log("useUserList: ",response.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserList();
  }, []);

  return { userList, loading, error };
};

export { useUserList };
