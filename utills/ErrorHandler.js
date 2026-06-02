class ErrorHandler extends Error {
  // constructor object properties when new instance created
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
    this.message = message || "Unrecognized Error !!";
    // This is to maintain the stack trace in the production environment
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
  // below all static methods which belong to class itself not instance so can be called directly on class without instance
  static handleNotFound(message = "Resource not found") {
    return new ErrorHandler(message, 404);
  }

  static handleBadRequest(message = "Bad Request") {
    return new ErrorHandler(message, 400);
  }

  static handleUnauthorized(message = "Unauthorized") {
    return new ErrorHandler(message, 401);
  }

  static handleForbidden(message = "Forbidden") {
    return new ErrorHandler(message, 403);
  }

  static handleInternalServerError(message = "Unrecognized Error !!") {
    return new ErrorHandler(message, 500);
  }

  static handleConflict(message = "Conflict") {
    return new ErrorHandler(message, 409);
  }
}

export default ErrorHandler;
