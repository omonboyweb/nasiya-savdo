import { client } from "./request";
import { useMutation } from "@tanstack/react-query";

// store-response.ts
export interface StoreRespons {
  id: string;
  createdAt: string;
  updatedAt: string;
  password: string;
  fullName: string;
  wallet: number;
  isActive: boolean;
  phoneNumber: string;
  isDeleted: boolean;
  role: string;
  email: string;
  otpCode: null;
  otpExpiresAt: null;
}

// create-store.dto.ts
export interface CreateStoreDto {
  fullName: string;
  password: string;
  role: string;
  email: string;
  phoneNumber: string;
  wallet: number;
}

export const useCreateStore = () => {
  return useMutation<StoreRespons, Error, CreateStoreDto>({
    mutationFn: (body: CreateStoreDto) =>
      client.post<StoreRespons>("/store", body).then((res) => res.data),
  });
};
