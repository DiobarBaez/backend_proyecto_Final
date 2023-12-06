const express = require('express');
const router = express.Router();
//const checkOrigin = require('../middleware/origin');
const { getDonatarios, createDonatario, getDonatarioByName, updateDonatarioByName, deleteDonatarioByName } = require('../controlles/donatarios');

// Middleware para verificar el token de autorización
//router.use(checkOrigin);

// Rutas principales
router.get('/', getDonatarios); // Ruta para obtener todos los donatarios
router.post('/', createDonatario); // Ruta para crear un donatario (debería ser router.post)

// Rutas CRUD propiedad Name
router.get('/:name', getDonatarioByName); // Ruta para obtener un donatario por Name
router.patch('/:name', updateDonatarioByName); // Ruta para actualizar un donatario (debería ser router.patch)
router.delete('/:name', deleteDonatarioByName); // Ruta para eliminar un donatario

module.exports = router;
