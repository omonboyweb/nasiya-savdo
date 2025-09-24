import { client } from "./request";
import { useQuery } from "@tanstack/react-query";
export const useGetData = (key: string, url: string) => {
  return useQuery({
    queryKey: [key],
    queryFn: () => client.get(`${url}`).then((res) => res.data),
  });
};
