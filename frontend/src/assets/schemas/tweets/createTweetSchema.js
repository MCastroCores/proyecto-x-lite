import { z } from "zod";

export const createTweetSchema = z.object({
  text: z
    .string()
    .min(1, "Campo obligatorio")
    .min(3, "Debe tener al menos tres caracteres")
    .max(280, "No puede tener más de 280 caracteres"),
});
