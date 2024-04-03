import { z } from "zod";

export const updateUserSchema = z.object({
  username: z
    .string()
    .min(1, "Campo obligatorio")
    .min(3, "Necesita mas de 3 caracteres")
    .max(30, "Máximo 30 caracteres"),
  email: z
    .string()
    .min(1, "Campo obligatorio")
    .email("Debe ser un email válido"),
  bio: z.string().min(0).max(150, "Máximo 150 caracteres"),
  hobbies: z.string().min(0).max(100, "Máximo 100 caracteres"),
});
