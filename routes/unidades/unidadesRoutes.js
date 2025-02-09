import express from 'express';
import { unidadesController } from '../../controllers/unidades/unidadesController.js';

const router = express.Router();

// Definir las rutas
router.get('/', unidadesController.getAllUnits); // Obtener todas las unidades
router.get('/:id', unidadesController.getUnitById); // Obtener una unidad por ID
router.post('/', unidadesController.createUnit); // Crear una nueva unidad
router.put('/:id', unidadesController.updateUnit); // Actualizar una unidad
router.delete('/:id', unidadesController.deleteUnit); // Eliminar una unidad

// Exportar el router
export const unidadesRoutes = router;
