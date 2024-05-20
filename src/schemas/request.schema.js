import { z } from "zod";
export const createRequestShema = z.object({
    inicio: z.string({
        required_error: "La fecha de inicio es requerida"
    }).datetime(),
    final: z.string({
        required_error: "La fecha final es requerida"
    }).datetime(),
    descripcion: z.string({
        required_error: "La Descripcion debe ser una cadena de texto"
    }),
    date: z.string().datetime().optional(),
});