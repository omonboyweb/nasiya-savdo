import { client } from "./request";
import { useMutation } from "@tanstack/react-query";
// admin-response.ts
export interface AdminResponse {
  id: number | string;
  username: string;
  isActive: boolean;
  role: string;
  email: string;
  createdAt: string;
}
// create-admin.dto.ts
export interface CreateAdminDto {
  username: string;
  password: string;
  isActive: boolean;
  role: "SUPER ADMIN" | "ADMIN" | "STORE"; // enum bo‘lishi ham mumkin
  email: string;
}

export const useCreateAdmin = () => {
  return useMutation<AdminResponse, Error, CreateAdminDto>({
    mutationFn: (body: CreateAdminDto) =>
      client.post<AdminResponse>("/admin", body).then((res) => res.data),
  });
};
