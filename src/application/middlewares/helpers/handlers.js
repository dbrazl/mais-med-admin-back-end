const HUGE_NUMBER = 1000;

const errorHandler = (error) => {
  const path = Array.from(
    new Set(
      [
        ...error.errors.map((data) => data.path).flat(),
        ...error.errors.map((data) => data.keys).flat(),
      ].filter((val) => val)
    )
  );

  const reasons = Array.from(
    new Set([
      ...error.errors.map((data) => data.message),
      ...error.errors
        .map((data) =>
          data?.unionErrors?.map((errors) =>
            errors.errors.map((err) => err.message)
          )
        )
        .flat(HUGE_NUMBER)
        .filter((val) => val),
    ])
  );

  return {
    message: "Validation failure",
    path,
    reasons,
  };
};

const JWTHandler = (error) => {
  switch (error.message) {
    case "invalid signature":
      return errorHandler({
        errors: [
          {
            path: ["Authorization"],
            message: "Invalid signature",
          },
        ],
      });

    case "jwt malformed":
      return errorHandler({
        errors: [
          {
            path: ["Authorization"],
            message: "JWT malformed",
          },
        ],
      });

    case "jwt expired":
      return errorHandler({
        errors: [
          {
            path: ["Authorization"],
            message: "The token has been expired",
          },
        ],
      });

    default:
      break;
  }
};

export { errorHandler, JWTHandler };
