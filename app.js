const express = require("express");
const dotenv = require("dotenv")
const app = express();

const routers = require("./routers/index")
const mongoDbConnect = require("./helpers/database/connectDatabase")
dotenv.config({
    path: "./config/env/config.env"
})
const PORT = process.env.PORT;

mongoDbConnect()

app.get('/', (req, res, next) => {
    res.send("<h1>Welcome Stack Owerflow Rest Api</h1>")
})

app.listen(PORT, () => {
    console.log(`App started on ${PORT} : ${process.env.NODE_ENV}`)
})

app.use('/api', routers)