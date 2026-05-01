import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(2),
  birthDate: z.string().datetime(),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["admin", "user"]).optional().default("user"),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type RegisterDto = z.infer<typeof registerSchema>;
export type LoginDto = z.infer<typeof loginSchema>;
