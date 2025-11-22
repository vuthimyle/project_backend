import express from "express"
import cors from "cors"
import dbConnect from "./db/dbConnect.js"
import PhotoRouter from "./routes/PhotoRouter"
import UserRouter from "./routes/UserRouter"

const app = express()
dbConnect()

app.use(cors());
app.use(express.json());
app.use("/api/user", UserRouter);
app.use("/api/photo", PhotoRouter);

app.get("/", (req, res) => {
  res.send({ message: "Hello from photo-sharing app API!" });
});

app.listen(8080, "0.0.0.0", () => {
    console.log("Server is running on http://localhost:8080")
})