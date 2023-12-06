const express = require('express');
const router = express.Router();
//const checkOrigin = require('../middleware/origin');
const { getDonadores, createDonador, getDonadorByNombre, updateDonadorByNombre, deleteDonadorByNombre} = require('../controlles/donadores');

// Middleware para verificar el token de autorización
//router.use(checkOrigin);

/* FUNCIONES PRINCIPALES */
router.get('/', getDonadores); // Ruta para obtener todos los elementos
router.post('/', createDonador); // Ruta para crear un elemento

// Rutas CRUD propiedad name

router.get('/:name', getDonadorByNombre); // Ruta para obtener un elemento por ID
router.patch('/:name', updateDonadorByNombre); // Ruta para actualizar un elemento
router.delete('/:name', deleteDonadorByNombre); // Ruta para eliminar un elemento


module.exports = router;
