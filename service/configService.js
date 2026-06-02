import configDal from "../DAL/configDAL.js";
import ErrorHandler from "../utills/ErrorHandler.js";

const getConfigs = async () => {
  const configs = await configDal.getConfigs();

  if (!configs || configs.length === 0) {
    throw ErrorHandler.handleNotFound("No form configurations found");
  }

  return configs;
};

export default {
  getConfigs,
};
