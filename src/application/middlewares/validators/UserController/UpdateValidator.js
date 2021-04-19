import * as zod from "zod";
import { errorHandler } from "../helpers/handlers";

async function UpdateValidator(request, response, next) {
  try {
    const schema = zod.object({
      name: zod.string(),
      email: zod.string().email(),
      password: zod.string().min(6),
    });
    schema.parse(request.body);

    return next();
  } catch (error) {
    return response.status(400).json(errorHandler(error));
  }
}

export default UpdateValidator;
