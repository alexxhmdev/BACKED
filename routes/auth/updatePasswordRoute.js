import express from "express";
import { updatePasswordController } from "../../auth/updatePasswordController.js";

const router = express.Router();

// Ruta para actualizar la contraseña, usando Firebase y la base de datos local
router.post("/", updatePasswordController);

export const updatePasswordRoute = router;
