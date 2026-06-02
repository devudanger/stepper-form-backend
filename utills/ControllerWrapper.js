import ErrorHandler from "./ErrorHandler.js";
import { sendError } from "./ResponseHandler.js";

export default function controllerWrapper(callBack) {
  return async function (req, res) {
    try {
      await callBack(req, res);
    } catch (error) {
      if (error instanceof ErrorHandler) {
        sendError(error, res);
      } else {
        console.log(" ---- ERROR ------\n" + error);
        sendError(error, res);
      }
    }
  };
}
