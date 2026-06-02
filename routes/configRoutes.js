import express from "express";
import { getConfigs } from "../controllers/configControllers.js";

const configRoutes = express.Router();

configRoutes.get("/", getConfigs);

export default configRoutes;
