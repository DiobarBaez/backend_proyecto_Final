const mongoose = require('mongoose');

const donatariosSchema = new mongoose.Schema(
    {
        rfc:{
            type: String
        },
        name:{
            type: String
        },
        id_proyect:{
            type: String
        },
        image:{
            type: String
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);  

module.exports = mongoose.model('donatarios', donatariosSchema);