import { useEffect, useState } from "react";
import { fetchJson } from "../utils/fetch-json";
import netlifyIdentity from "netlify-identity-widget";

interface UseNetlifyFunctionProps {
  fetchUrlPath: string;
  user?: netlifyIdentity.User | null;
}

interface UseNetlifyFunctionReturn<T> {
  loading: boolean;
  error?: Error | undefined;
  data: T | undefined;
}

export function useNetlifyGetFunction<T>({
  fetchUrlPath,
  user,
}: UseNetlifyFunctionProps): UseNetlifyFunctionReturn<T> {
  const [data, setData] = useState<T | undefined>();
  console.log("CIAO");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(undefined);

      try {
        console.log("PERFORM");

        const url = `${process.env.baseUrl}/.netlify/functions${fetchUrlPath}`;
        const options = {
          token: user?.token?.access_token,
        };

        const response = await fetchJson(url, options);

        setData(response);
      } catch (e) {
        console.log("ERRROR", error);
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  return { data, loading, error };
}
