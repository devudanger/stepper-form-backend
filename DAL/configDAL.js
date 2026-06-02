import FormConfig from "../models/FormConfig.js";

const getConfigs = async () => {
  return await FormConfig.find();
};

const getConfigById = async (id) => {
  return await FormConfig.findById(id);
};

export default {
  getConfigs,
  getConfigById,
};
