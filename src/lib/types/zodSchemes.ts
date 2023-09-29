import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(8).max(100)
});

export type TRegisterSchema = z.infer<typeof registerSchema>;