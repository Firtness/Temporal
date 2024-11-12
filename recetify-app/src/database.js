const mongoose= require("mongoose")

//ENV PROD
//mongoose.connect("mongodb://database/mydb")

//ENV DEV
//mongoose.connect("mongodb://localhost:27023/mydb")
mongoose.connect("mongodb://localhost:27023/RECETIFY_DB")

.then(db=>console.log("DB is connected to", db.connection.host))
.catch(err=>console.error(err));