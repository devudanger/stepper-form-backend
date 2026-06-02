import submissionService from "../service/submissionService.js";
import controllerWrapper from "../utills/ControllerWrapper.js";
import { sendSuccess } from "../utills/ResponseHandler.js";

export const createSubmission = controllerWrapper(async (req, res) => {
  const data = await submissionService.createSubmission(req.body);
  sendSuccess(res, data, "Submission created successfully", 201);
});

export const updateSubmission = controllerWrapper(async (req, res) => {
  const data = await submissionService.updateSubmission(
    req.params.id,
    req.body,
  );
  sendSuccess(res, data, "Draft saved successfully");
});

export const getAllSubmissions = controllerWrapper(async (req, res) => {
  const data = await submissionService.getAllSubmissions(req.query.userId);
  sendSuccess(res, data, "Submissions fetched successfully");
});

export const getSubmissionById = controllerWrapper(async (req, res) => {
  const data = await submissionService.getSubmissionById(req.params.id);
  sendSuccess(res, data, "Submission fetched successfully");
});

export const submitSubmission = controllerWrapper(async (req, res) => {
  const data = await submissionService.submitSubmission(req.params.id);
  sendSuccess(res, data, "Form submitted successfully");
});
