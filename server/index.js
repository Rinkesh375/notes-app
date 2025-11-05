import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:3000",
      // add the actual production URL below when deploying remove localhost url
      // e.g., "https://myapp.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true, // Allow cookies and authorization headers (like JWT tokens),
    allowedHeaders:["Content-Type","Authorization"]
  })
);

app.get("/api/message", (_, res) => {
  res.status(200).json({ message: "Hello from backend server" });
});

const PORT = 4000;

app.listen(PORT, () => console.log(`Server is runing at ${PORT}`));
