const { httpError } = require('../helpers/handleError');
const donadorModel = require('../models/donadores');
const bcrypt = require('bcrypt');

/********** FUNCIONES PRINCIPALES **********/

// Obtener todos los donadores
const getDonadores = async (req, res) => {
    try {
        const listAll = await donadorModel.find({});
        if (listAll) {
            if (listAll.length > 0) {
                res.status(200).json({ message: 'Donadores consultados con éxito.', data: listAll });
            } else {
                res.status(200).json({ message: 'No hay donadores disponibles', data: listAll });
            }
        } else {
            res.status(400).json({ message: 'Algo salió mal al intentar consultar todos los donadores' });
        }
    } catch (error) {
        httpError(res, error);
    }
}


// Crear un nuevo donador
const createDonador = async (req, res) => {
    try {
        const { rfc, name, projects , image, qty} = req.body;

        // Verificar si todos los parámetros requeridos están presentes
        if (!rfc || !name || !projects || !image || !qty ) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios. Asegúrese de proporcionar nombre, rol, email y password.' });
        }

        // Verificar si ya existe un donador con el mismo nombre
        const donadorExistente = await donadorModel.findOne({ name : name});

        if (donadorExistente) {
            return res.status(400).json({ message: 'Ya existe un donador con ese nombre, intente con un nombre  original.' });
        }

        // Crear un nuevo donador
        const donador = await donadorModel.create({
            rfc, name, projects , image, qty, 
        });

        if (donador) {
            // Enviar la respuesta con los datos del donador creado
            res.status(201).json({ data: donador, message: 'donador creado con éxito.' });
        } else {
            res.status(400).json({ message: 'Algo salió mal al intentar crear nuevo donador' });
        }

    } catch (error) {
        // Manejar errores y enviar una respuesta de error
        httpError(res, error);
    }
}

/*
// Función para autenticar al donador sin bcrypt
const authenticateDonador = async (req, res) => {
    const { email, password } = req.body;
    try {
      // Buscar al donador por su email
      const donador = await donadorModel.findOne({ email })
  
      // Si el donador no existe
      if (!donador) {
        return res.status(404).json({ message: 'donador no encontrado' });
      }
  
      // Verificar la contraseña sin cifrar
      if (password !== donador.password) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }
  
      // Autenticación exitosa
      const donadorData = {
        rfc: donador.rfc,
        nombre: donador.nombre,
        proyectos: donador.proyectos,
        imagen: donador.imagen,
        cantidad: donador.cantidad,
      };
  
      res.status(200).json({ message: 'Autenticación exitosa', donador: donadorData });
    } catch (error) {
      httpError(res, error); // Utiliza la función httpError para manejar el error
    }
};
*/

/********** CRUD POR PROPIEDAD DE nombre **********/

// Obtener donador por nombre
const getDonadorByNombre = async (req, res) => {
    try {
        const donadorNombre = req.params.name;
        const donador = await donadorModel.findOne({ name: donadorNombre });
        if (donador) {
            res.status(200).json({ message: 'donador consultado con éxito.', data: donador });
        } else {
            res.status(404).json({ message: 'donador no encontrado.' });
        }
    } catch (error) {
        httpError(res, error);
    }
}

// Actualizar donador por Nombre
const updateDonadorByNombre = async (req, res) => {
    try {
        const donadorNombre = req.params.name;
        const { rfc, name, projects , image, qty } = req.body;
        const updatedDonador = await donadorModel.findOneAndUpdate(
            { name: donadorNombre },
            { rfc, name, projects , image, qty },
            { new: true }
        );
        if (updatedDonador) {
            res.status(200).json({ message: 'donador actualizado con éxito.', data: updatedDonador });
        } else {
            res.status(404).json({ message: 'donador no encontrado.' });
        }
    } catch (error) {
        httpError(res, error);
    }
}


// Eliminar donador por nombre
const deleteDonadorByNombre = async (req, res) => {
    try {
        const donadorNombre = req.params.name;
        const deletedDonador = await donadorModel.findOneAndDelete({ name: donadorNombre });

        if (deletedDonador) {
            res.status(200).json({ message: 'donador eliminado con éxito.', data: deletedDonador });
        } else {
            res.status(404).json({ message: 'donador no encontrado.' });
        }

    } catch (error) {
        httpError(res, error);
    }
}

// Exportar funciones
module.exports = {getDonadores, createDonador, getDonadorByNombre, updateDonadorByNombre, deleteDonadorByNombre,};
