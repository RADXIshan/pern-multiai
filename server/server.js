import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { clerkMiddleware, requireAuth } from '@clerk/express'
import aiRouter from "./src/routes/aiRoutes.js";
import userRouter from "./src/routes/userRoutes.js";
import connectCloudinary from "./src/configs/cloudinary.js";

dotenv.config();
const app = express();

await connectCloudinary();

// Vercel handles the port, so this is not needed here.
// const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (_, res) => {
    res.json({ message: "Server is live!" })
});

app.use(requireAuth());

app.use("/api/ai", aiRouter);
app.use("/api/user", userRouter);


// app.listen(PORT, () => {
//     console.log(`Server started on http://localhost:${PORT}`);
// });

export default app;