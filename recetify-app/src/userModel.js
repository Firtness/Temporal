const mongoose = require("mongoose")

//Creamos el esquema de DB
const userSchema=new mongoose.Schema(
    {
        username:{type: String},
        email: {type: String},
        password: {type: String},
        description: {type: String}
    },
    {
        timestamp: true,
        versionKey: false
    }
);

//Asociamos el schema que acabamos de crear a una coleccion (users) de DB
const ModelUser=mongoose.model("users",userSchema)

module.exports = ModelUser;

//Crear desde nuestro sitio web un schema
//para la base de datos