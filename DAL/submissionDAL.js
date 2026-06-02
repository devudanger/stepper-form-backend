import Submission from "../models/Submission.js";

const createSubmission = async (payload) => {
  return await Submission.create(payload);
};

const getSubmissionById = async (id) => {
  return await Submission.findById(id);
};

const updateSubmission = async (id, payload) => {
  return await Submission.findByIdAndUpdate(id, payload, {
    new: true,
  });
};

const getAllSubmissions = async (userId) => {
  return await Submission.find({ userId })
    .populate("configId")
    .sort({ updatedAt: -1 });
};
const getSubmissionWithConfig = async (id) => {
  return await Submission.findById(id).populate("configId");
};
export default {
  createSubmission,
  getSubmissionById,
  updateSubmission,
  getAllSubmissions,
  getSubmissionWithConfig,
};
