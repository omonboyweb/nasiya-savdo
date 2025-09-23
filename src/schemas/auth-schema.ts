import { z } from "zod";

export const AuthSchema = z.object({
  username: z
    .string()
    .min(3, "Username kamida 3 ta belgidan iborat bo‘lishi kerak"),
  password: z
    .string()
    .min(6, "Parol kamida 6 ta belgidan iborat bo‘lishi kerak"),
});

export type AuthSchemaType = z.infer<typeof AuthSchema>;
