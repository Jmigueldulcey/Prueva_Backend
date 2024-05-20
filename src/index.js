import app from "./app.js";
import { conexionDB } from "./db.js";

conexionDB();
app.listen(4000);
console.log("Escuchando al puerto", 4000);
