import { useEffect, useState } from "react";
import Auth from "../services/Auth";
import Axios from "../services/Axios";
import { enqueueSnackbar } from "notistack";

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await Auth.getAccessToken();
        const res = await Axios.get(url, {
          headers: { Authorization: "Bearer " + token },
        });
        setData(res.data.result);
      } catch (err: any) {
        enqueueSnackbar(err?.response?.data?.message ?? "Fetch error", {
          variant: "error",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading };
}

export default useFetch;