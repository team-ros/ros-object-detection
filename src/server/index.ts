import express from "express"
const app = express()

app.listen(process.env.PORT || 8080)

// import routes
import detect from "./routes/detect"

// apply routes
app.use("/detect", detect)
