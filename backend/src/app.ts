import express from "express";
import cors from "cors";
import usersRoutes from "./routes/users";

const app = express();

app.use(cors({origin: "*"}));
app.use(express.json());

app.use("/users", usersRoutes);

export default app;