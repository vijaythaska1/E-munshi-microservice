/**
 * Class representing an API error
 * @extends Error
 */
class ApiError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  /**
   * Create an API error
   * @param statusCode - HTTP status code for the error
   * @param message - Error message
   * @param isOperational - Whether the error is operational (vs programming error)
   * @param stack - Optional stack trace
   */
  constructor(
    statusCode: number,
    message: string,
    isOperational: boolean = true,
    stack: string = ''
  ) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = isOperational;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }

    // This is needed because when extending built-in classes in TypeScript
    // the prototype chain is not properly maintained
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export default ApiError;
