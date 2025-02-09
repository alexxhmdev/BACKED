import express from 'express';
import { loginController } from '../../auth/loginController.js';

const router = express.Router();

// Ruta para iniciar sesión
router.post('/', loginController);

export const loginRoute = router;
