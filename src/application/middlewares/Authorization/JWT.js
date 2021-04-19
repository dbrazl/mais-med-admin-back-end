import jwt from "jsonwebtoken";
import auth from "../../../infraesctruture/config/authorization";
import { CustomError } from "../../../services/customError";
import { errorHandler, JWTHandler } from "../helpers/handlers";

async function createJWTStrategy(request, response, next) {
  try {
    const { authorization } = request.headers;

    if (!authorization)
      throw new CustomError({
        errors: [
          {
            path: ["Authorization"],
            message: "You didn't set the bearer token",
          },
        ],
      });

    const token = authorization.split(" ")[1];
    const decoded = await jwt.verify(token, auth.secret);

    request.user = {
      id: decoded.id,
    };

    return next();
  } catch (error) {
    const json = JWTHandler(error) || errorHandler(error);
    return response.status(400).json(json);
  }
}

export default createJWTStrategy;
