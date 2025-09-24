import { client } from "./request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export const useDeleteData = (key: string, url: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) =>
      client.delete(`${url}/${id}`).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [key] }),
  });
};
