import express from 'express';
import { costosController } from '../../controllers/costos/costosController.js';

const router = express.Router();

// Definir las rutas
router.get('/', costosController.getAllCosts); // Obtener todos los usuarios
router.get('/:id', costosController.getCostsById); // Obtener un usuario por ID
router.post('/', costosController.createCosts); // Crear un nuevo usuario
router.put('/:id', costosController.updateCosts); // Actualizar un usuario
router.delete('/:id', costosController.deleteCosts); // Eliminar un usuario

// Exportar el router
export const costosRoutes = router;
