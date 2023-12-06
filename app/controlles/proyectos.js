const { httpError } = require('../helpers/handleError');
const proyectoModel = require('../models/proyectos');
const bcrypt = require('bcrypt');

/********** FUNCIONES PRINCIPALES **********/

// Obtener todos los proyectos
const getProyectos = async (req, res) => {
    try {
        const listAll = await proyectoModel.find({});
        if (listAll) {
            if (listAll.length > 0) {
                res.status(200).json({ message: 'Proyectos consultados con éxito.', data: listAll });
            } else {
                res.status(200).json({ message: 'No hay proyectos disponibles', data: listAll });
            }
        } else {
            res.status(400).json({ message: 'Algo salió mal al intentar consultar todos los proyectos' });
        }
    } catch (error) {
        httpError(res, error);
    }
}

// Crear un nuevo proyecto
const createProyecto = async (req, res) => {
    try {
        const { name, description, image, donee, doners, qty } = req.body;

        // Verificar si todos los parámetros requeridos están presentes
        if ( !name || !description || !image || !donee || !doners || !qty) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios. Asegúrese de proporcionar name, description, image, donee, doners y qty.' });
        }

        // Verificar si ya existe un proyecto con el mismo name
        const proyectoExistente = await proyectoModel.findOne({ name: name });

        if (proyectoExistente) {
            return res.status(400).json({ message: 'Ya existe un proyecto con ese name, intente con un name original.' });
        }

        // Crear un nuevo proyecto
        const proyecto = await proyectoModel.create({
             name, description, image, donee, doners, qty,
        });

        if (proyecto) {
            // Enviar la respuesta con los datos del proyecto creado
            res.status(201).json({ data: proyecto, message: 'Proyecto creado con éxito.' });
        } else {
            res.status(400).json({ message: 'Algo salió mal al intentar crear nuevo proyecto' });
        }

    } catch (error) {
        // Manejar errores y enviar una respuesta de error
        httpError(res, error);
    }
}

/********** CRUD POR PROPIEDAD DE name **********/

// Obtener proyecto por name
const getProyectoByName = async (req, res) => {
    try {
        const proyectoName = req.params.name;
        const proyecto = await proyectoModel.findOne({ name: proyectoName });
        if (proyecto) {
            res.status(200).json({ message: 'Proyecto consultado con éxito.', data: proyecto });
        } else {
            res.status(404).json({ message: 'Proyecto no encontrado.' });
        }
    } catch (error) {
        httpError(res, error);
    }
}

// Actualizar proyecto por Name
const updateProyectoByName = async (req, res) => {
    try {
        const proyectoName = req.params.name;
        const {name, description, image, donee, doners, qty } = req.body;
        const updatedProyecto = await proyectoModel.findOneAndUpdate(
            { name: proyectoName },
            { name, description, image, donee, doners, qty },
            { new: true }
        );
        if (updatedProyecto) {
            res.status(200).json({ message: 'Proyecto actualizado con éxito.', data: updatedProyecto });
        } else {
            res.status(404).json({ message: 'Proyecto no encontrado.' });
        }
    } catch (error) {
        httpError(res, error);
    }
}

// Eliminar proyecto por name
const deleteProyectoByName = async (req, res) => {
    try {
        const proyectoName = req.params.name;
        const deletedProyecto = await proyectoModel.findOneAndDelete({ name: proyectoName });

        if (deletedProyecto) {
            res.status(200).json({ message: 'Proyecto eliminado con éxito.', data: deletedProyecto });
        } else {
            res.status(404).json({ message: 'Proyecto no encontrado.' });
        }

    } catch (error) {
        httpError(res, error);
    }
}

// Exportar funciones
module.exports = { getProyectos, createProyecto, getProyectoByName, updateProyectoByName, deleteProyectoByName };
