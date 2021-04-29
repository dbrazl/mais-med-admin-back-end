import limiter from "../../../services/rateLimit";

async function RateLimit(request, response, next) {
  try {
    await limiter.consume(request.ip);

    return next();
  } catch (error) {
    return response.status(429).json({
      message: "To many requests",
      reasons: [
        "You try to access a resource to many times in the same second",
      ],
    });
  }
}

export default RateLimit;
