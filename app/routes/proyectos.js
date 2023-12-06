const express = require('express');
const router = express.Router();
//const checkOrigin = require('../middleware/origin');
const { getProyectos, createProyecto, getProyectoByName, updateProyectoByName, deleteProyectoByName,} = require('../controlles/proyectos');

// Middleware para verificar el token de autorización
//router.use(checkOrigin);

// Rutas principales

router.get('/', getProyectos); // Ruta para obtener todos los elementos
router.post('/', createProyecto); // Ruta para actualizar un elemento (debería ser router.patch)

// Rutas CRUD propiedad name

router.get('/:name', getProyectoByName); // Ruta para obtener un elemento por Name
router.get('/filter/:name', getProyectoByName);
router.patch('/:name', updateProyectoByName); // Ruta para actualizar un elemento (debería ser router.patch)
router.delete('/:name', deleteProyectoByName); // Ruta para eliminar un elemento

module.exports = router;
