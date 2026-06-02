import express from "express";

import {
  createSubmission,
  getAllSubmissions,
  getSubmissionById,
  submitSubmission,
  updateSubmission,
} from "../controllers/submissionController.js";

const submissionRoutes = express.Router();
submissionRoutes.get("/", getAllSubmissions);
submissionRoutes.post("/", createSubmission);
submissionRoutes.post("/:id/submit", submitSubmission);
submissionRoutes.put("/:id", updateSubmission);
submissionRoutes.get("/:id", getSubmissionById);
export default submissionRoutes;
