import express from 'express'
import { publicRouter, doctorRouter} from './api/router'
import { auth_middleware, doctor_middleware } from './api/middleware'

const app = express()
app.use(express.json())

app.use("/api/public", publicRouter)
app.use("/api/doctor",[auth_middleware,doctor_middleware], doctorRouter)

app.use("*", (_, res) => {
    res.status(404).send("404 route not found")
})


app.listen(8000, () => {
    console.log('server is started')
})