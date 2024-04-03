import { z } from "zod";

export const loginUserSchema = z.object({
  email: z.string().email("Debe ser un email válido"),
  password: z
    .string()
    .min(1, "Campo obligatorio")
    .min(
      4,
      "La contraseña debe tener entre 4-16 caracteres, incluír una mayúscula, un número y un símbolo"
    ),
});
