import express from 'express';
import { logoutController } from '../../auth/logoutController.js';

const router = express.Router();

// Ruta para cerrar sesión
router.post('/logout', logoutController);

export const logoutRoute = router;
