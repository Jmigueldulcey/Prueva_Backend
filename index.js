import app from "./src/app.js";
import { conexionDB } from "./src/db.js";

conexionDB();
app.listen(4000);
console.log("Escuchando al puerto", 4000);
