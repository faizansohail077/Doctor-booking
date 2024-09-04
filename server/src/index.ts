import express from 'express'
import { publicRouter } from './api/router'

const app = express()
app.use(express.json())

app.use("/api/public", publicRouter)

app.use("*", (_, res) => {
    res.status(404).send("404 route not found")
})


app.listen(8000, () => {
    console.log('server is started')
})