import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import submissionDal from "../dal/submissionDal.js";
import configDal from "../dal/configDal.js";
import ErrorHandler from "../utills/ErrorHandler.js";

const createSubmission = async (body) => {
  const { configId, userId } = body;
  if (!configId) {
    throw ErrorHandler.handleBadRequest("Config ID is required");
  }

  if (!mongoose.Types.ObjectId.isValid(configId)) {
    throw ErrorHandler.handleBadRequest("Invalid Config ID");
  }

  const config = await configDal.getConfigById(configId);

  if (!config) {
    throw ErrorHandler.handleNotFound("Form configuration not found");
  }
  const finalUserId = userId || uuidv4();

  const submission = await submissionDal.createSubmission({
    userId: finalUserId,
    configId,
    answers: {},
    completedSteps: [],
    currentStep: 0,
    status: "draft",
  });

  return { submission, userId: finalUserId };
};

const updateSubmission = async (submissionId, body) => {
  const { step, answers, isDraft } = body; // if isDraft then no validation
  if (step === undefined) {
    throw ErrorHandler.handleBadRequest("Step is required");
  }
  const submission = await submissionDal.getSubmissionById(submissionId);
  if (!submission) {
    throw ErrorHandler.handleNotFound("Submission not found");
  }
  const config = await configDal.getConfigById(submission.configId);
  if (!config) {
    throw ErrorHandler.handleNotFound("Form config not found");
  }
  const currentStep = config.steps[step];
  if (!currentStep) {
    throw ErrorHandler.handleBadRequest("Invalid step");
  }
  if (!isDraft) {
    for (const field of currentStep.fields) {
      const value = answers[field.name];
      // Required validation
      if (field.required && (!value || value.toString().trim() === "")) {
        throw ErrorHandler.handleBadRequest(`${field.label} is required`);
      }
      // Select & radio validation
      if (
        ["select", "radio"].includes(field.type) &&
        value &&
        !field.options.includes(value)
      ) {
        throw ErrorHandler.handleBadRequest(`Invalid value for ${field.label}`);
      }
    }
  }
  // Merge previous answers with new answers
  const mergedAnswers = {
    ...submission.answers,
    ...answers,
  };
  // Completed steps logic
  const completedSteps = [...new Set([...submission.completedSteps, step])];
  if (isDraft) {
    const updatedSubmission = await submissionDal.updateSubmission(
      submissionId,
      {
        answers: mergedAnswers,
      },
    );
    return updatedSubmission;
  } else {
    const updatedSubmission = await submissionDal.updateSubmission(
      submissionId,
      {
        answers: mergedAnswers,
        completedSteps,
        currentStep: step + 1,
      },
    );
    return updatedSubmission;
  }
};

const getAllSubmissions = async (userId) => {
  if (!userId) {
    return [];
  }

  const submissions = await submissionDal.getAllSubmissions(userId);

  return submissions.map((submission) => ({
    id: submission._id,

    title: submission.configId.title,

    status: submission.status,

    progress: `${submission.completedSteps.length}/${submission.configId.steps.length}`,

    updatedAt: submission.updatedAt,
  }));
};

const getSubmissionById = async (submissionId) => {
  const submission = await submissionDal.getSubmissionWithConfig(submissionId);
  if (!submission) {
    throw ErrorHandler.handleNotFound("Submission not found");
  }
  return {
    submission: {
      _id: submission._id,
      answers: submission.answers,
      completedSteps: submission.completedSteps,
      currentStep: submission.currentStep,
      status: submission.status,
      lastUpdated: submission.updatedAt,
    },
    config: submission.configId,
  };
};

const submitSubmission = async (submissionId) => {
  const submission = await submissionDal.getSubmissionById(submissionId);
  if (!submission) {
    throw ErrorHandler.handleNotFound("Submission not found");
  }
  const config = await configDal.getConfigById(submission.configId);
  if (!config) {
    throw ErrorHandler.handleNotFound("Form configuration not found");
  }
  const answers = submission.answers || {};
  for (const step of config.steps) {
    for (const field of step.fields) {
      const value = answers[field.name];
      // Required validation
      if (field.required && (!value || value.toString().trim() === "")) {
        throw ErrorHandler.handleBadRequest(`${field.label} is required`);
      }
      // Radio / Select validation
      if (
        ["radio", "select"].includes(field.type) &&
        value &&
        !field.options.includes(value)
      ) {
        throw ErrorHandler.handleBadRequest(`Invalid value for ${field.label}`);
      }
    }
  }

  return await submissionDal.updateSubmission(submissionId, {
    status: "completed",
    currentStep: config.steps.length,
    completedSteps: config.steps.map((_, index) => index),
  });
};
export default {
  createSubmission,
  updateSubmission,
  getAllSubmissions,
  getSubmissionById,
  submitSubmission,
};
