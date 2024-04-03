import { z } from "zod";

export const registerUserSchema = z.object({
  username: z
    .string()
    .min(1, "Campo obligatorio")
    .min(3, "Necesita mas de 3 caracteres")
    .max(30, "Máximo 30 caracteres"),
  email: z
    .string()
    .min(1, "Campo obligatorio")
    .email("Debe ser un email válido"),
  password: z
    .string()
    .min(1, "Campo obligatorio")
    .min(
      4,
      "La contraseña debe tener entre 4-16 caracteres, incluír una mayúscula, un número y un símbolo"
    ),
});
