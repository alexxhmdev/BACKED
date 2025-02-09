import express from 'express';
import { empresaController } from '../../controllers/empresa/empresaController.js';
const router = express.Router();

// Definir las rutas
router.get('/', empresaController.getAllCompany); // Obtener todas las unidades
router.get('/:id', empresaController.getCompanyById); // Obtener una unidad por ID
router.post('/', empresaController.createCompany); // Crear una nueva unidad
router.put('/:id', empresaController.updateCompany); // Actualizar una unidad
router.delete('/:id', empresaController.deleteCompany); // Eliminar una unidad

// Exportar el router
export const empresaRoutes = router;
