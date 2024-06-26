import { z } from "zod";

export const registerSchema = z.object({
    nombre: z.string({
        required_error: "nombre es requerido",
    }),
    apellido: z.string({
        required_error: "apellido es requerido",
    }),
    ciudad: z.string({
        required_error: "Ciudad es requerida",
    }),
    services: z.string().refine((value) => value === "Cuidador" || value === "Paseador", {
        message: "Espesifique si es 'Cuidador' o 'Paseador'",
    }),
    email: z.string({
        required_error: "Email es requerido",
    }).email({
        required_error: "email no valido",
    }),
    password: z.string({
        required_error: "password es requerido",
    }).min(6, {
        message: "password debe tener al menos 6 catacteres",
    }),
});

export const loginSchema = z.object({
    email: z.string({
        required_error: "Email es Requerido",
    }).email({
        message: "Email no es valido",
    }),
    password: z.string({
        required_error: "password es Requerido",
    }).min(6, {
        message: "password debe tener al menos 6 catacteres",
    }),
});
