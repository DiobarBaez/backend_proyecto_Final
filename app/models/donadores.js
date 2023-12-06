const mongoose = require('mongoose');

const donadoresSchema = new mongoose.Schema(
    {
        rfc:{
            type: Number
        },
        name:{
            type: String
        },
        projects:{
            type: [
                {
                    type: String,
                }
            ]
        },
        image:{
            type: String
        },
        qty:{
            type: Number 
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model('donadores', donadoresSchema);