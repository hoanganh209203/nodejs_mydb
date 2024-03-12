import express from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import router from './router/index.js';
import dotenv from 'dotenv';
const app = express();
dotenv.config();
const PORT = process.env.PORT;
const URI_DB = process.env.URI_DB;
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
connect(URI_DB);
app.use(cors())
app.use("/api", router)
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/api`);
})