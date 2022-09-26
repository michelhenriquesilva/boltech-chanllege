import "reflect-metadata"
import Express from "express"
import cors from 'cors'
import routes from "../routes"
import "../database/connection"

const app = Express()
const PORT = 9000

app.use(Express.json())
app.use(cors())
app.use(Express.urlencoded({extended: false}))
app.use(routes)

app.listen(PORT, () => {
  console.log(`API is runing at port ${PORT}...`)
})
