import express from "express";
import configRoutes from "./configRoutes.js";
import submissionRoutes from "./submissionRoutes.js";

const router = express.Router();

// router.use("/login", authRouter);
router.use("/configs", configRoutes);
router.use("/submissions", submissionRoutes);
export default router;
