import { z } from "zod";

export const createPetShema = z.object({
    nombre: z.string({
        required_error: "Nombre de la mascota es requerido"
    }),
    descripcion: z.string({
        required_error: "La Descripcion debe ser una cadena de texto"
    }),
    date: z.string().datetime().optional(),
    genero: z.string().refine((value) => value === "masculino" || value === "femenino", {
        message: "El género debe ser 'masculino' o 'femenino'",
    }),
    nacimiento: z.string({
        required_error:"la fecha de nacimiento es requerida"
    }),
    alergias: z.string({
        required_error:"la alergia es requerida"
    }),
    vacunas: z.string().refine((value) => value === "Moquillo Canino"
        || value === "Hepatitis Infecciosa Canina"
        || value === "Parvovirosis"
        || value === "Leptospirosis"
        || value === "Rabia"
        || value === "Tos de las Perreras"
        || value === "Babesiosis"
        || value === "Enfermedad de Lyme", {
        message: "escriba contra que esta vacunado su mascota:'Moquillo Canino', 'Hepatitis Infecciosa Canina', 'Parvovirosis', 'Leptospirosis', 'Rabia', 'Tos de las Perreras', 'Babesiosis', 'Enfermedad de Lyme' ",
    }),
    raza: z.string().refine((value) => value === "Golden Retriever"
        || value === "Yorkshire"
        || value === "Bulldog"
        || value === "Chihuahua"
        || value === "Labrador"
        || value === "Poodle"
        || value === "Boxer"
        || value === "Criollo"
        || value === "Beagle", {
        message: "escriba una de las siguientes Razas:'Golden Retriever', 'Yorkshire', 'Bulldog', 'Chihuahua', 'Labrador', 'Poodle', 'Boxer', 'Beagle', 'Criollo' ",
    }),
});