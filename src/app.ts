import express, { Request, Response } from "express";
import cors from "cors";
import authRoutes from "./app/routes/auth.routes";
import cookieParser from 'cookie-parser'

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser())

app.use("/api/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("BookWorm API is running");
});

export default app;
