import configService from "../service/configService.js";
import controllerWrapper from "../utills/ControllerWrapper.js";
import { sendSuccess } from "../utills/ResponseHandler.js";

export const getConfigs = controllerWrapper(async (req, res) => {
  const data = await configService.getConfigs();

  sendSuccess(res, data, "Configurations fetched successfully");
});
