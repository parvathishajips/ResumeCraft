require("dotenv").config()     //This loads .env variables into process.env.

const express = require("express")   
const cors = require("cors")

const connectDB = require("./config/db")   //This imports the database function we created.

const userRoutes = require("./routes/userRoutes") 
const resumeRoutes = require("./routes/resumeRoutes")
const generateRoutes = require("./routes/generateRoutes")

const app = express()      //This creates our Express application.app = our backend server

connectDB()

app.use(cors())        //This allows frontend requests.
app.use(express.json())      //This allows server to read JSON data.
app.use("/api/users", userRoutes)
app.use("/api/resumes", resumeRoutes)
app.use("/api/generate", generateRoutes)


const PORT = process.env.PORT || 5000   //use PORT from .env   if not available → use 5000

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})

console.log("Generate route loaded")
