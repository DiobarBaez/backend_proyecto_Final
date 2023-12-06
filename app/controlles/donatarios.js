const { httpError } = require('../helpers/handleError');
const donatarioModel = require('../models/donatarios');

/********** FUNCIONES PRINCIPALES **********/

// Obtener todos los donatarios
const getDonatarios = async (req, res) => {
    try {
        const listAll = await donatarioModel.find({});
        if (listAll) {
            if (listAll.length > 0) {
                res.status(200).json({ message: 'Donatarios consultados con éxito.', data: listAll });
            } else {
                res.status(200).json({ message: 'No hay donatarios disponibles', data: listAll });
            }
        } else {
            res.status(400).json({ message: 'Algo salió mal al intentar consultar todos los donatarios' });
        }
    } catch (error) {
        httpError(res, error);
    }
}

// Crear un nuevo donatario
const createDonatario = async (req, res) => {
    try {
        const { rfc, name, id_proyect, image } = req.body;

        // Verificar si todos los parámetros requeridos están presentes
        if (!rfc || !name || !id_proyect || !image) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios. Asegúrese de proporcionar rfc, name, id_proyecto e imagen.' });
        }

        // Verificar si ya existe un donatario con el mismo name
        const donatarioExistente = await donatarioModel.findOne({ name: name });

        if (donatarioExistente) {
            return res.status(400).json({ message: 'Ya existe un donatario con ese name, intente con un name original.' });
        }

        // Crear un nuevo donatario
        const donatario = await donatarioModel.create({
            rfc, name, id_proyect, image,
        });

        if (donatario) {
            // Enviar la respuesta con los datos del donatario creado
            res.status(201).json({ data: donatario, message: 'Donatario creado con éxito.' });
        } else {
            res.status(400).json({ message: 'Algo salió mal al intentar crear nuevo donatario' });
        }

    } catch (error) {
        // Manejar errores y enviar una respuesta de error
        httpError(res, error);
    }
}

/********** CRUD POR PROPIEDAD DE Name **********/

// Obtener donatario por Name
const getDonatarioByName = async (req, res) => {
    try {
        const donatarioName = req.params.name;
        const donatario = await donatarioModel.findOne({ name: donatarioName });
        if (donatario) {
            res.status(200).json({ message: 'Donatario consultado con éxito.', data: donatario });
        } else {
            res.status(404).json({ message: 'Donatario no encontrado.' });
        }
    } catch (error) {
        httpError(res, error);
    }
}

// Actualizar donatario por Name
const updateDonatarioByName = async (req, res) => {
    try {
        const donatarioName = req.params.name;
        const { rfc, name, id_proyect, image } = req.body;
        const updatedDonatario = await donatarioModel.findOneAndUpdate(
            { name: donatarioName },
            { rfc, name, id_proyect, image },
            { new: true }
        );
        if (updatedDonatario) {
            res.status(200).json({ message: 'Donatario actualizado con éxito.', data: updatedDonatario });
        } else {
            res.status(404).json({ message: 'Donatario no encontrado.' });
        }
    } catch (error) {
        httpError(res, error);
    }
}

// Eliminar donatario por Name
const deleteDonatarioByName = async (req, res) => {
    try {
        const donatarioName = req.params.name;
        const deletedDonatario = await donatarioModel.findOneAndDelete({ name: donatarioName });

        if (deletedDonatario) {
            res.status(200).json({ message: 'Donatario eliminado con éxito.', data: deletedDonatario });
        } else {
            res.status(404).json({ message: 'Donatario no encontrado.' });
        }

    } catch (error) {
        httpError(res, error);
    }
}

// Exportar funciones
module.exports = { getDonatarios, createDonatario, getDonatarioByName, updateDonatarioByName, deleteDonatarioByName };
