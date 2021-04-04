import { DefaultError } from "./DefaultError";

export class UnauthorizedAccessError extends DefaultError {
  constructor(message?: string) {
    // Providing default message and overriding status code.
    super(message || "Unauthorized Access", 401);
  }
};
