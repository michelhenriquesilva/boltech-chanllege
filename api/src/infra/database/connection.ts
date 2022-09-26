import pgPromise from "pg-promise"
import * as dotenv from "dotenv"
dotenv.config()

const pgp = pgPromise({})

const db = pgp({
  user: process.env.DATA_BASE_USER,
  password: process.env.DATA_BASE_PASS,
  host: process.env.DATA_BASE_HOST,
  port: 5432,
  database: process.env.DATA_BASE_NAME,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
  max: 20
})

export default db
