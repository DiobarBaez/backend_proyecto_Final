const mongoose = require('mongoose');

const ProyectosSchema = new mongoose.Schema(
    {
        name:{
            type: String
        },
        description:{
            type: String
        },
        image:{
            type: String
        },
        donee:{
            type: String
        },
        doners:{
            type: []
        },
        qty:{
            type: Number 
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model('proyectos', ProyectosSchema);