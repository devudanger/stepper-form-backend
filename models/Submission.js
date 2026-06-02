import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    configId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FormConfig",
      required: true,
    },

    answers: {
      type: Object,
      default: {},
    },

    completedSteps: {
      type: [Number],
      default: [],
    },

    currentStep: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["draft", "completed"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  },
);

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;
