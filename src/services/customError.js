class CustomError extends Error {
  constructor({ errors }) {
    super();
    this.errors = errors;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export { CustomError };
