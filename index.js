const dotenv = require('dotenv');
let express = require('express')
const mongoose = require("mongoose")
var bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.json());
const Route = require('./Routes/userRoutes');
const { errorHandler } = require('./Errors/userError');

dotenv.config();


const port = process.env.PORT || "8080"
app.listen(port, () => {
    console.log("server started success")
})




//conecting to db
mongoose.connect(process.env.DATABASE_LOCAL)
    .then((res) => { console.log('connected success to db') })
    .catch(err => { console.log(err) })


//creating route
app.use("/api/users", Route)


app.use(errorHandler)



module.exports = app


