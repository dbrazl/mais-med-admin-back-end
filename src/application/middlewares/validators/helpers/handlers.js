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

export { errorHandler };
