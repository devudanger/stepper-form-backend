import mongoose from "mongoose";

const fieldSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  label: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    enum: ["text", "select", "radio"],
    required: true,
  },

  required: {
    type: Boolean,
    default: false,
  },

  placeholder: String,

  options: {
    type: [String],
    default: [],
  },
});

const stepSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  fields: [fieldSchema],
});

const formConfigSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    steps: [stepSchema],
  },
  {
    timestamps: true,
  },
);

const FormConfig = mongoose.model("FormConfig", formConfigSchema);

export default FormConfig;
